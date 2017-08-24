import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import css from './css/style';

import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);