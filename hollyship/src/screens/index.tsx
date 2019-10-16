import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';

import { Icon as EleIcon } from 'react-native-elements';
import Start from './StartScreen';
import Join from './JoinScreen';
import Login from './LoginScreen';
import HomeStack from './HomeScreen';
import CategoryStack from './CategoryScreen';
import ChartStack from './ChartScreen';
import UserStack from './UserScreen';
import Splash from './Splash';

const AuthStack = createStackNavigator(
  {
    Login,
    Join,
  },
  { initialRouteName: 'Login', headerMode: 'none' }
);

interface State {
  selectedIndex: number;
}

interface Props {
  navigation: any;
}

export class BottomNavigationShowcase extends React.Component<Props, State> {
  state: State = {
    selectedIndex: 1,
  };

  emotionIcon = () => (
    <EleIcon
      name={this.state.selectedIndex === 0 ? 'heart' : 'heart-o'}
      type="font-awesome"
      size={26}
      color="#f50"
    />
  );

  homeIcon = () => (
    <EleIcon
      name={'home'}
      type="font-awesome"
      size={30}
      color={this.state.selectedIndex === 1 ? '#0f0' : '#ccc'}
    />
  );

  chartIcon = () => (
    <EleIcon
      name={'md-musical-notes'}
      type="ionicon"
      size={30}
      color={this.state.selectedIndex === 2 ? '#ff0' : '#ccc'}
    />
  );

  myPageIcon = () => (
    <EleIcon
      name={'user'}
      type="feather"
      size={30}
      color={this.state.selectedIndex === 3 ? '#33f' : '#ccc'}
    />
  );

  onTabSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
    const {
      [selectedIndex]: selectedRoute,
    } = this.props.navigation.state.routes;
    this.props.navigation.navigate(selectedRoute.routeName);
  };

  render(): React.ReactNode {
    const { homeIcon, chartIcon, myPageIcon, emotionIcon } = this;
    return (
      <BottomNavigation
        style={styles.bottomNavigation}
        indicatorStyle={styles.indicator}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}
      >
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="Emotion"
          icon={emotionIcon}
        />
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="Home"
          icon={homeIcon}
        />
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="Chart"
          icon={chartIcon}
        />
        <BottomNavigationTab
          style={styles.tab}
          titleStyle={styles.tabTitle}
          title="MyPage"
          
          icon={myPageIcon}
        />
      </BottomNavigation>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Category: CategoryStack,
    Home: HomeStack,
    Chart: ChartStack,
    Mypage: UserStack,
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: BottomNavigationShowcase,
  }
);

const Total = createSwitchNavigator(
  {
    Splash,
    Auth: AuthStack,
    App: TabNavigator,
  },
  { initialRouteName: 'Splash' }
);

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: '#000',
    paddingTop: 10,
    paddingBottom: 15,
  },
  indicator: { backgroundColor: '#33f' },
  tab: { backgroundColor: '#000' },
  tabTitle: {
    color: '#ddd',
  },
});

export default createAppContainer(Total);
