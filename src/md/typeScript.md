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

元素类型允许表示一个一直

### 2. 接口 interface

> TypeScript 的核心原则之一：对值所具有的结构进行类型检查。接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
