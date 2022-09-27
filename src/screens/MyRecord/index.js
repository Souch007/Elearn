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
import { IMLocalized } from '../../locales/IMLocalization';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";
const STATIC_SUBJECT_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: `List of Quizzess`,
    urdu_title: "کوئزیس کی فہرست",
}, {
    id: genericFunctions.guidGenerator(),
    title: `Thursday 12:34 - Urdu`,
    urdu_title: `جمعرات ۱۲:۳۴ ۔ اردو`,
}, {
    id: genericFunctions.guidGenerator(),
    title: `Short Question`,
    urdu_title: `مختصر سوال`,
}, {
    id: genericFunctions.guidGenerator(),
    title: `Long Question`,
    urdu_title: `لمبا سوال`,
}];


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectData: STATIC_SUBJECT_DATA,
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
        const { subjectData, metaData } = this.state;
        let pageTitle = IMLocalized(`My Record`);

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
                    data={subjectData}
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
                height={40}
                minHeight={40}
                containerStyle={styles.itemContainerStyle}
                onPress={() => { this.props.navigation.navigate(ROUTES.SubjectDetail) }}
            />
        )
    }//end of _renderItem

}//end of CLASSS index