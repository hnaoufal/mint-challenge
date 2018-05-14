/**
 * Created by hicham on 01.08.17.
 */
require('babel-register')();

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
const chai = require('chai');
const chaiImmutable = require('chai-immutable');
const sinonChai = require('sinon-chai');


function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js'
};
global.React = require('react')

chai.expect();
chai.use(chaiImmutable);
chai.use(sinonChai);

copyProps(window, global);
