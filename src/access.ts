import {API} from "@/services/ant-design-pro/typings";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 1,
    commonUser: currentUser && currentUser.userRole === 0,
  };
}
