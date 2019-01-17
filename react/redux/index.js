// import $$observable from 'symbol-observable'

var redux = {
  /**
   * 创建一个 store 存储 redux 的 state
   * @param {Function} reducer returns the next state tree, given
 * the current state tree and the action to handle
   * @param {any} preloadedState initial state
   * @param {Function} enhancer 给 store 添加扩展功能
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
   */
  createStore: function (reducer, preloadedState, enhancer) {
    var listeners = [];
    var currentState = preloadedState;

    if (enhancer) {
      return enhancer(this.createStore)(reducer, preloadedState);
    }

    /**
     * 提供 订阅/发布 功能
     */
    function observable() {
      return {
        subscribe: function (observer) {
          function observeState() {
            if (observer.next) {
              observer.next(getState())
            }
          }
  
          observeState()
          var unsubscribe = outerSubscribe(observeState)
          return { unsubscribe: unsubscribe };
        },
        '[$$observable]()': function () {
          return this
        }
      }
    }

    return {
      /**
       * 触发 state change 的唯一方法
       * @param {Object} action 表示 "what changed"，必须有一个 type
       * 属性用于告知 reducer 要做什么动作
       */
      dispatch: function (action) {
        // 调用 reducer 函数
        reducer(currentState, action);

        // 执行监听回调函数
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          listener();
        }
    
        return action;
      },
      /**
       * 订阅一个状态变化监听器。在 dispatch 了 action 后，state 发生
       * 部分变化时触发监听器。可以通过 getState() 拿到当前 state
       * @param {Function} listener 
       */
      subscribe: function (listener) {
        listeners.push(listener);
        return function unsubscribe() {
          var index = listeners.indexOf(listener);
          listeners.splice(index, 1);
        }
      },
      getState: function () {
        return currentState;
      },
      /**
       * 替换当前 reducer，code spliting 和 hot reloading 用到
       * @param {*} nextReducer 
       */
      replaceReducer: function (nextReducer) {
        reducer = nextReducer;
        this.dispatch({ type: this.__DO_NOT_USE__ActionTypes.REPLACE });
      },
      '[$$observable]': observable
    }
  },
  /**
   * 将一个有多个不同 reducer function 的对象转化成一个 reducer function
   * @param {Object} reducers 有不同 reducer function 的对象
   * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
   */
  combineReducers: function (reducers) {
    // copy reducers by key to finalReducers
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i];
      finalReducers[key] = reducers[key];
    }

    // create a reducer function to call all sub reducers
    var finalReducersKeys = Object.keys(finalReducers);
    return function combination(state, action) {
      var hasChanged = false;
      var nextState = {};
      for (var i = 0; i < finalReducersKeys.length; i++) {
        var key = finalReducersKeys[i];
        var reducer = finalReducersKeys[key];
        var previouseStateForKey = state[key];
        var nextStateForKey = reducer(previouseStateForKey, action);
        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previouseStateForKey;
      }
      return hasChanged ? nextState : state;
    }
  },
  /**
   * 一个简化方法，可以达到 store.dispatch(MyActionCreators.doSomething())
   * @param {Function|Object} actionCreators 
   * @param {Function} dispatch 
   */
  bindActionCreators: function (actionCreators, dispatch) {
    function bindActionCreator(actionCreator, dispatch) {
      return function() {
        return dispatch(actionCreator.apply(this, arguments))
      }
    }

    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch)
    }

    var keys = Object.keys(actionCreators)
    var boundActionCreators = {}
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var actionCreator = actionCreators[key]
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      }
    }
    return boundActionCreators
  },
  /**
   * 创建一个 store enhancer，作为中间件用于处理 dispatch
   * applyMiddleware(m1, m2, m3)(createStore)(reducer)
   * @returns {Function} a store enchancer
   */
  applyMiddleware: function (/* ...middlewares */) {
    var middlewares = Array.prototype.slice.call(arguments);

    return function (createStore) {
      return function (/* reducer, preloadState, enhancer */) {
        var args = Array.prototype.slice.call(arguments);
        var store = createStore.apply(null, args);
        var dispatch = function () {}
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function (/* action */) {
            dispatch.apply(null, arguments);
          }
        }
        var chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        dispatch = this.componse.apply(this, chain)(store.dispatch);

        return Object.assign({}, store, dispatch);
      }
    }
  },
  /**
   * 接收多个 function 参数，从右到左顺序调用
   * @returns {Function} componse(f, g, h) : (...args) => f(g(h(...args))).
   */
  componse: function () {
    var funcs = Array.prototype.slice.call(arguments);
    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      }
    }
    if (funcs.length === 1) {
      return funcs[0]
    }
    return funcs.reduce(function (a, b) {
      return function () {
        a(b(arguments));
      }
    })
  },
  /**
   * redux 私有 action types
   * 所有未知 actions 都必须返回 current state
   * 如果 current state 没定义，就返回 initial state
   */
  __DO_NOT_USE__ActionTypes: {
    INIT: '@@redux/INIT3232323',
    REPLACE: '@@redux/REPLACE123456',
    PROBE_UNKNOWN_ACTION: function () {
      return '@@redux/PROBE_UNKNOWN_ACTION123432432'
    }
  }
}

module.exports = redux