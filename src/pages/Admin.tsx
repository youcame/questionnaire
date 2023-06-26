import { PageHeaderWrapper } from '@ant-design/pro-components';
import React from 'react';
const Admin: React.FC = (props) => {
  const {children} = props;
  return (
    <PageHeaderWrapper>
      {children}
    </PageHeaderWrapper>
  );
};
export default Admin;
