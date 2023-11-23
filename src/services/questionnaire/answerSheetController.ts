// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAnswerById GET /api/answer/getAnswerById */
export async function getAnswerByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnswerByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAnswerRequest_>('/api/answer/getAnswerById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAnswers GET /api/answer/getAnswers */
export async function getAnswersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnswersUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListAnswersheet_>('/api/answer/getAnswers', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** recordUserAnswer GET /api/answer/recordAnswer */
export async function recordUserAnswerUsingGET(
  body: API.RecordUserAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/answer/recordAnswer', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** recordUserAnswer PUT /api/answer/recordAnswer */
export async function recordUserAnswerUsingPUT(
  body: API.RecordUserAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/answer/recordAnswer', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** recordUserAnswer POST /api/answer/recordAnswer */
export async function recordUserAnswerUsingPOST(
  body: API.RecordUserAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/answer/recordAnswer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** recordUserAnswer DELETE /api/answer/recordAnswer */
export async function recordUserAnswerUsingDELETE(
  body: API.RecordUserAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/answer/recordAnswer', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** recordUserAnswer PATCH /api/answer/recordAnswer */
export async function recordUserAnswerUsingPATCH(
  body: API.RecordUserAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/answer/recordAnswer', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
