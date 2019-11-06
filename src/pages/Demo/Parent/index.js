import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import Children1 from './Children1';
import Children2 from './Children2';

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
    };
  }

  callBack = (msg, name) => {
    this.setState({ msg, name });
  };

  handleClick = e => {
    // console.log(this);
    e.stopPropagation();
    // this.refs.children2.handleChildren2Fn('父类消息2', 'parent2');
    this.children2.handleChildren2Fn('父类消息2', 'parent2');
  };

  render() {
    const { msg, name } = this.state;
    return (
      <Card title="React父组件与子组件之间的数据传递及函数调用">
        <Row gutter={24}>
          <Col span={8}>
            <div>
              {msg}：{name}
            </div>
            <Button onClick={this.handleClick}>父组件 点击调用子组件2 中的函数</Button>
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
    );
  }
}

export default Index;
