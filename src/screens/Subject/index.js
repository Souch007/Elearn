import React, { Component } from 'react';
import { Dimensions, FlatList, View, } from 'react-native';
import { styles } from './styles';
import Text from '../../components/Text';
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomHeader from '../../components/CustomHeader';
import genericFunctions from '../../helper/genericFunctions';
import CardBox from '../../appComponents/CardBox';
import GV from '../../utils/GV';
import ROUTES from '../../routes/ROUTES';
import ApiManager from '../../manager/ApiManager';
import ApiClasses from '../../manager/ApiClasses';
import appFunctions from '../../helper/appFunctions';
import IMSubjectAPI from '../../controller/IMSubjectAPI';
import Empty from '../../appComponents/Empty';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import { IMLocalized } from '../../locales/IMLocalization';
import GetID from '../../helper/GetID';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
import StepProgress from '../../appComponents/StepProgress';
//end of IMPORT's

const WIDTH = Dimensions.get('screen').width - 100;

const STATIC_SUBJECT_DATA = [{
    id: genericFunctions.guidGenerator(),
    title: 'Physics',
    urdu_title: 'طبیعیات'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Chemistry',
    urdu_title: 'کیمسٹری'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Maths',
    urdu_title: 'ریاضی'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'English',
    urdu_title: 'انگریزی'
}, {
    id: genericFunctions.guidGenerator(),
    title: 'Computer Sciene',
    urdu_title: 'کمپیوٹر سائنس'
}];

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectData: [],
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

    load = async () => {
        this.startLoading();

        const param = {
            school_id: null,
            subject_id: null,
            grade_id: GetID.gradeID(),
        };

        IMSubjectAPI.get(param).then(res => {

            this.setState(prevState => ({
                subjectData: [...res.data],
                metaData: !prevState.metaData,
            }))
            this.stopLoading();
        }).catch(() => {
            this.stopLoading();
        })

    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        const { subjectData, metaData } = this.state;
        let pageTitle = GetID.gradeName();

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

                {subjectData.length < 1 && !this.state.loading ?
                    <Empty center />
                    :
                    <FlatList
                        data={subjectData}
                        extraData={metaData}
                        renderItem={this._renderItem}
                        contentContainerStyle={styles.contentContainerStyle} />
                }
                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />

            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {
        return (
            <CardBox
                title={item.title}
                minHeight={WIDTH / 3}
                containerStyle={styles.itemContainerStyle}
                onPress={() => {
                    GV.subject = item;
                    this.props.navigation.navigate(ROUTES.SubjectDetail);
                }}
            />
        )
    }//end of _renderItem

}//end of CLASSS index