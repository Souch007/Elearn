import React, { Component } from 'react';
import { TouchableOpacity, View, } from 'react-native';
import { styles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import { FlatList } from 'react-native';
import CardBox from '../../appComponents/CardBox';
import GV from '../../utils/GV';
import { Dimensions } from 'react-native';
import ROUTES from '../../routes/ROUTES';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import { IMLocalized } from '../../locales/IMLocalization';
import IMGeneralQuizManager, { quizStatusToName } from '../../controller/IMGeneralQuizManager';
import DateFormatter from '../../utils/DateFormatter';
import Table_Offline from '../../LocalDatabase/Table_Offline';
import genericFunctions from '../../helper/genericFunctions';
import { Touchable } from 'react-native';
import CustomIcon from '../../components/CustomIcon';
import appFunctions from '../../helper/appFunctions';
import AppEnum from '../../helper/AppEnum';
import Empty from '../../appComponents/Empty';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

// 
const WIDTH = "90%";


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizesData: [],
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

        IMGeneralQuizManager.get().then(async (res) => {
            let newData = res.data;
            const localRes = await Table_Offline.fetchAll();
            if (localRes.length > 0) {

                const localResData = [];
                for (let i = 0; i < localRes.length; i++) {
                    const localParam = JSON.parse(localRes[i].params);
                    localParam["quizResult"] = JSON.parse(localParam["quizResult"]);
                    localParam["quizUserScore"] = JSON.parse(localParam["quizUserScore"]);
                    localResData.push({
                        ...localParam,
                        createdAt: Number(localRes[i].createdAt),
                        updatedAt: Number(localRes[i].updatedAt),
                        status: quizStatusToName(localParam.quizStatus),
                        isOffline: true,
                        id: genericFunctions.getRandomInt(10000, 100000),
                        databaseID: localRes[i].id,
                        pdfLink: '',
                    });

                }//end of LOOP 
                newData = [...res.data, ...localResData];
                newData.sort(function (a, b) {
                    const aDT = new Date(a.updatedAt);
                    const bDT = new Date(b.updatedAt);

                    return bDT - aDT;
                });
            }


            this.setState(prevState => ({
                quizesData: newData,
                metaData: !prevState.metaData,
            }));
            this.stopLoading();
        }).catch(async (err) => {
            let newData = [];
            const localRes = await Table_Offline.fetchAll();
            if (localRes.length > 0) {

                const localResData = [];
                for (let i = 0; i < localRes.length; i++) {
                    const localParam = JSON.parse(localRes[i].params);
                    localParam["quizResult"] = JSON.parse(localParam["quizResult"]);
                    localParam["quizUserScore"] = JSON.parse(localParam["quizUserScore"]);
                    localResData.push({
                        ...localParam,
                        createdAt: Number(localRes[i].createdAt),
                        updatedAt: Number(localRes[i].updatedAt),
                        status: quizStatusToName(localParam.quizStatus),
                        isOffline: true,
                        id: genericFunctions.getRandomInt(10000, 100000),
                        databaseID: localRes[i].id,
                    });

                }//end of LOOP 
                newData = localResData;
                newData.sort(function (a, b) {
                    const aDT = new Date(a.updatedAt);
                    const bDT = new Date(b.updatedAt);

                    return bDT - aDT;
                });
            }

            this.setState(prevState => ({
                quizesData: newData,
                metaData: !prevState.metaData,
            }));
            this.stopLoading();
        });
    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        const pageTitle = GV.isRTL ? 'تمام کوئز' : 'All Quizzes';
        const { quizesData, metaData } = this.state;
        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background)
            }]}>
                <CustomStatusbar />
                <CustomHeader
                    back={false}
                    backPress={this.backPress}
                    rightIcon
                    showStepProgress={false} />

                <Text style={[styles.heading, {
                    color: colors.get(ColorEnum.name.heading1),
                    fontSize: FontSize.value(20),
                }]}>{pageTitle}</Text>

                {quizesData.length < 1 && !this.state.loading ?
                    <Empty center
                        reloadPress={this.load} />
                    :
                    <FlatList
                        refreshing={this.state.loading}
                        onRefresh={() => this.load()}
                        data={quizesData}
                        extraData={metaData}
                        keyExtractor={genericFunctions.keyExtractor}
                        renderItem={this._renderItem}
                        contentContainerStyle={styles.contentContainerStyle} />
                }
                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />

            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {

        return (
            <View style={styles.iPrimaryContainer}>
                <CardBox
                    customView={() => {
                        return (
                            <View style={styles.cardPrimaryContainer}>
                                <Text style={[styles.iDateTime, {
                                    fontSize: FontSize.value(10),
                                }]}>{DateFormatter.dateTime(item.updatedAt)}</Text>
                                <View style={styles.iCustomPrimaryContainer}>
                                    <Text style={{
                                        ...styles.iTitleStyle,
                                        ...item.isOffline && {
                                            width: "80%"
                                        },
                                        fontSize: FontSize.value(20),
                                    }}>{`Quiz ${item.id}`}</Text>
                                    {item.isOffline ?
                                        <TouchableOpacity style={styles.iSyncContainer}
                                            onPress={() => { this.syncPress(item) }}>
                                            <CustomIcon name={"sync"} size={30} color={"#fff"} />
                                            <Text style={[styles.iSyncText, {
                                                fontSize: FontSize.value(16),
                                            }]}>{IMLocalized(`Sync`)}</Text>
                                        </TouchableOpacity>
                                        :
                                        <Text style={[styles.iStatusStyle, {
                                            fontSize: FontSize.value(14),
                                        }]}>{item.status}</Text>
                                    }
                                </View>

                            </View>
                        )
                    }}
                    minHeight={70}
                    containerStyle={styles.itemContainerStyle}
                    onPress={() => { this.itemPress(item, index) }}
                    disabled={item.quizStatus === AppEnum.QUIZ_STATUS.skip}
                />
            </View>
        )
    }//end of _renderItem

    itemPress = async (item, index) => {
        if (item.quizStatus === AppEnum.QUIZ_STATUS.skip) {
            return
        }


        this.props.navigation.navigate(ROUTES.MCQ, {
            quiz: item,
            isGeneral: true,
            isFromAllQuiz: true,
            allQuizItem: { quizType: item.quizType, quizId: item.quizId },
            reloadData: this.load,
        })
    }//end of itemPress

    syncPress = async (item) => {
        const userID = await appFunctions.userID();
        const localDbID = item.databaseID;
        this.startLoading();
        const newParam = {
            userID: userID,
            quizSessionId: item.quizSessionId,
            quizStatus: item.quizStatus,
            currentQusId: item.currentQusId,
            quizType: item.quizType,
            quizResult: JSON.stringify(item.quizResult),
            quizUserScore: JSON.stringify(item.quizUserScore),
        }
        IMGeneralQuizManager.update(newParam).then(async (res) => {
            await Table_Offline.removeRow(localDbID);
            this.load();
        }).catch(e => {
            this.stopLoading();
        });
    }//end of syncPress

}//end of CLASSS index