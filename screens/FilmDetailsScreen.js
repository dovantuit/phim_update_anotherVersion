import React, { Component } from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ImageBackground,
    ScrollView,
    Image,
    AsyncStorage,
    Platform,
    WebView
} from 'react-native';

import { BackgroundImage } from '../components/BackgroundImage';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import YouTube, { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { Loading, LoadingElement } from '../components/Loading';

import callApi from '../modules/apiCaller';
import querystring from 'querystring';
import Aes256Cipher from '../modules/Aes256CipherModule';

class FilmDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'AIzaSyBUF7furoXl72kHtAu8LEGm8zZAvsAn3uY',
            isPlaying: true,
            signature: 'aIit3L62ppCzz0EEtCUjQCYB8A975zPJ0KW5G3cIPxA9eDI-vj60GWoOV42lAJSC',
            secretKey: 'b3af409bb8423187c75e6c7f5b683908',
            encryptDatas: [],
            readyFilm: {},
            readyUrl: ''
        };
        this.containsObjInArrToAdd = this.containsObjInArrToAdd.bind(this);
        this._loadYourFilms = this._loadYourFilms.bind(this);
        this._storeYourFilms = this._storeYourFilms.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    // componentDidMount() {
    //     if(this._loadYourFilms.bind(this) !=)
    // }

    backToNewScreen() {
        const prevPage = this.props.navigation.getParam('prevPage', 'NO-PREVPAGE');
        switch (prevPage) {
            case 'New': this.props.navigation.navigate('New'); break;
            case 'Home': this.props.navigation.navigate('Home'); break;
            case 'Search': this.props.navigation.navigate('Search'); break;
        }
    }

    containsObjInArrToAdd(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === obj.key) {
                return false;
            }
        }
        return true;
    }

    _storeYourFilms = async (obj) => {
        var filmsArr = this._loadYourFilms();
        if (this.containsObjInArrToAdd(obj, filmsArr)) {
            filmsArr.push({
                key: obj.key,
                imageUrl: obj.imageUrl,
                title: obj.title
            })
        }
        console.log(filmsArr);
        return await AsyncStorage.setItem('0c1eef1d-fb77-45e5-a262-36c611021f16', filmsArr);
    }

    _loadYourFilms = async () => {
        if (await AsyncStorage.getItem('0c1eef1d-fb77-45e5-a262-36c611021f16') != null) {
            return await AsyncStorage.getItem('0c1eef1d-fb77-45e5-a262-36c611021f16') || [];
        }
    }

    _getEncryptData(key) {
        return new Promise((resolve, reject) => {
            callApi(
                'm/str',
                'post',
                querystring.stringify({
                    device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
                    key: String(key),
                    signature: this.state.signature
                })
            ).then(res => {
                resolve(res);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }


    _playVideo(key, resolution) {
        this._getEncryptData(key).then(res => {
            arr = res.data;
            this.setState({
                encryptDatas: arr
            });
            this.state.encryptDatas.map(data => {
                if (data.resolution == resolution) {
                    this.setState({ readyFilm: data, readyUrl: data.url });
                }
            })
            // this.setState({ refreshing: false });
            console.log(this.state.readyFilm);
            this.setState({ readyUrl: Aes256Cipher.encryptBase64(this.state.readyUrl, this.state.secretKey) });
            console.log(this.state.readyUrl);
        }).catch(err => {
            console.log(err);
        })
    }

    //Nhận 1 props đối tượng film
    render() {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        const key = navigation.getParam('key', 'NO-KEY');
        const imageBackdropUrl = navigation.getParam('imageBackdropUrl', 'NO-BDIMG');
        const imageUrl = navigation.getParam('imageBackdropUrl', 'NO-IMG');
        const title = navigation.getParam('title', 'NO-TITLE');
        const year = navigation.getParam('year', 'NO-YEAR');
        const imdb = navigation.getParam('imdb', 'NO-IMDB');
        const duration = navigation.getParam('duration', 'NO-DURATION');
        const genres = navigation.getParam('genres', 'NO-GENRES');
        const desc = navigation.getParam('desc', 'NO-DESC');
        const newactors = navigation.getParam('newactors', 'NO-ACTORS');
        const videoId = navigation.getParam('videoId', 'NO-VIDEOID');

        var genresStr = [];
        for (let data of genres) {
            genresStr.push(data.name)
        }
        if (this.state.isLoading) {
            return <Loading />
        } else {
            return (
                <BackgroundImage>
                    <ScrollView style={styles.container}>
                        <TouchableHighlight style={styles.trailerBlock} onPress={() => {
                            YouTubeStandaloneAndroid.playVideo({
                                apiKey: this.state.apiKey,
                                videoId: videoId,
                                autoplay: true,
                                lightboxMode: false,
                                startTime: 0,
                            })
                                .then(() => console.log('Android Standalone Player Finished'))
                                .catch(errorMessage => this.setState({ error: errorMessage }))
                        }}>
                            <ImageBackground source={{ uri: String(imageBackdropUrl) || String('../assets/images/film_strip_with_images.jpg') }} style={styles.trailerBlockBg}>
                                <View style={styles.comBackBlock}>
                                    <Button icon={
                                        <Icon name='chevron-left' size={30} color='white' />}
                                        title=''
                                        buttonStyle={styles.comBackBtn}
                                        onPress={this.backToNewScreen.bind(this)}
                                    />
                                </View>
                                <View style={styles.likeBlock}>
                                    <Button icon={
                                        <Icon name='heart-o' size={55} color='white' />}
                                        title=''
                                        buttonStyle={styles.likeBtn}
                                    />
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>
                        <View styles={[styles.row, styles.titleBlock]}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.contentBlock}>
                            <Text style={styles.contentText}>{year}</Text>
                            <Text style={styles.contentText}>IMDB: {imdb}</Text>
                            <Text style={styles.contentText}>{duration} Minutes</Text>
                        </View>
                        <View styles={[styles.row, styles.genres]}>
                            <Text style={{ color: '#fff', fontSize: 13, marginLeft: 8 }}>{genresStr.join(',  ')}</Text>
                        </View>
                        <View style={styles.viewBlock}>
                            <Button title='View(5)' buttonStyle={styles.btn} titleStyle={{ fontSize: 13 }} />
                        </View>
                        <View style={styles.playBlock}>
                            <Button title=''
                                buttonStyle={styles.playBtn}
                                icon={
                                    <Icon name='play' size={15} color='white' />
                                }
                                onPress={() => this._playVideo(key, 720)}
                            />
                        </View>
                        <View style={styles.descBlock}>
                            <Text style={{ fontSize: 14, color: 'white' }}>{desc}</Text>
                        </View>
                        <ScrollView style={styles.actorsBlock} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actorsStyle}>
                            {newactors.map((item, i) =>
                                <View key={String(item.key)} style={styles.actorCard}>
                                    <Image source={{ uri: String(item.image[0]) }} style={styles.actorImg} />
                                    <Text style={styles.actorName}>{item.name}</Text>
                                </View>
                            )}
                        </ScrollView>
                        <View style={styles.functionBtnBlock}>
                            <Button title='SHARE' buttonStyle={styles.shareBtn} titleStyle={{ fontSize: 13 }} />
                            <Button title='RATE' buttonStyle={styles.btn} titleStyle={{ fontSize: 13 }} />
                        </View>
                    </ScrollView >
                    <YouTube
                        apiKey={this.state.apiKey}
                        // Un-comment one of videoId / videoIds / playlist.
                        // You can also edit these props while Hot-Loading in development mode to see how
                        // it affects the loaded native module
                        videoId={videoId}
                        // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
                        // playlistId="PLF797E961509B4EB5"
                        play={this.state.isPlaying}
                        loop={false}
                        fullscreen={true}
                        controls={1}
                        style={{ height: 0 }}
                    />
                </BackgroundImage>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    trailerBlock: {
        flex: 1,
        height: 200
    },
    trailerBlockBg: {
        flex: 1,
        width: null,
        height: 200,
    },
    comBackBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    comBackBtn: {
        backgroundColor: "rgba(0,0,0,0)",
        width: 55,
        height: 55,
        elevation: 0
    },
    likeBlock: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    likeBtn: {
        backgroundColor: "rgba(0,0,0,0)",
        width: 70,
        height: 70,
        elevation: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    titleBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5
    },
    title: {
        color: '#fff',
        fontSize: 20,
        paddingLeft: 10,
    },
    contentBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5
    },
    contentText: {
        color: '#fff',
        fontSize: 13,
        marginRight: 5,
        paddingLeft: 5,
    },
    genres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        paddingLeft: 10
    },
    viewBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    playBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    playBtn: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20,
        elevation: 0
    },
    descBlock: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'justify',
        paddingLeft: 10
    },
    actorsBlock: {
        flex: 1,
        flexDirection: 'row',
        height: 140
    },
    actorsStyle: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    actorCard: {
        width: 80,
        height: 130,
        margin: 10
    },
    actorImg: {
        width: 80,
        height: 80,
        borderRadius: 80
    },
    actorName: {
        width: 80,
        height: 50,
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    functionBtnBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    btn: {
        width: 80,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#03a9f4',
        elevation: 0
    },
    shareBtn: {
        width: 80,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#03a9f4',
        elevation: 0,
        marginRight: 10
    }
});

export default FilmDetailsScreen;