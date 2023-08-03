import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, message } from 'antd';
import {
  ProCard, ProForm,
  ProFormDependency, ProFormGroup, ProFormList, ProFormSelect, ProFormText
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { history, useLocation } from 'umi';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { API } from '@/services/ant-design-pro/typings';
import { createSurvey, getSurveyById } from '@/services/ant-design-pro/api';

const Demo = () => {
  const [id, setId] = useState<string | null>(null);
  const [form] = Form.useForm(); // 创建表单实例
  const [exportedFormData, setExportedFormData] = useState<any>(null);
  const inputRef = useRef(null);

  function redirectToQuestionnaireManage() {
    history.push('questionnaireManage?current=1&pageSize=5');
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getSurveyData = async (id: string) => {
    try {
      const response = await getSurveyById({ id });
      const { surveyName, surveyDescription, surveyType, relate, addQuestion } = response;
      form.setFieldsValue({
        surveyName,
        surveyDescription,
        surveyType,
        relate,
        addQuestion,
      });
    } catch (error) {
      message.error('获取问卷数据失败');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    if (idParam) {
      setId(idParam);
      getSurveyData(idParam);
    }
  }, []);

  const handleCreateSurvey = async (value: API.addSurveyRequest) => {
    try {
      const result = await createSurvey(value, { id });
      if (result) {
        message.success('提交成功');
        redirectToQuestionnaireManage();
      }
    } catch (error) {
      message.error('提交失败');
    }
  };

  const handleExportForm = () => {
    const formData = form.getFieldsValue();
    setExportedFormData(formData);

    const jsonData = JSON.stringify(formData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'questionnaire.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImportForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const formData = JSON.parse(event.target?.result as string);
          form.setFieldsValue(formData);
          message.success('问卷数据导入成功');
        } catch (error) {
          message.error('问卷数据解析失败');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <ProForm onFinish={handleCreateSurvey} form={form}>

      <ProFormText name="surveyName" label="问卷名称" placeholder={"请输入问卷名称"} width={'sm'} required />
      <ProFormText name="surveyDescription" label="问卷描述" width={900} placeholder={"请输入问卷描述"} required />

      {/*<ProFormDateTimeRangePicker status="warning" label={"输入问卷开始与结束时间"} required/>*/}
      <ProFormSelect

        width={'sm'}
        name="surveyType"
        label="问卷类型"
        initialValue="0"
        request={async () => [
          { value: '0', label: '普通问卷' },
          { value: '1', label: '限时问卷' },
          { value: '2', label: '限次问卷' },
          { value: '3', label: '自选风格' },
          { value: '4', label: '面向群众' },
        ]}
        placeholder="请选择问卷类型"
        rules={[{ required: true, message: '请选择问卷类型' }]}
      />
      <ProFormDependency name={['surveyType']}>
        {({ surveyType }) => {
          if (surveyType === '0' || surveyType === '4') {
            return null;
          }
          if(surveyType === '3'){
            return(
              <ProFormSelect
                name="relate"
                width="sm"
                label="选择风格"
                initialValue={'1'}
                request={async () => [
                  { label: '默认风格', value: '1' },
                  { label: '暗黑风格', value: '2' },
                ]}
              />
            )
          }
          return (
            <ProFormText
              name="relate"
              width={'sm'}
              label={`${surveyType === '1' ? '完成时间(min)' :
                surveyType === '2' ? '最多回答次数' :
                  surveyType === '3' ? '选择风格' : ''}`}
              initialValue={surveyType === '3' ? "暗黑风格" : ''}
              placeholder={`请输入${surveyType === '1' ? '能完成的时间' :
                surveyType === '2' ? '能完成的次数' :
                  surveyType === '3' ? '你选择的风格' : ''}`}
              rules={[{ pattern: /^[0-9]+$/, message: '请输入一个数字' }]}
            />

          );
        }}
      </ProFormDependency>

      <ProFormList
        name="addQuestion"
        label="编写题目"
        creatorButtonProps={{
          creatorButtonText: '新增一个题目'
        }}
        initialValue={[
          {
          },
        ]}
        itemRender={({ listDom, action }, { record, index }) => {
          const title = `第${index + 1}题`;
          return (
            <ProCard
              bordered
              extra={action}
              title={title}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProFormGroup>
          <ProFormText name="questionDescription" label="问题描述" width="md" placeholder="请输入问题的描述" required />
          <ProFormSelect
            width={'sm'}
            name="questionType"
            label="单选or多选"
            initialValue={0}
            request={async () => [
              { value: 0, label: '单选' },
              { value: 1, label: '多选' },
            ]}
            placeholder="请选择问题类型"
            rules={[{ required: true, message: '请选择问题类型' }]}
          />
        </ProFormGroup>
        <ProFormList
          min={2}
          max={6}
          name="options"
          label="设置选项"
          initialValue={[
            {
              // name: '666',
              // value: '333',
              // label: '333',
            },
            {
            },
          ]}
          copyIconProps={{
            tooltipText: '复制此行到末尾',
          }}
          deleteIconProps={{
            tooltipText: '删除这一行',
          }}
          creatorButtonProps={{
            creatorButtonText: '新增一个选项'
          }}
        >
          <ProFormGroup key="group">
            <ProFormText name="option" label="选项" placeholder="请输入选项" required />
            <ProFormText name="destination" label="跳转题目(0或者不填即为不跳转)" placeholder="请输入要跳转的题目" rules={[{ pattern: /^[0-9]+$/, message: '请输入一个数字' }]} />
          </ProFormGroup>
        </ProFormList>
      </ProFormList>

      <Form.Item>
        <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={handleExportForm}>
          导出问卷
        </Button>
        <Divider type='vertical'/>
        <Button type="primary" shape="round" icon={<UploadOutlined />} onClick={() => inputRef.current.click()}>
            导入问卷
            <input ref={inputRef} type="file" style={{ display: 'none' }} accept=".json" onChange={handleImportForm} />
        </Button>
      </Form.Item>
    </ProForm>
  );
};

export default Demo;
