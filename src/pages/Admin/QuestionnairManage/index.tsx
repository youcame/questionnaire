import { useEffect, useRef, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {deleteSurvey, modifySurvey, searchSurveys} from "@/services/ant-design-pro/api";
import {Button, Divider, Form, Modal, message} from "antd";
import {API} from "@/services/ant-design-pro/typings";
import {PlusOutlined} from "@ant-design/icons";
import { history } from 'umi';


const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

export default () => {
  const [form] = Form.useForm();
  const [selectedRowId, setSelectedRowId] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function redirectToQuestionnaireCreate() {
    history.push('/admin/questionnaireCreate?id=');
  }

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const actionRef = useRef<ActionType>();
  const handleUpdate = async (value: API.Survey) =>{
    const {id, surveyType, surveyName, description, surveyStatus, createTime, updateTime, totalTimes} = value;

    try{
      const requestBody: API.Survey={
        id,
        surveyType,
        surveyName,
        description,
        surveyStatus,
        totalTimes,
        createTime,
        updateTime,
      };
      await modifySurvey(requestBody);
      message.success("更新成功了喵~");
    }catch (error){
      message.error("更新失败！");
    }
  }
  const handleDelete = async (value: API.Survey) =>{
    const {id} = value;
    console.log("key", id);
    try{
      const result = await deleteSurvey(id as number);
      console.log("result",result);
      message.success("删除成功了喵~")
    }catch (error){
      message.error("删除失败了喵~")
    }
  }
  useEffect(() => {
    form.setFieldsValue({ surveyId: selectedRowId });
  }, [selectedRowId, form]);
  const showModal = (value: number) => {
    setSelectedRowId(value);
    setOpen(true);
  };
  /**
   * 问卷列
   */
  const columns: ProColumns<API.Survey>[] = [
    {
      dataIndex: '#',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '问卷名称',
      dataIndex: 'surveyName',
      copyable: true,
    },
    {
      title: '问卷描述',
      dataIndex: 'description',
      copyable: true,
    },
    {
      title: '问卷类型',
      dataIndex: 'surveyType',
      valueType: 'select',
      valueEnum: {
        0: { text: '普通问卷', status: 'Default' },
        1: {
          text: '限时问卷',
          status: 'Default',
        },
        2: {
          text: '限次问卷',
          status: 'Default',
        },
        3: {
          text: '自选风格',
          status: 'Default',
        },
        4: {
          text: '面向群众',
          status: 'Default',
        },
      },
    },
    {
      title: '能回答的次数',
      dataIndex: 'totalTimes',
      copyable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      copyable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      copyable: true,
    },
    {
      title: '状态',
      dataIndex: 'surveyStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '未发布', status: 'Success' },
        1: {
          text: '发布中',
          status: 'Success',
        },
        2: {
          text: '已完结',
          status: 'Default',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id as number);
          }}
        >
          编辑
        </a>,
        //`http://localhost:8000/admin/questionnaireCreate?id=${record.id}`
        <a href={`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'http://flandre.ltd/'}admin/questionnaireCreate?id=${record.id}`} rel="noopener noreferrer" key="modify">
          修改问题
        </a>,
        <a href={`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'http://flandre.ltd/'}admin/seeQuestionnaire?id=${record.id}`} rel="noopener noreferrer" key="viewSurvey">
          预览问卷
        </a>,
        <a href={`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'http://flandre.ltd/'}admin/answeredSurvey?surveyId=${record.id}`} rel="noopener noreferrer" key="viewAnswer">
          查看回答
        </a>,
        <a
        key="addQuestion"
        onClick={()=>showModal(record.id as number)}
      >
        生成链接
      </a>

      ],
    },

  ];

  // @ts-ignore
  return (
    <>
    <ProTable<API.Survey>
      Record
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        const surveyList = await searchSurveys(params);
        return {
          data: surveyList
        }
      }}

      editable={{
        type: 'multiple',
        onSave: (_, rows) => handleUpdate(rows),
        onDelete: (_, key) => handleDelete(key),
        deletePopconfirmMessage: '确定删除这个问卷么'
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        syncToUrl: (values: API.Survey, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.surveyName, values.surveyType],
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
      headerTitle="问卷管理"
      toolBarRender = {()=>[
        <Button key="newButton" icon={<PlusOutlined />} type = "primary" onClick={redirectToQuestionnaireCreate}>
          新增问卷
        </Button>,
        ]
      }
    />

    <Modal
      open={open}
      title="生成问卷链接"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="surveyId" label="问卷链接" wrapperCol={{ span: 0, offset: 0 }} style={{ width: '80%' }}>
        <a href={`${process.env.Node_ENV === 'development' ? 'http://localhost:8000/' : 'http://flandre.ltd/'}admin/seeQuestionnaire?id=${selectedRowId}`}>
          {`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'http://flandre.ltd/'}admin/seeQuestionnaire?id=${selectedRowId}`}
        </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={handleCancel}>
            返回
          </Button>
          <Divider type='vertical' />
        </Form.Item>
      </Form>
    </Modal>
  </>
  );
};
