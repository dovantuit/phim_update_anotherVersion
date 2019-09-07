import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    Touchable,
    TouchableOpacity,
    View,
    Alert,
    TextInput,
    RefreshControl,
    ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, SearchBar } from 'react-native-elements';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import { MonoText } from '../components/StyledText';
import { FilmCard } from '../components/NewNHomePage/FilmCard';
import { BackgroundImage } from '../components/BackgroundImage'

import querystring from 'querystring';

import callApi from '../modules/apiCaller';

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            pageNumber: 1,
            refreshing: false,
            isPressing: Boolean,
            tempKey: '',
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 }),
            dataSourceFilms: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
        };
        this.getCategories = this.getCategories.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh() {
        this.setState({ refreshing: true, pageNumber: 1, isPressing: false });
        this.getCategories().then(res => {
            arr = res.data
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(arr)
            })
            this.setState({ refreshing: false });
        });
    }

    _loadMoviesByKey(value) {
        this.setState({ textValue: value.name, refreshing: true, isPressing: true, tempKey: value.key });
        this.getFilmsByKey(value.key).then(res => {
            arr = res.data
            this.setState({
                dataSourceFilms: this.state.dataSourceFilms.cloneWithRows(arr)
            })
            console.log(arr);
            this.setState({ refreshing: false });
        });
    }


    _handleInput(text) {
        this.setState({ textValue: text, refreshing: true, isPressing: false, tempKey: text });
        this.searchFilmsByKeyword(text).then(res => {
            arr = res.data
            this.setState({
                dataSourceFilms: this.state.dataSourceFilms.cloneWithRows(arr)
            })
            console.log(arr);
            this.setState({ refreshing: false });
        });
    }

    inputText(text) {
        this.setState({ textValue: text });
    }


    getCategories() {
        return new Promise((resolve, reject) => {
            callApi(
                'cm/gr_v2',
                'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}"
                })
            ).then(res => {
                resolve(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    _onEndReachedFilmsByKeyword(keyword) {
        callApi(
            'm/s',
            'post',
            querystring.stringify({
                device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                page_index: (this.state.pageNumber + 1),
                keyword: String(keyword)
            })
        ).then(res => {
            if (res.data.length != 0) {
                arr = arr.concat(res.data);
                this.setState({
                    dataSourceFilms: this.state.dataSource.cloneWithRows(arr),
                    pageNumber: this.state.pageNumber + 1
                })
            } else {
                console.log('Hết phim');
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

    _onEndReachedFilmsByKey(key) {
        callApi(
            'm/s',
            'post',
            querystring.stringify({
                device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                page_index: (this.state.pageNumber + 1),
                key: String(key)
            })
        ).then(res => {
            if (res.data.length != 0) {
                arr = arr.concat(res.data);
                this.setState({
                    dataSourceFilms: this.state.dataSource.cloneWithRows(arr),
                    pageNumber: this.state.pageNumber + 1
                })
            } else {
                console.log('Hết phim');
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

    getFilmsByKey(key) {
        return new Promise((resolve, reject) => {
            callApi(
                'm/gr_v2',
                'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                    page_index: this.state.pageNumber,
                    key: String(key)
                })
            ).then(res => {
                resolve(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    searchFilmsByKeyword(keyword) {
        return new Promise((resolve, reject) => {
            callApi(
                'm/s',
                'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                    page_index: this.state.pageNumber,
                    keyword: String(keyword)
                })
            ).then(res => {
                resolve(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    _getFilmInfo(key) {
        return new Promise((resolve, reject) => {
            callApi(
                'm/dt',
                'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                    key: String(key)
                })
            ).then(res => {
                resolve(res);
                console.log(res);
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
                prevPage: 'Search',
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
        const textValue = this.state.textValue;
        if (textValue == '') {
            view = <ListView
                style={styles.columnView}
                contentContainerStyle={[styles.contentContainer]}
                dataSource={this.state.dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                renderHeader={() =>
                    <View style={styles.cateHeaderBlock}>
                        <Text style={styles.cateHeader}>Your Films</Text>
                    </View>
                }
                renderRow={(rowData) =>
                    <View style={styles.cateTextBlock}>
                        <Text style={styles.cateText} onPress={() => this._loadMoviesByKey(rowData)}>{rowData.name}</Text>
                    </View>
                }
            />
        } else {
            view = <ListView
                style={styles.scrollview}
                contentContainerStyle={[styles.contentContainer]}
                dataSource={this.state.dataSourceFilms}
                onEndReached={this.isPressing ? () => this._onEndReachedFilmsByKey(this.tempKey) : () => this._onEndReachedFilmsByKeyword(this.tempKey)}
                onEndReachedThreshold={5}
                renderRow={(rowData) =>
                    <TouchableHighlight style={styles.touchable} onPress={() => this._goFilmDetails(rowData.key)}>
                        <FilmCard url={rowData.imagePosterUrl} title={rowData.title} />
                    </TouchableHighlight>
                }
            />
        }

        return (
            <BackgroundImage>
                <View style={styles.container}>
                    <SearchBar
                        containerStyle={styles.searchBlock}
                        darkTheme
                        value={this.state.textValue}
                        onChangeText={(text) => this.inputText(text)}
                        onSubmitEditing={(event) => this._handleInput(event.nativeEvent.text)}
                        inputStyle={Colors.normalText}
                        placeholder='Type Here...' />
                    <View style={styles.cateBlock}>
                        {view}
                    </View>
                </View >
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    searchBlock: {
        width: '100%',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        color: Colors.normalText,
        fontSize: 16,
    },
    columnView: {
        flex: 1,
        flexDirection: 'column'
    },
    scrollview: {
        flex: 1,
        flexDirection: 'column',
        zIndex: 5
    },
    contentContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    cateBlock: {
        flex: 1,
        flexDirection: 'row'
    },
    cateHeaderBlock: {
        // flex: 1,
        width: '100%',
        padding: 5,
        height: 35,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    cateHeader: {
        color: Colors.normalText,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 15,
    },
    cateTextBlock: {
        // flex: 1,
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    cateText: {
        color: Colors.normalText,
        fontSize: 16,
        textAlign: 'center',
        textShadowColor: '#ccc'
    },
    touchable: {
        width: '31%',
        margin: 4,
    },
});

export default SearchScreen;