enum GENERAL_CATEGORY_TYPE { MCQ = "MCQ", Short = "Short", Long = "Long" }
enum GENERAL_CATEGORY_TYPE_NO { MCQ = "1", Short = "2", Long = "3" }

enum QUIZ_TYPE { GeneralQuiz = "GeneralQuiz", TopicQuiz = "Topic Quiz" }

enum QUIZ_TYPE_NO { GeneralQuiz = "1", TopicQuiz = "2" }

enum QUIZ_STATUS { Idle = "0", inProgress = "1", pause = "2", done = "3", skip = "4" }

enum API_LANGUAGE_TYPE { English = "English", Urdu = "Urdu" }

enum APP_MODE { dark = "Dark", light = "Light" }

enum LOGIN_TYPE { google = "google", normal = "normal" }

export default {
    GENERAL_CATEGORY_TYPE,

    GENERAL_CATEGORY_TYPE_NO,

    QUIZ_TYPE,

    QUIZ_TYPE_NO,

    QUIZ_STATUS,

    API_LANGUAGE_TYPE,

    APP_MODE,

    LOGIN_TYPE,
}//end of EXPORT DEFAULT