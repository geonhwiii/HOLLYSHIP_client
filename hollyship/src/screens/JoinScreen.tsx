import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Layout, Text, Input, Button, Popover } from 'react-native-ui-kitten';
import axios from 'axios';
import { PREFIX_URL } from '../config/config';

type Props = {
  navigation: any;
};

interface State {
  email: string;
  username: string;
  password: string;
  popoverVisible: boolean;
  isLoading: boolean;
}
export default class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      popoverVisible: false,
      isLoading: false,
    };
  }

  handleJoin = async () => {
    try {
      Keyboard.dismiss();
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const login = await axios.post(`${PREFIX_URL}/auth/signup`, {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      });
      Alert.alert('회원가입이 완료되었습니다!');
      await this.props.navigation.navigate('Login');
    } catch (err) {
      this.setState({
        ...this.state,
        isLoading: false,
      });
      return this.togglePopover();
    }
  };

  componentWillUnmount = () => {
    this.setState({
      ...this.state,
      isLoading: false,
    });
  };

  togglePopover = () => {
    this.setState({ popoverVisible: true });
    setTimeout(() => {
      this.setState({
        popoverVisible: false,
      });
    }, 1500);
  };

  renderPopoverContentElement = () => (
    <Layout style={styles.popoverContent}>
      <Text category="h6">중복된 아이디 또는 닉네임입니다.</Text>
    </Layout>
  );

  // TODO: checked valid input
  isValidInputEmail = () => {
    const { email } = this.state;
    return email.length > 0;
  };

  isValidInputPassword = () => {
    const { password } = this.state;
    return password.length >= 4;
  };

  isValidInputUsername = () => {
    const { username } = this.state;
    return username.length > 0;
  };

  render() {
    const { isLoading } = this.state;
    const { handleJoin } = this;
    const isValidInputEmail = this.isValidInputEmail();
    const isValidInputPassword = this.isValidInputPassword();
    const isValidInputUsername = this.isValidInputUsername();
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Layout style={styles.container}>
            <Layout style={styles.formArea}>
              <Layout style={styles.titleArea}>
                <Text category="h1" style={styles.title}>
                  WelCome 🚀
                </Text>
              </Layout>
              <Input
                style={styles.textForm}
                placeholder={'ID'}
                status={isValidInputEmail ? 'info' : ''}
                value={this.state.email}
                keyboardType="email-address"
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                caption={isValidInputEmail ? 'Correct' : 'ID를 입력해주세요'}
                onChangeText={input => this.setState({ email: input })}
                type="email"
              />
              <Input
                style={styles.textForm}
                secureTextEntry={true}
                placeholder={'Password'}
                keyboardType="decimal-pad"
                keyboardAppearance="dark"
                value={this.state.password}
                status={isValidInputPassword ? 'info' : ''}
                caption={
                  isValidInputPassword
                    ? 'Correct'
                    : '비밀번호는 4자리 이상으로 해주세요'
                }
                onChangeText={input => this.setState({ password: input })}
              />
              <Input
                style={styles.textForm}
                placeholder={'Nickname'}
                status={isValidInputUsername ? 'info' : ''}
                value={this.state.username}
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                caption={
                  isValidInputUsername ? 'Correct' : '닉네임을 입력해주세요'
                }
                onChangeText={input => this.setState({ username: input })}
              />
              <Layout style={styles.buttonArea}>
                <Popover
                  visible={this.state.popoverVisible}
                  content={this.renderPopoverContentElement()}
                  onBackdropPress={this.togglePopover}
                >
                  <Button
                    appearance="outline"
                    status={
                      isValidInputEmail &&
                      isValidInputPassword &&
                      isValidInputUsername
                        ? 'success'
                        : 'basic'
                    }
                    disabled={
                      isValidInputEmail &&
                      isValidInputPassword &&
                      isValidInputUsername
                        ? false
                        : true
                    }
                    size="large"
                    style={styles.singupButton}
                    onPress={handleJoin}
                  >
                    Sign Up
                  </Button>
                </Popover>
              </Layout>
              {isLoading && <ActivityIndicator size="large" color="0000ff" />}
            </Layout>
          </Layout>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '10%',
    paddingRight: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    marginBottom: 10,
  },
  formArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    alignItems: 'center',
    width: '100%',
    padding: '10%',
    paddingTop: 100,
  },
  textForm: {
    width: Dimensions.get('screen').width * 0.7,
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 15,
  },
  buttonArea: {
    margin: 20,
  },
  singupButton: {
    width: Dimensions.get('screen').width * 0.4,
  },
  popoverContent: { justifyContent: 'center', alignItems: 'center' },
});
