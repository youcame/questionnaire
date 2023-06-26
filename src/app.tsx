import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import { RequestConfig } from 'umi';
import {API} from "@/services/ant-design-pro/typings";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const WHITE_LIST = ['/user/register',loginPath];
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * 自定义配置（全局配置），应该是
 */
export const request: RequestConfig = {
  timeout: 100000,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const user = await queryCurrentUser();

      return user;
    } catch (error) {
      if(WHITE_LIST.includes(location.pathname)){
        return;
      }
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行.
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,//todo:改了username
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      //如果在白名单里的话就不用重定向了~
      if(WHITE_LIST.includes(location.pathname)){
        return;
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    //配置相关文档
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
