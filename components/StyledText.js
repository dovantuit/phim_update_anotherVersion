import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class MonoText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, {fontFamily: 'space-mono'}]}/>;
  }
}
