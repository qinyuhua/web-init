import React, { Component } from 'react';
import { Card, Button } from 'antd';
// import MyPromise from './promiseDemo';

class Demo1 extends Component {
  handleCallBack = () => {
    // const p = new MyPromise(resolve => {
    //   // resolve(1);
    //   setTimeout(() => {
    //     resolve(2);
    //   }, 1000);
    // });
    // p.then(x => {
    //   console.log(x);
    // })
    //   .then(() => {
    //     console.log('链式调用1');
    //   })
    //   .then(() => {
    //     console.log('链式调用2');
    //   });
  };

  render() {
    return (
      <Card bordered={false}>
        <div>
          1, 一个Promise必须具备三种状态，（pending|resolved|rejected）,
          当处于pending状态时，可以转移到resolved状态或者rejected状态。
          当处于resolved状态或者rejected状态时，状态不在改变
          <br />
          2, 一个promise必须有then方法，then 方法必须接受两个参数。
          <br />
          3,then 方法必须返回一个promise
        </div>
        <Button onClick={this.handleCallBack}>执行函数</Button>
      </Card>
    );
  }
}

export default Demo1;
