import { useRef, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {getAnswers, } from "@/services/ant-design-pro/api";
import {API} from "@/services/ant-design-pro/typings";
import { LightFilter, ProTable } from '@ant-design/pro-components';
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
    copyable: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a href={`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://flandre.ltd'}/admin/seeQuestionnaire?id=${record.surveyId}&answerId=${record.id}`} rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

export default () => {
  const searchParams = new URLSearchParams(window.location.search);
  const param = searchParams.get("surveyId");
  const actionRef = useRef<ActionType>();
  return (
    <>

    <ProTable<API.Answersheet>
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
      search={
        {filterType: 'query'}
      }
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
    </>
  );
};
