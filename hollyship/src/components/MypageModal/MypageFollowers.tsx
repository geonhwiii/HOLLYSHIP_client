import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-ui-kitten';
import { FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import FollowBtn from './FollowBtn';
import { PREFIX_URL } from '../../config/config';

export default class MypageFollowers extends Component {
  state = {
    isLoading: false,
    dataSource: null,
  };

  componentDidMount() {
    this.getFollowers();
    this.getImage();
  }

   getImage = async () => {
    try {
      const response = await axios.get(`${PREFIX_URL}/user`)
      console.log('image' , response.data)
    }catch (err) {
      console.log(err)
    }
  }

  getFollowers = async () => {
    try {
      const response = await axios.get(`${PREFIX_URL}/follow/follower`);

      this.setState({
        dataSource: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // getUserImage = async () => {
  //   const response = await axios.get(`${PREFIX_URL}/`);

  // }

  _renderItem = ({ item, index }) => (
    <View style={styles.listContainer}>
      <ListItem
        roundAvatar
        index={index}
        title={item.followerName}
        leftAvatar={{
          source: { uri: item.image },
        }}
        containerStyle={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          borderRadius: 10,
        }}
        activeScale={3}
        linearGradientProps={{
          colors: ['#052a9c', '#13161f'],
          start: [1, 0],
          end: [0, 3],
        }}
        titleStyle={styles.titleStyle}
      />
      <View style={styles.buttonStyle}>
        <FollowBtn dataSource={item.followerName} />
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.9,
  },
  listContainer: {
    flex: 1,
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonStyle: {
    position: 'absolute',
    left: '60%',
    top: '25%',
  },
});
