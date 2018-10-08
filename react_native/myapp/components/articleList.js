import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import listData from '../data.json';
import ArticleDetail from './arcticleDetail.js';

const width = Dimensions.get('window').width; 

export default class ArticleList extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2 
    })

    this.state = {
      dataSource:ds.cloneWithRows(listData)
    }
  }

  renderRow(rowData) {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={()=>this.goToDetail(rowData)}>
            <View style={styles.listItem}>
              <Image source={{uri:rowData.imgUrl}} style={styles.listItemImg}></Image>
              <View style={styles.listItemCont}>
                <View >
                  <Text numberOfLines={1} style={styles.listItemTitle}>{rowData.brandName}</Text>
                </View>
                <View >
                  <Text style={styles.listItemAbs}>{rowData.price}</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>
    )
  }


  goToDetail(rowData) {
    this.props.navigator.push({
      title:'详情页',
      component:ArticleDetail,
      passProps:{rowData}
    })
  }


  render() {
    return (
      <ListView
       contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
       dataSource={this.state.dataSource}
       renderRow={(rowData)=>this.renderRow(rowData)}
      >
        
      </ListView>
    );
  }
}

const styles = StyleSheet.create({
   listItem:{
     flexDirection:'row',
     justifyContent:'center',
     alignItems:'flex-start',
     margin:20,
     width:width*0.92,
     height:100,
     borderWidth:2,
     borderColor:'black',
   },

   listItemImg: {
    width:100,
    height:100
   },

   listItemCont:{
    height:100,
    width:width*0.92 - 105,
   },

   listItemTitle:{
    fontSize : 20,
   },

   listItemAbs:{
    fontSize: 14
   }
});
