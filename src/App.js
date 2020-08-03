import React from 'react';
import { Layout, Menu, Breadcrumb, Input, Table, Tag, Space, Button, Modal, Form } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

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


  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default App;
