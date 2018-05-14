/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Login from 'cmp/LogIn';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

const store = createStore(reducers);

const getShallow = props =>
  shallow(
    <Provider store={store}>
      <Login {...props} />
    </Provider>,
  );

describe('<Login />', () => {
  it('contains spec with an expectation', () => {
    expect(getShallow().contains(<div className="foo" />)).to.equal(false);
  });

  it('contains spec with an expectation', () => {
    expect(getShallow().is('.foo')).to.equal(false);
  });

  it('contains spec with an expectation', () => {
    expect(getShallow().find('.foo').length).to.equal(0);
  });
});
