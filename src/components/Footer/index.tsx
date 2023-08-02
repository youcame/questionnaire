import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {BILIBILI_LINK} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = '东b出品,必为辣鸡';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'bilibili',
          href: BILIBILI_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <a>冰雪灬独舞<GithubOutlined /></a>,
          href: 'https://github.com/youcame',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'bilibili',
          href: 'https://space.bilibili.com/234120375?spm_id_from=333.1245.0.0',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
