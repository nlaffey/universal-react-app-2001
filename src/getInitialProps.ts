import * as React from 'react';
import { ResolveObject } from './typings/server';

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

// TODO: Move this somewhere else? I don't think the client needs to import this file
export interface InitialPropsContext {
  port: number;
  resolveObject: ResolveObject;
}

/**
 * TODO: Write tests for this method and refactor
 * */
export const getInitialProps = async (component, initialPropsContext: InitialPropsContext) => {
  const promises = [];

  recursiveMap(component, (child) => {
    if (child.type.getInitialProps) {
      promises.push(child.type.getInitialProps(initialPropsContext));
    }

    if (child.type.ComposedComponent && child.type.ComposedComponent.getInitialProps) {
      promises.push(child.type.ComposedComponent.getInitialProps(initialPropsContext).then(async (results) => {
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