import GV from "../utils/GV"
import { emptyValidate } from "./genericFunctions";

export default {
    school() {
        if (GV.school === null) return null;

        const name = GV.school.name;
        return emptyValidate(name) ? name : '';
    },//end of schoolName


    grade() {
        if (GV.grade === null) return null;


        const name = GV.grade.title;
        return emptyValidate(name) ? name : '';
    },//end of gradeName

    subject() {
        if (GV.subject === null) return null

        const name = GV.subject.title;
        return emptyValidate(name) ? name : '';
    },//end of subjectName

    subjectDetail() {
        if (GV.subjectDetail === null) return null;

        const name = GV.subjectDetail.title;
        return emptyValidate(name) ? name : '';
    },//end of subjectDetailName

    chapter() {
        if (GV.chapter === null) return null;

        const name = GV.chapter.title;
        return emptyValidate(name) ? name : '';
    },//end of chapterName

    chapterDetail() {
        if (GV.chapterDetail === null) return null;

        const name = GV.chapterDetail.title;
        return emptyValidate(name) ? name : '';
    },//end of chapterDetailName

}//end of EXPORT DEFAULT