import {PageContainer, ProCard} from '@ant-design/pro-components';
import {Alert, Button, Card, Typography} from 'antd';
import React from 'react';
import styles from './Welcome.less';
import {history} from "@@/core/history";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
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
        <Typography.Text strong style={{fontSize: "24px"}}>
          这是我制作的第一个像样的项目ヾ(≧∇≦*)ゝ
        {/*  <a*/}
        {/*    href="https://procomponents.ant.design/components/table"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    target="__blank"*/}
        {/*  >*/}
        {/*    欢迎关注*/}
        {/*  </a>*/}
        {/*</Typography.Text>*/}
        {/*/!*<CodePreview>https://space.bilibili.com/177253495/?spm_id_from=333.999.0.0*!/*/}
        {/*/!*  https://space.bilibili.com/1057683512/?spm_id_from=333.999.0.0</CodePreview>*!/*/}
        {/*<br></br>*/}
        {/*<Typography.Text strong>*/}
        {/*  <a*/}
        {/*    href="https://space.bilibili.com/177253495/?spm_id_from=333.999.0.0"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    target="__blank"*/}
        {/*  >*/}
        {/*    -NaNNil-的b站帐号*/}
        {/*  </a>*/}
        {/*  {' '}*/}
        {/*  和*/}
        {/*  {' '}*/}
        {/*  <a*/}
        {/*    href="https://space.bilibili.com/1057683512/?spm_id_from=333.999.0.0"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    target="__blank"*/}
        {/*  >*/}
        {/*    じゅんんん的b站帐号*/}
        {/*  </a>*/}
        </Typography.Text>
      </Card>
      <br/>
      <Card>
        <ProCard title="项目优势？" ghost gutter={8} collapsible extra={
          <Button
            type={"primary"}
            onClick={()=>history.push('/admin/questionnaireManage?current=1&pageSize=5')}
          >
            <SmileOutlined />现在开始！
          </Button>
        }>
          <ProCard layout="center" bordered title="自定义问题" hoverable >
            在这里，你可以创建你自己的项目，也可以创建你自己的问题！只要不违规，这里的一切都可以由你来创建!
          </ProCard>
          <ProCard layout="center" bordered title="查看回答情况" hoverable>
            在这里，你可以查看所有用户的回答，不用花钱就可以看到问卷的数据统计情况，得到大家的观点与想法！
          </ProCard>
          <ProCard layout="center" bordered title="ai智能分析" hoverable>
            在这里，你可以使用ai智能分析，为你感兴趣的问卷自动生成ai总结，省去大量思考与分析数据的时间！
          </ProCard>
        </ProCard>
      </Card>
      <br/>
      <Card>
        <ProCard title="技术栈" ghost gutter={8} collapsible>
          <ProCard layout="center" bordered  hoverable >
            前端: react + node16 + umi + ant design + ant design pro
          </ProCard>
          <ProCard layout="center" bordered hoverable>
            后端: springboot + mybatis + redis + redission ( 锁 + 限流 ) + rabbitMQ + AIGC
          </ProCard>
        </ProCard>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
