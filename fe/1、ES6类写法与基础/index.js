class Parent {
  constructor(a) {
    this.filed1 = a;
  }
  filed2 = 2;
  func1 = function () {
    console.log(`Parent 1`);
  };
  static bar = "static 1"; //静态方式只能自身访问
  static bar2 = function () {
    return 3344;
  };
}

class Child extends Parent {
  constructor() {
    super(); // 修改this原型指向实现继承 采用函数+对象混合继承
    this.filed3 = 111;
  }
  static bar3() {
    // 注意定义函数 不要写function
    return super.bar2(); //相当与父类调用 static不影响
  }
  filed4 = 4;
  func2 = function () {
    console.log("fun2");
  };
}

console.log(Parent.func1()); // 直接调用类对象
console.log(Child.bar3()); // 直接调用继承类对象
let a = new Parent(111); // 实例化
let b = new Child(3333, 2222); // 实例化
