// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addSurvey POST /api/survey/create */
export async function addSurveyUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addSurveyUsingPOSTParams,
  body: API.AddSurveyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/survey/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteSurvey POST /api/survey/delete */
export async function deleteSurveyUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/survey/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getSurveyById GET /api/survey/getSurveyById */
export async function getSurveyByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSurveyByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAddSurveyRequest_>('/api/survey/getSurveyById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getSurveyList GET /api/survey/search */
export async function getSurveyListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSurveyListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSurvey_>('/api/survey/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateSurvey POST /api/survey/update */
export async function updateSurveyUsingPOST(
  body: API.ModifySurveyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/survey/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
