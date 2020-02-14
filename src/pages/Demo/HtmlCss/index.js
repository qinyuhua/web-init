import React, { Component } from 'react';
import { Card, Tabs, Button, Input } from 'antd';

const { TabPane } = Tabs;
const { Search } = Input;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ws = undefined;
  }

  handleGetServer = () => {
    if ('WebSocket' in window) {
      // console.log('你的浏览器支持webSocket！', this.ws);
      if (this.ws !== undefined && this.ws !== 'undefined') {
        // console.log('销毁或关闭close');
        this.ws.send('客户端销毁socket');
        this.ws.close();
        delete this.ws;
      }

      // const ws = new WebSocket('http://10.1.70.160:3000/blog/websocket');
      // Uncaught DOMException: Failed to construct 'WebSocket':
      // The URL's scheme must be either 'ws' or 'wss'. 'http' is not allowed.
      // 意思是要使用 ws或wss协议，不能使用 http， 原因在 js 中没有写协议导致，
      this.ws = new WebSocket('ws://10.0.132.119:3131/');
      // console.log(this.ws);

      this.ws.onopen = () => {
        // console.log('连接服务器成功');
        this.ws.send('连接服务器成功');
      };

      this.ws.onmessage = evt => {
        const receivedMsg = evt.data;
        return receivedMsg;
        // console.log('客户端接受信息', received_msg);
      };

      this.ws.onclose = function() {
        // console.log('连接关闭...');
      };
    } else {
      // alert('您的浏览器不支持WebScoket');
    }
  };

  handleSend = value => {
    // console.log(value, this.ws.readyState);
    this.ws.send(value);
  };

  render() {
    return (
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" tabPosition="top">
          <TabPane tab="test" key="1">
            <Button onClick={() => this.handleGetServer()}>连接服务器</Button>
            <br />
            <br />
            <Search
              placeholder="输入数据"
              enterButton="发送"
              size="large"
              onSearch={value => this.handleSend(value)}
              style={{ width: 300 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Index;
