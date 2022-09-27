import React, { Component } from 'react';
import { ScrollView, View, } from 'react-native';
import { styles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import GV from '../../utils/GV';
import CardBox from '../../appComponents/CardBox';
import { IMLocalized } from '../../locales/IMLocalization';
import ROUTES from '../../routes/ROUTES';
import AppEnum from '../../helper/AppEnum';
import appFunctions from '../../helper/appFunctions';
import IMGeneralQuizManager from '../../controller/IMGeneralQuizManager';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
import { emptyValidate } from '../../helper/genericFunctions';
import GradientButton from '../../appComponents/GradientButton';
//end of IMPORT's

export default class index extends Component {

    getPdfLink = () => {
        const { quiz } = this.props.route.params;
        if ("pdfLink" in quiz) {
            if (emptyValidate(quiz.pdfLink)) {
                const linkWithoutDot = quiz.pdfLink.replace(/\.+\//g, '');
                const link = linkWithoutDot.replace(/http:\/\//g, 'https://');
                return link;
            } else {
                return '';
            }
        }
        else {
            return '';
        }
    }//end of getPdfLink

    constructor(props) {
        super(props);
        this.state = {
            marks: 8,
            total: 10,
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    componentDidMount = async () => {
        const { result } = this.props.route.params;

        this.setState({
            marks: result.quizUserScore.scored,
            total: result.quizUserScore.totalMarks,
        })

    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
    }//end of COMPONENT_WILL_UNMOUNT

    load = () => {

    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    retakePress = async () => {
        const { isGeneral, quiz } = this.props.route.params;
        quiz["quizStatus"] = AppEnum.QUIZ_STATUS.inProgress;
        quiz["currentQusId"] = 1;
        quiz["currentQusID"] = 1;
        quiz["status"] = "In Progress";

        quiz["quizResult"] = [];
        quiz["quizUserScore"] = { totalMarks: quiz.quizUserScore.totalMarks, scored: 0 };
        const userID = await appFunctions.userID();

        const newParam = {
            userID: userID,
            quizSessionId: quiz.quizSessionId,
            quizStatus: AppEnum.QUIZ_STATUS.inProgress,
            currentQusId: 1,
            quizType: quiz.quizType,
            quizResult: JSON.stringify(quiz.quizResult),
            quizUserScore: JSON.stringify(quiz.quizUserScore),
        }
        IMGeneralQuizManager.update(newParam).then(res => {
            console.log('res', res);
        }).catch(e => {
        });



        this.props.navigation.replace(ROUTES.MCQ, {
            isGeneral: isGeneral,
            quiz: quiz,

            isFromAllQuiz: true,
            allQuizItem: { quizType: quiz.quizType, quizId: quiz.quizId },

            resetAll: true,
        })
    }//end of retakePress

    viewPdfPress = () => {
        const pdfLink = this.getPdfLink();
        if (pdfLink !== '') {
            const { quiz } = this.props.route.params;

            this.props.navigation.navigate(ROUTES.UnitTextbook, {
                item: {
                    "id": quiz.id,
                    "title": "",
                    "languageType": "english",
                    "path": pdfLink,
                    "topicID": "",
                    "createdAt": new Date().getTime(),
                    "updatedAt": new Date().getTime(),
                },
                showShared: true,
            })
        }
    }//end of viewPdfPress

    render = () => {
        let pageTitle = GV.isRTL ? 'نتیجہ' : 'Result';
        const { marks, total } = this.state;
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

                <View style={[styles.headingContainer]}>
                    <Text style={[styles.heading, {
                        color: colors.get(ColorEnum.name.heading1),
                        fontSize: FontSize.value(20),
                    }]}>{pageTitle}</Text>

                    {this.getPdfLink() !== '' &&
                        <View style={[styles.viewPdfButtonContainer]}>
                            <GradientButton
                                title={IMLocalized(`View Pdf`)}
                                onPress={this.viewPdfPress} />
                        </View>
                    }
                </View>

                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.body}>
                    <Text style={[styles.marksText, {
                        fontSize: FontSize.value(80),
                    }]}>{marks}</Text>
                    <View style={styles.separate} />
                    <Text style={[styles.totalText, {
                        fontSize: FontSize.value(80),
                    }]}>{total}</Text>

                    <CardBox
                        title={IMLocalized(`Retake`)}
                        width={"70%"}
                        height={45}
                        minHeight={45}
                        onPress={() => { this.retakePress() }}
                    />
                </ScrollView>
            </View>
        );
    }//end of RENDER

}//end of CLASSS index