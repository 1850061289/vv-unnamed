function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    // 遍历属性
    Object.keys(data).forEach(key => {
      this.defineProperty(data, key, data[key]);
    })
  },
  // 监听属性变化
  defineProperty: function (data, key, value) {
    let childObj = observe(value);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: () => {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        if (Dep.target) {
          dep.depend();
        }
        return value;
      },
      set: (newValue) => {
        if (newValue === value) {
          return;
        }
        value = newValue;
        // 新的值是object的话，进行监听
        childObj = observe(newValue);
        // 通知所有订阅者
        dep.notify();
      }
    })
  }

}

function observe(data) {
  // 判断是否为对象
  if (!data || typeof (data) !== 'object') {
    return;
  }

  return new Observer(data);
}
let uid = 0;

// 消息订阅器，收集订阅者
function Dep() {
  this.id = uid++;
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(sub => {
      sub.update();
    })
  },

  depend: function () {
    Dep.target.addDep(this)
  },

  removeSub: function (sub) {
    const index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  }
}

Dep.target = null;

function Watcher() {

}

Watcher.prototype = {

}