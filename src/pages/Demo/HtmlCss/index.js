import React, { Component } from 'react';
import { Card, Tabs } from 'antd';
import Demo1 from './Demo1';

const { TabPane } = Tabs;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card bordered={false}>
        <Tabs defaultActiveKey="2" tabPosition="top">
          <TabPane tab="Css" key="1">
            <Demo1 />
          </TabPane>
          <TabPane tab="2" key="2">
            2
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Index;
