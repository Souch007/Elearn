import React, { Component } from 'react';
import { ScrollView, View, } from 'react-native';
import { styles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import GV from '../../utils/GV';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import { IMLocalized } from '../../locales/IMLocalization';
import IMTextbookAPI from '../../controller/IMTextbookAPI';
import RNFetchBlob from 'rn-fetch-blob'
import PdfViewer from 'react-native-pdf';
import colors from '../../constants/colors';
import genericFunctions, { emptyValidate } from '../../helper/genericFunctions';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import GetID from '../../helper/GetID';
import GradientButton from '../../appComponents/GradientButton';
import Share from 'react-native-share';
//end of IMPORT's

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

            path: '',
            heading: '',
            loading: false,

            screenSize: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            },

        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    startLoading = () => { this.setState({ loading: true }) };
    stopLoading = () => { this.setState({ loading: false }) };

    componentDidMount = async () => {
        this.load();
        Dimensions.addEventListener('change', () => {
            const dim = Dimensions.get(Platform.OS === "ios" ? 'screen' : 'window');

            this.setState({
                screenSize: {
                    width: dim.width,
                    height: dim.height,
                },
            })
        });
    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
    }//end of COMPONENT_WILL_UNMOUNT

    load = async () => {
        this.startLoading();
        const { item } = this.props.route.params;
        if (emptyValidate(item)) {


            const gradeName = genericFunctions.removeAllSpaces(GetID.gradeName());
            const subjectName = genericFunctions.removeAllSpaces(GetID.subjectName());
            const title = genericFunctions.removeAllSpaces(item.title);

            const FILE_NAME = `${gradeName}-${subjectName}-${title}-ID${item.id}-topicID${item.topicID}`;
            const EXT = `.pdf`;

            const path = RNFetchBlob.fs.dirs.CacheDir + `/${FILE_NAME}${EXT}`;

            const file = await RNFetchBlob.fs.exists(path);

            if (file) {
                this.setState({
                    path: path,
                    heading: item.title,
                })
            } else {
                this.setState({
                    path: item.path,
                    heading: item.title,
                })
            }


            if (!file) {
                RNFetchBlob
                    .config({
                        IOSBackgroundTask: true,
                        overwrite: true,
                        fileCache: false,
                        indicator: true,
                        path,
                    })
                    .fetch('GET', item.path)
                    .uploadProgress({ interval: 250 }, (written, total) => {
                        console.log('uploaded', written / total)
                    })
                    // listen to download progress event, every 10%
                    .progress({ count: 10 }, (received, total) => {
                        console.log('progress', received / total)
                    })

                    .then((resp) => {
                        // the path of downloaded file
                        console.log(resp);
                    })
            }

            this.stopLoading();
        }

    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    onSharePress = () => {
        const { item } = this.props.route.params;
        const options = {
            title: IMLocalized(``),
            failOnCancel: false,
            urls: [item.path],
        };

        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }//end of onSharePress

    render = () => {
        const { heading } = this.state;
        const { showShared } = this.props.route.params;

        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background),
            }]}>
                <CustomStatusbar />
                <CustomHeader
                    back
                    backPress={this.backPress}
                    rightIcon
                    showStepProgress={false} />


                {/* ******************** HEADING Start ******************** */}
                <View style={[styles.headingContainer]}>
                    {emptyValidate(heading) ?
                        <Text style={[styles.heading, {
                            color: colors.get(ColorEnum.name.heading1),
                            fontSize: FontSize.value(20),
                        }]}>{heading}</Text>
                        :
                        <View />}

                    {showShared &&
                        <View style={styles.shareContainer}>
                            <GradientButton
                                title={IMLocalized(`Share`)}
                                onPress={this.onSharePress}
                            />
                        </View>
                    }

                </View>

                {/* ******************** HEADING End ******************** */}

                {emptyValidate(this.state.path) &&
                    <PdfViewer
                        source={{ uri: this.state.path, caches: true, }}
                        onLoadComplete={(numberOfPages, filePath) => {
                        }}
                        onPageChanged={(page, numberOfPages) => {
                        }}
                        onError={(error) => {
                            console.log(`ERROR `, error);
                        }}
                        onPressLink={(uri) => {
                        }}
                        enablePaging
                        horizontal
                        // scale={2.0}
                        enableRTL={GV.isRTL}
                        activityIndicatorProps={{
                            progressTintColor: colors.primary,
                        }}
                        style={[styles.pdf, {
                            backgroundColor: colors.get(ColorEnum.name.background),
                            width: this.state.screenSize.width,
                            height: this.state.screenSize.height,
                        }]} />
                }



                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />
            </View>
        );
    }//end of RENDER

}//end of CLASSS index