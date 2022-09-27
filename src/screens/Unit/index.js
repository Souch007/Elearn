import React, { Component } from 'react';
import { Dimensions, FlatList, View, } from 'react-native';
import { styles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import CardBox from '../../appComponents/CardBox';
import genericFunctions from '../../helper/genericFunctions';
import GV from '../../utils/GV';
import ROUTES from "../../routes/ROUTES";
import GetID from '../../helper/GetID';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";
const STATIC_UNIT_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: 'Textbook',
    urdu_title: 'درسی کتاب',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Videos',
    urdu_title: 'ویڈیوز',
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Quiz',
    urdu_title: 'کوئز',
}];


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitData: STATIC_UNIT_DATA,
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
        const { unitData, metaData } = this.state;
        let pageTitle = GetID.chapterDetailName();

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
                    data={unitData}
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
                onPress={() => { this.itemPress(index) }}
            />
        )
    }//end of _renderItem


    itemPress = (index) => {
        if (index === 0) {
            this.props.navigation.navigate(ROUTES.UnitTextbookList)
        } else if (index === 1) {
            this.props.navigation.navigate(ROUTES.Videos)
        } else if (index === 2) {
            this.props.navigation.navigate(ROUTES.Quiz)
        }
    }//end of itemPress

}//end of CLASSS index