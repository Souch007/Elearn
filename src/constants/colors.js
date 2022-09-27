import GV from "../utils/GV"
import defaultColors from "./defaultColors";

const PRIMARY = "#007FC4";

export default {
    get(colorName) {
        if (GV.theme === null) return `${defaultColors[colorName]}`;

        return GV.theme.colors[colorName];
    },//end of colors

    primary: PRIMARY,
    background: "#fff",

    gradientDark: "#006EB9",
    gradientLight: "#54C1D5",
    gradient3: PRIMARY,

    black: "#000",
    white: "#fff",

    loginTopBGColor: "#007EC4",

    header: PRIMARY,
    statusbar: PRIMARY,

    heading1: "#58595B",

}