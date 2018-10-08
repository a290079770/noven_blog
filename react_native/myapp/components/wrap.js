import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TabBarIOS,
} from 'react-native';

import Index from './index.js';
import ArticleList from './articleList.js';
import My from './my.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Wrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:1,
    }
  }

  changeTabBar(selected) {
    this.setState({
      selected
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/*底部导航*/}
        
        <TabBarIOS
         barTintColor="black"
         tintColor="red"
         translucent={true}
        >

          <TabBarIOS.Item
           badge="5"
           systemIcon="bookmarks"
           selected={ this.state.selected == 1 }
           onPress={()=>this.changeTabBar(1)}
          >
            <View style={styles.index}>
             <Index/>
            </View>
          </TabBarIOS.Item>

          <TabBarIOS.Item
           systemIcon="downloads"
           selected={ this.state.selected == 2 }
           onPress={()=>this.changeTabBar(2)}
          >
            <View style={styles.articleList}>
             <ArticleList/>
            </View>
          </TabBarIOS.Item>

          <TabBarIOS.Item
           systemIcon="most-viewed"
           selected={ this.state.selected == 3 }
           onPress={()=>this.changeTabBar(3)}
          >
            <View style={styles.my}>
             <My/>
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container:{
     flex:1,
     width,
   },
   index:{
     flex:1,
   },
   articleList:{
     flex:1,
   },
   my:{
     flex:1,
     backgroundColor:'blue',
   },
});

