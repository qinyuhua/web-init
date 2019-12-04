import React, { Component } from 'react';
import { Card, Tabs } from 'antd';
import Demo1Hook from './Demo1Hook';
import TypeScriptDemo2 from './TypeScriptDemo2';

const { TabPane } = Tabs;

class Index extends Component {
  /**
   * constructor 构造方法
   * @param props
   * ES6 对类的默认方法，通过 new 命令生成对象实例时自动调用该方法。
   * 该方法是类必有的，如果没有显示定义，则会默认添加空的 constructor()方法
   *
   * 如果想在constructor中使用this.props,super必须加props
   */
  constructor(props) {
    // todo 如果constructor中不通过super来接收props，在其他生命周期，
    // 诸如componentWillMount、componentDidMount、render中能直接使用this.props吗？？
    // 结论：可以的，react在除了constructor之外的生命周期已经传入了this.props了，完全不受super(props)的影响。
    /**
     * super(props)
     * 可以不写constructor, 一旦写constructor ,就必须在函数中写super()
     * 此时组件才有自己的this， 在组件的全局中都可以实现this关键字
     * 否则如果只是constructor 而不执行super() ,那么this 指向都是错的
     */
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card bordered={false}>
        <Tabs defaultActiveKey="2" tabPosition="top">
          <TabPane tab="Hook学习" key="1">
            <Demo1Hook />
          </TabPane>
          <TabPane tab="2" key="2">
            <TypeScriptDemo2 />
          </TabPane>
          <TabPane tab="3" key="3">
            3
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Index;