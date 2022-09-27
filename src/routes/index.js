import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ROUTES from './ROUTES';
// screens Import STARTED
import EntryPoint from "../screens/EntryPoint";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Selections from "../screens/Selections";
import Grade from "../screens/Grade";

import Subject from "../screens/Subject";
import SubjectDetail from "../screens/SubjectDetail";
import Chapter from "../screens/Chapter";
import ChapterDetail from "../screens/ChapterDetail";

import Unit from "../screens/Unit";
import Quiz from "../screens/Quiz";
import UnitTextbookList from "../screens/UnitTextbookList";
import UnitTextbook from "../screens/UnitTextbook";
import Videos from "../screens/Videos";
import MCQ from "../screens/MCQ";
import Result from "../screens/Result";
import ShortQuestion from "../screens/ShortQuestion";
import Answers from "../screens/Answers";
import MyRecord from "../screens/MyRecord";
import Settings from "../screens/Settings";

import QuizCategory from "../screens/QuizCategory";
import AllQuiz from "../screens/AllQuiz";

import { MyCustomTab } from './MyCustomTab';
import sharedPreferences from '../sharedPreferences';
import sharedPreferencesKeys from '../sharedPreferences/sharedPreferencesKeys';
import GV from '../utils/GV';
import colors from '../constants/colors';
import { Easing } from 'react-native';
// screens Import End

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const initialRouteName = __DEV__ ? ROUTES.EntryPoint : ROUTES.EntryPoint;

const config = {
    animation: 'fade',
    config: {
        stiffness: 1000,
        damping: 50,
        mass: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.5,
        restSpeedThreshold: 0.01,
    }
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    }
}
export default class index extends Component {
    state = {
        loading: true,
        isLoggedIn: false,
        isLoggedSetNow: false,
    };

    componentDidMount = async () => {
        const currentUser = await sharedPreferences.retrieve(sharedPreferencesKeys.currentUser);
        if (currentUser) {
            this.setState({
                loading: false,
                isLoggedIn: true,
            })
        } else {
            this.setState({
                loading: false,
                isLoggedIn: false,
            })
        }
        GV.routeClass = this;
    }//end of componentDidMount

    setIsLoggedIn = (isLoggedIn) => { this.setState({ isLoggedIn, isLoggedSetNow: true }); }//end of setIsLoggedIn

    beforeLogin = () => {
        const LoginScreen = (props) => <Login {...props} setIsLoggedIn={this.setIsLoggedIn} />;
        const SignupScreen = (props) => <Signup {...props} setIsLoggedIn={this.setIsLoggedIn} />;
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator headerMode={'none'}
                    animation={"fade"}
                    screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                        transitionSpec: {
                            open: config,
                            close: closeConfig,
                        }
                    }}>
                    {!this.state.isLoggedSetNow &&
                        <Stack.Screen name={ROUTES.EntryPoint} component={EntryPoint} />
                    }
                    <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
                    <Stack.Screen name={ROUTES.Signup} component={SignupScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }//end of beforeLogin

    render = () => {
        const { loading, isLoggedIn } = this.state;
        if (loading) {
            return (<View style={{ backgroundColor: colors.primary, flex: 1 }} />)
        }
        if (isLoggedIn) return this.afterLogin();
        else return this.beforeLogin();
    }//end oF RENDER 

    afterLogin = () => {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator headerMode={'none'}>
                    {!this.state.isLoggedSetNow &&
                        <Stack.Screen name={ROUTES.EntryPoint} component={EntryPoint} />
                    }
                    <Stack.Screen name={ROUTES.Selections} component={this.myTabs} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }//end of afterLogin

    myTabs = () => {
        return (
            <Tab.Navigator
                lazy
                sceneContainerStyle={{
                    borderBottomWidth: StyleSheet.hairlineWidth * 2,
                    borderBottomColor: "#e7e7e7",
                }}
                tabBar={props => <MyCustomTab {...props} />}>
                <Tab.Screen name={ROUTES.Selections} component={this.screenStack} />
                <Tab.Screen name={ROUTES.MyRecord} component={AllQuiz} />
                {/* <Tab.Screen name={ROUTES.Settings} component={Settings} />
                <Tab.Screen name={ROUTES.MyRecord1} component={MyRecord} /> */}
            </Tab.Navigator>
        );
    }//end of myTabs

    screenStack = () => {
        return (
            <Stack.Navigator headerMode={'none'}
                animation={"fade"}
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    }
                }}>
                <Stack.Screen name={ROUTES.Selections} component={Selections} />
                <Stack.Screen name={ROUTES.Grade} component={Grade} />

                <Stack.Screen name={ROUTES.Subject} component={Subject} />
                <Stack.Screen name={ROUTES.SubjectDetail} component={SubjectDetail} />
                <Stack.Screen name={ROUTES.Chapter} component={Chapter} />
                <Stack.Screen name={ROUTES.ChapterDetail} component={ChapterDetail} />

                <Stack.Screen name={ROUTES.Unit} component={Unit} />
                <Stack.Screen name={ROUTES.Quiz} component={Quiz} />
                <Stack.Screen name={ROUTES.UnitTextbook} component={UnitTextbook} />
                <Stack.Screen name={ROUTES.UnitTextbookList} component={UnitTextbookList} />
                <Stack.Screen name={ROUTES.Videos} component={Videos} />

                <Stack.Screen name={ROUTES.MCQ} component={MCQ} />
                <Stack.Screen name={ROUTES.Result} component={Result} />
                <Stack.Screen name={ROUTES.ShortQuestion} component={ShortQuestion} />
                <Stack.Screen name={ROUTES.Answers} component={Answers} />

                <Stack.Screen name={ROUTES.GeneralQuizCategory} component={QuizCategory} />
                <Stack.Screen name={ROUTES.GeneralAllQuiz} component={AllQuiz} />

                <Stack.Screen name={ROUTES.Settings} component={Settings} />

            </Stack.Navigator>
        )
    }

}//end of Class
