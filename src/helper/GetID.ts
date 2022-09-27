import GV from "../utils/GV"
import { emptyValidate } from "./genericFunctions";

export default {

    schoolID() {
        if (GV.school === null) return null;

        const id = GV.school.id;
        return emptyValidate(id) ? id : null;
    },//end of schoolID

    gradeID() {
        if (GV.grade === null) return null;

        const id = GV.grade.id;
        return emptyValidate(id) ? id : null;
    },//end of gradeID

    gradeName() {
        if (GV.grade === null) return ''


        const name = GV.grade.title;
        return emptyValidate(name) ? name : '';
    },//end of gradeName

    subjectID() {
        if (GV.subject === null) return null

        const id = GV.subject.id;
        return emptyValidate(id) ? id : null;
    },//end of subjectID

    subjectName() {
        if (GV.subject === null) return ''

        const name = GV.subject.title;
        return emptyValidate(name) ? name : '';
    },//end of subjectName

    subjectDetailID() {
        if (GV.subjectDetail === null) return null

        const id = GV.subjectDetail.id;
        return emptyValidate(id) ? id : null;
    },//end of subjectDetail

    chapterID() {
        if (GV.chapter === null) return null

        const id = GV.chapter.id;
        return emptyValidate(id) ? id : null;
    },//end of chapterID

    chapterName() {
        if (GV.chapter === null) return ''

        const name = GV.chapter.title;
        return emptyValidate(name) ? name : '';
    },//end of chapterName

    chapterDetailID() {
        if (GV.chapterDetail === null) return null

        const id = GV.chapterDetail.id;
        return emptyValidate(id) ? id : null;
    },//end of chapterDetailID

    chapterDetailName() {
        if (GV.chapterDetail === null) return ''

        const name = GV.chapterDetail.title;
        return emptyValidate(name) ? name : '';
    },//end of chapterDetailName

}//end of EXPORT DEFAULT