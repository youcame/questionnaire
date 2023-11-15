import {useEffect, useRef, useState} from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {createProject, currentUser, deleteProject, modifyProject, searchProjects} from "@/services/ant-design-pro/api";
import {Button, Form, Input, Modal, message} from "antd";
import type {API} from "@/services/ant-design-pro/typings";
import {PlusOutlined} from "@ant-design/icons";
import {history} from "umi";

export default () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user,setUser] = useState('');
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const currentUserData = await currentUser();
        setUser(currentUserData);
      } catch (error) {
        // 处理错误
        console.error(error);
      }
    };
    fetchData();
  },[])
  const columns: ProColumns<API.Project>[] = [
    {
      dataIndex: '#',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      copyable: true,
    },
    {
      title: '项目描述',
      dataIndex: 'projectDescription',
      copyable: true,
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      copyable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      editable: false,
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        user.userRole===1?<a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id as number);
          }}
        >
          编辑
        </a>:null,
        <a
          key="seeSurvey"
          onClick={() => history.push(`/admin/questionnaireManage?current=1&pageSize=5&projectId=${record.id}`)}
        >
          查看所有问卷
        </a>,
        // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        //   查看
        // </a>,
      ],
    },
  ];
  const showModal = () => {
    setModalVisible(true);
  };
  const actionRef = useRef<ActionType>();
  const handleCreateProject = async (values: API.Project) => {
    try{
      await createProject(values);
      console.log(values);
      message.success('提交成功');
    }catch(error){
      message.error("提交失败了！")
    }
    actionRef.current?.reload();
    setModalVisible(false); // 关闭弹出框
    return true;
  };

  const handleUpdate = async (value: API.Project) =>{
    const {id, projectName, projectDescription, userId, createBy, createTime, updateTime, updateBy} = value;

    try{
      const requestBody: API.Project={
        id,
        projectName,
        projectDescription,
        userId,
        createBy,
        createTime,
        updateTime,
        updateBy,
      };
      await modifyProject(requestBody);
      message.success("更新成功了喵~");
    }catch (error){
      message.error("更新失败！");
    }
  }

  const handleDelete = async (value: API.Project) =>{
    const {id} = value;
    try{
      const result = await deleteProject(id as number);
      console.log("result",result);
      if(!result){
        throw new Error(`delete error id = ${id}`);
      }
      else{
        message.success("删除成功了喵~")
      }
    }catch (error){
      message.error("删除失败了喵~")
    }
  }
  return (
    <>
    <ProTable<API.Survey>
      Record
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        const projectList = await searchProjects(params);
        return {
          data: projectList
        }
      }}

      editable={{
        type: 'multiple',
        onSave: (_, rows) => handleUpdate(rows),
        onDelete: (_, key) => handleDelete(key),
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
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values: API.Project, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.projectName, values.projectDescription],
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
        <Button key="newButton" icon={<PlusOutlined />} type = "primary" onClick={showModal}>
          新增项目
        </Button>,
      ]
      }
    />

      <Modal
        open={modalVisible}
        title="新增项目"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={(values)=>handleCreateProject(values)}>
          <Form.Item
            label="项目名称"
            name="projectName"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="项目描述"
            name="projectDescription"
            rules={[
              {
                required: true,
                message: '请输入项目描述',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button />
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};
