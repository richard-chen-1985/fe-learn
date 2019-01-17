function createThunkMiddleware(extraArgument) {
  return function (middlewareAPI) {
    var dispatch = middlewareAPI.dispatch;
    var getState = middlewareAPI.getState;

    return function (nextMiddleware) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }
        return nextMiddleware(action);
      }
    }
  }
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

module.exports = thunk;