// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createProject POST /api/project/create */
export async function createProjectUsingPOST(body: API.Project, options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/project/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProject POST /api/project/delete */
export async function deleteProjectUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/project/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** findProjectById POST /api/project/findProject */
export async function findProjectByIdUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseProject_>('/api/project/findProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getProjectList GET /api/project/search */
export async function getProjectListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListProject_>('/api/project/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateProject POST /api/project/update */
export async function updateProjectUsingPOST(body: API.Project, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/project/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
