import React, { Component } from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { BackgroundImage } from '../components/BackgroundImage';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export class Loading extends Component {
    state = { animating: true }
    render() {
        const animating = this.state.animating;
        return (
            <BackgroundImage>
                <View style={styles.container}>
                    <ActivityIndicator animating={animating} size='large' color='#fff' />
                </View>
            </BackgroundImage>
        )
    }
}

export class LoadingElement extends Component {
    state = { animating: true }
    render() {
        const animating = this.state.animating;
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <ActivityIndicator animating={animating} size="large" color={Colors.tintColor} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    }
})
