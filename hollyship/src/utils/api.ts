import { AsyncStorage } from 'react-native';

export let getAccessToken = async () => {
  let token: any = await AsyncStorage.getItem('token');
  return token;
};

export let getUser = async () => {
  let user: any = await AsyncStorage.getItem('user');
  return JSON.stringify(user);
};

export const json = async <T = any>(
  uri: string,
  method: string = 'GET',
  body?: {}
) => {
  let headers: any = {
    'Content-type': 'application/json',
  };
  try {
    let result = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    if (result.ok) {
      return <T>await result.json();
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const SetAccessToken = async (
  token: string,
  user: {} = { user_id: undefined, role: 'admin' }
) => {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
};
