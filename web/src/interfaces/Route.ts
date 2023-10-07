export type Middleware = () => boolean;

export interface Route {
  middleware?: Middleware[];
  path: string;
  name: string;
  element: JSX.Element;
}
