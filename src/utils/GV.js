import { I18nManager } from "react-native";
import { Appearance } from "react-native-appearance";
import { MyDefaultTheme } from "../../App";

export default {

    theme: null,

    isRTL: I18nManager.isRTL,

    isDark: null,

    userID: null,
    authToken: null,

    routeClass: null,
    tabClass: null,

    fontSize: null,


    //NAVIGATION DATA

    school: null,
    grade: null,
    subject: null,
    subjectDetail: null,

    chapter: null,
    chapterDetail: null,
    textbook: null,
    video: null,
    quiz: null,
    mcq: null,
    long: null,
    short: null,


    resetAll() {
        return new Promise((resolve) => {
            this.school = null;
            this.grade = null;
            this.subject = null;
            this.subjectDetail = null;

            this.chapter = null;
            this.chapterDetail = null;
            this.textbook = null;
            this.video = null;
            this.quiz = null;
            this.mcq = null;
            this.long = null;
            this.short = null;
            resolve(true);
        })//end of PROMISE
    },//end of resetAll

}//end of EXPORT DEFAULT
