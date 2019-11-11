import React, { Component } from 'react';
import { Card } from 'antd';

class Children3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'children3-child',
      msg: 'children3-child 消息',
      pName: props.name,
      pMsg: props.msg,
    };
  }

  render() {
    const { name, msg, pMsg, pName } = this.state;
    return (
      <Card title="子组件三的子组件, 孙组件">
        <div>
          {pMsg} : {pName}
        </div>
        <div>
          {msg} : {name}
        </div>
      </Card>
    );
  }
}

export default Children3;
