import moment from "moment"

export default {
    time(date: any = new Date(), format: any = "hh:mm A") {
        const ts = this.convertToTimestamp(date);
        const newTime = moment(ts).format(format);
        return newTime;
    },//end of TIME

    dateTime(date: any = new Date(), format: any = "DD-MMMM-YYYY hh:mm A") {
        const ts = this.convertToTimestamp(date);
        const newTime = moment(ts).format(format);
        return newTime;
    },//end of TIME

    convertToTimestamp(date: any = new Date()) {
        return new Date(date).getTime();
    },//end of convertToTimestamp


    //APP ONLY
    dbTimeToTS(dateString: any = "2021-06-05 17:42:36") {
        //OLD  '17-09-2013 10:08' 

        let dateTimeParts = dateString.split(' '),
            timeParts = dateTimeParts[1].split(':'),
            dateParts = dateTimeParts[0].split('-'),
            date;

        date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);

        return date.getTime();
    },
}//end of EXPORT DEFAULT