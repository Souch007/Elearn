import appFunctions from "../helper/appFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";
import GV from "../utils/GV";
import AppEnum from "../helper/AppEnum";
import ENV from "../utils/ENV";

export default {
    get(param: any = {}) {
        return new Promise(async (resolve: ({ data: [], videoIDArray: [] }) => void, reject) => {
            param["type"] = GV.isRTL ? AppEnum.API_LANGUAGE_TYPE.Urdu : AppEnum.API_LANGUAGE_TYPE.English;

            const res = await ApiManager.POST(`${ApiClasses.allVideos}`, param);
            if (typeof res === "object") {
                if ("internetIssue" in res) {
                    if (res.internetIssue === true) {
                        reject(false);
                        return;
                    }
                }
            }//end of IF INTERNET CHECK

            if (res) {
                const isOK = ("status" in res ? res.status : false).toString();
                if (isOK === "true") {
                    const newData = res.message.map(e => ({
                        id: e.id,
                        title: e.title,
                        languageType: e.type,
                        path: `${e.url}`,
                        videoID: `${youtube_parser(e.url)}`,
                        thumbnail: `https://img.youtube.com/vi/${youtube_parser(e.url)}/0.jpg`,
                        topicID: e.topic_id,
                        source: e.source,
                        credit: e.credit,

                        createdAt: e.createdDate,
                        updatedAt: e.modifiedDate,
                    }));

                    const videoIDArray = [];
                    for (let i = 0; i < newData.length; i++) {
                        const videoID = youtube_parser(newData[i].path);
                        videoIDArray.push(videoID);
                    }//end of LOOP I

                    resolve({ data: newData, videoIDArray: videoIDArray, });
                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg)
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of  get

}//end of EXPORT DEFAULT

const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}//end of youtube_oarser