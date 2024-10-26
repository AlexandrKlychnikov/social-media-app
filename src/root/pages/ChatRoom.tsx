import React from 'react';

const Room = React.lazy(() => import('roomApp/Room'));

function ChatRoom() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Room />
    </React.Suspense>
  );
}

export default ChatRoom;
