import * as React from 'react';

function recursiveMap(children, fn) {
  return React.Children.map<any>(children, (child: React.ReactElement<any>) => {
    let newChild: React.ReactElement<{ children: any }> = child;
    if (!React.isValidElement(child)) {
      return child;
    }
    if (newChild.props.children) {
      newChild = React.cloneElement(newChild, {
        children: recursiveMap(newChild.props.children, fn)
      });
    }
    return fn(newChild);
  });
}

export const getInitialProps = async (component, port) => {
  const promises = [];

  recursiveMap(component, (child) => {
    if (child.type.getInitialProps) {
      promises.push(child.type.getInitialProps(port));
    }

    if (child.type.ComposedComponent && child.type.ComposedComponent.getInitialProps) {
      promises.push(child.type.ComposedComponent.getInitialProps(port).then(async (results) => {
        return {
          data: results,
          id: child.initialPropsId
        };
      }));
    }
  });

  const resolvedPromises = await Promise.all(promises);

  const flatResult = {};
  resolvedPromises.forEach((result) => {
    flatResult[result.id] = result.data;
  });

  return flatResult;
};