import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Text from '../components/Text';
import colors from '../constants/colors';
import FontSize from '../constants/FontSize';
import LocalAssets from "../constants/LocalAssets";
import { IMLocalized } from '../locales/IMLocalization';
import GV from '../utils/GV';
import ROUTES from './ROUTES';

export const MyCustomTab = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                GV.tabClass = navigation;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                let imageSource = null;
                let title = '';
                if (label === ROUTES.MyRecord) {
                    imageSource = LocalAssets.BOTTOMTAB.recent;
                    title = IMLocalized(`Quiz List`);
                } else if (label === ROUTES.MyRecord1) {
                    imageSource = LocalAssets.BOTTOMTAB.list;
                    title = IMLocalized(`Record 1`);
                } else if (label === ROUTES.Settings) {
                    imageSource = LocalAssets.BOTTOMTAB.user;
                    title = IMLocalized(`Setting`);
                } else {
                    imageSource = LocalAssets.BOTTOMTAB.home;
                    title = IMLocalized(`Home`);
                }

                return imageSource === null ? (<View key={index} />) : (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        activeOpacity={1}
                        style={styles.container}>


                        <Image
                            source={imageSource}
                            style={[styles.image, {
                                tintColor: isFocused ? '#fff' : `rgba(255,255,255,0.5)`
                            }]}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{
                            ...styles.text,
                            fontSize: FontSize.value(12),
                            color: isFocused ? '#fff' : `rgba(255,255,255,0.5)`,
                        }}>{title}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}//end of customTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 12,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowColor: '#000000',
        elevation: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: 20,
        width: 20,
    },
    text: {

        marginTop: 6,
        marginBottom: -6,
    },
})