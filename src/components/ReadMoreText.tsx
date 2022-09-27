import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import colors from "../constants/colors";
import FontFamily from "../constants/FontFamily";
import { IMLocalized } from "../locales/IMLocalization";
import GV from "../utils/GV";

interface componentInterface {
    onReady?(): void;

    numberOfLines?: number;

    textStyle?: StyleProp<TextStyle>;

    renderTruncatedFooter?(_handlePressReadMore: any): any;

    renderRevealedFooter?(_handlePressReadLess: any): any;

    readMorePress(): any;
    readLessPress(): any;

    shouldExtend?: boolean;
}//end of INTERFACE 

export default class ReadMoreText extends React.Component<componentInterface, any> {

    public static defaultProps = {
        numberOfLines: 2.5,

        readMorePress() { },
        readLessPress() { },

        shouldExtend: true,
    };//end of DEFAULT PROPS DECLARATION

    state = {
        measured: false,
        shouldShowReadMore: false,
        showAllText: false
    };

    _isMounted = true;
    _text = null;

    async componentDidMount() {
        this._isMounted = true;
        await nextFrameAsync();

        if (!this._isMounted) {
            return;
        }

        // Get the height of the text with no restriction on number of lines
        const fullHeight = await measureHeightAsync(this._text);
        this.setState({ measured: true });
        await nextFrameAsync();

        if (!this._isMounted) {
            return;
        }

        // Get the height of the text now that number of lines has been set
        const limitedHeight = await measureHeightAsync(this._text);

        if (fullHeight > limitedHeight) {
            this.setState({ shouldShowReadMore: true }, () => {
                this.props.onReady && this.props.onReady();
            });
        } else {
            this.props.onReady && this.props.onReady();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { measured, showAllText } = this.state;

        let { numberOfLines } = this.props;

        return (
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                <Text
                    numberOfLines={measured && !showAllText ? numberOfLines : 0}
                    style={[this.props.textStyle, {
                        ...!GV.isRTL && { fontFamily: FontFamily.Regular }
                    }]}
                    ref={text => {
                        this._text = text;
                    }}
                >
                    {this.props.children}
                </Text>

                {this._maybeRenderReadMore()}
            </View>
        );
    }

    _handlePressReadMore = () => {
        if (this.props.shouldExtend) {
            this.setState({ showAllText: true });
        }


        this.props.readMorePress();
    };

    _handlePressReadLess = () => {
        this.setState({ showAllText: false });

        this.props.readLessPress();
    };

    _maybeRenderReadMore() {
        let { shouldShowReadMore, showAllText } = this.state;

        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this._handlePressReadMore);
            }

            return (
                <Text style={styles.button} onPress={this._handlePressReadMore}>
                    {IMLocalized(`Read more`)}
                </Text>
            );
        } else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooter) {
                return this.props.renderRevealedFooter(this._handlePressReadLess);
            }

            return (
                <Text style={styles.button} onPress={this._handlePressReadLess}>
                    {IMLocalized(`Hide`)}
                </Text>
            );
        }
    }
}

function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve(true)));
}

const styles = StyleSheet.create({
    button: {
        color: colors.primary,
        textAlign: "left",
        // marginTop: 5
    }
});