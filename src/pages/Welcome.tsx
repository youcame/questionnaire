import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import styles from './Welcome.less';
const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'欢迎来到问卷调查系统！'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎关注
          </a>
        </Typography.Text>
        {/*<CodePreview>https://space.bilibili.com/177253495/?spm_id_from=333.999.0.0*/}
        {/*  https://space.bilibili.com/1057683512/?spm_id_from=333.999.0.0</CodePreview>*/}
        <br></br>
        <Typography.Text strong>
          <a
            href="https://space.bilibili.com/177253495/?spm_id_from=333.999.0.0"
            rel="noopener noreferrer"
            target="__blank"
          >
            -NaNNil-的b站帐号
          </a>
          {' '}
          和
          {' '}
          <a
            href="https://space.bilibili.com/1057683512/?spm_id_from=333.999.0.0"
            rel="noopener noreferrer"
            target="__blank"
          >
            じゅんんん的b站帐号
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
