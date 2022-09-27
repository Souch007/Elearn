import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import Text from '../components/Text';
import ColorEnum from '../constants/ColorEnum';
import colors from '../constants/colors';
import FontSize from '../constants/FontSize';
import { IMLocalized } from '../locales/IMLocalization';
//END OF IMPORT's


interface componentInterface {
    emptyTitle?: any;
    emptyDescription?: any;

    reloadPress?: () => void;

    center?: boolean;
}//end of INTERFACE 


export default class Empty extends Component<componentInterface, any> {

    public static defaultProps = {
        emptyTitle: IMLocalized(`No Data available!`),
        emptyDescription: IMLocalized(`There is no data to show you right now`),

        reloadPress: null,

        center: false,
    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { emptyTitle, emptyDescription, reloadPress, center } = this.props;

        return (
            <View style={{
                ...styles.emptyContainer,
                ...center ? {
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    flex: 1,
                } : {},
            }}>
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
        )
    } // end of Function Render

} //end of class Empty


const styles = StyleSheet.create({
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
