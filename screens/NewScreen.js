import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Alert,
    RefreshControl,
    ListView
} from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import { MonoText } from '../components/StyledText';
import { FilmCard } from '../components/NewNHomePage/FilmCard';
import { BackgroundImage } from '../components/BackgroundImage';
import { Loading, LoadingElement } from '../components/Loading';
import querystring from 'querystring';

import callApi from '../modules/apiCaller';

class NewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            refreshing: false,
            isLoading: false,
            isLoadingElement: false,
            filmInfo: {},
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
        };
        this.getMovies = this.getMovies.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._goFilmDetails = this._goFilmDetails.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh() {
        this.setState({ refreshing: true, isLoading: true });
        this.getMovies().then(res => {
            arr = res.data
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(arr)
            })
            this.setState({ refreshing: false, isLoading: false });
        });
    }

    getMovies() {
        return new Promise((resolve, reject) => {
            callApi('m/ls', 'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                    page_index: this.state.pageNumber
                })
            ).then(res => {
                resolve(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    _onEndReached() {
        this.setState({ isLoadingElement: true });
        callApi('m/ls', 'post',
            querystring.stringify({
                device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                page_index: (this.state.pageNumber + 1)
            })
        ).then(res => {
            if (res.data.length != 0) {
                arr = arr.concat(res.data);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(arr),
                    pageNumber: this.state.pageNumber + 1,
                })
                console.log(arr);
            } else {
                // Alert.alert('Thông báo',
                //     'Hiện tại chúng tôi chỉ có bấy nhiêu đây phim thôi!',
                //     [
                //         { text: 'OK', onPress: () => console.log('Ok Pressed') }
                //     ])
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    _getFilmInfo(key) {
        return new Promise((resolve, reject) => {
            callApi('m/dt', 'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                    key: String(key)
                })
            ).then(res => {
                resolve(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    _goFilmDetails(key) {
        this._getFilmInfo(key).then(res => {
            obj = res.data;
            this.setState({
                filmInfo: obj
            });
            this.setState({ refreshing: false });
            // console.log(this.state.filmInfo);
            // console.log(this.state.filmInfo.imagePosterUrl)
            return this.props.navigation.navigate('Details', {
                prevPage: 'New',
                key: this.state.filmInfo.key,
                imageBackdropUrl: this.state.filmInfo.imageBackdropUrl,
                imageUrl: this.state.filmInfo.imagePosterUrl,
                title: this.state.filmInfo.title,
                year: this.state.filmInfo.year,
                imdb: this.state.filmInfo.imdb,
                duration: this.state.filmInfo.duration,
                genres: this.state.filmInfo.genres,
                desc: this.state.filmInfo.desc,
                newactors: this.state.filmInfo.newactors,
                videoId: this.state.filmInfo.trailer
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />
        } else {
            return (
                <BackgroundImage>
                    <View style={styles.container}>
                        <ListView
                            style={styles.scrollview}
                            contentContainerStyle={[styles.contentContainer]}
                            dataSource={this.state.dataSource}
                            onEndReached={this._onEndReached.bind(this)}
                            onEndReachedThreshold={5}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            renderRow={(rowData) =>
                                < TouchableHighlight style={styles.touchable} onPress={() => this._goFilmDetails(rowData.key)}>
                                    <FilmCard url={rowData.imagePosterUrl} title={rowData.title} />
                                </TouchableHighlight>

                            }
                        />
                    </View >
                </BackgroundImage>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 2,
    },
    scrollview: {
        flex: 1,
        flexDirection: 'column',
        zIndex: 5
    },
    contentContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    touchable: {
        width: '31%',
        margin: 4
    }
});

export default NewScreen;