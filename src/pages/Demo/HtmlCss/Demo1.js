import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

function FriendStatus() {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // return () => {
    //   ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    // };
  });

  // if (isOnline === null) {
  //   return 'Loading....';
  // }
  // return isOnline ? 'Online' : 'Offline';
  return (
    <div>
      <p>{isOnline}</p>
      <Button onClick={() => handleStatusChange({ isOnline: 2 })}>clickMe</Button>
    </div>
  );
}

export default FriendStatus;
