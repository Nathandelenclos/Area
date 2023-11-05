export type Middleware = () => boolean;

/**
 * Route interface
 * @interface Route
 */
export interface Route {
  /**
   * Route middleware
   */
  middleware?: Middleware[];
  /**
   * Route path
   */
  path: string;
  /**
   * Route name
   */
  name: string;
  /**
   * Route component
   */
  element: JSX.Element;
  /**
   * Route public state
   */
  public?: boolean;
}
