import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StepIndicator from '../../libs/react-native-step-indicator';
import colors from '../constants/colors';
import GetID from '../helper/GetID';
import GetNames from '../helper/GetNames';
import { IMLocalized } from '../locales/IMLocalization';
//END OF IMPORT's

const selectedColor = colors.primary;//"#fe7013";
const unSelectedColor = "#aaaaaa";

const customStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 15,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: selectedColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: selectedColor,
    stepStrokeUnFinishedColor: unSelectedColor,
    separatorFinishedColor: selectedColor,
    separatorUnFinishedColor: unSelectedColor,
    stepIndicatorFinishedColor: selectedColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: 'transparent',// selectedColor,
    stepIndicatorLabelFinishedColor: 'transparent',//'#ffffff',
    stepIndicatorLabelUnFinishedColor: 'transparent',//unSelectedColor,
    labelColor: '#999999',
    labelSize: 10,
    labelALign: "center",
    currentStepLabelColor: selectedColor
}

interface componentInterface {
    // currentPosition?: number;
    // total?: number;
    // data?: any;
}//end of INTERFACE 

interface IState {
}//end of INTERFACE 

interface all extends IState, componentInterface {

}//end of INTERFACE 


export default class StepProgress extends Component<all, any> {
    state = {
        currentPosition: 0,
        total: 6,
        data: [],
    };

    public static defaultProps = {
        // currentPosition: 0,
        // total: 6,
        // data: [{ name: '' }]
    };//end of DEFAULT PROPS DECLARATION

    componentDidMount = async () => {
        const schoolName = await GetNames.school();
        const gradeName = await GetNames.grade();
        const subjectName = await GetNames.subject();
        const subjectDetailName = await GetNames.subjectDetail();
        const chapterName = await GetNames.chapter();
        const chapterDetailName = await GetNames.chapterDetail();

        const newData = [];
        if (schoolName !== null) {
            newData.push(schoolName);
        }
        if (gradeName !== null) {
            newData.push(gradeName);
        }
        if (subjectName !== null) {
            newData.push(subjectName);
        }
        if (subjectDetailName !== null) {
            newData.push(subjectDetailName);
        }
        if (chapterName !== null) {
            newData.push(chapterName);
        }
        if (chapterDetailName !== null) {
            newData.push(chapterDetailName);
        }

        this.setState({
            currentPosition: newData.length - 1,
            total: newData.length,
            data: newData,
        })
    }//end of componentDidMount

    render = () => {
        const { currentPosition, total, data } = this.state;

        return (
            <View style={{ ...styles.containerStyle, }}>
                <StepIndicator
                    stepCount={total}
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={data}
                    onPress={(stepIndex) => {
                    }}
                />
            </View>
        )
    } // end of Function Render

} //end of class index


const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 10,
        marginBottom: 0,
        width: "100%",
        alignSelf: "center",

    }
}); //end of StyleSheet STYLES
