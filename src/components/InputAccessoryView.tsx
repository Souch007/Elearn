import React, { Component } from 'react';
import { Platform, StyleSheet, View, InputAccessoryView as RNInputAccessoryView, Button as RNButton, Keyboard, Dimensions } from 'react-native';
//END OF IMPORT's

interface componentInterface {
    inputAccessoryViewID?: any;
}//end of INTERFACE 

export default class InputAccessoryView extends Component<componentInterface, any> {

    public static defaultProps = {
        inputAccessoryViewID: 'uniqueID',
    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { inputAccessoryViewID } = this.props;
        return Platform.OS === "ios" ? (
            <RNInputAccessoryView
                nativeID={inputAccessoryViewID}
                style={styles.accessory}>
                <View style={{
                    ...styles.accessory
                }}>
                    <RNButton
                        onPress={() => { Keyboard.dismiss() }}
                        title="Done"
                    />
                </View>
            </RNInputAccessoryView>

        ) : <View />
    } // end of Function Render

} //end of class InputAccessoryView


const styles = StyleSheet.create({
    containerStyle: {
    },
    accessory: {
        borderTopWidth: 0.3,
        borderTopColor: `rgba(0,0,0,0.2)`,

        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
        // backgroundColor: 'red',
    },
}); //end of StyleSheet STYLES
