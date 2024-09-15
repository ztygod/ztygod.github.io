---
title: vue响应式原理
createTime: 2024/09/15 15:14:26
permalink: /VUE/gryg3fnn/
---
## 1.vue2如何实现响应式

数据响应式就是 **⾸先建⽴响应式数据和依赖之间的关系**，当这些响应式数据发⽣==变化==的时候，可以通知**那些绑定这些数据的依赖进⾏相关操作**，可以是 DOM 更新，也可以是执⾏⼀个回调函数。

1. 总的来说就是通过 Object.defineProperty 监听对象的每⼀个属性，**当读取数据时会触发 getter**，**修改数据时会触发 setter**。

2. 然后我们在 **getter 中进⾏依赖收集**，当 setter 被触发的时候，就去把在 getter 中收集到的依赖拿出来进⾏相关操作，通常是执⾏⼀个回调函数。

3. 我们收集**依赖需要进⾏存储**，对此 Vue2 中设置了⼀个 **Dep 类**，相当于⼀个管家，**负责添加或删除**相关的依赖和通知相关的依赖进⾏相关操作**。

4. 在 Vue2 中所谓的依赖就是 Watcher。值得注意的是，只有 Watcher 触发的 getter 才会进⾏依赖收集，哪个 Watcher 触发了 getter，就把哪个 Watcher 收集到 Dep 中。当响应式数据发⽣改变的时候，就会把收集到的 Watcher 都进⾏通知。

```javascript
/**
* 这里的函数 defineReactive 用来对 Object.defineProperty 进行封装。
**/
function defineReactive(data, key, val) {
  // 依赖存储的地方
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      // 在 getter 中收集依赖
      dep.depend()
      return val
    },
    set: function(newVal) {
      val = newVal
      // 在 setter 中触发依赖
      dep.notify()
    }
  }) 
}

```

```javascript
/**
* 我们把依赖收集的代码封装成一个 Dep 类，它专门帮助我们管理依赖。
* 使用这个类，我们可以收集依赖、删除依赖或者向依赖发送通知等。
**/
class Dep {
    constructor() {
        this.subs = []
    }
    
    addSub(sub) {
        this.subs.push(sub)
    }
    
    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for(let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

// 删除依赖
function remove(arr, item) {
    if(arr.length) {
        const index = arr.indexOf(item)
        if(index > -1){
            return arr.splice(index, 1)
        } 
    }
}

```

```javascript
class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm
        this.getter = exp
        this.cb = cb
        this.value = this.get()
    }

    get() {
        Dep.target = this
        let value = this.getter.call(this.vm, this.vm)
        Dep.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}

```

## 2.为什么 Vue2 新增响应式属性要通过额外的 API

因为 Object.defineProperty 只会对属性进⾏监测，⽽不会对对象进⾏监测，为了可以监测对象 Vue2 创建了⼀个 Observer 类。**Observer** 类的作⽤就是把⼀**个对象全部转换成响应式对象，包括⼦属性数据**，当对象新增或删除属性的时候负债通知对应的 Watcher 进⾏更新操作。

```javascript
// 定义一个属性
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

class Observer {
    constructor(value) {
        this.value = value
        // 添加一个对象依赖收集的选项
        this.dep = new Dep()
        // 给响应式对象添加 __ob__ 属性，表明这是一个响应式对象
        def(value, '__ob__', this)
        if(Array.isArray(value)) {
           
        } else {
            this.walk(value)
        }
    }
    
    walk(obj) {
        const keys = Object.keys(obj)
        // 遍历对象的属性进行响应式设置
        for(let i = 0; i < keys.length; i ++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

```

### vm.set和vm.delete的实现原理

```javascript
function set(target, key, val) {
    const ob = target.__ob__
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
```

```javascript
function del(target, key) {
    const ob = target.__ob__
    delete target[key]
    ob.dep.notify()
}
```

## 3.Object.defineProperty 真的不能监听数组的变化吗

其实 Object.defineProperty 是可以监听数组的变化的。其实数组就是⼀个特殊的对象，==它的下标就可以看作是它的 key==。

那为什么我们不⽤这个⽅法呢？==⾸先这种直接通过下标获取数组元素的场景就⽐较少，其次即便通过了Object.defineProperty 对数组进⾏监听，但也监听不了 push、pop、shift 等对数组进⾏操作的⽅法==，所以还是需要通过对数组原型上的那 7 个⽅法进⾏==重写监听==。

