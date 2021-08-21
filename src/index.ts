import { Dispatch, Store, Action } from "redux";

export interface AsyncDispatch<S, E, A extends Action> {
  <T extends A>(action: T): T;
  <R>(asyncAction: AsyncAction<R, S, E, A>): R;
}

export type AsyncAction<R, S, E, A extends Action> = (
  dispatch: AsyncDispatch<S, E, A>,
  getState: () => S
) => R;

const asyncMiddleware =
  ({ dispatch, getState }: Store) =>
  (next: Dispatch) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (action: Action | ((d: Dispatch, s: () => Store) => void)) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };

export default asyncMiddleware;
