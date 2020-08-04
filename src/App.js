import React from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import Robot from './pages/robot'
import { Layout, Menu, Breadcrumb, Input, Table, Tag, Space, Button, Modal, Form } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import slideBarConfig from './sideBarConfig'

import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '机器人名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '机器人标识',
    dataIndex: 'identification',
    key: 'identification',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="link">Invite {record.name}</Button>
        <Button type="link">Delete</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '金融小贷',
    identification: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: '回访客户',
    identification: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '催收',
    identification: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: '售后服务',
    identification: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: '金融小贷',
    identification: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '6',
    name: '回访客户',
    identification: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '7',
    name: '催收',
    identification: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '8',
    name: '售后服务',
    identification: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const pagination = {
  total: data.length,
  showTotal: total => `Total ${total} items`,
  defaultPageSize: 5,
  defaultCurrent: 1,
  showSizeChanger: true
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


class App extends React.Component {

  formRef = React.createRef();

  state = {
    collapsed: false,
    visible: false,
    confirmLoading: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  showModal = () => {

    this.setState({
      visible: true,
    });

  };

  handleOk = () => {
    this.formRef.current.submit();

  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });

  };

  onFinish = values => {
    console.log(values);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.formRef.current.resetFields();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

//处理左侧菜单
getSubmenu = () => {
  return slideBarConfig.map(item => {
      if(!item.children || item.children.length === 0){    //如果当前路由没有子路由且该路由的hidden为false或不设置该路由的hidden时则直接显示该路由，若该路由的hidden为true则不显示该路由
          if(item.hidden) return false

          return (
              <Menu.Item key={item.url} icon={item.icon}>
                  {/* <Icon type={item.icon} /> */}
                      <span>{item.name}</span>
                  
              </Menu.Item>
          )               
      }else if(item.children && item.children.length === 1){
          if(item.hidden) return false

          let noHiddenRouter = [];
          let hiddenRouter = [];
          item.children.map(v => {
              if(v.hidden){
                  hiddenRouter.push(v)
              }else{                        
                  noHiddenRouter.push(v)
              }

              return true
          })

          if(hiddenRouter.length > 0){ //当子路由只有一个且该子路由的hidden为true同时其父路由的hidden为false或不设置其父路由的hidden时则显示其父路由
              return <Menu.Item key={item.url} icon={item.icon}>
                {/* <Icon type={item.icon} /> */}
                <span>{item.name}</span></Menu.Item>
          }

          if(noHiddenRouter.length > 0){ //当子路由只有一个且该子路由的hidden为false或不设置该子路由的hidden时则显示其父路由和下拉的子路由                    
              return (
                  <SubMenu key={item.url} icon={item.icon} title={<span>555<span>{item.name}</span></span>}>
                      {
                          noHiddenRouter.map(v => {                                
                              return <Menu.Item key={v.url} >{v.name}</Menu.Item>                               
                          })
                      }
                  </SubMenu>
              )
          }
      }else if(item.children && item.children.length > 1){  //当当前路由有两个及两个以上子路由时，若两个子路由的hidden都为true时则该路由和其子路由全部隐藏
          if(item.hidden) return false

          let noHiddenRouter = [];
          item.children.map(v => {
              if(v.hidden){
                  return <Menu.Item key={item.url} icon={item.icon}><span>{item.name}</span></Menu.Item>
              }else{                        
                  noHiddenRouter.push(v)
                  return true
              }
          })

          if(noHiddenRouter.length > 0){
              return (
                  <SubMenu key={item.url} icon={item.icon} title={<span>444<span>{item.name}</span></span>}>
                      {
                          noHiddenRouter.map(v => {                                
                              return <Menu.Item key={v.url}>{v.name}
                              </Menu.Item>                               
                          })
                      }
                  </SubMenu>
              )
          }
      }

      return true
  });
}

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu> */}
          <Menu theme="dark" mode="inline" >
                            {this.getSubmenu()}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="robot-top">
                <Search
                  placeholder="请输入机器人名称"
                  enterButton="搜索"
                  style={{ width: 400 }}
                  onSearch={value => console.log(value)}
                />
                <div className="robot-button-container">
                  <Button type="primary" onClick={this.showModal}>新建机器人</Button>
                </div>
              </div>
              <div className="robot-main" style={{ marginTop: 20 }}>
                <Table columns={columns} dataSource={data} pagination={pagination} />
              </div>

              <Modal
                title="新建机器人"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
                <Form ref={this.formRef} {...layout} name="nest-messages" onFinish={this.onFinish}>
                  <Form.Item name={['user', 'name']} label="机器人名称" rules={[{ required: true, message: '必填项' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['user', 'introduction']} label="描述">
                    <Input.TextArea />
                  </Form.Item>

                </Form>
              </Modal>
            </div>
          </Content>
          <BrowserRouter>
            <Route path='/robot' component={Robot}/>
          </BrowserRouter>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default App;