## 4.Vue2 中是怎么监测数组的变化的

对数组原型上的 7 个⽅法进⾏重写进⾏监听的。==原理就是使⽤拦截器覆盖 Array.prototype，之后再去使⽤ Array 原型上的⽅法的时候，其实使⽤的是拦截器提供的⽅法，在拦截器⾥⾯才真正使⽤原⽣Array 原型上的⽅法去操作数组==

```javascript
// 拦截器其实就是一个和 Array.prototype 一样的对象。
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function (method) {
    // 缓存原始方法
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            // 最终还是使用原生的 Array 原型方法去操作数组
            return original.apply(this, args)
        },
        eumerable: false,
        writable: false,
        configurable: true
    })
})
```

```javascript
class Observer {
    constructor(value) {
        this.value = value
        // 添加一个对象依赖收集的选项
        this.dep = new Dep()
        // 给响应式对象添加 __ob__ 属性，表明这是一个响应式对象
        def(value, '__ob__', this)
        // 如果是数组则通过覆盖数组的原型方法进来拦截操作
        if(Array.isArray(value)) {
          value.__proto__ = arrayMethods 
        } else {
            this.walk(value)
        }
    }
    // ...
}
```



## 5.vue3是如何实现响应式的

Vue3 是通过 ==Proxy 对数据实现 getter/setter 代理==，从⽽实现响应式数据，**然后在副作⽤函数中读取响应式数据的时候，就会触发 Proxy 的 getter，在 getter ⾥⾯把对当前的副作⽤函数保存起来，将来对应响应式数据发⽣更改的话，则把之前保存起来的副作⽤函数取出来执⾏**。

```javascript
// 使用一个全局变量存储被注册的副作用函数
let activeEffect
// 注册副作用函数
function effect(fn) {
    activeEffect = fn
    fn()
}
const obj = new Proxy(data, {
    // getter 拦截读取操作
    get(target, key) {
        // 将副作用函数 activeEffect 添加到存储副作用函数的全局变量 targetMap 中
        track(target, key)
        // 返回读取的属性值
        return Reflect.get(target, key)
    },
    // setter 拦截设置操作
    set(target, key, val) {
        // 设置属性值
        const result = Reflect.set(target, key, val)
        // 把之前存储的副作用函数取出来并执行
        trigger(target, key)
        return result
    }
})
// 存储副作用函数的全局变量
const targetMap = new WeakMap()
// 在 getter 拦截器内追踪依赖的变化
function track(target, key) {
    // 没有 activeEffect，直接返回
    if(!activeEffect) return
    // 根据 target 从全局变量 targetMap 中获取 depsMap
    let depsMap = targetMap.get(target)
    if(!depsMap) {
       // 如果 depsMap 不存，那么需要新建一个 Map 并且与 target 关联
       depsMap = new Map()
       targetMap.set(target, depsMap)
    }
    // 再根据 key 从 depsMap 中取得 deps, deps 里面存储的是所有与当前 key 相关联的副作用函数
    let deps = depsMap.get(key)
    if(!deps) {
       // 如果 deps 不存在，那么需要新建一个 Set 并且与 key 关联
       deps = new Set()
       depsMap.set(key, deps)
    }
    // 将当前的活动的副作用函数保存起来
    deps.add(activeEffect)
}
// 在 setter 拦截器中触发相关依赖
function trgger(target, key) {
    // 根据 target 从全局变量 targetMap 中取出 depsMap
    const depsMap = targetMap.get(target)
    if(!depsMap) return
    // 根据 key 取出相关联的所有副作用函数
    const effects = depsMap.get(key)
    // 执行所有的副作用函数
    effects && effects.forEach(fn => fn())
}

```

最后我们和 Vue2 进⾏⼀下对⽐，我们知道 Vue2 的数据响应式存在很多的问题，例如：

- 初始化时需要遍历对象所有 key，如果对象层次较深，性能不好

- 通知更新过程需要维护⼤量 dep 实例和 watcher 实例，额外占⽤内存较多

- ⽆法监听到数组元素的变化，只能通过劫持重写了⼏个数组⽅法

- 动态新增，删除对象属性⽆法拦截，只能⽤特定 set/delete API 代替

- 不⽀持 Map、Set 等数据结构

⽽ Vue3 使⽤ Proxy 实现之后，则以上的问题都不存在了。

## 6.Vue3 中是怎么监测数组的变化

在 Vue3 中也需要像 Vue2 那样对⼀些数组原型上⽅法进⾏重写。