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
import AppEnum from "../../helper/AppEnum";
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";
const STATIC_QUIZ_DATA = [{
    id: 1,
    title: "MCQ's ",
    urdu_title: "ایم سی کیو ",
}, {
    id: 2,
    title: "Long ",
    urdu_title: "لمبا",
}, {
    id: 3,
    title: "Short ",
    urdu_title: "مختصر",
}];


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizData: STATIC_QUIZ_DATA,
            metaData: false,
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    componentDidMount = async () => {
        this.load();

    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
    }//end of COMPONENT_WILL_UNMOUNT

    load = () => {

    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        const { quizData, metaData } = this.state;
        let pageTitle = GV.isRTL ? 'کوئز' : 'Quiz';

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
                    data={quizData}
                    extraData={metaData}
                    renderItem={this._renderItem}
                    contentContainerStyle={styles.contentContainerStyle} />
            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {
        return (
            <CardBox
                title={GV.isRTL ? item.urdu_title : item.title}
                minHeight={120}
                containerStyle={styles.itemContainerStyle}
                onPress={() => { this.itemPress(item, index) }}
            />
        )
    }//end of _renderItem

    itemPress = (item, index) => {
        if (index === 0) {
            const newItem = {
                "id": "4",
                "orderNo": "3",
                "name": "English General",
                "image": "https://via.placeholder.com/150",
                "type": "MCQ",
                "createdAt": "2021-06-04 18:50:09",
                "updatedAt": "2021-06-04 19:44:09"
            }
            this.props.navigation.navigate(ROUTES.MCQ, {
                categoryItem: null,
                isGeneral: false,
                reloadData: null,
            })
        } else if (index === 1 || index === 2) {
            this.props.navigation.navigate(ROUTES.ShortQuestion, {
                isGeneral: false,
                type: index === 2 ? AppEnum.GENERAL_CATEGORY_TYPE.Short : AppEnum.GENERAL_CATEGORY_TYPE.Long,
                data: null,
            })
        }
    }//end of itemPress

}//end of CLASSS index