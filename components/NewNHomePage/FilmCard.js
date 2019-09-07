import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export class FilmCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.cardSize}>
                <Image source={{ uri: this.props.url }} style={styles.imageSize}></Image>
                <View style={styles.titleBlock}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardSize: {
        width: (Layout.width / 3) - 8,
        height: (Layout.height / 3) - 8,
        borderRadius: 10,
        paddingLeft: 4,
        paddingTop: 4,
        paddingRight: 4,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    imageSize: {
        height: 156.5,
        // height: (Layout.height / 2.75),        
        width: (Layout.width / 3) - 18,
        borderRadius: 5
    },
    titleBlock: {
        flex: 1, 
        height: 40,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleText: {
        color: '#f2f2f2',
        fontSize: 12,
        flexWrap: 'wrap',
        fontFamily: 'arial',
        letterSpacing: .3,
    }
});
