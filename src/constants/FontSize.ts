import { Platform } from "react-native";
import GV from "../utils/GV"

const DEFAULT_SIZE = 12;

export default {

    DEFAULT_SIZE,

    value(size: number = 12) {
        const fs: any = parseInt(GV.fontSize);

        if (Platform.OS === "ios") size = size - 2;

        const diff = Math.abs(DEFAULT_SIZE - size);

        if (fs > 12) {
            return size + diff;

        } else if (fs < 12) {

        } else {
            return size;
        }

    },//end of value

}//end of EXPORT DEFAULT