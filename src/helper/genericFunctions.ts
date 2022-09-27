import { Dimensions, Platform, StatusBar, Linking } from 'react-native';

export function emptyValidate(text) {
    if (text === "" || text === " " || text === "null" || text === null || text === "undefined" || text === undefined || text === false || text === "false") {
        return false;
    }
    else {
        return true;
    }
};//end of emptyValidate/
export function hexToRgbA(hex, opacity) {
    var c;
    var op = opacity ? opacity : 100;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {

        if (op > 100 || op < 0) {
            throw new Error('Bad Opacity');
        }
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + op / 100 + ')';
    }
    throw new Error('Bad Hex');
}//end of hexToRgbA

export default {
    emptyValidate(text) {
        if (text === "" || text === " " || text === "null" || text === null || text === "undefined" || text === undefined || text === false || text === "false") {
            return false;
        }
        else {
            return true;
        }
    },//end of emptyValidate
    sleep(second) {
        return new Promise(resolve => {
            let ms = Number(second) * Number(1000);
            setTimeout(resolve, ms)
        });
    },//end of sleep
    hexToRgbA(hex, opacity) {
        var c;
        var op = opacity ? opacity : 100;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {

            if (op > 100 || op < 0) {
                throw new Error('Bad Opacity');
            }
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + op / 100 + ')';
        }
        throw new Error('Bad Hex');
    },//end of hexToRgbA
    priceWithCommas(numberP) {
        let number = numberP;
        if (typeof number === "string") {
            if (number.includes("$")) {
                number = Number(number.split("$")[1].trim());
            } else {
                number = Number(number.trim());
            }
        }
        if (typeof number === "number") {
            let x = number;
            const price = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${price}`;
        }




        throw new Error('Not Number');
    },//end of priceWithCommas
    getHeightWidthOrientation(event) {
        let windowHeight = Dimensions.get('window').height;
        let windowWidth = Dimensions.get('window').width;

        let { width, height } = event.nativeEvent.layout;
        let orientation = "portrait";

        if (windowWidth > windowHeight) {
            orientation = "landscape";
        }
        let res = {};
        res["orientation"] = orientation;
        res["width"] = width;
        res["height"] = height;
        res["borderRadius"] = height / 2;
        return res;
    },//end of getHeightWidthOrientation
    RandomString(length, format) {
        const leng = length ? length : 10;
        const chars = format ? format : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~@!#$%|^';
        var result = '';
        for (var i = leng; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
        // Usage Example

        // randomString(16, 'aA')
        // randomString(32, '#aA')
        // randomString(64, '#A!')
        // var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    },//end of RandomString
    RandomID(length, format) {
        const leng = length ? length : 5;
        const chars = format ? format : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = leng; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
        // Usage Example

        // randomString(16, 'aA')
        // randomString(32, '#aA')
        // randomString(64, '#A!')
        // var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    },//end of RandomID
    guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },//end of guidGenerator

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },//end of getRandomInt

    getMonthNameNumber(date = new Date()) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = date;
        return {
            number: d.getMonth(),
            name: months[d.getMonth()]
        };
    },//end of getMonthNameNumber
    getYear(date = new Date()) {
        return date.getFullYear();
    },//end of getYear
    getDate(date = new Date()) {
        return date.getDate();
    },//end of getDate
    firebaseString(length, format) {
        const leng = length ? length : 20;
        const chars = format ? format : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = leng; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
        // Usage Example

        // randomString(16, 'aA')
        // randomString(32, '#aA')
        // randomString(64, '#A!')
        // var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    },//end of firebaseString
    titleCase(text) {
        let str = text;
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    },//end of titleCase
    upperCase(text) {
        return text.toUpperCase();
    },//end of upperCase
    lowerCase(text) {
        return text.toLowerCase();
    },//end of lowerCase
    removeAllSpaces(text) {
        return text.replace(/\s/g, '')
    },//end of removeAllSpaces
    openURL(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    },//end of openURL
    RandomColorHex() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    },//end of RandomColorHex
    mapFirstCharacter(array, keyName) {
        return new Promise((resolve) => {
            let newArray = [];
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                let name = element[keyName];
                name = name.replace(/\s/g, '');
                newArray.push({
                    ...element,
                    firstCharacter: name.charAt(0).toUpperCase()
                });
            }//end of I
            resolve(newArray)
        })//end of PROMISE
    },//end of mapFirstCharacterWithNestedArray

    mapFirstCharacterWithNestedArray(array, arrayName, keyName) {
        return new Promise((resolve) => {
            let newArray = [];
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                let newNestedArray = [];
                for (let j = 0; j < element[arrayName].length; j++) {
                    const nestedElement = element[arrayName][j];
                    let name = nestedElement[keyName];
                    name = name.replace(/\s/g, '');
                    newNestedArray.push({
                        ...nestedElement,
                        firstCharacter: name.charAt(0).toUpperCase()
                    });
                }//end of J
                element[arrayName] = newNestedArray;
                newArray.push(element);
            }//end of I
            resolve(newArray)
        })//end of PROMISE
    },//end of mapFirstCharacterWithNestedArray



    getStatusBarHeight(skipAndroid = false) {
        getStatusBarHeight(skipAndroid);
    },//end of getStatusBarHeight

    isIPhoneX() {
        isIPhoneX();
    },//end of isIPhoneX

    isIPhoneXMax() {
        isIPhoneXMax();
    },//end of isIPhoneXMax

    isValidURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    },//end of isValidURL

    stringToBoolean(string) {
        string = string.replace('.0', '');

        switch (string.toLowerCase().trim()) {

            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(string);
        }
    },//end of stringToBoolean

    getHourMinSecond(date_future, date_now) {
        // get total seconds between the times
        var delta = Math.abs(date_future - date_now) / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var seconds = delta % 60;  // in theory the modulus is not required
        if (hours !== 0) {
            return `${hours.toFixed(0)}h ${minutes.toFixed(0)}m ${seconds.toFixed(0)}s`;
        } else if (minutes !== 0) {
            return `${minutes.toFixed(0)}m ${seconds.toFixed(0)}s`;
        } else if (seconds !== 0) {
            return `${seconds.toFixed(0)}s`;
        } else {
            return `0s`;
        }

    },//end of getHourMInSeciond

    isNumeric(value) {
        return /^-?\d+$/.test(value);
    },//end of isNumeric

    englishToArabicNumber(s) { return s.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) },

    keyExtractor() {
        return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString();
    },//end of keyExtractor

}//end of EXPORT DEFAULT



const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhoneWithMonobrow_v = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneX_v = true;
    }

    if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneXMax_v = true;
    }
}

const isIPhoneX = () => isIPhoneX_v;
const isIPhoneXMax = () => isIPhoneXMax_v;
const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;



function getStatusBarHeight(skipAndroid) {
    return Platform.select({
        ios: isIPhoneWithMonobrow_v ? 44 : 20,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0
    })
}


