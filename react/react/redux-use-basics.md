# redux 学习

[点击访问引用来源](http://mp.weixin.qq.com/s?__biz=MzA4OTc4MTM0OA==&mid=2650358361&idx=1&sn=426fbf863a90ef86468a7177a0626cde&scene=2&srcid=0820eQQ0q6X7ReRjPJ0ZoWUU&from=timeline&isappinstalled=0#wechat_redirect)

Redux三个最重要的概念：action, reducer, store。通过一个模拟登录的例子来分别说明它们的关系和用法：

## action

```js
// actions/Login.js

'use strict'
import * as types from '../constants/ActionTypes';

// 模拟服务器返回的用户信息
let user = {
    'name': 'admin',
    'age': '24'
}

// 执行登录
export function doLogin() {
    return dispatch => {
        dispatch(isLogining())
        // 模拟用户登录
        let result = fetch('https://github.com').then(res => {
            dispatch(loginSuccess(true, user))
        }).catch(e => {
            dispatch(loginSuccess(false, null))
        })
    }
}

// 正在登录
function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }
}

// 登录完成
function loginSuccess(isSuccess, user) {
    return {
        type: types.LOGIN_IN_DONE,
        isSuccess,
        user
    }
}
```

`action/Login.js` 定义了`store`的行为：`doLogin()`

* 首先，`dispatch(isLogining())` 发出一个action，表示正在登录
* 然后，使用`fetch`访问一个网站（模拟登录场景），成功之后使用`dispatch(loginSuccess(true,user))`发出一个action，表示登录成功，并且把模拟的用户数据发出去；当然，如果失败，也会使用`dispatch(loginSuccess(false,null))`；只不过数据为空。

有了action，接下来需要对应的reducer来处理了。

## reducer

```js
// reducers/Login.js

'use strict'

import * as types from '../constants/ActionTypes';

// 初始状态
const initialState = {
    status: 'init', // init, doing, done
    isSuccess: false,
    user: null
}

export default function loginIn(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_IN_INIT: // 初始状态
            return Object.assign({}, state, {
                status: 'init',
                isSuccess: false,
                user: null
            })
        case types.LOGIN_IN_DOING: // 正在登录
            return Object.assign({}, state, {
                status: 'doing',
                isSuccess: false,
                user: null
            })
        case types.LOGIN_IN_DONE: // 登录完成
            return Object.assign({}, state, {
                status: 'done',
                isSuccess: action.isSuccess,
                user: action.user
            })
        default:
            return state
    }
}
```

`reducers/Login.js`中：`loginIn`其实就是对action的处理，负责返回新的状态的函数，这也是reducer的存在的作用。

由于Redux中只允许有一个store，当业务越来越庞大的时候，我们就需要拆分出N个reducer。这时候，就需要把这N个reducer组合起来，因此我们需要一个根reducer。

```js
// reducers/Index.js

'use strict'

import { combineReducers } from 'redux'
import loginIn from './Login'

const rootReducer = combineReducers({
    loginIn
})

export default rootReducer
```

combineReducers是将所有的reducer进行组合，因为我们可能有N个reducer。

## store

```js
'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/Index'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    return store
}
```

这是store的一个基本写法

* applyMiddleware表示将中间件（thunkMiddleware：异步中间件等）应用在redux action过程中。

* createStoreWithMiddleware表示使用reducer来创建store。


## 程序入口

```js
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/ConfigureStore'

import App from './containers/App'

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
```

* 使用Provider来包裹整个程序的入口组件App，同时将store传进去。

* 实际入口组件是App，让我们来看下

## containers/App.js:

```js
'use strict'

import React, { Component } from 'react'
import {
    View,
    Text,
    Navigator
} from 'react-native'

import loginPage from '../pages/LoginPage'

export default class App extends Component {
    render() {
        return (
            <Navigator
                style={{flex:1}}
                initialRoute={{id:'LoginPage', component: LoginPage}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}
            />
        )
    }
    configureScene(route, routeStack) {
        if(route.sceneConfig) { // 有设置场景
            return route.sceneConfig
        }
        return Navigator.SceneConfigs.PushFromRight // 默认从右侧弹出
    }
    renderScene(route, navigator) {
        return <route.component {...route.passProps} navigator={navigator} />
    }
}
```

导航控制器的根页面是LoginPage，页面内容很简单，如下pages/LoginPage.js。

```js
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { doLogin } from '../actions/Login'
import MainPage from '../pages/MainPage'

class LoginPage extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成，且成功登录
        if(nextProps.status === 'done' && nextProps.isSuccess) {
            this.props.navigator.replace({
                id: 'MainPage',
                component: MainPage,
                passProps: {
                    user: nextProps.user
                }
            })
            return false
        }
        return true
    }

    render() {
        let tips
        if(this.props.status === 'init') {
            tips = '请点击登录'
        } else if (this.props.status === 'doing') {
            tips = '正在登录...'
        } else if (this.props.status === 'done' && !this.props.isSuccess) {
            tips = '登录失败，请重新登录'
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Text>{tips}</Text>
                <TouchableOpacity style={{backgroundColor: '##0000'}} onPress={this.handleLogin.bind(this)>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 100, height: 50}}>
                        <Text style={{color: '#ffff', fontSize: 20}}>登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    handleLogin() {
        this.props.dispatch(doLogin())
    }

    function select(store) {
        return {
            status: store.loginIn.status,
            isSuccess: store.loginIn.isSuccess,
            user: store.loginIn.user
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(select)(LoginPage)
```

* connect(select)(LoginPage)表示LoginPage组件对store的状态感兴趣。

* select函数的作用是将store的状态绑定到当前组件的props中。

* handleLogin()执行登录，使用this.props.dispatch(doLogin())触发action，经过reducer处理后，新的状态交还给store，store会通知视图刷新。所以shouldComponentUpdate会被调用，然后，判断登录成功则切换页面到MainPage（并携带参数user）。

* MainPage比较简单，仅仅展示了user的内容，这里不再贴代码了。

至此，一个简单的Redux示例就完成了，让我们来稍微总结下：

* 整个应用只有一个store，用来保存所有的状态，视图不需要自己维护状态。

* 视图通过connect函数绑定到store，当store状态变化后，store会通知视图刷新。

* 触发一个action之后，会经过可能N个reducers处理，最后根reducer会将所有reducers处理之后的状态合并，然后交给store，store再通知视图刷新。