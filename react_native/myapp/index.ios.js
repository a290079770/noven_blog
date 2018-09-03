/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class myapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag:true
    }
  }

  changeStyle() {
    this.setState({
      flag:!this.state.flag
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.welcome,styles.hello,{color:'yellow'}]}>
          hello world
        </Text>
        <Text onPress={()=>this.changeStyle()} style={[styles.instructions,this.state.flag ? styles.hello:{}]}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  hello:{
    color:'red',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('myapp', () => myapp);
