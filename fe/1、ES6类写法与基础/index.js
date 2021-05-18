class Parent {
  constructor(a) {
    this.filed1 = a;
  }
  func1() {
    console.log(`原型方法1`);
  }
  static bar = "静态属性 1"; //静态方式只能自身访问
  static bar2 = function () {
    console.log("静态方法 1");
  };
}

class Child extends Parent {
  constructor() {
    super(); // 修改this原型指向实现继承 采用函数+对象混合继承
    this.filed3 = 111;
  }
  static bar3() {
    super.bar2(); //相当与父类调用 static不影响
  }
  filed4 = 4;
  func2 = function () {
    console.log("fun2");
  };
}
console.log(Parent.bar); // 类可以调用静态属性
Parent.bar2(); //类可以直接调用静态方法
let a = new Parent(111); // 实例化
console.log(a.filed1); // 实例可以访问原型属性
a.func1(); // 实例可以访问原型方法

Child.bar3(); // 直接调用继承类对象
let b = new Child(); // 实例化
console.log(11111);
console.log(b.filed4);
