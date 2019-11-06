import React, { Component } from 'react';
import { Card, Button } from 'antd';

class Children1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'children1',
      msg: 'children1 消息',
      pName: props.name,
      pMsg: props.msg,
    };
  }

  /**
   * handleClick 采用箭头函数的写法，目的是改变this的指向，
   * 使得在函数单独调用的时候，函数内部的this依然指向children1 组件
   * @param msg
   * @param name
   */
  handleClick = () => {
    // console.log(this);
    const { name, msg } = this.state;
    this.props.callBack(msg, name);
  };
  // handleClick() { // todo test
  //   console.log(this);
  //   const { name, msg } = this.state;
  //   this.props.callBack(msg, name)
  // }

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
        <Button onClick={this.handleClick}>子组件1 点击事件(子调用父函数)</Button>
      </Card>
    );
  }
}

export default Children1;
