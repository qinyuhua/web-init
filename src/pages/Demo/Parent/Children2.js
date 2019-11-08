import React, { Component } from 'react';
import { Card } from 'antd';
import isEqual from 'lodash/isEqual';

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

  /**
   * getDerivedStateFromProps react17 新的生命周期
   * 用于替换 componentWillReceiveProps ，用来控制props 更新 state的过程，他返回一个对象表示新的state.
   * 每次渲染之前都会调用，不管初始挂载还是后面的 更新，都会调用，
   * componentWillReceiveProps 只有父组件早场重新渲染才会调用
   *
   * @param nextProps
   * @param preState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.msg, preState.msg)) {
      return null;
    }
    const { msg, name, index } = nextProps;
    return { pMsg: msg, pName: name, index };
  }

  handleChildren2Fn = (msg, name) => {
    // console.log('调用children2 消息=========');
    // console.log(this);
    this.setState({ msg, name });
  };

  render() {
    const { name, msg, pMsg, pName } = this.state;
    return (
      <Card title="子组件二">
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
