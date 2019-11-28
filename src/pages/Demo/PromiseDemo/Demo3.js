import React, { useState } from 'react';
import { Button } from 'antd';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <Button onClick={() => setCount(count + 1)}>clickMe</Button>
    </div>
  );
}

export default Example;
