import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Keyboard,
    LayoutAnimation,
    View,
    Dimensions,
    ViewPropTypes,
    Platform,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0,
    },
});

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
    duration: 500,
    create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200
    }
};

export default class KeyboardSpacer extends Component {
    static propTypes = {
        topSpacing: PropTypes.number,
        onToggle: PropTypes.func,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        topSpacing: 0,
        onToggle: () => null,
    };

    _listeners = null;

    state = {
        keyboardSpace: 0,
        isKeyboardOpened: false
    };

    constructor(props: any, context: any) {
        super(props, context);

        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentDidMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        //@ts-ignore
        this._listeners = [
            Keyboard.addListener(updateListener, this.updateKeyboardSpace),
            Keyboard.addListener(resetListener, this.resetKeyboardSpace)
        ];
    }

    componentWillUnmount() {
        //@ts-ignore
        this._listeners.forEach((listener: any) => listener.remove());
    }

    updateKeyboardSpace(event: any) {
        if (!event.endCoordinates || this.state.isKeyboardOpened) {
            return;
        }

        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            //@ts-ignore
            animationConfig = LayoutAnimation.create(
                event.duration,
                //@ts-ignore
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        // get updated on rotation
        const screenHeight = Dimensions.get('window').height;
        // when external physical keyboard is connected
        // event.endCoordinates.height still equals virtual keyboard height
        // however only the keyboard toolbar is showing if there should be one
        //@ts-ignore
        const keyboardSpace = (screenHeight - event.endCoordinates.screenY);

        // const keyboardSpace = (screenHeight - event.endCoordinates.screenY) + this.props.topSpacing;
        this.setState({
            keyboardSpace,
            isKeyboardOpened: true
            //@ts-ignore
        }, this.props.onToggle(true, keyboardSpace));
    }

    resetKeyboardSpace(event: any) {
        if (!this.state.isKeyboardOpened) {
            return;
        }

        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            //@ts-ignore
            animationConfig = LayoutAnimation.create(
                event.duration,
                //@ts-ignore
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        this.setState({
            keyboardSpace: 0,
            isKeyboardOpened: false
            //@ts-ignore
        }, this.props.onToggle(false, 0));
    }

    render() {
        if (Platform.OS === "android") {
            //@ts-ignore
            return (<View style={[this.props.style]} />);
        }
        else {
            //@ts-ignore
            return (<View style={[styles.container, { height: this.state.keyboardSpace }, this.props.style]} />);
        }

    }
}