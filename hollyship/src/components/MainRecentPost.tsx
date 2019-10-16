import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Button,
  Modal,
} from 'react-native-ui-kitten';

import axios from 'axios';
import moment from 'moment';
import FollowBtn from './MypageModal/MainFollowBtn';
import { ScrollView } from 'react-native-gesture-handler';

import { PREFIX_URL } from '../config/config';

export interface State {
  posts: any;
  modalVisible: boolean;
  currentModalData: null;
  refreshing: boolean;
}

export default class MainRecentPost extends Component<State> {
  state = {
    posts: {},
    modalVisible: false,
    currentModalData: null,
    refreshing: false,
  };

  reRender;

  // TODO: MAKE BUTTON ACC
  buttonAccessory = style => (
    <Button
      appearance="outline"
      status="info"
      style={style}
      onPress={() => Alert.alert('기능개발중!')}
    >
      LIKE
    </Button>
  );

  // TODO: TOGGLE MODAL
  setModalVisible = () => {
    const modalVisible: boolean = !this.state.modalVisible;
    this.setState({ modalVisible });
  };

  getPosts = async () => {
    const response = await axios.get(`${PREFIX_URL}/post`);
    const recentPosts = response.data.reverse().slice(0, 5);
    this.setState({
      posts: recentPosts.map(post => ({
        id: post.id,
        name: post.user.username,
        title: post.title,
        content: post.content,
        createAt: post.createdAt,
        emotion: post.emotion,
      })),
      currentModalData: {
        id: '',
        name: '',
        title: '',
        content: '',
        createAt: '',
        emotion: '',
      },
    });
    // this.reRender = setTimeout(this.getPosts.bind(this), 1000);
  };

  componentDidMount = () => {
    this.getPosts();
  };

  changeEmoji = emotion => {
    switch (emotion) {
      case 'happy':
        return '😃';
      case 'chill':
        return '😱';
      case 'sad':
        return '😭';
      case 'angry':
        return '🤬';
      default:
        return '😐';
    }
  };

  handleLongPress = item => {
    const { id, name, title, content, emotion, createAt } = item;
    const currentModalData = {
      id,
      name,
      title,
      content,
      emotion,
      createAt,
    };
    this.setState({ ...this.state, currentModalData });
    // console.log(currentModalData);
  };

  renderItem = ({ item, index }) => (
    <ListItem
      style={styles.listItem}
      titleStyle={styles.listItemTitle}
      title={`${this.changeEmoji(item.emotion)} ${item.title}`}
      descriptionStyle={styles.listItemDescription}
      description={`${item.content
        .replace(/(\n)/g, ' ')
        .substring(0, 20)}\n${moment(
        item.createAt,
        'YYYY-MM-DD'
      ).fromNow()}   -   🖋${item.name}`}
      index={index}
      accessory={this.buttonAccessory}
      onLongPress={() => {
        this.handleLongPress(item);
        this.setModalVisible();
      }}
    />
  );

  onRefresh = async () => {
    this.setState({ refreshing: true });
    this.getPosts();
  };

  render() {
    const { posts, currentModalData: post } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
        <Text category="h5" status="primary" style={styles.recentPost}>
          RECENT POST
        </Text>
        <List data={posts} renderItem={this.renderItem} horizontal={false} />
        {post && (
          <Modal
            allowBackdrop={true}
            backdropStyle={{ backgroundColor: 'black', opacity: 0.3 }}
            onBackdropPress={this.setModalVisible}
            visible={this.state.modalVisible}
          >
            <Layout style={styles.modalContainer}>
              <Text category="h2">{this.changeEmoji(post.emotion)}</Text>
              <Text
                category="h1"
                status="primary"
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={styles.modalTitle}
              >
                {post.title}
              </Text>
              <Layout style={styles.modalDivider} />
              <Text
                category="s1"
                numberOfLines={5}
                ellipsizeMode={'tail'}
                style={styles.modalContent}
              >
                {post.content}
              </Text>
              <View style={styles.alignContainer}>
                <View style={styles.aliginText}>
                  <Text category="p1" status="warning" style={styles.modalName}>
                    {post.name}
                  </Text>
                </View>
                <View style={styles.followBtnContainer}>
                  <FollowBtn currentModalData={post.name} />
                </View>
              </View>

              <Text appearance="hint" style={styles.modalDate}>
                {moment(post.createAt, 'YYYY-MM-DD').fromNow()}
              </Text>
            </Layout>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  recentPost: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  listItem: {
    height: Dimensions.get('screen').height * 0.12,
    borderRadius: 8,
    borderColor: '#aaa',
    borderWidth: 1,
    margin: 10,
  },
  listItemTitle: { color: '#eee', fontSize: 22, marginBottom: 10 },
  listItemDescription: { color: 'gray' },
  modalContainer: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').height * 0.5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  modalDivider: {
    width: Dimensions.get('screen').width * 0.7,
    height: 1,
    backgroundColor: '#555',
  },
  modalContent: {
    margin: 15,
  },
  modalName: {
    marginRight: 10,
  },
  modalDate: {
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  alignContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  aliginText: { flexDirection: 'row', alignItems: 'center' },
  followBtnContainer: {
    paddingRight: 10,
  },
});
