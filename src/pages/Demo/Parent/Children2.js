import React, { Component } from 'react';
import { Card } from 'antd';

class Children2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'children2',
      msg: 'children2 消息',
      pName: props.name,
      pMsg: props.msg,
    };
  }

  handleChildren2Fn = (msg, name) => {
    // console.log('调用children2 消息=========');
    // console.log(this);
    this.setState({ msg, name });
  };

  render() {
    const { name, msg, pMsg, pName } = this.state;
    return (
      <Card title="子组件一">
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

export default Children2;
