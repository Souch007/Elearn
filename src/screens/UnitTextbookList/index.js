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
import IMTextbookAPI from '../../controller/IMTextbookAPI';
import { IMLocalized } from '../../locales/IMLocalization';
import TNActivityIndicator from '../../components/TNActivityIndicator/TNActivityIndicator';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitTextbookListData: [],
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
        const param = {
            topic_id: GetID.chapterDetailID(),
        };
        IMTextbookAPI.get(param).then(res => {
            console.log(`RESS `, JSON.stringify(res.data));
            this.setState(prevState => ({
                unitTextbookListData: res.data,
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
        const { unitTextbookListData, metaData } = this.state;
        let pageTitle = IMLocalized(`Textbooks`);

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
                    data={unitTextbookListData}
                    extraData={metaData}
                    renderItem={this._renderItem}
                    contentContainerStyle={styles.contentContainerStyle} />

                <TNActivityIndicator loading={this.state.loading} text={IMLocalized(`Please wait`)} />
            </View>
        );
    }//end of RENDER

    _renderItem = ({ item, index }) => {
        return (
            <CardBox
                title={item.title}
                minHeight={120}
                containerStyle={styles.itemContainerStyle}
                onPress={() => { this.itemPress(item, index) }}
            />
        )
    }//end of _renderItem


    itemPress = (item, index) => {
        this.props.navigation.navigate(ROUTES.UnitTextbook, {
            item: item,
            showShared: false,
        })

    }//end of itemPress

}//end of CLASSS index