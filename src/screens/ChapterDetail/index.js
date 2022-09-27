import React, { Component } from 'react';
import { Dimensions, FlatList, View, } from 'react-native';
import { styles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import CardBox from '../../appComponents/CardBox';
import genericFunctions from '../../helper/genericFunctions';
import GV from '../../utils/GV';
import ROUTES from '../../routes/ROUTES';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import { IMLocalized } from '../../locales/IMLocalization';
import IMTopicAPI from '../../controller/IMTopicAPI';
import GetID from '../../helper/GetID';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";
const STATIC_CHAPTER_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: 'Unit 1',
    urdu_title: 'یونٹ ۱',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Unit 2',
    urdu_title: 'یونٹ ۲',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Unit 3',
    urdu_title: 'یونٹ ۳',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Unit 4',
    urdu_title: 'یونٹ ۴',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Unit 5',
    urdu_title: 'یونٹ ۵',
}];


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapterData: [],
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
            chapter_id: GetID.chapterID(),
        };

        IMTopicAPI.get(param).then(res => {
            this.setState(prevState => ({
                chapterData: res.data,
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
        const { chapterData, metaData } = this.state;

        let pageTitle = GetID.chapterName();

        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background)
            }]}>
                <CustomStatusbar />
                <CustomHeader
                    back
                    backPress={this.backPress}
                    rightIcon />

                <Text style={[styles.heading, {
                    color: colors.get(ColorEnum.name.heading1),
                    fontSize: FontSize.value(20),
                }]}>{pageTitle}</Text>

                <FlatList
                    data={chapterData}
                    extraData={metaData}
                    renderItem={this._renderItem}
                    contentContainerStyle={styles.contentContainerStyle} />

                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />
            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {
        return (
            <CardBox
                title={item.title}
                minHeight={120}
                containerStyle={styles.itemContainerStyle}
                onPress={() => {
                    GV.chapterDetail = item;
                    this.props.navigation.navigate(ROUTES.Unit)
                }}
            />
        )
    }//end of _renderItem

}//end of CLASSS index