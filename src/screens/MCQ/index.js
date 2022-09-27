import React, { Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import CardBox from '../../appComponents/CardBox';
import Empty from '../../appComponents/Empty';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusbar from '../../components/CustomStatusbar';
import Text from '../../components/Text';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import ColorEnum from '../../constants/ColorEnum';
import colors from '../../constants/colors';
import FontSize from '../../constants/FontSize';
import IMGeneralQuiz from '../../controller/IMGeneralQuiz';
import IMGeneralQuizManager, { quizStatusToName } from '../../controller/IMGeneralQuizManager';
import IMQuizAPI from '../../controller/IMQuizAPI';
import AppEnum from '../../helper/AppEnum';
import appFunctions from '../../helper/appFunctions';
import { emptyValidate } from '../../helper/genericFunctions';
import GetID from '../../helper/GetID';
import { IMLocalized } from '../../locales/IMLocalization';
import ROUTES from '../../routes/ROUTES';
import GV from '../../utils/GV';
import { footerStyles, headerStyles, itemStyles, styles } from './styles';
//end of IMPORT's
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mcqData: [],
            metaData: false,

            current: 0,

            loading: false,

            status: '',
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    startLoading = () => { this.setState({ loading: true }) };
    stopLoading = () => { this.setState({ loading: false }) };

    componentDidMount = async () => {
        const { categoryItem, quiz, isGeneral, isFromAllQuiz } = this.props.route.params;

        if (emptyValidate(isFromAllQuiz)) {
            this.loadSpecificQuiz();
            return;
        }
        if (!isGeneral) {
            this.loadSchoolQuiz();
            return
        }
        if (emptyValidate(quiz)) {
            this.load(quiz, true);
            this.initialQuizRes = quiz;
            this.setState({
                current: parseInt(quiz.currentQusID) - 1,
            })
        } else {

            this.load(categoryItem, false);
        }
    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
        this.initialQuizRes = null;
    }//end of COMPONENT_WILL_UNMOUNT

    loadSpecificQuiz = async () => {

        this.startLoading();
        const { allQuizItem, quiz } = this.props.route.params;
        const param = {
            quizId: allQuizItem.quizId,
            quizType: allQuizItem.quizType,
            type: AppEnum.GENERAL_CATEGORY_TYPE.MCQ.toLowerCase(),
        };

        IMGeneralQuizManager.getSpecific(param).then(res => {
            this.initialQuizRes = quiz;

            if (quiz.quizResult === "") quiz.quizResult = [];
            if (quiz.quizUserScore === "") quiz.quizUserScore = { totalMarks: res.data.length, scored: 0 }
            for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                const fI = quiz.quizResult.findIndex(e => e.questionId === element.id);

                if (fI !== -1) {

                    if (quiz.quizResult[fI].quizUserAns.toLowerCase().trim() === "a") {
                        res.data[i].options[0].selected = true;
                        res.data[i].options[1].selected = false;
                        res.data[i].options[2].selected = false;
                        res.data[i].options[3].selected = false;
                    } else if (quiz.quizResult[fI].quizUserAns.toLowerCase().trim() === "b") {
                        res.data[i].options[0].selected = false;
                        res.data[i].options[1].selected = true;
                        res.data[i].options[2].selected = false;
                        res.data[i].options[3].selected = false;
                    } else if (quiz.quizResult[fI].quizUserAns.toLowerCase().trim() === "c") {
                        res.data[i].options[0].selected = false;
                        res.data[i].options[1].selected = false;
                        res.data[i].options[2].selected = true;
                        res.data[i].options[3].selected = false;
                    } else if (quiz.quizResult[fI].quizUserAns.toLowerCase().trim() === "d") {
                        res.data[i].options[0].selected = false;
                        res.data[i].options[1].selected = false;
                        res.data[i].options[2].selected = false;
                        res.data[i].options[3].selected = true;
                    } else {
                        res.data[i].options[0].selected = false;
                        res.data[i].options[1].selected = false;
                        res.data[i].options[2].selected = false;
                        res.data[i].options[3].selected = false;
                    }
                }//IF THERE IS INDEX
            }//end of LOOP I

            const currentIndex = res.data.findIndex(e => e.id === quiz.currentQusID);

            this.setState(prevState => ({
                mcqData: res.data,
                metaData: !prevState.metaData,

                status: quiz.quizStatus,

                current: currentIndex === -1 ? 0 : currentIndex,

            }));

            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });
    }//end of loadSpecificQuiz

    loadSchoolQuiz = async () => {
        const topicID = GetID.chapterDetailID();

        this.startLoading();

        IMQuizAPI.getMCQ(topicID).then(res => {
            this.setState(prevState => ({
                mcqData: res.data,
                metaData: !prevState.metaData,

                status: "",
            }), () => {
                if (res.data.length > 0) this.createInitialQuiz(res.data[0]);
            });

            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });
    }//end of loadSchoolQuiz

    load = async (categoryItem, isLoaded = false) => {
        const { isGeneral } = this.props.route.params;

        if (emptyValidate(isGeneral)) {
            const categoryID = categoryItem.id;

            this.startLoading();

            IMGeneralQuiz.getMCQ(categoryID).then(res => {

                if (isLoaded) {
                    if (categoryItem.quizResult === "") categoryItem.quizResult = [];
                    if (categoryItem.quizUserScore === "") categoryItem.quizUserScore = { totalMarks: res.data.length, scored: 0 }
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];
                        const fI = categoryItem.quizResult.findIndex(e => e.questionId === element.id);

                        if (fI !== -1) {

                            if (categoryItem.quizResult[fI].quizUserAns.toLowerCase().trim() === "a") {
                                res.data[i].options[0].selected = true;
                                res.data[i].options[1].selected = false;
                                res.data[i].options[2].selected = false;
                                res.data[i].options[3].selected = false;
                            } else if (categoryItem.quizResult[fI].quizUserAns.toLowerCase().trim() === "b") {
                                res.data[i].options[0].selected = false;
                                res.data[i].options[1].selected = true;
                                res.data[i].options[2].selected = false;
                                res.data[i].options[3].selected = false;
                            } else if (categoryItem.quizResult[fI].quizUserAns.toLowerCase().trim() === "c") {
                                res.data[i].options[0].selected = false;
                                res.data[i].options[1].selected = false;
                                res.data[i].options[2].selected = true;
                                res.data[i].options[3].selected = false;
                            } else if (categoryItem.quizResult[fI].quizUserAns.toLowerCase().trim() === "d") {
                                res.data[i].options[0].selected = false;
                                res.data[i].options[1].selected = false;
                                res.data[i].options[2].selected = false;
                                res.data[i].options[3].selected = true;
                            } else {
                                res.data[i].options[0].selected = false;
                                res.data[i].options[1].selected = false;
                                res.data[i].options[2].selected = false;
                                res.data[i].options[3].selected = false;
                            }
                        }//IF THERE IS INDEX
                    }//end of LOOP I
                }


                this.setState(prevState => ({
                    mcqData: res.data,
                    metaData: !prevState.metaData,

                    status: "status" in categoryItem ? emptyValidate(categoryItem.status) ? categoryItem.status : "In Progress" : "In Progress",
                }), () => {
                    if (res.data.length > 0 && !isLoaded) this.createInitialQuiz(res.data[0]);
                });
                this.stopLoading();
            }).catch(err => {
                this.stopLoading();
            });
        }
    }//end of LOAD FUNCTION

    initialQuizRes = null;

    createInitialQuiz = async (question1) => {
        const { categoryItem, isGeneral } = this.props.route.params;
        const userID = await appFunctions.userID();
        const quizSessionID = `${new Date().getTime()}${userID}`;

        const quizID = isGeneral ? categoryItem.id : GetID.chapterDetailID();

        const param = {
            quizSessionId: quizSessionID,
            userID: userID,
            quizId: quizID,
            quizStatus: AppEnum.QUIZ_STATUS.inProgress,
            currentQusId: question1.id,
            quizType: isGeneral ? AppEnum.QUIZ_TYPE_NO.GeneralQuiz : AppEnum.QUIZ_TYPE_NO.TopicQuiz,
            type: AppEnum.GENERAL_CATEGORY_TYPE.MCQ.toLowerCase().trim(),
        };

        IMGeneralQuizManager.create(param).then(res => {
            this.initialQuizRes = res.data;
        }).catch(e => {
        });
    }//end of createInitialQuiz

    isValidAnswer = (selectedOptionIndex, rightAnswer) => {
        const ans = rightAnswer.toLowerCase().trim();
        if (selectedOptionIndex === 0 && ans === "a") {
            return true;
        } else if (selectedOptionIndex === 1 && ans === "b") {
            return true;
        } else if (selectedOptionIndex === 2 && ans === "c") {
            return true;
        } else if (selectedOptionIndex === 3 && ans === "d") {
            return true;
        } else {
            return false;
        }
    }//end of isValidAnswer

    getUserSelectedOption = (selectedOptionIndex) => {
        if (selectedOptionIndex === 0) {
            return "A";
        } else if (selectedOptionIndex === 1) {
            return "B";
        } else if (selectedOptionIndex === 2) {
            return "C";
        } else if (selectedOptionIndex === 3) {
            return "D";
        } else {
            return "";
        }
    }//end of getUserSelectedOption

    updateInitialQuiz = async (status = AppEnum.QUIZ_STATUS.inProgress) => {
        if (this.initialQuizRes === null) return
        const data = this.initialQuizRes;
        let { isGeneral } = this.props.route.params;

        const currentQuesID = this.state.mcqData[this.state.current].id;
        let userScore = 0;
        let quizResult = [];
        const totalQuestion = this.state.mcqData.length;

        for (let i = 0; i < this.state.mcqData.length; i++) {
            const element = this.state.mcqData[i];

            const selectedOptionIndex = element.options.findIndex(x => x.selected === true);
            const isValidAnswer = this.isValidAnswer(selectedOptionIndex, element.rightAnswer);
            if (isValidAnswer) userScore++;

            const userOption = this.getUserSelectedOption(selectedOptionIndex);

            if (emptyValidate(userOption)) {

                const quizID = isGeneral ? element.categoryID : GetID.chapterDetailID();

                quizResult.push({
                    quizId: quizID,
                    questionId: element.id,
                    quizUserAns: userOption,
                    quizActualRightAns: element.rightAnswer.toUpperCase().trim(),
                })
            }
        }//end of LOOP 

        const userID = await appFunctions.userID();


        const param = {
            userID: userID,
            quizSessionId: data.quizSessionId,
            quizStatus: status,
            currentQusId: currentQuesID,
            quizType: data.quizType,
            quizResult: JSON.stringify(quizResult),
            quizUserScore: JSON.stringify({ totalMarks: totalQuestion, scored: userScore }),
        };

        IMGeneralQuizManager.update(param).then(res => {
            this.setState({
                status: res.status
            })
            if (status === AppEnum.QUIZ_STATUS.skip) {
                appFunctions.successFlashMessage(IMLocalized(`Quiz deleted!`));
                this.backPress();
            } else {
                appFunctions.successFlashMessage(IMLocalized(`Status Updated!`));
            }

        }).catch(e => {
        });
    }//end of updateInitialQuiz

    backPress = () => {
        const { reloadData } = this.props.route.params;
        if (emptyValidate(reloadData)) {
            reloadData();
        }
        this.props.navigation.pop() && this.props.navigation.goBack();

    }//end of BACK PRESS

    pausePress = async () => {
        this.updateInitialQuiz(AppEnum.QUIZ_STATUS.pause);
    }//end of pausePress

    idlePress = async () => {
        this.updateInitialQuiz(AppEnum.QUIZ_STATUS.Idle);
    }//end of idlePress

    leavePress = async () => {
        // 
        Alert.alert(IMLocalized(`Are you sure to leave quiz?`), IMLocalized(``), [{
            text: IMLocalized(`Cancel`)
        }, {
            onPress: () => {
                this.updateInitialQuiz(AppEnum.QUIZ_STATUS.skip);
            },
            style: "destructive",
            text: IMLocalized(`Delete`)
        }])
    }//end of leavePress

    render = () => {
        const pageTitle = GV.isRTL ? `ایم سی کی'ایس` : `MCQ'S`;
        const { mcqData, metaData, current } = this.state;
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

                <View style={headerStyles.primaryContainer}>
                    <Text style={[styles.heading, {
                        color: colors.get(ColorEnum.name.heading1),
                        fontSize: FontSize.value(20),
                    }]}>{pageTitle}</Text>

                    {/* <Text style={[styles.statusText,{
                        fontSize: FontSize.value(18),
                    }]}>{this.state.status}</Text> */}
                </View>

                {(mcqData.length > 0 && !this.state.loading) && this._renderHeaderButton()}
                <ScrollView contentContainerStyle={{ flex: 1 }}>

                    {this._renderItem(mcqData[current], current)}

                </ScrollView>

                {/* ******************** FOOTER Start ******************** */}
                {(mcqData.length > 0 && !this.state.loading) && this._renderFooter()}

                {/* ******************** FOOTER End ******************** */}
                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />
            </View>
        );
    }//end of RENDER

    _renderItem = (item, index) => {
        if (!emptyValidate(item)) return <Empty center />
        return (
            <View style={itemStyles.primaryContainer}
                key={index}>
                <Text style={[itemStyles.text, {
                    color: colors.get(ColorEnum.name.question1),
                    fontSize: FontSize.value(14),
                }
                ]}>{item.question}</Text>
                <View style={itemStyles.optionSapartor} />
                {item.options.map((optionItem, optionIndex) => {
                    return (
                        <View style={itemStyles.optionPrimaryContainer}
                            key={optionIndex}>
                            <CardBox
                                title={`${optionItem.option}`}
                                width={"100%"}
                                selected={optionItem.selected}
                                disabled={this.state.status === AppEnum.QUIZ_STATUS.done}
                                // minHeight={40}
                                // height={40}
                                onPress={() => { this.onOptionItemPress(index, optionIndex) }}
                            />
                        </View>
                    )
                })}
            </View>
        )
    }//end of _renderItem

    onOptionItemPress = (mainIndex, index) => {
        if (this.state.status === AppEnum.QUIZ_STATUS.done) {
            return
        }
        const { mcqData } = this.state;
        const opArr = mcqData[mainIndex].options;

        for (let i = 0; i < opArr.length; i++) {
            if (i === index) {
                mcqData[mainIndex].options[i].selected = true;
            } else {
                mcqData[mainIndex].options[i].selected = false;
            }
        }//end of LOOP I
        this.setState(prevState => ({
            mcqData: mcqData,
            metaData: !prevState.metaData,
        }));
        // this.props.navigation.navigate(ROUTES.Result)
    }//end of onOptionItemPress

    _renderFooter = () => {
        if (this.state.status === AppEnum.QUIZ_STATUS.done) {
            return <View />
        }
        return (
            <View style={footerStyles.primaryContainer}>
                <CardBox
                    width={"100%"}
                    minHeight={40}
                    height={40}
                    disabled
                    customView={() => {
                        return (
                            <View style={footerStyles.cPrimaryContainer}>
                                <TouchableOpacity style={footerStyles.buttonContainer} onPress={this.pausePress}>
                                    <Text style={[footerStyles.buttonText, {
                                        fontSize: FontSize.value(15),
                                    }]}>{IMLocalized(`Pause`)}</Text>
                                </TouchableOpacity>

                                {/* 
                                <View style={footerStyles.cSeparator} />
                                
                                <TouchableOpacity style={footerStyles.buttonContainer} onPress={this.idlePress}>
                                    <Text style={footerStyles.buttonText}>{IMLocalized(`IDLE`)}</Text>
                                </TouchableOpacity> */}

                                <View style={footerStyles.cSeparator} />

                                <TouchableOpacity style={footerStyles.buttonContainer} onPress={this.leavePress}>
                                    <Text style={[footerStyles.buttonText, {
                                        fontSize: FontSize.value(15),
                                    }]}>{IMLocalized(`Leave`)}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }//end of _renderFooter

    _renderHeaderButton = () => {
        const { mcqData, current } = this.state;
        return (
            <View style={headerStyles.primaryContainer}>
                {current > 0 ?
                    <CustomButton
                        title={IMLocalized(`Previous`)}
                        buttonStyle={{
                            ...headerStyles.button,
                            backgroundColor: "#696969",
                        }}
                        onPress={() => { this.setState(prevState => ({ current: prevState.current > 0 ? prevState.current - 1 : prevState.current })) }} />
                    :
                    <View style={headerStyles.button} />
                }

                <Text style={[headerStyles.text, {
                    color: colors.get(ColorEnum.name.heading1),
                    fontSize: FontSize.value(22),
                }]}>{GV.isRTL ? `سوال #  ${current + 1}` : `Q# ${current + 1}`}</Text>

                {current < mcqData.length - 1 ?
                    <CustomButton
                        title={IMLocalized(`Next`)}
                        buttonStyle={{
                            ...headerStyles.button,
                        }}
                        onPress={() => {
                            let isAnySelected = false;
                            const index = mcqData[current].options.findIndex(e => e.selected === true);
                            if (index !== -1) isAnySelected = true;
                            if (!isAnySelected) {
                                appFunctions.errorFlashMessage(IMLocalized(`No option selected!`), IMLocalized(`Please, select any option to move to next question.`))
                                return;
                            }
                            this.setState(prevState => ({ current: prevState.current < mcqData.length - 1 ? prevState.current + 1 : prevState.current }))
                        }} />
                    :
                    !this.state.loading ?
                        <CustomButton
                            title={IMLocalized(`Result`)}
                            buttonStyle={{
                                ...headerStyles.button,
                            }}
                            onPress={() => { this.resultPress() }} />
                        : <View style={headerStyles.button} />
                }

            </View>
        )
    }//end of _renderHeaderButton

    resultPress = async () => {
        if (this.initialQuizRes === null) return
        const data = this.initialQuizRes;
        let { isGeneral, quiz } = this.props.route.params;

        const currentQuesID = this.state.mcqData[this.state.current].id;
        let userScore = 0;
        let quizResult = [];
        const totalQuestion = this.state.mcqData.length;

        for (let i = 0; i < this.state.mcqData.length; i++) {
            const element = this.state.mcqData[i];

            const selectedOptionIndex = element.options.findIndex(x => x.selected === true);
            const isValidAnswer = this.isValidAnswer(selectedOptionIndex, element.rightAnswer);
            if (isValidAnswer) userScore++;

            const userOption = this.getUserSelectedOption(selectedOptionIndex);

            if (emptyValidate(userOption)) {
                const quizID = isGeneral ? element.categoryID : GetID.chapterDetailID();


                quizResult.push({
                    quizId: quizID,
                    questionId: element.id,
                    quizUserAns: userOption,
                    quizActualRightAns: element.rightAnswer.toUpperCase().trim(),
                })
            }
        }//end of LOOP 

        const userID = await appFunctions.userID();

        const param = {
            userID: userID,
            quizSessionId: data.quizSessionId,
            quizStatus: AppEnum.QUIZ_STATUS.done,
            currentQusId: currentQuesID,
            quizType: data.quizType,
            quizResult: quizResult,
            quizUserScore: { totalMarks: totalQuestion, scored: userScore },
        };

        const newParam = {
            userID: userID,
            quizSessionId: data.quizSessionId,
            quizStatus: AppEnum.QUIZ_STATUS.done,
            currentQusId: currentQuesID,
            quizType: data.quizType,
            quizResult: JSON.stringify(quizResult),
            quizUserScore: JSON.stringify({ totalMarks: totalQuestion, scored: userScore }),
        }
        IMGeneralQuizManager.update(newParam).then(res => {
            this.setState({
                status: res.status
            })
        }).catch(e => {
        });


        if (emptyValidate(quiz)) {

            quiz["quizResult"] = quizResult;
            quiz["quizUserScore"] = { totalMarks: totalQuestion, scored: userScore };
        } else {

            quiz = param;
        }



        this.props.navigation.replace(ROUTES.Result, {
            result: param,
            isGeneral: isGeneral,
            quiz: quiz,
        })
    }//end of resultPress

}//end of CLASSS index