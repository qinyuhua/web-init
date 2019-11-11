import React, { Component } from 'react';
import { Card } from 'antd';
import Children3Child from './Children3-child';

class Children3 extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      name: 'children3',
      msg: 'children3 消息',
      pName: props.name,
      pMsg: props.msg,
    };
  }

  render() {
    const { name, msg, pMsg, pName } = this.state;
    return (
      <Card title={`子组件三${name}${msg}${pMsg}${pName}`}>
        <Children3Child />
      </Card>
    );
  }
}

export default Children3;
