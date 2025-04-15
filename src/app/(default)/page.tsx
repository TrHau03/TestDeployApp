import React from 'react';
import { Metadata } from 'next';
import { ComponentsDashboardSales } from './_internal';

export const metadata: Metadata = {
  title: 'Sales Admin',
};

const Sales = () => {
  return <ComponentsDashboardSales />;
};

export default Sales;
