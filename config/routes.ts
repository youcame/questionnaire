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
    name: '管理页面',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/userManage', component: './Admin/UserManage', name: '用户管理'},
      { path: '/admin/projectManage', component: './Admin/ProjectManage', name: '项目管理'},
      { path: '/admin/questionnaireManage', component: './Admin/QuestionnairManage', name: '问卷管理'},
      { path: '/admin/answeredSurvey', component: './Admin/AnsweredSurvey'},
      { path: '/admin/test', component: './Admin/TestA', name: '测试'},
      { path: '/admin/questionnaireCreate', component: './Admin/QuestionnaireCreate'},
      { path: '/admin/seeQuestionnaire', component: './Admin/SeeQuestionnaire'},
      { component: './404' },
    ],
  },
  //{ name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
