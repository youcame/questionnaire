import React from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import { Image } from 'antd';
import { FALL_BACK_IMG } from '@/constants';

interface MyChartProps {
  src: string;
  title: string;
}

export const MyChart: React.FC<MyChartProps> = ({ src, title }) => (
  <StatisticCard
    chart={<Image src={src} alt={title} width="30%" placeholder="true" fallback={FALL_BACK_IMG} />}
    title={title}
  />
);
