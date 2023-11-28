import {useEffect, useRef, useState} from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {getAiResponse, getAnswers, searchAi,} from "@/services/ant-design-pro/api";
import {API} from "@/services/ant-design-pro/typings";
import { ProTable } from '@ant-design/pro-components';
import {Button, Card, Spin} from "antd";
import {RedditOutlined, SyncOutlined} from "@ant-design/icons";
const columns: ProColumns<API.Answersheet>[] = [
  {
    dataIndex: '#',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '回答人',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '问卷Id',
    dataIndex: 'surveyId',
    hideInForm: true,
    copyable: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a href={`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://survey.chinosama.cn'}/admin/seeAnswer?id=${record.surveyId}&answerId=${record.id}`} rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

export default () => {
  const searchParams = new URLSearchParams(window.location.search);
  const param = searchParams.get("surveyId");
  const actionRef = useRef<ActionType>();
  const [analyseResult,setResult] = useState<string|undefined>('')
  const [aiStatus,setAiStatus] = useState<string|undefined>('finish')
  const [submitting,setSubmitting] = useState<boolean>(false)

  //这个是从数据库里查的
  const getAiResponseUsingGet = async ()=>{
    const res = await getAiResponse({
      surveyId: Number(param),
    })
    await setAiStatus(res?.aiStatus);
    if(res?.aiStatus==="finish") {
      setResult(res?.aiStatistic);
      setSubmitting(false);
    }
    else if(res?.aiStatus==="wait") {
      setResult("欢迎体验ai分析功能，快来试试吧ヾ(≧∇≦*)ゝ");
    }
    else if(res?.aiStatus==="failed")setResult("系统繁忙，请稍后再试(ಥ﹏ಥ)")
    else {
      setResult("数据分析中，这个时间可能会有点长，请稍后刷新°(°ˊДˋ°) °");
    };
    //else setResult("系统可能出现了问题，工作人员正在尽力抢救~")
  }
  //点击智能分析按钮之后的处理
  const analyseQuestion = async ()=>{
    if(submitting){
      return;
    }
    setSubmitting(true);
    setResult("数据分析中，这个时间可能会有点长，请稍后刷新°(°ˊДˋ°) °");
    setAiStatus("running")
    const res = await searchAi({
      surveyId: Number(param),
    })
  }
  useEffect(()=>{
    getAiResponseUsingGet();
  },[])
  return (
    <>
      <ProTable<API.Answersheet>
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            disabled={submitting}
            loading={submitting}
            onClick={analyseQuestion}
          >
            <RedditOutlined /> 智能分析
          </Button>,
        ]}
        Record
        params={{surveyId: param}}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          const projectList = await getAnswers(params);
          return {
            data: projectList
          }
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={false}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values: API.Answersheet, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.surveyId],
                params: values,
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="已回答的问卷信息"
      />
      <br/>
      <br/>
      <Card title={"人工智能分析结果:"} extra={
        <div>
          {"刷新"}&nbsp;
          <SyncOutlined onClick={getAiResponseUsingGet}/>
        </div>
      }>
        {aiStatus==="running"&&<Spin size="small"/>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{analyseResult===null?"欢迎体验ai分析功能，快来试试吧ヾ(≧∇≦*)ゝ":analyseResult}
      </Card>
    </>
  );
};
