import GV from "../utils/GV";
import FontFamily from "./FontFamily";

export default {
    heading: {
        color: "#58595B",
        ...!GV.isRTL && { fontFamily: FontFamily.Bold },
        marginTop: 20,
        marginBottom: 10,
        textAlign: "left",
        marginHorizontal: 20,
    }
}