import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export class ClipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.cardSize}>
                <Image source={this.props.url} style={styles.imageSize}></Image>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardSize: {
        // width: ((Layout.width)*1.2 / 2),
        height: (Layout.height / 4),
        borderRadius: 10,
        padding: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center'
    },
    imageSize: {
        height: 100,
        // height: (Layout.height / 2.75),        
        width: ((Layout.width / 2) * 1.5),
        borderRadius: 5
    },
    title: {
        color: '#f2f2f2',
        height: ((Layout.height / 4) - 4)/10,
    }
});
