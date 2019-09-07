import React from 'react';
import { Platform } from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import NewScreen from '../screens/NewScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FilmDetailsScreen from '../screens/FilmDetailsScreen';

const NewStack = createStackNavigator({
    New: NewScreen
});

NewStack.navigationOptions = {
    tabBarLabel: 'New',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='star'
        />
    ),
    tabBarOptions: {
        showLabel: true,
        inactiveBackgroundColor: "rgb(54,54,60)",
        activeBackgroundColor: "rgb(54,54,60)"
    },
};

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='home'
        />
    ),
    tabBarOptions: {
        showLabel: true,
        inactiveBackgroundColor: "rgb(54,54,60)",
        activeBackgroundColor: "rgb(54,54,60)"
    },
};

const SearchStack = createStackNavigator({
    Search: SearchScreen
});

SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='search'
        />
    ),
    tabBarOptions: {
        showLabel: true,
        inactiveBackgroundColor: "rgb(54,54,60)",
        activeBackgroundColor: "rgb(54,54,60)"
    },
};

export default createBottomTabNavigator({
    New: NewStack,
    Home: HomeStack,
    Seach: SearchStack
});
