import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation,Outlet,useNavigate } from 'react-router-dom';
import { DatabaseOutlined, LayoutOutlined, LineChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Personal', '/home/show-book', <LineChartOutlined />),
  getItem('Data', '/home/datat', <DatabaseOutlined />),
  getItem('Model', '/home/model', <LayoutOutlined />)
];
const App = () => {
  const navigateTo = useNavigate()
    const currentRoute = useLocation()
    const menuClick = (e)=>{
    // console.log("11111", e.key);
    navigateTo(e.key)};

    let firstOpenKey= "";
    function findKey(obj){
      return obj.key === currentRoute.pathname
    }
    for(let i=0;i<items.length;i++){
      if(items[i]['children'] && items[i]['children'].length>1 && items[i]['children'].find(findKey)){
        firstOpenKey = items[i].key;
        break;
      }
    }
    // items[]['children'].find(findKey)

    const [openKeys,setOpenkeys] = useState([firstOpenKey]);
    const handleChange = (keys)=>{
      setOpenkeys([keys[keys.length-1]]);
    }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" style={{background:"rgb(217, 238, 255)"}}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="light" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} onClick={menuClick} 
        onOpenChange={handleChange}
        openKeys={openKeys} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
          <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding:0, lineHeight:"48px",background: "rgb(255, 255, 255)" }}>Based on Ant Design</Footer>
      </Layout>
    </Layout>
  );
};
export default App;