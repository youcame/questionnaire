// @ts-ignore
/* eslint-disable */

import {numberlike} from "moment";

declare namespace API {
  /**
   * 一道问题的答案
   */
  type AnsQuestions = {
    id: number;
    ans: Array<number>;
  }

  /**
   * 回答的问题答案
   */
  type ReturnAnsQuestions = {
    id?: number;
    questions: Array<AnsQuestions>;
  }
  /**
   * 记录用户的答案
   */
  type recordUserAnswer = {
    id: number,
    surveyId: number,
    userAccount: string,
    questions: Array<{
      id:number,
      ans:number
    }>
  };

  type Project = {
    id?: number;
    projectName?: string;
    projectDescription?: string;
    userId?: number;
    createBy?: string;
    createTime?: Date;
    updateTime?: Date;
    updateBy?: string;
  }
  type Survey = {
    id?: number;
    surveyType?: number;
    surveyName?: string;
    description?: string;
    finishUserId?: number;
    surveyStatus?: number;
    url?: string;
    canFinishTime?: string;
    totalTimes?: string;
    nowTimes?: string;
    canFinishUserId?: string;
    createTime?: Date;
    updateTime?: Date;
    deleteTime?: Date;
  }
  type CurrentUser = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: number;
    email?: string;
    userStatus?: number;
    createTime?: Date;
    userRole?: number;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    password?: string;
    checkPassword?: boolean;
  };

  type ModifyUserParams = {
    userRole?: number;
    avatarUrl?: string;
    userStatus?: number;
    userEmail?: string;
    userPhone?: string;
    username?: string;
    gender?: number;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type addSurveyRequest = {
    surveyName: string,
    surveyDescription: string,
    surveyType: number,
    relate: number,
    addQuestion: Array<{
      questionId: number,
      questionType: number,
      questionName: string,
      questionDescription: string,
      options: Array<{
        destination: number,
        option: string,
      }>
    }
    >
  };

  type AnswerData = {
    id: number;
    surveyName: string;
    surveyDescription: string;
    userAccount: string;
    questions: Array<QuestionData>;
  };

  type QuestionData = {
    id: number;
    questionDescription: string;
    options: Array<OptionData>;
    userAnswer: Array<string>;
  };

  type OptionData = {
    id: number;
    label: string;
  };

  type Answersheet = {
    userAccount?: string;
    id?: number;
    surveyId?: number;
    userId?: number;
  }
}
