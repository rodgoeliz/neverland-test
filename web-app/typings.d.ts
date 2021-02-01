/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.woff' {
  const content: any;
  export default content;
}

declare module '*.woff2' {
  const content: any;
  export default content;
}

declare module '*.eot' {
  const content: any;
  export default content;
}
