import React, { Component } from 'react';
import { Card } from 'antd';
import getExplorerInfo from './explorerInfo';

class Demo2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      explorerInfo: {},
    };
  }

  componentDidMount() {
    const explorerInfo = getExplorerInfo();
    this.setState({
      explorerInfo,
    });
  }

  render() {
    const { explorerInfo } = this.state;
    // {operatorSystem: "PC", browser: "Chrome", version: "78.0.3904.108"}
    const { operatorSystem, browser, version } = explorerInfo;
    return (
      <Card bordered={false}>
        <span>操作系统：&nbsp;{operatorSystem};</span>&nbsp;&nbsp;
        <span>浏览器：&nbsp;{browser};</span>&nbsp;&nbsp;
        <span>浏览器版本：&nbsp;{version}</span>
        <br />
      </Card>
    );
  }
}

export default Demo2;
