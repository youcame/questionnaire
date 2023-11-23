declare namespace API {
  type AddSurveyRequest = {
    addQuestion?: QuestionRequest[];
    projectId?: number;
    relate?: string;
    surveyDescription?: string;
    surveyName?: string;
    surveyType?: string;
  };

  type addSurveyUsingPOSTParams = {
    /** id */
    id?: number;
  };

  type AnswerRequest = {
    id?: number;
    projectId?: number;
    questions?: QuestionDTO[];
    surveyDescription?: string;
    surveyName?: string;
  };

  type Answersheet = {
    id?: number;
    questionID?: number;
    selectChoices?: string;
    surveyId?: number;
    userAccount?: string;
    userId?: number;
  };

  type BaseResponseAddSurveyRequest_ = {
    code?: number;
    data?: AddSurveyRequest;
    description?: string;
    message?: string;
  };

  type BaseResponseAnswerRequest_ = {
    code?: number;
    data?: AnswerRequest;
    description?: string;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    description?: string;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponseListAnswersheet_ = {
    code?: number;
    data?: Answersheet[];
    description?: string;
    message?: string;
  };

  type BaseResponseListProject_ = {
    code?: number;
    data?: Project[];
    description?: string;
    message?: string;
  };

  type BaseResponseListSurvey_ = {
    code?: number;
    data?: Survey[];
    description?: string;
    message?: string;
  };

  type BaseResponseListUser_ = {
    code?: number;
    data?: User[];
    description?: string;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponseProject_ = {
    code?: number;
    data?: Project;
    description?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    description?: string;
    message?: string;
  };

  type getAnswerByIdUsingGETParams = {
    /** id */
    id?: number;
    /** userId */
    userId?: number;
  };

  type getAnswersUsingGETParams = {
    /** surveyId */
    surveyId?: number;
  };

  type getProjectListUsingGETParams = {
    /** createBy */
    createBy?: string;
    /** projectDescription */
    projectDescription?: string;
    /** projectName */
    projectName?: string;
  };

  type getSurveyByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSurveyListUsingGETParams = {
    /** description */
    description?: string;
    /** projectId */
    projectId?: number;
    /** surveyName */
    surveyName?: string;
    /** surveyType */
    surveyType?: string;
  };

  type ModifySurveyRequest = {
    canFinishTime?: string;
    description?: string;
    id?: number;
    surveyName?: string;
    surveyStatus?: number;
    surveyType?: number;
    totalTimes?: number;
  };

  type ModifyUserRequest = {
    avatarUrl?: string;
    email?: string;
    gender?: number;
    id?: number;
    phone?: string;
    userRole?: number;
    userStatus?: number;
    username?: string;
  };

  type OptionDTO = {
    id?: number;
    label?: string;
  };

  type OptionRequest = {
    destination?: string;
    option?: string;
  };

  type Project = {
    createBy?: string;
    createTime?: string;
    id?: number;
    projectDescription?: string;
    projectName?: string;
    updateBy?: string;
    updateTime?: string;
    userId?: number;
  };

  type QuestionDTO = {
    id?: number;
    options?: OptionDTO[];
    questionDescription?: string;
    statistics?: string;
    userAnswer?: string[];
  };

  type QuestionRequest = {
    options?: OptionRequest[];
    questionDescription?: string;
    questionId?: number;
    questionType?: number;
  };

  type Questions = {
    ans?: number[];
    id?: number;
  };

  type RecordUserAnswerRequest = {
    id?: number;
    questions?: Questions[];
    surveyId?: number;
    userAccount?: string;
  };

  type searchUsersUsingGETParams = {
    /** userAccount */
    userAccount?: string;
    /** username */
    username?: string;
  };

  type Survey = {
    canFinishTime?: string;
    canFinishUserId?: number;
    createTime?: string;
    deleteTime?: string;
    description?: string;
    finishUserId?: number;
    id?: number;
    isDelete?: number;
    nowTimes?: number;
    projectId?: number;
    surveyName?: string;
    surveyStatus?: number;
    surveyType?: number;
    totalTimes?: number;
    updateTime?: string;
    url?: string;
  };

  type User = {
    avatarUrl?: string;
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    password?: string;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userRole?: number;
    userStatus?: number;
    username?: string;
  };

  type UserLoginRequest = {
    password?: string;
    userAccount?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    password?: string;
    userAccount?: string;
  };
}
