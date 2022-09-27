import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, } from 'react-native';
import { styles, itemStyles, headerStyles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import GV from '../../utils/GV';
import genericFunctions, { emptyValidate } from '../../helper/genericFunctions';
import CardBox from '../../appComponents/CardBox';
import { IMLocalized } from '../../locales/IMLocalization';
import ReadMoreText from '../../components/ReadMoreText';
import ROUTES from '../../routes/ROUTES';
import AppEnum from '../../helper/AppEnum';
import GetID from '../../helper/GetID';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import Empty from '../../appComponents/Empty';
import appFunctions from '../../helper/appFunctions';
import IMQuizAPI from '../../controller/IMQuizAPI';
import IMGeneralQuizManager from '../../controller/IMGeneralQuizManager';
import { ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import MultiTextinput from '../../appComponents/MultiTextinput';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import IMGeneralQuiz from '../../controller/IMGeneralQuiz';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const STATIC_QUESTION_DATA = [{
    id: genericFunctions.guidGenerator(),
    question: `Kept in sent gave feel will oh it we. Has pleasure procured men laughing shutters nay. Old insipidity motionless continuing law shy partiality. Depending acuteness dependent eat use dejection. Unpleasing astonished discovered not nor shy. Morning hearted now met yet beloved evening. Has and upon his last here must. `,
    urdu_question: `بھیجے گئے احساس کو اوہ رکھے گا۔ خوشی خوشی ہے مردوں بند ہنستے نہیں پرانا غلاظت غیر منقول تسلسل کے قانون میں شرمناک تعصب ہے۔ منحصر سختی پر انحصار کھانے کے استعمال میں تعطل. ناخوشگوار حیرت ہوئی اور نہ ہی شرمیلی۔ صبح کی دل سے ابھی پیاری شام سے ملاقات ہوئی۔ یہاں اور اس کے آخری وقت پر ہونا ضروری ہے۔`,
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

    answerData: [{
        id: genericFunctions.guidGenerator(),
        answer: `Kept in sent gave feel will oh it we. Has pleasure procured men laughing shutters nay. Old insipidity motionless continuing law shy partiality. Depending acuteness dependent eat use dejection. Unpleasing astonished discovered not nor shy. Morning hearted now met yet beloved evening. Has and upon his last here must. `,
        urdu_answer: `بھیجے گئے احساس کو اوہ رکھے گا۔ خوشی خوشی ہے مردوں بند ہنستے نہیں پرانا غلاظت غیر منقول تسلسل کے قانون میں شرمناک تعصب ہے۔ منحصر سختی پر انحصار کھانے کے استعمال میں تعطل. ناخوشگوار حیرت ہوئی اور نہ ہی شرمیلی۔ صبح کی دل سے ابھی پیاری شام سے ملاقات ہوئی۔ یہاں اور اس کے آخری وقت پر ہونا ضروری ہے۔`,
    }, {
        id: genericFunctions.guidGenerator(),
        answer: `Kept in sent gave feel will oh it we. Has pleasure procured men laughing shutters nay. Old insipidity motionless continuing law shy partiality. Depending acuteness dependent eat use dejection. Unpleasing astonished discovered not nor shy. Morning hearted now met yet beloved evening. Has and upon his last here must. `,
        urdu_answer: `بھیجے گئے احساس کو اوہ رکھے گا۔ خوشی خوشی ہے مردوں بند ہنستے نہیں پرانا غلاظت غیر منقول تسلسل کے قانون میں شرمناک تعصب ہے۔ منحصر سختی پر انحصار کھانے کے استعمال میں تعطل. ناخوشگوار حیرت ہوئی اور نہ ہی شرمیلی۔ صبح کی دل سے ابھی پیاری شام سے ملاقات ہوئی۔ یہاں اور اس کے آخری وقت پر ہونا ضروری ہے۔`,
    }, {
        id: genericFunctions.guidGenerator(),
        answer: `Kept in sent gave feel will oh it we. Has pleasure procured men laughing shutters nay. Old insipidity motionless continuing law shy partiality. Depending acuteness dependent eat use dejection. Unpleasing astonished discovered not nor shy. Morning hearted now met yet beloved evening. Has and upon his last here must. `,
        urdu_answer: `بھیجے گئے احساس کو اوہ رکھے گا۔ خوشی خوشی ہے مردوں بند ہنستے نہیں پرانا غلاظت غیر منقول تسلسل کے قانون میں شرمناک تعصب ہے۔ منحصر سختی پر انحصار کھانے کے استعمال میں تعطل. ناخوشگوار حیرت ہوئی اور نہ ہی شرمیلی۔ صبح کی دل سے ابھی پیاری شام سے ملاقات ہوئی۔ یہاں اور اس کے آخری وقت پر ہونا ضروری ہے۔`,
    }]
}]

const NUM_OF_LINES = 8;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            metaData: false,

            inputAnswer: '',
            inputAnswerError: false,

            answerViewed: false,

            current: 0,

            loading: false,

        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    startLoading = () => { this.setState({ loading: true }) };
    stopLoading = () => { this.setState({ loading: false }) };

    componentDidMount = async () => {
        this.startDBLoading();
    }//end of COMPONENT_DID_MOUNT

    startDBLoading = () => {
        const { isGeneral, type, } = this.props.route.params;
        if (isGeneral) {
            this.loadGeneral();
        } else {
            this.load(type);
        }
    }//end of startDBLoading

    componentWillUnmount = async () => {
        this.initialQuizRes = null;
    }//end of COMPONENT_WILL_UNMOUNT

    load = (type) => {
        const topicID = GetID.chapterDetailID();

        this.startLoading();

        IMQuizAPI.getQuestion(topicID, type).then(res => {
            this.setState(prevState => ({
                data: res.data,
            }), () => {
                if (res.data.length > 0) this.createInitialQuiz(res.data[0]);
            });

            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });
    }//end of LOAD FUNCTION

    loadGeneral = () => {

        const { data, type } = this.props.route.params;

        const categoryID = data.id;
        this.startLoading();

        IMGeneralQuiz.getQuestion(categoryID, type).then(res => {
            this.setState(prevState => ({
                data: res.data,
            }), () => {
                if (res.data.length > 0) this.createInitialQuiz(res.data[0]);
            });

            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });


    }//end of loadGeneral()

    initialQuizRes = null;

    createInitialQuiz = async (question1) => {
        const { type, isGeneral, data } = this.props.route.params;
        const userID = await appFunctions.userID();
        const quizSessionID = `${new Date().getTime()}${userID}`;
        const quizID = isGeneral ? data.id : GetID.chapterDetailID();

        const param = {
            quizSessionId: quizSessionID,
            userID: userID,
            quizId: quizID,
            quizStatus: AppEnum.QUIZ_STATUS.inProgress,
            currentQusId: question1.id,
            quizType: isGeneral ? AppEnum.QUIZ_TYPE_NO.GeneralQuiz : AppEnum.QUIZ_TYPE_NO.TopicQuiz,
            type: type.toLowerCase().trim(),
        };

        IMGeneralQuizManager.create(param).then(res => {
            this.initialQuizRes = res.data;
        }).catch(e => {
        });
    }//end of createInitialQuiz

    updateInitialQuiz = async (item, userAnswer) => {
        if (this.initialQuizRes === null) return
        const data = this.initialQuizRes;

        const element = this.state.data[this.state.current];

        const currentQuesID = this.state.data[this.state.current].id;

        const userID = await appFunctions.userID();

        const quizResult = [{
            quizId: data.quizId,
            questionId: element.id,
            quizUserAns: userAnswer,
            quizActualRightAns: item.rightAnswer,
        }];
        const quizUserScore = { totalMarks: 0, scored: 0 };

        const param = {
            userID: userID,
            quizSessionId: data.quizSessionId,
            quizStatus: AppEnum.QUIZ_STATUS.done,
            currentQusId: currentQuesID,
            quizType: data.quizType,
            quizResult: JSON.stringify(quizResult),
            quizUserScore: JSON.stringify(quizUserScore),
        };

        IMGeneralQuizManager.update(param).then(res => {
            appFunctions.successFlashMessage(IMLocalized(`Status Updated!`));
        }).catch(e => {
        });
    }//end of updateInitialQuiz

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    getPageTitle = () => {
        const { type } = this.props.route.params;
        if (type === AppEnum.GENERAL_CATEGORY_TYPE.Short) {
            return GV.isRTL ? `مختصر سوال` : `Short Question`;
        } else {
            return GV.isRTL ? `لمبا سوال` : `Long Question`;
        }
    }//end of getPageTitle


    render = () => {
        const pageTitle = this.getPageTitle();
        const { data, current } = this.state;
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

                {!this.state.loading &&
                    <ScrollView
                        bounces={false}
                        contentContainerStyle={{ ...!emptyValidate(data[current]) ? { flex: 1 } : {} }}>
                        {this._renderItem(data[current], current)}
                    </ScrollView>
                }

                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />

            </View>
        );
    }//end of RENDER

    viewAnswerPress = async (item, index) => {
        if (!emptyValidate(this.state.inputAnswer)) {
            this.setState({ inputAnswerError: true, answerViewed: false })
            return
        }

        const userAnswer = this.state.inputAnswer;
        this.updateInitialQuiz(item, userAnswer);

        this.setState({ answerViewed: true });
    }//end of viewAnswerPress

    _renderItem = (item, index) => {
        if (!emptyValidate(item)) return <Empty center reloadPress={this.startDBLoading} />

        return (
            <View style={itemStyles.primaryContainer}>
                <Text style={[itemStyles.text, {
                    color: colors.get(ColorEnum.name.question1),
                    fontSize: FontSize.value(14),
                }]}>{item.question}</Text>

                <Text style={[itemStyles.answerTitle, {
                    fontSize: FontSize.value(18),
                }]}>{IMLocalized(`Answer`)}</Text>

                <View style={itemStyles.textinputContainer}>
                    <MultiTextinput
                        placeholderTextColor={this.state.inputAnswerError ? colors.get(ColorEnum.name.white) : colors.get(ColorEnum.name.textinputPlaceholder)}
                        placeholder={IMLocalized(`Write your answer here`)}
                        onChangeText={(text) => { this.setState({ inputAnswer: text, inputAnswerError: false }) }}
                        value={this.state.inputAnswer}
                        numberOfLines={NUM_OF_LINES}
                        error={this.state.inputAnswerError ? IMLocalized(`Please, enter answer first.`) : ''}
                        editable={!this.state.answerViewed}
                    />
                </View>

                <TouchableOpacity style={itemStyles.viewAnswerContainer}
                    disabled={this.state.answerViewed}
                    onPress={() => this.viewAnswerPress(item, index)}>
                    <CardBox
                        title={IMLocalized(`View Answers`)}
                        height={45}
                        minHeight={45}
                        disabled={this.state.answerViewed}
                        onPress={() => this.viewAnswerPress(item, index)} />
                </TouchableOpacity>

                {this.state.answerViewed &&
                    <>
                        <View style={itemStyles.answerDataContainer}>
                            <Text style={[itemStyles.answerTitle, {
                                fontSize: FontSize.value(18),
                            }]}>{IMLocalized(`Right Answer`)}</Text>

                            <ReadMoreText
                                textStyle={[itemStyles.answerDataText, {
                                    color: colors.get(ColorEnum.name.question1),
                                    fontSize: FontSize.value(14),
                                }]}
                                numberOfLines={7}>
                                {item.rightAnswer}
                            </ReadMoreText>
                        </View>
                        {this._renderFooterButton()}
                    </>
                }


            </View>
        )
    }//end of _renderItem

    _renderFooterButton = () => {
        const { data, current } = this.state;
        return (
            <View style={headerStyles.primaryContainer}>
                <View style={headerStyles.button} />
                {current < data.length - 1 ?
                    <CustomButton
                        title={IMLocalized(`Next`)}
                        buttonStyle={{
                            ...headerStyles.button,
                        }}
                        onPress={() => {
                            if (!this.state.answerViewed) {
                                appFunctions.errorFlashMessage(IMLocalized(`View answer first`))
                                return;
                            }
                            this.setState(prevState => ({
                                current: prevState.current < data.length - 1 ? prevState.current + 1 : prevState.current,
                                ...prevState.current < data.length - 1 && {
                                    answerViewed: false,
                                    inputAnswer: '',
                                    inputAnswerError: false,
                                }
                            }))
                        }} />
                    : <View style={headerStyles.button} />
                }

            </View>
        )
    }//end of _renderFooterButton

}//end of CLASSS index