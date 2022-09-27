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
import IMSubjectAPI from '../../controller/IMSubjectAPI';
import GetID from '../../helper/GetID';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import Empty from '../../appComponents/Empty';
import { IMLocalized } from '../../locales/IMLocalization';
import IMTopicAPI from '../../controller/IMTopicAPI';
import IMChapterAPI from '../../controller/IMChapterAPI';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";
const STATIC_SUBJECT_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: 'Maths 1',
    urdu_title: 'ریاضی ۱'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Maths 2',
    urdu_title: 'ریاضی ۲'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Maths 3',
    urdu_title: 'ریاضی ۳'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Maths 4',
    urdu_title: 'ریاضی ۴'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Maths 5',
    urdu_title: 'ریاضی ۵'
}];


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectDetailData: [],
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
            subject_id: GetID.subjectID(),
        };

        IMChapterAPI.get(param).then(res => {
            this.setState(prevState => ({
                subjectDetailData: res.data,
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
        const { subjectDetailData, metaData } = this.state;
        let pageTitle = GetID.subjectName();

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


                {subjectDetailData.length < 1 && !this.state.loading ?
                    <Empty center />
                    :
                    <FlatList
                        data={subjectDetailData}
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
                height={40}
                minHeight={40}
                containerStyle={styles.itemContainerStyle}
                onPress={() => {
                    GV.subjectDetail = item;
                    this.props.navigation.navigate(ROUTES.Chapter);
                }}
            />
        )
    }//end of _renderItem

}//end of CLASSS index