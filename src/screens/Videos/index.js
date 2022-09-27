import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, } from 'react-native';
import { styles, itemStyles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import GV from '../../utils/GV';
import genericFunctions from '../../helper/genericFunctions';
import FastImage from 'react-native-fast-image';
import LocalAssets from '../../constants/LocalAssets';
import GetID from '../../helper/GetID';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import { IMLocalized } from '../../locales/IMLocalization';
import IMVideoAPI from "../../controller/IMVideoAPI";
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import ColorEnum from '../../constants/ColorEnum';
import colors from '../../constants/colors';
import ENV from '../../utils/ENV';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const STATIC_VIDEO_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: '',
    urdu_title: '',
    thumbnail: '',
}, {
    id: genericFunctions.guidGenerator(),
    title: '',
    urdu_title: '',
    thumbnail: '',
}, {
    id: genericFunctions.guidGenerator(),
    title: '',
    urdu_title: '',
    thumbnail: '',
}, {
    id: genericFunctions.guidGenerator(),
    title: '',
    urdu_title: '',
    thumbnail: '',
}];

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: [],
            metaData: false,

            loading: false,
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    startLoading = () => { this.setState({ loading: true }) };
    stopLoading = () => { this.setState({ loading: false }) };

    componentDidMount = async () => {
        this.load();

    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
    }//end of COMPONENT_WILL_UNMOUNT

    load = () => {
        this.startLoading();
        const param = {
            topic_id: GetID.chapterDetailID(),
        };
        IMVideoAPI.get(param).then(res => {

            this.setState(prevState => ({
                videoData: res.data,
                metaData: !prevState.metaData,
            }))
            this.stopLoading();
        }).catch(() => {
            this.stopLoading();
        })
    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        const name = GetID.chapterDetailName();
        const pageTitle = GV.isRTL ? `${name} ویڈیوز` : `${name} Videos`;
        const { videoData, metaData } = this.state;
        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background)
            }]}>
                <CustomStatusbar />

                <CustomHeader
                    back
                    backPress={this.backPress}
                    rightIcon
                    showStepProgress={false} />

                <Text style={[styles.heading, {
                    color: colors.get(ColorEnum.name.heading1),
                    fontSize: FontSize.value(20),
                }]}>{pageTitle}</Text>

                <FlatList
                    data={videoData}
                    extraData={metaData}
                    renderItem={this._renderItem}
                    contentContainerStyle={styles.contentContainerStyle} />

                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />
            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {

        if (Platform.OS === "ios") {
            return (
                <View style={itemStyles.ytPrimaryContainer}>
                    <YouTube
                        apiKey={ENV.YOUTUBE_API}
                        videoId={item.videoID}

                        style={[styles.videoYoutube, {
                            borderColor: colors.get(ColorEnum.name.textinputBorder),
                            borderWidth: 1,
                        }]}
                    />
                </View>
            )
        }

        return (
            <TouchableOpacity style={[itemStyles.primaryContainer, {
                borderColor: colors.get(ColorEnum.name.textinputBorder),
                borderWidth: 1,
            }]}
                onPress={() => this.itemPress(item, index)}>
                <FastImage
                    source={{ uri: item.thumbnail }}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={{
                        height: 180,
                        width: "100%",
                    }} />
                <View style={itemStyles.playIconContainer}>
                    <FastImage
                        source={LocalAssets.ICON.play}
                        style={itemStyles.playIcon}
                        resizeMode={FastImage.resizeMode.contain} />
                </View>
            </TouchableOpacity>
        )
    }//end of _renderItem

    itemPress = async (item, index) => {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: ENV.YOUTUBE_API,
            videoId: `${item.videoID}`,
            autoplay: true,
            startTime: 0,
            lightboxMode: true
        })
            .then(() => console.log('Standalone Player Exited'))
            .catch(errorMessage => console.error(errorMessage));
    }//end of itemPress

}//end of CLASSS index