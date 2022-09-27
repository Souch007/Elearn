import React from 'react';
import Entry from "../../assets/SVG/entry.svg";
const SVG_DEFAULT_SIZE = 200;

export default {

    SVG: {
        EntryScreen(height = SVG_DEFAULT_SIZE, width = SVG_DEFAULT_SIZE,) { return <Entry height={height} width={width} /> }
    },
    JPG: {
        entryScreen: require('../../assets/images/entry.png'),
        eImage: require('../../assets/images/eImage.png'),
        eImageWhite: require('../../assets/images/eImageWhite.png'),
        loginTop: require('../../assets/images/loginTop.png'),
        loginTopE: require('../../assets/images/loginTopE.png'),
    },
    ICON: {
        google: require('../../assets/icons/google.png'),
        play: require('../../assets/icons/play.png'),
    },
    BOTTOMTAB: {
        home: require('../../assets/icons/BottomTab/home.png'),
        list: require('../../assets/icons/BottomTab/list.png'),
        recent: require('../../assets/icons/BottomTab/recent.png'),
        user: require('../../assets/icons/BottomTab/user.png'),
    }
}//end of EXPORT DEFAULT

