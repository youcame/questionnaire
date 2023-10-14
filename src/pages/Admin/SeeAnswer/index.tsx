import {useEffect, useState} from 'react';
import {Divider, Typography} from 'antd';
import {ProCard, CheckCard, ProForm,} from '@ant-design/pro-components';
import {getSurveyById, getAnswerById} from '@/services/ant-design-pro/api';
import {API} from '@/services/ant-design-pro/typings';
import {useLocation} from 'umi';


//#region
const SurveyDisplayPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const surveyId = searchParams.get('id');
  const answerId = searchParams.get('answerId');
  const [surveyData, setSurveyData] = useState<API.addSurveyRequest | null>(null);
  const [answerData, setAnswerData] = useState<API.AnswerData | null>(null);
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await getSurveyById({id: surveyId});
        console.log("survey is:", response);
        setSurveyData(response);
      } catch (error) {
        console.error('获取问卷信息失败:', error);
      }
    };

    const fetchAnswerData = async () => {
      try {
        const response = await getAnswerById({id: answerId});
        setAnswerData(response);
        // const initialAnswers = response.questions.map((question) => question.userAnswer);
        // setSelectedAnswers(initialAnswers);
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

  if (!surveyData) {
    return <div>查无此问卷~</div>;
  }

  //这里从后端获取信息
  const {surveyName, surveyDescription, addQuestion, surveyType, relate} = surveyData;
  const isDarkMode = surveyType === 3;

  return (
    <div style={{backgroundColor: isDarkMode ? '#595959' : 'transparent', color: isDarkMode ? 'white' : 'inherit'}}>

      <Typography.Title level={2}>问卷名称:{surveyName}</Typography.Title>
      {/* {isAnswerMode&&(
          <Typography.Title level={2}>回答人:{"admin"}</Typography.Title>
        )
      } */}
      <Divider type="vertical"/>
      <Typography.Title level={4}>
        问卷描述: {surveyDescription}
        <Divider type="vertical"/>
        问卷类型:{' '}
        {`${surveyType === 0 ? '普通问卷' : surveyType === 1 ? '限时问卷' : surveyType === 2 ? '限次问卷' : surveyType === 3 ? '选择风格' : '4' ? '面向群众' : ''}`}
        <Divider type="vertical"/>
        {`${surveyType === 1 ? `${relate}分钟` : surveyType === 2 ? `${relate}次` : surveyType === 3 ? '暗黑风格' : ''}`}
        <Divider type="vertical"/>

      </Typography.Title>
      <Divider type="vertical"/>
      <ProForm>
        <ProForm.Item name={'answerSheet'}>
          {addQuestion.map((question, index) => {
            const questionData = answerData?.questions[index];
            console.log("questionData:",questionData);
            return (
              <>
              <ProCard
                key={question.questionName}
                headerBordered
                title={`第${index + 1}题`}
                style={{marginBottom: 16}}
                bodyStyle={{
                  backgroundColor: isDarkMode ? '#d9d9d9' : 'transparent',
                  color: isDarkMode ? 'white' : 'inherit'
                }}
                headStyle={{
                  backgroundColor: isDarkMode ? '#8c8c8c' : 'transparent',
                  color: isDarkMode ? 'white' : 'inherit'
                }}
              >
                <Typography.Text strong>
                  {question.questionDescription}
                  {question.questionType === 1 ? '(多选)' : question.questionType === 0 ? '(单选)' : ''}
                  <br/>
                  <br/>
                  <br/>
                </Typography.Text>
                {/*选项的遍历*/}
                <CheckCard.Group
                  disabled={true}
                  value={questionData?.userAnswer}
                  multiple={true}
                >
                  {question.options.map((option, optionIndex) => {
                    const answerIndex = questionData?.userAnswer.findIndex((index) => index === optionIndex.toString());
                    const isChecked = answerIndex !== -1;
                    console.log("statistics:",questionData?.statistics);
                    return (
                      <>
                      <CheckCard
                        style={{
                          backgroundColor: isDarkMode ? '#f0f0f0' : 'transparent',
                          color: isDarkMode ? 'white' : 'inherit'
                        }}
                        value={(optionIndex + 1).toString()} // 使用选项索引作为值
                        key={option.option}
                        title={String.fromCharCode(65 + optionIndex)} // A, B, C...
                        description={option.option}
                        checked={isChecked} // 添加 checked 属性，表示是否选中
                      />
                      </>
                    );
                  })}
                </CheckCard.Group>
                <br/>
                <Typography.Text strong style={{ whiteSpace: "pre-line" }}>
                  {" " + questionData?.statistics}
                </Typography.Text>
              </ProCard>
            </>
            );
          })}
        </ProForm.Item>
      </ProForm>

    </div>
  );
};

export default SurveyDisplayPage;
