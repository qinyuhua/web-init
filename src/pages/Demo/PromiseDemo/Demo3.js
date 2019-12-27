import React from 'react';
import { Button } from 'antd';

function Example() {
  // function resolveAfter2Seconds(x) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(x);
  //     }, 2000);
  //   });
  // }
  //
  // const add1 = async function(x) {
  //   const a = await resolveAfter2Seconds(20);
  //   const b = await resolveAfter2Seconds(30);
  //   return x + a + b;
  // };
  //
  // add1(10).then(v => {
  //   console.log(v);
  // });
  //
  // (async function(x) {
  //   const a1 = resolveAfter2Seconds(20);
  //   const b1 = resolveAfter2Seconds(30);
  //   return x + a1 + b1;
  // })(10).then(v => {
  //   console.log(v);
  // });

  return (
    <div>
      <Button>clickMe</Button>
    </div>
  );
}

export default Example;
