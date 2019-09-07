import React, { Component } from 'react';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';

export default class TabBarIcon extends Component {
    render() {
        return (
            <Icon
                name={this.props.name}
                size={26}
                color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}
