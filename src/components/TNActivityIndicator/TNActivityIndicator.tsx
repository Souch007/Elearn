import { UIActivityIndicator } from 'react-native-indicators';
import styles from './styles';
import React, { Component } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Text from '../Text';
import FontSize from '../../constants/FontSize';
//END OF IMPORT's


interface componentInterface {
    loading?: boolean;
    text?: any;
}//end of INTERFACE 

export default class TNActivityIndicator extends Component<componentInterface, any> {

    public static defaultProps = {
        loading: false,
        text: '',

    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { loading, text } = this.props;

        if (loading === true) {


            return (
                <Modal visible={true}
                    transparent
                    supportedOrientations={['portrait', 'landscape']}

                    style={styles.modalContainer}>
                    <View style={styles.modalSecondaryContainer}>

                        {/* <View style={styles.container}> */}
                        <View style={styles.indicatorContainer}>
                            <UIActivityIndicator
                                color="#f5f5f5"
                                size={30}
                                animationDuration={400}
                            />
                            {(text && text.length > 1) ?
                                <Text style={[styles.text, {
                                    fontSize: FontSize.value(14),
                                }]}>{text}</Text>
                                : <View />}
                        </View>
                    </View>
                    {/* </View> */}
                </Modal>
            );
        } else {
            return <View />
        }
    } // end of Function Render

} //end of class TNActivityIndicator

