import Footer from '@/components/Footer';
import {SYSTEM_LOGO} from '@/constants'
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {Alert, Button, Divider, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {register} from "@/services/ant-design-pro/api";
import {API} from "@/services/ant-design-pro/typings";

const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  //提交表单
  const handleSubmit = async (values: API.RegisterParams) => {
    //验证
    const {password, checkPassword} = values;
    if(password !== checkPassword){
      const defaultRegisterFailedMessage = '注册失败，两次密码输入的不一样~';
      message.error(defaultRegisterFailedMessage);
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id >= 0) {
        const defaultRegisterSuccessMessage = '注册成功！';
        message.success(defaultRegisterSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        //原本为“redirect || '/'”
        history.push('login?redirect='+redirect);
        return;
      }else{
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig:{
              submitText:'注册'
            },
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="用户注册"
          subTitle={'在这里注册你的账户呦~'}
          initialValues={{
            autoRegister: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'用户注册页面'} />
          </Tabs>

          {status === 'error' && (
            <RegisterMessage content={'错误的用户名和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },

                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码必须大于8位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请确认输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入确认密码！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '确认密码必须大于8位！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
          </div>
          <Button block type="primary" style={{marginBottom: "8px",height: "36px"}} onClick={()=> {
            history.push("/user/login")
          }}>
            返回
          </Button>
        </LoginForm>

      </div>
      <Footer />
    </div>
  );
};
export default Register;
