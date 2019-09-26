import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, View, StyleSheet, StatusBar, Alert } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppNavigator from '../components/Mypage/index';
import Info from './Info';
const axios = require('axios');

const AppIndex = createAppContainer(AppNavigator);

interface Props {
  navigation: any;
}

class UserScreen extends Component<Props> {
  handleLogout() {
    axios
      .get('http://13.125.244.90:8000/auth/logout')
      .then(this.props.navigation.navigate('Login'))
      .catch(err => Alert.alert(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <View style={styles.header}>
          <Button title="Log-Out" onPress={this.handleLogout.bind(this)} />
          <Icon
            name="settings"
            size={28}
            color="white"
            onPress={() => this.props.navigation.navigate('Info')}
          />
        </View>
        <AppIndex />
      </View>
    );
  }
}

const UserStack = createStackNavigator(
  {
    UserScreen,
    Info,
  },
  {
    defaultNavigationOptions: () => ({
      title: 'MyPage',
      headerStyle: {
        backgroundColor: '#100759',
      },
      headerTintColor: '#fff',
    }),
  }
);

export default UserStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'black',
    color: 'white',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
