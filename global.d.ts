import React from 'react';

// .env
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_KEY: string;
  }
}

// Global type declarations for React components
declare global {
  // Just empty object
  type EmptyObj = Record<string, unknown>;
  // React fn component with children
  type FC<T = object> = React.FunctionComponent<React.PropsWithChildren<T>>;
  // React fn component without children
  type RC<T = object> = React.FunctionComponent<T>;
  // Get available props from element (e.g. button, input, div, etc.)
  type ComponentProps<T> = React.ComponentProps<T>;
  // Next page props
  type PageProps<Params = EmptyObj, SearchParams = EmptyObj> = {
    params: Partial<Params>;
    searchParams: Partial<SearchParams>;
  };
  type PossibleNull<T> =
    | {
        [K in keyof T]: T[K] | null;
      }
    | null;
}
