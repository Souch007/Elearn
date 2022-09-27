import React, { Component } from 'react';
import { Dimensions, FlatList, TouchableOpacity, TouchableHighlight, View, } from 'react-native';
import { styles, itemStyles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import { IMLocalized } from '../../locales/IMLocalization';
import genericFunctions, { emptyValidate } from '../../helper/genericFunctions';
import GV from '../../utils/GV';
import ROUTES from '../../routes/ROUTES';
import colors from '../../constants/colors';
import ApiManager from '../../manager/ApiManager';
import appFunctions from '../../helper/appFunctions';
import ApiClasses from '../../manager/ApiClasses';
import IMGradeAPI from '../../controller/IMGradeAPI';
import Empty from '../../appComponents/Empty';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import GetID from '../../helper/GetID';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeData: [],
            metaData: false,

            isItemPress: false,

            loading: false,
            WIDTH: Dimensions.get('screen').width,
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    startLoading = () => { this.setState({ loading: true }) };
    stopLoading = () => { this.setState({ loading: false }) };

    componentDidMount = async () => {
        Dimensions.addEventListener('change', () => {
            this.setState({
                WIDTH: Dimensions.get('screen').width,
            });
        });
        this.load();
    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
        Dimensions.removeEventListener('change', () => { });
    }//end of COMPONENT_WILL_UNMOUNT

    load = async () => {
        this.startLoading();

        const schoolID = GetID.schoolID();

        const param = {
            school_id: schoolID,
            id: null,
        };

        IMGradeAPI.get(param).then(res => {
            this.setState(prevState => ({
                gradeData: res.data,
                metaData: !prevState.metaData,
            }))
            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });

    }//end of LOAD FUNCTION

    resetGradeData = () => {
        const { gradeData } = this.state;
        for (let i = 0; i < gradeData.length; i++) {
            gradeData[i].selected = false;
        }
        this.setState(prevState => ({
            gradeData,
            metaData: !prevState.metaData,
        }));
    }//end of resetGradeData

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        const { gradeData, metaData } = this.state;
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
                }]}>{IMLocalized(`Grades Available`)}</Text>
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    flex: 1,
                }}>
                    {gradeData.length < 1 && !this.state.loading ?
                        <Empty />
                        :
                        <FlatList
                            data={gradeData}
                            extraData={metaData}
                            numColumns={3}
                            renderItem={this._renderItem}
                            style={{ flex: 1, alignSelf: "center" }}
                            contentContainerStyle={styles.contentContainerStyle} />
                    }
                </View>

                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />

            </View>
        );
    }//end of RENDER

    onItemPress = (item, index) => {
        const { gradeData } = this.state;
        gradeData[index].selected = !gradeData[index].selected;
        this.setState(prevState => ({
            gradeData,
            metaData: !prevState.metaData,
        }));
        GV.grade = item;
        this.props.navigation.navigate(ROUTES.Subject);
        this.resetGradeData();
    }//end of onItemPress

    _renderItem = ({ item, index }) => {
        const { isItemPress, WIDTH } = this.state;
        const isSelected = item.selected;
        const gradeNumber = appFunctions.createGradeNumber(item.title);

        return (
            <TouchableHighlight
                style={[isSelected ?
                    itemStyles.primaryContainer :
                    itemStyles.primaryContainerSelected, {
                    width: WIDTH / 4,
                    height: WIDTH / 4,
                    borderRadius: WIDTH / 4,
                }]}
                // underlayColor={colors.primary}
                underlayColor={"#CECBCB"}
                onPressIn={() => { this.setState({ isItemPress: true }) }}
                onPressOut={() => { this.setState({ isItemPress: false }) }}
                onPress={() => { this.onItemPress(item, index) }}>
                <View style={itemStyles.textContainer}>
                    <Text style={[isSelected ?
                        itemStyles.text :
                        itemStyles.textSelected, {
                        fontSize: !gradeNumber.isNumeric ? FontSize.value(20) : FontSize.value(WIDTH / 8),
                    }]}>
                        {gradeNumber.text}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }//end of _renderItem

}//end of CLASSS index