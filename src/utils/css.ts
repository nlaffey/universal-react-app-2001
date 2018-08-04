export const cssSet = new Set();

export function insertCss(...styles) {
  const isClient = typeof window !== 'undefined';
  styles.forEach((style) => {
    if (style._insertCss || style._getCss) {
      const css = isClient ? style._insertCss() : style._getCss();
      cssSet.add(css);
    }
  });
}

export function getRouteCss() {
  const cssArray = [];
  cssSet.forEach(css => cssArray.push(css));
  return cssArray.join('');
}
