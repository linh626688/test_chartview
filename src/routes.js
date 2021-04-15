import React from 'react';

const Charts = React.lazy(() => import("./views/Charts/Charts"));
const Line = React.lazy(() => import("./views/Line/Line"));

const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/chart', exact: true,  name: 'Chart', component: Charts },
  { path: '/line', exact: true,  name: 'Line', component: Line },
];

export default routes;
