import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.indexCont}>
        <View style={styles.swiperCont}>
          <ScrollView 
           style={styles.scrollCont}
           horizontal={true}
           pagingEnabled={true}
           showsHorizontalScrollIndicator={false}
           showsVerticalScrollIndicator={false}
           automaticallyAdjustContentInsets={false}
          >
            <View style={[styles.swiperItem,{backgroundColor:'red'}]}>
             <Text>1</Text>
            </View>
            <View style={[styles.swiperItem,{backgroundColor:'green'}]}>
             <Text>2</Text>
            </View>
            <View style={[styles.swiperItem,{backgroundColor:'blue'}]}>
              <Text>3</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   indexCont:{
     flex:1,
     justifyContent: 'center',
     alignItems: 'center'
   },

   swiperCont:{
     width:width*0.9,
     height:200,
   },

   scrollCont:{
     flex:1,
     borderColor:'black',
     borderWidth: 10,
   },

   swiperItem:{
     width:width*0.9,
     flex:1,
   }
});


