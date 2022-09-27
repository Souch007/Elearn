import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Animated, ListRenderItem, TouchableOpacity, Dimensions } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import Text from '../components/Text';
import colors from '../constants/colors';
import { IMLocalized } from '../locales/IMLocalization';
import GV from '../utils/GV';
import CustomButton from '../components/CustomButton';
import ColorEnum from '../constants/ColorEnum';
import FontSize from '../constants/FontSize';
//END OF IMPORT's

const WIDTH = Dimensions.get('screen').width;

interface componentInterface {
    renderItem?(item: any, index: any, boxWidth: any): any;
    data: any;

    emptyTitle?: any;
    emptyDescription?: any;

    reloadPress?: () => void;
}//end of INTERFACE 

export default class HorizontalList extends Component<componentInterface, any> {

    state = {
        scrollViewWidth: null,
    }

    public static defaultProps = {
        data: [],

        emptyTitle: IMLocalized(`No Data available!`),
        emptyDescription: IMLocalized(`There is no data to show you right now`),

        reloadPress: null,
    };//end of DEFAULT PROPS DECLARATION

    scrollViewRef = null;


    render = () => {
        const { data, emptyTitle, emptyDescription, reloadPress } = this.props;

        const scrollViewWidth = this.state.scrollViewWidth;
        const boxWidth = scrollViewWidth * 0.8;
        const boxDistance = scrollViewWidth - boxWidth;
        const halfBoxDistance = boxDistance / 2;

        const pan = new Animated.ValueXY();

        return (
            <View style={{
                minHeight: boxWidth,
                flexDirection: 'row',
                alignItems: "center",
            }}>
                {/* <TouchableOpacity style={{
                }}
                    disabled>
                    <CustomIcon
                        name={GV.isRTL ? "keyboard-arrow-right" : "keyboard-arrow-left"}
                        iconType={"MaterialIcons"}
                        size={30}
                        color={"#707070"}
                    />
                </TouchableOpacity> */}
                {data.length > 0 ?
                    <FlatList
                        horizontal
                        data={data}
                        style={{
                            minHeight: boxWidth + 32,
                        }}
                        contentContainerStyle={{
                            paddingVertical: 16,
                        }}
                        contentInsetAdjustmentBehavior="never"
                        snapToAlignment="center"
                        decelerationRate="fast"
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={1}
                        snapToInterval={boxWidth}
                        contentInset={{
                            left: halfBoxDistance,
                            right: halfBoxDistance,
                        }}
                        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
                        onLayout={(e) => {
                            this.setState({
                                scrollViewWidth: e.nativeEvent.layout.width / 2.8
                            })
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: pan.x } } }],
                            {
                                useNativeDriver: false,
                            },
                        )}
                        keyExtractor={(item, index) => `${index}-${item}`}
                        renderItem={this.renderItem} />
                    :
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, {
                            color: colors.get(ColorEnum.name.emptyTitle),
                            fontSize: FontSize.value(18),
                        }]}>{emptyTitle}</Text>
                        <Text style={[styles.emptyDescription, {
                            color: colors.get(ColorEnum.name.emptyDescription),
                            fontSize: FontSize.value(14),
                        }]}>{emptyDescription}</Text>
                        {reloadPress !== null &&
                            <CustomButton
                                title={IMLocalized(`Reload`)}
                                buttonStyle={styles.reloadButton}
                                onPress={reloadPress} />
                        }
                    </View>
                }
                {/* <TouchableOpacity style={{

                }}
                    disabled>
                    <CustomIcon
                        name={GV.isRTL ? "keyboard-arrow-left" : "keyboard-arrow-right"}
                        iconType={"MaterialIcons"}
                        size={30}
                        color={"#707070"}
                    />
                </TouchableOpacity> */}
            </View>
        )
    } // end of Function Render

    renderItem = ({ item, index }) => {

        const scrollViewWidth = this.state.scrollViewWidth;
        const boxWidth = scrollViewWidth * 0.8;
        const boxDistance = scrollViewWidth - boxWidth;
        const halfBoxDistance = boxDistance / 2;

        const pan = new Animated.ValueXY();

        return (
            <Animated.View
                style={{
                    // paddingHorizontal: index === 0 ? 0 : index === this.props.data.length - 1 ? 0 : 10,
                    paddingHorizontal: 10,
                    transform: [
                        {
                            scale: pan.x.interpolate({
                                inputRange: [
                                    (index - 1) * boxWidth - halfBoxDistance,
                                    index * boxWidth - halfBoxDistance,
                                    (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
                                ],
                                outputRange: [1, 1, 1],
                                // outputRange: [0.8, 1, 0.8], // scale down when out of scope
                                extrapolate: 'clamp',
                            }),
                        },
                    ],
                }}>
                {this.props.renderItem(item, index, boxWidth)}
            </Animated.View>
        )
    };

} //end of class HorizontalList


const styles = StyleSheet.create({
    primaryContainerStyle: {
        flexDirection: 'row',
        alignItems: "center",

    },
    emptyContainer: {
        width: "92%",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        color: `rgba(0,0,0,0.7)`,
        textAlign: "center",
    },
    emptyDescription: {
        color: `rgba(0,0,0,0.4)`,
        textAlign: "center",
    },
    reloadButton: {
        width: 80,
        marginVertical: 8,
    },
}); //end of StyleSheet STYLES
