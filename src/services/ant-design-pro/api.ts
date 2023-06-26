// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { API } from '@/services/ant-design-pro/typings';
/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**查询用户接口 Get /api/user/search */
export async function searchUsers(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/user/search', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

/** 修改用户接口 POST /api/user/login */
export async function modifyUser(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户接口 POST /api/user/delete */
export async function deleteUser(body: number, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**查询问卷 Get /api/survey/search */
export async function searchSurveys(options?: { [key: string]: any }) {
  return request<API.Survey>('/api/survey/search', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

/** 删除问卷接口 POST /api/survey/delete */
export async function deleteSurvey(body: number, options?: { [key: string]: any }) {
  return request<API.Survey>('/api/survey/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改问卷接口 POST /api/survey/login */
export async function modifySurvey(body: API.Survey, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/survey/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**查询项目接口 Get /api/project/search */
export async function searchProjects(options?: { [key: string]: any }) {
  return request<API.Project>('/api/project/search', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

/** 删除项目接口 POST /api/project/delete */
export async function deleteProject(body: number, options?: { [key: string]: any }) {
  return request<API.Project>('/api/project/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新项目接口 POST /api/project/login */
export async function modifyProject(body: API.Project, options?: { [key: string]: any }) {
  return request<API.Project>('/api/project/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建项目接口 POST /api/project/create */
export async function createProject(body: API.Project, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/project/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建问卷接口 POST /api/survey/create */
export async function createSurvey(body: API.addSurveyRequest, options?: { [key: string]: any }) {
  return request<boolean>('/api/survey/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    params: options,
    ...(options || {}),
  });
}

/** 获取问卷数据 GET /api/survey/getSurveyById */
export async function getSurveyById(options?: { [key: string]: any }) {
  return request<API.addSurveyRequest>('/api/survey/getSurveyById', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

/** 获取答案数据 GET /api/answer/getAnswerById */
export async function getAnswerById(options?: { [key: string]: any }) {
  return request<API.AnswerData>('/api/answer/getAnswerById', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

/** 获取问卷数据 GET /api/answer/getAnswers */
export async function getAnswers(options?: { [key: string]: any }) {
  return request<API.Answersheet>('/api/answer/getAnswers', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}
