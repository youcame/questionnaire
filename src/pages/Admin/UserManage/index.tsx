import { useRef, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {deleteUser, modifyUser, register, searchUsers} from "@/services/ant-design-pro/api";
import {Button, Form, Image, Input, Modal, message} from "antd";
import {API} from "@/services/ant-design-pro/typings";
import {PlusOutlined} from "@ant-design/icons";
const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: '#',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: { text: '男', status: 'Default' },
      1: {
        text: '女',
        status: 'Default',
      },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: { text: '正常', status: 'Success' },
      1: {
        text: '封号',
        status: 'Default',
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
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
    ],
  },
];

export default () => {

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCreateUser = async (values: API.RegisterParams) => {
    try{
      const result = await register(values);
      console.log(values);
      if(result > 0)message.success('注册成功');
    }catch(error){
      message.error("注册失败了,不造为啥！")
    }
    setModalVisible(false); // 关闭弹出框
    return true;
  };

  const actionRef = useRef<ActionType>();
  const handleUpdate = async (value: API.CurrentUser) =>{
    const {id, username, phone, email, userStatus, userRole, gender, avatarUrl} = value;
    try{
      const requestBody: API.CurrentUser={
          id,
          username,
          phone,
          email,
          userStatus,
          userRole,
          gender,
          avatarUrl,
      };
      await modifyUser(requestBody);
      message.success("更新成功了喵~");
    }catch (error){
      message.error("更新失败！");
    }
  }

  const handleDelete = async (value: API.CurrentUser) =>{
    const {id} = value;
    try{
      const result = await deleteUser(id as number);
      console.log("result",result);
      message.success("删除成功了喵~")
    }catch (error){
      message.error("删除失败了喵~")
    }
  }
  return (
    <>

    <ProTable<API.CurrentUser>
      Record
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}) => {
        const projectList = await searchUsers(params);
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
        syncToUrl: (values: API.CurrentUser, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.userAccount, values.username],
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
      headerTitle="成员管理"
      toolBarRender = {()=>[
        <Button key="newButton" icon={<PlusOutlined />} type = "primary" onClick={showModal}>
          新增成员
        </Button>,
      ]
      }
    />

      <Modal
        open={modalVisible}
        title="新增成员"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={(values: API.RegisterParams)=>handleCreateUser(values)}>
          <Form.Item
            label="成员账户名"
            name="userAccount"
            rules={[
              {
                required: true,
                message: '请输入成员名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="成员密码"
            name="password"
            rules={[
              {
                required:true,
                message: '请输入确认密码哦'
              },
              {
                message: '密码不少于8位',
                min: 8
              },
            ]}
          >
            <Input type = 'password'/>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="checkPassword"
            rules={[
              {
                required:true,
                message: '请输入确认密码哦'
              },
              {
                message: '密码不少于8位',
                min: 8,
              },
            ]}
          >
            <Input type='password'/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};
