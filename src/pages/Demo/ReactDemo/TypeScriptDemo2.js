import React from 'react';
import { Button } from 'antd';

function FriendStatus() {
  function handleClick() {
    // function printLabel(labelledObj:{ label: string }) {
    //   console.log(labelledObj.label);
    // }
    // const myObj = { size: 10, label: 'Size 10 Object' };
    // printLabel(myObj)
  }
  return (
    <div>
      <Button onClick={() => handleClick()}>clickMe</Button>
    </div>
  );
}

export default FriendStatus;
