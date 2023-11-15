import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {BILIBILI_LINK} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = '冰雪灬独舞';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '你好呀~',
          title: '浙ICP备2023023407号-2',
          href: "https://beian.miit.gov.cn/#/Integrated/index",
          blankTarget: true,
        }
      ]}
    />
  );
};
export default Footer;
