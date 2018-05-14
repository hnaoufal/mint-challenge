import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import store from './store';

import history from './history';
import Main from './components/Main';

const App = () => (
    <AppContainer>
      <Provider store={store}>
        <Main history={history} />
      </Provider>
    </AppContainer>
);

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);

if (module.hot) {
  module.hot.accept();
}

