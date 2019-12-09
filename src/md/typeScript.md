## TypeScript

### 1. 基础类型

> 数字、字符串、结构体、布尔值

#### 1.1 布尔值

```typescript
let isDone: boolean = false;
```

#### 1.2 数字

TypeScript 里的所有的数字都是浮点数。 类型为 number

```typescript
let num: number = 6;
let num2: number = 0b1010;
```

#### 1.3 字符串 string

用单引号或者双引号 表示字符串

#### 1.4 数组

两种方式定义数组：

- 在元素类型后面接上[]

```typescript
let list: number[] = [1, 2, 3];
const list2: string[] = ['a', 'b'];
```

- 使用数组泛型 Array<元素类型>

```typescript
const list: Array<number> = [1, 3, 4];
```

#### 1.5 元组 Tuple

元素类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```
let x: [string, number];
x = ['hello', 3]; // OK

// Assigned expression type [number , string] is not assignable to type [string , number]
x = [3, 'hello']; // Error
```

当访问一个已知索引的元素，会得到正确的类型

```
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问一个越界的元素，会使用联合类型替代

```
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```

#### 1.6 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

默认情况下，从 0 开始为元素编号。

也可以指定成员数量

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到他的名字。例如，我们知道数组为 1，但是不确定它的映射到 Color 里的哪个名字，我们可以相应查询

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

console.log(colorName); // 显示Green
```

#### 1.7 Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any 类型来标记这些变量：

```typescript
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
```

在对现有代码进行改写的时候，any 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object 有相似的作用，就像它在其它语言中那样。 但是 Object 类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

#### 1.8 Void

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

```typescript
function warnUser(): void {
  console.log('This is my warning message');
}
```

#### 1.9 Null 和 Undefined

TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。 和 void 相似，它们的本身的类型用处不是很大：

```typescript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

#### 1.10 泛型

\*\*

### 2. 接口 interface

> TypeScript 的核心原则之一：对值所具有的结构进行类型检查。接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 3. TypeScript + react + Ant design 自定义组件解析

在使用 antd 刚开发时，打算自己写一个自定义组件，然后发现会有一些错误，在此记录下自己的理解，以及可能的解决方案

使用传统的组件写法，然后在父组件中引入子组件，传递一些数据

父组件 P：

```html
<AlipayComponent
  title="随借随还，按日计息"
  titleValue="扫码登录"
  url="https://www.baidu.com/"
  scanValue="请用您的支付宝扫一扫"
  openValue="请打开支付宝APP扫码登录，查看应还金额，完成还款"
/>
```

子组件 C：

```
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import alipayLogo from '../../assets/alipay-logo.png';
import alipayPage from '../../assets/alipay-page.png';
import styles from './index.css';

interface AlipayState {
  url?: string,
  title? : string,
  titleValue?: string,
  scanValue?: string,
  openValue?: string,
}

export interface AlipayProps {
  url?: string;
  title? : string,
  titleValue?: string,
  scanValue?: string,
  openValue?: string,
}


/**
 * <AlipayProps, AlipayState> 这个顺序不能颠倒，
 * PropsType 是从父组件传过来的属性的类型
 *
 */
export default class AlipayComponent extends Component<AlipayProps, AlipayState> {
  constructor(props: AlipayProps) {
    super(props);
    console.log(props);
    this.state = {
      url: props.url,
      title: props.title || undefined,
      titleValue: props.titleValue || undefined,
      scanValue: props.scanValue || undefined,
      openValue: props.openValue || undefined,
    }
  }

  render(): React.ReactNode {
    const {
      url,
      title,
      titleValue,
      scanValue,
      openValue
    } = this.state;
    return (
      <div className={styles.layout}>
        <div className={styles.leftLayout}>
          <div className={styles.title}>{title || '' }</div>

          {titleValue && <div className={styles.titleValue}>{titleValue}</div>}
          <span className={styles.qrCodeCss}>
              <QRCode
                value={url || ''}// 生成二维码的内容
                size={160} // 二维码的大小
                fgColor="#000000" // 二维码的颜色
                imageSettings={{ // 中间有图片logo
                  src: alipayLogo,
                  height: 32,
                  width: 32,
                  excavate: true
                }}
              />
            </span>
          {scanValue && <div className={styles.scanCss}>{scanValue}</div>}
          {openValue && <div className={styles.openCss}>{openValue}</div>}
        </div>
        <div className={styles.rightLayout}>
          <img alt="page" src={alipayPage} width={282} height={457}/>
        </div>
      </div>
    )
  }
}
```

可以分成几部分解析

### 1. 引入

`export default class AlipayComponent extends Component<AlipayProps, AlipayState> {`
