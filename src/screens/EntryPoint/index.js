import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TypeWriter from '../../appComponents/Typewriter';
import CustomIcon from '../../components/CustomIcon';
import CustomStatusbar from '../../components/CustomStatusbar';
import colors from '../../constants/colors';
import FontSize from '../../constants/FontSize';
import LocalAssets from '../../constants/LocalAssets';
import genericFunctions from '../../helper/genericFunctions';
import { IMLocalized } from '../../locales/IMLocalization';
import ROUTES from '../../routes/ROUTES';
import sharedPreferences from '../../sharedPreferences';
import sharedPreferencesKeys from '../../sharedPreferences/sharedPreferencesKeys';
import { styles } from './styles';
//end of IMPORT's

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    componentDidMount = async () => {
        const currentUser = await sharedPreferences.retrieve(sharedPreferencesKeys.currentUser);
        if (currentUser) {
            await genericFunctions.sleep(2.5);
            this.props.navigation.replace(ROUTES.Selections);
        }
    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
    }//end of COMPONENT_WILL_UNMOUNT

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    render = () => {
        return (
            <LinearGradient
                start={{ x: 0.1, y: 0.1 }} end={{ x: 0.1, y: 1.0 }}
                locations={[0.0, 1.0]}
                colors={[colors.gradientDark, "#33ABC1",]}
                style={styles.primaryContainer}
                useAngle
                angle={0}>
                <CustomStatusbar backgroundColor={"#2ba1c0"} />
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate(ROUTES.Login)
                    }}
                    style={styles.primaryContainer}>

                    {/* ******************** BACK LOGO Start ******************** */}
                    <Image
                        source={LocalAssets.JPG.eImage}
                        style={styles.backImage}
                        resizeMode={"cover"} />

                    {/* ******************** BACK LOGO End ******************** */}

                    {/* ******************** ICON Start ******************** */}
                    {/* <Image
                        source={LocalAssets.JPG.eImage}
                        style={styles.logoImage}
                        resizeMode={"cover"} /> */}

                    <Animatable.Image
                        delay={500}
                        animation={"zoomIn"}//"fadeInLeftBig"}
                        source={LocalAssets.JPG.eImageWhite}
                        style={[styles.logoImage]}
                        resizeMode={"cover"}
                    />

                    {/* ******************** ICON End ******************** */}
                    {/* <Text style={[styles.text, {
                        fontSize: FontSize.value(30),
                    }]}>{IMLocalized(`e-learning for all`)}</Text> */}

                    <TypeWriter typing={1}
                        style={[styles.text, {
                            fontSize: FontSize.value(30),
                        }]}>{IMLocalized(`e-learning for all`)}</TypeWriter>


                    <TouchableOpacity style={styles.bottomIconContainer}
                        onPress={() => { this.props.navigation.navigate(ROUTES.Login) }}>
                        <CustomIcon
                            iconType={"MaterialCommunityIcons"}
                            name={"arrow-down"}
                            color={colors.white}
                            size={20} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </LinearGradient>
        )
    }//end of RENDER

}//end of CLASSS index