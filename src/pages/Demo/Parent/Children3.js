import React from 'react';
import { Card } from 'antd';
import Children3Child from './Children3-child';

class Children3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card title="子组件三">
        <Children3Child />
      </Card>
    );
  }
}

export default Children3;
