export type ResolveObject = {
  pathname: string;
  query: string;
  // TODO: Rename this to stylesContext? Is this being used for anything else?
  context: { insertCss: (...styles) => void }
};
