import { useTheme } from '@react-navigation/native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView, View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Box from '../../appComponents/CardBox';
import HorizontalList from '../../appComponents/HorizontalList';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusbar from '../../components/CustomStatusbar';
import Text from '../../components/Text';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import ColorEnum from '../../constants/ColorEnum';
import colors from '../../constants/colors';
import FontFamily from '../../constants/FontFamily';
import FontSize from '../../constants/FontSize';
import IMAllDataAPI from '../../controller/IMAllDataAPI';
import AppEnum from '../../helper/AppEnum';
import appFunctions from '../../helper/appFunctions';
import genericFunctions from '../../helper/genericFunctions';
import { IMLocalized } from '../../locales/IMLocalization';
import ROUTES from '../../routes/ROUTES';
import GV from '../../utils/GV';
import { styles } from './styles';
//end of IMPORT's

const STATIC_SUBJECT_DATA = [{
    id: genericFunctions.guidGenerator(),
    name: 'Physics',
    urdu_name: 'طبیعیات'
}, {
    id: genericFunctions.guidGenerator(),
    name: 'Chemistry',
    urdu_name: 'کیمسٹری'
}, {
    id: genericFunctions.guidGenerator(),
    name: 'Maths',
    urdu_name: 'ریاضی'
}, {
    id: genericFunctions.guidGenerator(),
    name: 'English',
    urdu_name: 'انگریزی'
}, {
    id: genericFunctions.guidGenerator(),
    name: 'Computer Sciene',
    urdu_name: 'کمپیوٹر سائنس'
}];

const STATIC_GRADE_DATA = [{
    id: genericFunctions.guidGenerator(),
    name: '1',
    urdu_name: '١',
}, {
    id: genericFunctions.guidGenerator(),
    name: '2',
    urdu_name: '٢',
}, {
    id: genericFunctions.guidGenerator(),
    name: '3',
    urdu_name: '٣',
}, {
    id: genericFunctions.guidGenerator(),
    name: '4',
    urdu_name: '٤',
}, {
    id: genericFunctions.guidGenerator(),
    name: '5',
    urdu_name: '٥',
}, {
    id: genericFunctions.guidGenerator(),
    name: '6',
    urdu_name: '٦',
}];

const STATIC_SCHOOL_DATA = [{
    id: genericFunctions.guidGenerator(),
    name: 'Grammer',
    urdu_name: 'گرائمر',
}, {
    id: genericFunctions.guidGenerator(),
    name: 'Siddique',
    urdu_name: 'صدیق',
}, {
    id: genericFunctions.guidGenerator(),
    name: 'City',
    urdu_name: 'سٹی',
}]
export default class Selection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjectData: [],

            gradeData: [],

            schoolData: [],

            quizData: [{
                id: 1,
                name: IMLocalized("MCQ's"),
            }, {
                id: 2,
                name: IMLocalized("Long"),
            }, {
                id: 3,
                name: IMLocalized("Short"),
            }],

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
        IMAllDataAPI.getAllData().then(res => {
            this.setState({
                subjectData: res.subjectData,
                gradeData: res.gradeData,
                schoolData: res.schoolData,
            })
            this.stopLoading();
        }).catch(err => {
            this.stopLoading();
        });

    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {


        const { subjectData, gradeData, schoolData, quizData } = this.state;
        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background),
            }]}>
                <CustomStatusbar />
                <CustomHeader rightIcon showStepProgress={false} />
                <ScrollView>
                    <Text style={[styles.heading, {
                        color: colors.get(ColorEnum.name.heading1),
                        fontSize: FontSize.value(20),
                    }]}>{IMLocalized(`TOP SUBJECTS`)}</Text>
                    <HorizontalList
                        data={subjectData}
                        renderItem={(item, index, boxWidth) => { return this._renderItem(item, index, boxWidth, "subject") }}
                    />

                    <Text style={[styles.heading, {
                        color: colors.get(ColorEnum.name.heading1),
                        fontSize: FontSize.value(20),
                    }]}>{IMLocalized(`SELECT A GRADE`)}</Text>
                    <HorizontalList
                        data={gradeData}
                        renderItem={(item, index, boxWidth) => { return (this._renderItem(item, index, boxWidth, "grade")) }}
                    />
                    <Text style={[styles.heading, {
                        color: colors.get(ColorEnum.name.heading1),
                        fontSize: FontSize.value(20),
                    }]}>{IMLocalized(`SCHOOLS`)}</Text>
                    <HorizontalList
                        data={schoolData}
                        renderItem={(item, index, boxWidth) => { return this._renderItem(item, index, boxWidth, "school") }} />

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.heading, {
                            color: colors.get(ColorEnum.name.heading1),
                            fontSize: FontSize.value(20),
                        }]}>{IMLocalized(`TAKE A QUIZ`)}</Text>

                        {/* <TouchableOpacity style={{
                            position: "absolute",
                            right: 20,
                        }}
                            onPress={() => { this.props.navigation.navigate(ROUTES.GeneralAllQuiz) }}>
                            <Text style={{
                                marginTop: 20,
                                marginBottom: 10,

                                color: colors.get(ColorEnum.name.primary),
                                fontSize: FontSize.value(18),
                                textAlign: "right",
                                fontStyle: "italic",
                            }}>{IMLocalized(`View all quizes`)}</Text>
                        </TouchableOpacity> */}
                    </View>

                    <HorizontalList
                        data={quizData}
                        renderItem={(item, index, boxWidth) => { return this._renderItem(item, index, boxWidth, "quiz") }} />
                </ScrollView>
                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />
            </View>
        );
    }//end of RENDER

    _renderItem = (item, index, boxWidth, type) => {
        let gradeNumber = { isNumeric: false };
        if (type === "grade") {
            gradeNumber = appFunctions.createGradeNumber(item.title);
        }
        return (
            <View>
                <Box
                    title={item.name}
                    minHeight={boxWidth}
                    minWidth={boxWidth}
                    widthAuto={true}
                    titleStyle={type === "grade" ? {
                        // fontSize: 60, 
                        fontSize: !gradeNumber.isNumeric ? 20 : 60,
                        fontFamily: FontFamily.Bold,
                    } : {
                        textTransform: "capitalize",
                    }}
                    onPress={() => { this.itemPress(item, index, type) }} />
            </View>
        )
    }//end of _renderItem

    itemPress = async (item, index, type) => {
        await GV.resetAll();
        if (type === "subject") {
            item["title"] = item.name;
            GV.subject = item;
            this.props.navigation.navigate(ROUTES.SubjectDetail);
        } else if (type === "grade") {
            item["title"] = item.name;
            GV.grade = item;
            this.props.navigation.navigate(ROUTES.Subject);
        } else if (type === "school") {
            GV.school = item;
            this.props.navigation.navigate(ROUTES.Grade);
        } else if (type === "quiz") {
            if (index === 0) {
                this.props.navigation.navigate(ROUTES.GeneralQuizCategory, { type: AppEnum.GENERAL_CATEGORY_TYPE.MCQ });
            } else {
                this.props.navigation.navigate(ROUTES.GeneralQuizCategory, { type: index === 2 ? AppEnum.GENERAL_CATEGORY_TYPE.Short : AppEnum.GENERAL_CATEGORY_TYPE.Long });
            }

        }
    }//end of itemPress

}//end of CLASSS index