import {currentUser} from "@/services/ant-design-pro/api";

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './user/Login' },
      { path: '/user/register', component: './user/Register' },
      { component: './404' }],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: "欢迎"},
  {
    path: '/admin',
    name: '主页面',
    icon: 'user',
    component: './Admin',
    routes: [
      { path: '/admin/userManage', component: './Admin/UserManage', name: '用户管理', access: 'canAdmin'},
      { path: '/admin/projectManage', component: './Admin/ProjectManage', name: '项目管理'},
      { path: '/admin/questionnaireManage', component: './Admin/QuestionnairManage', name: '问卷管理'},
      { path: '/admin/answeredSurvey', component: './Admin/AnsweredSurvey'},
      { path: '/admin/questionnaireCreate', component: './Admin/QuestionnaireCreate'},
      { path: '/admin/seeQuestionnaire', component: './Admin/SeeQuestionnaire'},
      { path: '/admin/seeAnswer', component: './Admin/SeeAnswer'},
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
