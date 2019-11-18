import React, { Component } from 'react';
import { Card } from 'antd';
import Context from './ChildContext';

class Children3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card title="子组件三的子组件-孙组件">
        <Context.Consumer>
          {context => {
            const { key } = context;
            return <span>父组件传递过来的消息：{key}</span>;
          }}
        </Context.Consumer>
      </Card>
    );
  }
}

export default Children3;
