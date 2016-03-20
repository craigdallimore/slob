/*eslint-disable no-unused-vars */
'use strict';

const React = require('react');
const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} = require('react-addons-test-utils');
const { IntlProvider } = require('react-intl');

const language = require('common/en-GB.js');
const A        = require.requireActual('../index');

describe('Component A', () => {

  it('can show i18n text', () => {

    const component = renderIntoDocument(
      <IntlProvider {...language}>
        <A/>
      </IntlProvider>
    );

    const h2 = findRenderedDOMComponentWithTag(component, 'h2');

    expect(h2.textContent).toBe(language.messages['label-a']);

  });

});
