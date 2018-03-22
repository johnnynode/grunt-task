var index = index || {};
index = {
  init:function (argument) {
    console.log('index init');
  }
};
index.init();;function test(argument) {
  this.a = 1;
}
test.prototype.method_name=function (first_argument) {
  console.log(this.a);
};