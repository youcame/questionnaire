import React, { useEffect, useState } from 'react';
import {Button, Card, Divider, Typography, message} from 'antd';
import {ProCard, CheckCard, ProForm,} from '@ant-design/pro-components';
import { getSurveyById, getAnswerById } from '@/services/ant-design-pro/api';
import { API } from '@/services/ant-design-pro/typings';
import { history, useLocation } from 'umi';
import {AN1, AN2, AN3, AN4,} from "@/constants";
import {MyChart} from "@/pages/Admin/SeeQuestionnaire/myComponent";

// @ts-ignore
const Countdown = ({ minutes, onTimeout }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, onTimeout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return <span>{formatTime(remainingSeconds)}</span>;
};

const SurveyDisplayPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = searchParams.get('id');
  const answerId = searchParams.get('answerId');

  const [surveyData, setSurveyData] = useState<API.addSurveyRequest | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerData, setAnswerData] = useState<API.AnswerData | null>(null);
  const [showDataStats, setShowDataStats] = useState(Array(addQuestion?.length).fill(false)); // 修改的状态

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await getSurveyById({ id: surveyId });
        setSurveyData(response);
      } catch (error) {
        console.error('获取问卷信息失败:', error);
      }
    };

    const fetchAnswerData = async () => {
      try {
        const response = await getAnswerById({ id: answerId });
        setAnswerData(response);
        const initialAnswers = response.questions.map((question) => question.userAnswer);
        setSelectedAnswers(initialAnswers);
      } catch (error) {
        console.error('获取答案信息失败:', error);
      }
    };
    if (surveyId) {
      fetchSurveyData();
    }
    if (answerId) {
      fetchAnswerData();
    }
  }, [surveyId, answerId]);
  const handleFormSubmit = (values) => {
    console.info('表单数据为:', surveyData);
    message.success("提交成功");
    surveyData?.addQuestion.forEach((question, index) => {
      const answer = selectedAnswers[index];
      console.info(`题号 ${index + 1} 的答案为:`, answer);
    });
    history.push("questionnaireManage?current=1&pageSize=5");
  };

  const handleDataStatsClick = (index) => {
    setShowDataStats((prevShowDataStats) => {
      const updatedShowDataStats = [...prevShowDataStats];
      updatedShowDataStats[index] = true;
      return updatedShowDataStats;
    });
  };

  if (!surveyData) {
    return <div>查无此问卷~</div>;
  }
  const { surveyName, surveyDescription, addQuestion, surveyType, relate } = surveyData;
  const isDarkMode = surveyType === '3';
  const renderCountdown = () => {
    if (surveyType === '1') {
      return (
        <Countdown
          minutes={parseInt(relate)}
          onTimeout={() => {
            console.log('倒计时结束');
            history.push('/admin/questionnaireManage?current=1&pageSize=5');
          }}
        />
      );
    }
    return null;
  };

  const isAnswerMode = Boolean(answerId);
  return (
    <div style={{ backgroundColor: isDarkMode ? '#595959' : 'transparent', color: isDarkMode ? 'white' : 'inherit' }}>
      <Typography.Title level={2}>问卷名称:{surveyName}</Typography.Title>
      {/* {isAnswerMode&&(
          <Typography.Title level={2}>回答人:{"admin"}</Typography.Title>
        )
      } */}
      <Divider type="vertical" />
      <Typography.Title level={4}>
        问卷描述: {surveyDescription}
        <Divider type="vertical" />
        问卷类型:{' '}
        {`${surveyType === '0' ? '普通问卷' : surveyType === '1' ? '限时问卷' : surveyType === '2' ? '限次问卷' : surveyType === '3' ? '选择风格' : '4' ? '面向群众': ''}`}
        <Divider type="vertical" />
        {`${surveyType === '1' ? `${relate}分钟` : surveyType === '2' ? `${relate}次` : surveyType === '3' ? '暗黑风格' : ''}`}
        <Divider type="vertical" />
        {!isAnswerMode && surveyType === '1' && (
          <>
            剩余时间: {renderCountdown()}
            <Divider type="vertical" />
          </>
        )}
      </Typography.Title>
      <Divider type="vertical" />
      <ProForm onFinish={handleFormSubmit} initialValues={surveyData?.addQuestion}>
      <ProForm.Item name={'answerSheet'}>
      {addQuestion.map((question, index) => {
        const questionData = answerData?.questions[index];
        const isDataStatsVisible = showDataStats[index]; // 新增的状态
            return (
              <ProCard
                key={question.questionName}
                headerBordered
                title={`第${index + 1}题`}
                style={{ marginBottom: 16 }}
                bodyStyle={{ backgroundColor: isDarkMode ? '#d9d9d9' : 'transparent', color: isDarkMode ? 'white' : 'inherit' }}
                headStyle={{ backgroundColor: isDarkMode ? '#8c8c8c' : 'transparent', color: isDarkMode ? 'white' : 'inherit' }}
              >
                <Typography.Text strong>
                  {question.questionDescription}
                  {question.questionType === 1 ? '(多选)' : question.questionType === 0 ? '(单选)' : ''}
                  <br />
                  <br />
                  <br />
                </Typography.Text>
                <CheckCard.Group
                  disabled={isAnswerMode}
                  value={isAnswerMode ? questionData?.userAnswer : selectedAnswers[index]}
                  multiple={isAnswerMode || question.questionType === 1}
                >
                  {question.options.map((option, optionIndex) => {
                    const answerIndex = questionData?.userAnswer.findIndex((index) => index === optionIndex.toString());
                    const isChecked = isAnswerMode ? answerIndex !== -1 : selectedAnswers[index] === optionIndex.toString();
                    return (
                      <CheckCard
                        style={{ backgroundColor: isDarkMode ? '#f0f0f0' : 'transparent', color: isDarkMode ? 'white' : 'inherit' }}
                        value={(optionIndex + 1).toString()} // 使用选项索引作为值
                        key={option.option}
                        title={String.fromCharCode(65 + optionIndex)} // A, B, C...
                        description={option.option}
                        checked={isChecked} // 添加 checked 属性，表示是否选中
                      />
                    );
                  })}
                </CheckCard.Group>
                <Divider type='horizontal' />
                {isAnswerMode && !isDataStatsVisible && ( // 添加按钮的条件渲染
                  <Button type="primary" onClick={() => handleDataStatsClick(index)}>
                    查看数据统计列表
                  </Button>
                )}
                <Divider type='horizontal' />
                {isDataStatsVisible && index === 0&&(
                  <Card style={{ marginTop: 16 }} >
                    {/* 这里编写您的数据统计列表的渲染代码 */}
                    <Typography.Title level={4}>数据统计列表</Typography.Title>
                    <Divider type={"horizontal"}/>
                    <ProCard split={"vertical"}>
                      <MyChart src={AN1} title={"饼状图统计"}/>
                    <Divider type={"vertical"}/>
                      <MyChart src={AN2} title={"柱状图统计"}/>
                    </ProCard>
                  </Card>
                )}
                {isDataStatsVisible && index === 1&&(
                  <Card style={{ marginTop: 16 }} >
                    {/* 这里编写您的数据统计列表的渲染代码 */}
                    <Typography.Title level={4}>数据统计列表</Typography.Title>
                    <Divider type={"horizontal"}/>
                    <ProCard split={"vertical"}>
                      <MyChart src={AN3} title={"饼状图统计"}/>
                      <Divider type={"vertical"}/>
                      <MyChart src={AN4} title={"柱状图统计"}/>
                    </ProCard>
                  </Card>
                )}
              </ProCard>
            );
          })}
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default SurveyDisplayPage;
