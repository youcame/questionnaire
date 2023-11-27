import {useRef, useState} from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {getAnswers, searchAi,} from "@/services/ant-design-pro/api";
import {API} from "@/services/ant-design-pro/typings";
import { ProTable } from '@ant-design/pro-components';
import {Button, Card} from "antd";
import {RedditOutlined} from "@ant-design/icons";
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
  const [analyseResult,setResult] = useState<string>('')
  const [submitting,setSubmitting] = useState<boolean>(false)
  const analyseQuestion = async ()=>{
    if(submitting){
      return;
    }
    setSubmitting(true);
    setResult("数据分析中，这个时间可能会有点长，请稍等...");
    const res = await searchAi({
      surveyId: Number(param),
    })
    console.log(res);
    setSubmitting(false);
  }
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
      <Card title={"人工智障分析结果:"} >
        {analyseResult}
      </Card>
    </>
  );
};
