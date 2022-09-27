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
import GetID from '../../helper/GetID';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import Empty from '../../appComponents/Empty';
import { IMLocalized } from '../../locales/IMLocalization';
import IMChapterAPI from '../../controller/IMChapterAPI';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";
const STATIC_SUBJECT_DETAIL_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: 'Chapter 1\nIntroduction to Mathematics',
    urdu_title: 'باب 1 \n ریاضی کا تعارف',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Chapter 2\nSets',
    urdu_title: 'باب 2 \n سیٹیں',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Chapter 3\nMatrix',
    urdu_title: 'باب 3 \n میٹرکس',
}];


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectData: [],
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

    load = async () => {
        this.startLoading();
        const param = {
            chapter_id: GetID.subjectDetailID(),
        };


        IMChapterAPI.getSpecific(param).then(res => {
            this.setState(prevState => ({
                subjectData: res.data,
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
        const { subjectData, metaData } = this.state;
        // let pageTitle = GetID.subjectName();
        let pageTitle = IMLocalized(`Chapter Detail`);

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

                {subjectData.length < 1 && !this.state.loading ?
                    <Empty center />
                    :
                    <FlatList
                        data={subjectData}
                        extraData={metaData}
                        renderItem={this._renderItem}
                        contentContainerStyle={styles.contentContainerStyle} />
                }
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
                    GV.chapter = item;
                    this.props.navigation.navigate(ROUTES.ChapterDetail)
                }}
            />
        )
    }//end of _renderItem

}//end of CLASSS index