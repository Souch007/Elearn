import React, { Component } from 'react';
import { FlatList, View, } from 'react-native';
import { styles, itemStyles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import GV from '../../utils/GV';
import genericFunctions from '../../helper/genericFunctions';
import CardBox from '../../appComponents/CardBox';
import { IMLocalized } from '../../locales/IMLocalization';
import ReadMoreText from '../../components/ReadMoreText';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const STATIC_ANSWER_DATA = [{
    id: genericFunctions.guidGenerator(),
    question: `Kept in sent gave feel will oh it we. Has pleasure procured men laughing shutters nay. Old insipidity motionless continuing law shy partiality. Depending acuteness dependent eat use dejection. Unpleasing astonished discovered not nor shy. Morning hearted now met yet beloved evening. Has and upon his last here must. `,
    urdu_question: `بھیجے گئے احساس کو اوہ رکھے گا۔ خوشی خوشی ہے مردوں بند ہنستے نہیں پرانا غلاظت غیر منقول تسلسل کے قانون میں شرمناک تعصب ہے۔ منحصر سختی پر انحصار کھانے کے استعمال میں تعطل. ناخوشگوار حیرت ہوئی اور نہ ہی شرمیلی۔ صبح کی دل سے ابھی پیاری شام سے ملاقات ہوئی۔ یہاں اور اس کے آخری وقت پر ہونا ضروری ہے۔`,
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    urdu_answer: `بھیجے گئے احساس کو اوہ رکھے گا۔ خوشی خوشی ہے مردوں بند ہنستے نہیں پرانا غلاظت غیر منقول تسلسل کے قانون میں شرمناک تعصب ہے۔ منحصر سختی پر انحصار کھانے کے استعمال میں تعطل. ناخوشگوار حیرت ہوئی اور نہ ہی شرمیلی۔ صبح کی دل سے ابھی پیاری شام سے ملاقات ہوئی۔ یہاں اور اس کے آخری وقت پر ہونا ضروری ہے۔`,
}]

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: STATIC_ANSWER_DATA,
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
        const pageTitle = GV.isRTL ? `مختصر سوالات` : `Short Questions`;
        const { data, metaData } = this.state;
        return (
            <View style={styles.primaryContainer}>
                <CustomStatusbar />
                <CustomHeader
                    back
                    backPress={this.backPress}
                    rightIcon
                    showStepProgress={false} />



                <FlatList
                    data={data}
                    extraData={metaData}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderItem={this._renderItem} />
            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {
        return (
            <View style={itemStyles.primaryContainer}>
                <Text style={[itemStyles.heading, {
                    fontSize: FontSize.value(20),
                }]}>{IMLocalized(`Question`)} {index + 1}:</Text>

                <Text style={[itemStyles.text, {
                    fontSize: FontSize.value(14),
                }]}>{GV.isRTL ? item.urdu_question : item.question}</Text>

                <Text style={[itemStyles.answerTitle, {
                    fontSize: FontSize.value(18),
                }]}>{IMLocalized(`Answer`)}</Text>


                <ReadMoreText
                    textStyle={[itemStyles.answer, {
                        fontSize: FontSize.value(12),
                    }]}
                    numberOfLines={5}>
                    {GV.isRTL ? item.urdu_answer : item.answer}
                </ReadMoreText>
            </View>
        )
    }

}//end of CLASSS index