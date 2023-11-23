// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCurrentUser GET /api/user/current */
export async function getCurrentUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUser_>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPOST(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userRegister POST /api/user/login */
export async function userRegisterUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPOST1(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** searchUsers GET /api/user/search */
export async function searchUsersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUsersUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUser_>('/api/user/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPOST(
  body: API.ModifyUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
