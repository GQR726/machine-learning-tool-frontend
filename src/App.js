import React, { Component } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes,useLocation } from 'react-router-dom';
// import './App.css';

import CreateBook from './components/CreateBook';
import CreateData from './components/CreateData';
import CreateDataDetail from './components/CreateDataDetail';
import ShowBookList from './components/ShowBookList';
import UpdateBookInfo from './components/UpdateBookInfo';
import UpdateDataInfo from './components/UpdateDataInfo';
import UpdateDataDetail from './components/UpdateDataDetail';
import Home from './components/Home';
import Model from './components/Model'
import DataT from './components/DataT'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path='/home' element={<Home />}>
              <Route index element={<Navigate to='/home/show-book' />} />
              <Route path='/home/show-book' element={<ShowBookList />} />
              <Route path='/home/datat' element={<DataT />} />
              <Route path='/home/create-data' element={<CreateData />} />
              <Route path='/home/edit-data/:id' element={<UpdateDataInfo />} />
              <Route path='/home/create-data-detail' element={<CreateDataDetail />} />
              <Route path='/home/edit-data_detail/:id' element={<UpdateDataDetail />} />
              <Route path='/home/model' element={<Model />} />
              <Route path='/home/create-book' element={<CreateBook />} />
              <Route path='/home/edit-book/:id' element={<UpdateBookInfo />} />
            </Route>
            <Route path='/' element={<Navigate to='/home' />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   getItem('Personal', '/', <LineChartOutlined />),
//   getItem('Data', '/create-book', <DatabaseOutlined />),
//   getItem('Model', '/edit-book/:id', <LayoutOutlined />)
// ];
// const App = () => {
//   // const currentRoute = useLocation()
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout
//       style={{
//         minHeight: '100vh',
//       }}
//     >
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" style={{background:"rgb(217, 238, 255)"}}>
//         <div
//           style={{
//             height: 32,
//             margin: 16,
//             background: 'rgba(255, 255, 255, 0.2)',
//           }}
//         />
//         <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: '0 16px',
//           }}
//         >
//           <Breadcrumb
//             style={{
//               margin: '16px 0',
//             }}
//           >
//             <Breadcrumb.Item>User</Breadcrumb.Item>
//             <Breadcrumb.Item>Bill</Breadcrumb.Item>
//           </Breadcrumb>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//             }}
//           >
//             <Router>
//               <div>
//                 <Routes>
//                 <Route exact path='/' element={<ShowBookList />} />
//                 <Route path='/create-book' element={<CreateBook />} />
//                 <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
//                 <Route path='/show-book/:id' element={<ShowBookDetails />} />
//                 </Routes>
//               </div>
//             </Router>
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center', padding:0, lineHeight:"48px",background: "rgb(255, 255, 255)" }}>Based on Ant Design</Footer>
//       </Layout>
//     </Layout>
//   );
// };
// export default App;