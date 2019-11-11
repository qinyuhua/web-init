import React, { Component } from 'react';
import { Card, Row, Col, Button, Tooltip, Tabs } from 'antd';
import Children1 from './Children1';
import Children2 from './Children2';
import Children3 from './Children3';

import Context from './ChildContext';

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
    this.state = {
      msg: '父类消息',
      name: 'parent',
      index: 1,
      child3C: { key: 'child3child' },
    };
  }

  callBack = (msg, name, index) => {
    this.setState({ msg, name, index });
  };

  /**
   * 父组件 点击调用子组件2 中的函数
   * @param e
   */
  handleClick = e => {
    e.stopPropagation();
    const { msg, name, index } = this.state;
    this.children2.handleChildren2Fn(`${msg}${index}`, `${name}${index}`);
    this.setState({ index: index + 1 });
  };

  /**
   * 点击修改父组件数据，可以相应更新子组件展示数据
   * @param e
   */
  handleChangeState = e => {
    e.stopPropagation();
    const { msg, name, index } = this.state;
    this.setState({
      msg: `${msg}${index + 1}`,
      name: `${name}${index + 1}`,
      index: index + 1,
    });
  };

  /**
   * 父组件Context上下文
   * @param e
   * Provider value 属性相当于getChildContext()
   */
  handleContextBack = e => {
    e.stopPropagation();
    // const { msg, name, index } = this.state;
    // this.setState({
    //   msg: `${msg}${index + 1}`,
    //   name: `${name}${index + 1}`,
    //   index: index + 1,
    // });
  };

  render() {
    const { msg, name, child3C } = this.state;
    return (
      <Tabs defaultActiveKey="1" tabPosition="top">
        <TabPane tab="React父组件与子组件之间" key="1">
          <Card title="React父组件与子组件之间的数据传递及函数调用">
            <Row gutter={24}>
              <Col span={8}>
                <div>
                  {msg}：{name}
                </div>
                <Tooltip placement="topLeft" title="父组件 点击调用子组件2 中的函数">
                  <Button onClick={this.handleClick}>P调用C2函数</Button>
                </Tooltip>
                <Tooltip placement="topLeft" title="点击修改父组件数据，可以相应更新子组件展示数据">
                  <Button onClick={this.handleChangeState}>P函数修改数据，同步C2数据</Button>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Children1 {...this.state} callBack={this.callBack} />
              </Col>
              <Col span={8}>
                <Children2
                  {...this.state}
                  ref={children => {
                    this.children2 = children;
                  }}
                />
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab="Context上下文" key="2">
          <Row gutter={24}>
            <Col span={8}>
              <Card title="父组件Context上下文 Demo">
                <div>
                  Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props
                  属性。
                </div>
                <Button onClick={this.handleContextBack}>context按钮</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Context.Provider value={child3C}>
                <Children3 />
              </Context.Provider>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    );
  }
}

export default Index;
