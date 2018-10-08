/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import Wrap from './components/wrap';


export default class myapp extends Component {
  render() {
    return (
      <Wrap/>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('myapp', () => myapp);
