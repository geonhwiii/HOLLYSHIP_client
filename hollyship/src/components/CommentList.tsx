import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const axios = require('axios');
import { PREFIX_URL } from '../config/config';
// import { Comment } from '../components/Comment';

export const CommentList = props => {
  const [isLiked, setLiked] = useState('');
  const [likedMusics, setMusics] = useState([]);

  const handleLike = (musicId, index) => {
    if (!likedMusics.includes(index)) {
      likedMusics.push(index);
      axios
        .post(`${PREFIX_URL}/music/${musicId}/like`)
        .then(res => alert(res.data.message))
        .catch(err => console.log(err));
    } else {
      likedMusics.splice(likedMusics.indexOf(index), 1);
      axios
        .delete(`${PREFIX_URL}/music/${musicId}/like`)
        .then(res => alert(res.data.message))
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    handleLike;
  });

  const likedStyle = idx => {
    if (likedMusics.indexOf(idx) > -1) {
      return 'white';
    } else {
      return 'pink';
    }
  };

  return (
    <FlatList
      data={props.comments}
      keyExtractor={item => item.music.createdAt}
      renderItem={({ item, index }) => (
        // <Comment
        //   user={item.commentUsername}
        //   music={item.music}
        //   comment={item.comment}
        //   toggle={item.isLiked}
        // />
        <View
          style={{
            borderBottomColor: 'rgba(52,52,52,0.8)',
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <Image
              style={{ width: 50, height: 50, margin: 10 }}
              source={{ uri: item.music.thumbnail }}
            ></Image>

            <View style={{ flexDirection: 'row', flex: 4 }}>
              <View style={{ alignSelf: 'center' }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {item.commentUsername}
                </Text>
                <Text style={{ color: 'white' }}>
                  {item.music.artist} - {item.music.title}
                </Text>
                <Text style={{ color: 'white' }}>{item.comment}</Text>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Icon
                name="heart-outline"
                color={likedStyle(index)}
                size={30}
                style={styles.icon}
                onPress={() => {
                  handleLike(item.music.id, index);
                  console.log(likedMusics);
                }}
              ></Icon>
            </View>
          </View>
        </View>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  liked: {
    color: 'pink',
  },
  unliked: {
    color: 'white',
  },
});
