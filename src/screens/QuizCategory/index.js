import React, { Component } from 'react';
import { View, } from 'react-native';
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
import IMGeneralQuizCategory from '../../controller/IMGeneralQuizCategory';
import AppEnum from '../../helper/AppEnum';
import Empty from '../../appComponents/Empty';
import colors from '../../constants/colors';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
//end of IMPORT's

const WIDTH = "90%";

const STATIC_CATEGORY_DATA = [{
    id: 1,
    title: 'Antonyms',
    urdu_title: 'مترادفات',
}, {
    id: 2,
    title: 'Verbal',
    urdu_title: 'وربل',
}];

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
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
        const { type } = this.props.route.params;

        IMGeneralQuizCategory.get(type).then(res => {
            this.setState(prevState => ({
                categoryData: res.data,
                metaData: !prevState.metaData,
            }))
            this.stopLoading();
        }).catch(err => {
            this.stopLoading();
        });
    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        const pageTitle = GV.isRTL ? 'ایک زمرہ منتخب کریں' : 'Choose A Category';
        const { categoryData, metaData } = this.state;
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
                }]}> {pageTitle}</Text>

                {categoryData.length < 1 && !this.state.loading ?
                    <Empty center
                        reloadPress={this.load} />
                    :
                    <FlatList
                        data={categoryData}
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
                title={item.name}
                minHeight={120}
                containerStyle={styles.itemContainerStyle}
                onPress={() => this.itemPress(item, index)}
            />
        )
    }//end of _renderItem

    itemPress = (item, index) => {
        const { type } = this.props.route.params;

        if (type === AppEnum.GENERAL_CATEGORY_TYPE.MCQ) {
            this.props.navigation.navigate(ROUTES.MCQ, { categoryItem: item, isGeneral: true, reloadData: null, })
        } else if (type === AppEnum.GENERAL_CATEGORY_TYPE.Short) {
            this.props.navigation.navigate(ROUTES.ShortQuestion, {
                isGeneral: true,
                type: AppEnum.GENERAL_CATEGORY_TYPE.Short,
                data: item,
            })
        } else if (type === AppEnum.GENERAL_CATEGORY_TYPE.Long) {
            this.props.navigation.navigate(ROUTES.ShortQuestion, {
                isGeneral: true,
                type: AppEnum.GENERAL_CATEGORY_TYPE.Long,
                data: item,
            })
        }
    }//end of itemPress

}//end of CLASSS index