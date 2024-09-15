## vue3

### props

用 props 传数据给子组件有两种方法,一种是setup()写法，另一种是setup语法糖，这里以setup语法糖为例：

```vue
// Parent.vue 传送
<child :msg1="msg1" :msg2="msg2"></child>
<script setup>
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    const msg1 = ref("这是传给子组件的信息1")
    // 或者复杂类型
    const msg2 = reactive(["这是传级子组件的信息2"])
</script>

// Child.vue 接收
<script setup>
    // 不需要引入 直接使用
    // import { defineProps } from "vue"
    const props = defineProps({
        // 写法一
        msg1: String,
        // 写法二
        msg2:{
            type:String,
            default:""
        }
    })
    console.log(props) // { msg2:"这是传级子组件的信息2" }
</script>
```

### $emit

这个主要用子组件获取父组件的方法

```vue
<template>
    <!-- 写法一 -->
    <button @click="emit('myClick')">按钮</buttom>
    <!-- 写法二 -->
    <button @click="handleClick">按钮</buttom>
</template>
<script setup>
    
    // 方法一 适用于Vue3.2版本 不需要引入
    // import { defineEmits } from "vue"
    // 对应写法一
    const emit = defineEmits(["myClick","myClick2"])
    // 对应写法二
    const handleClick = ()=>{
        emit("myClick", "这是发送给父组件的信息")
    }
</script>

// Parent.vue 响应
<template>
    <child @myClick="onMyClick"></child>
</template>
<script setup>
    import child from "./child.vue"
    const onMyClick = (msg) => {
        console.log(msg) // 这是父组件收到的信息
    }
</script>
```

### expose / ref

**父组件获取子组件的属性或者调用子组件方法**

```vue
// Child.vue
<script setup>
    // 方法二 适用于Vue3.2版本, 不需要引入
    // import { defineExpose } from "vue"
    defineExpose({
        childName: "这是子组件的属性",
        someMethod(){
            console.log("这是子组件的方法")
        }
    })
</script>

// Parent.vue  注意 ref="comp"
<template>
    <child ref="comp"></child>
    <button @click="handlerClick">按钮</button>
</template>
<script setup>
    import child from "./child.vue"
    import { ref } from "vue"
    const comp = ref(null)
    const handlerClick = () => {
        console.log(comp.value.childName) // 获取子组件对外暴露的属性
        comp.value.someMethod() // 调用子组件对外暴露的方法
    }
</script>
```

### attrs

`attrs`：`**$attrs**`包含父组件中**除props和自定义事件外的所有属性集合**。（父组件传递的参数，`**defineProps（）**`没接收的参数，都由`**useAttrs（）**`接收）

```vue
// Parent.vue 传送
<child :msg1="msg1" :msg2="msg2" title="3333"></child>
<script setup>
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    const msg1 = ref("1111")
    const msg2 = ref("2222")
</script>

// Child.vue 接收
<script setup>
    import { defineProps, useContext, useAttrs } from "vue"
    // 3.2版本不需要引入 defineProps，直接用
    const props = defineProps({
        msg1: String
    })
    // 方法二 适用于 Vue3.2版本
    const attrs = useAttrs()
    // 用VueUse方法获得，除props之外的参数
    console.log(attrs) // { msg2:"2222", title: "3333" }
</script>
```

### v-model

可以在父子组件进行多个数据进行双向绑定

```vue
// Parent.vue
<child v-model:key="key" v-model:value="value"></child>
<script setup>
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    const key = ref("1111")
    const value = ref("2222")
</script>

// Child.vue
<template>
    <button @click="handlerClick">按钮</button>
</template>
<script setup>
    // 方法二 适用于 Vue3.2版本，不需要引入
    // import { defineEmits } from "vue"
    const emit = defineEmits(["key","value"])
    
    // 用法
    const handlerClick = () => {
        emit("update:key", "新的key")
        emit("update:value", "新的value")
    }
</script>
```

### provide / inject

provide / inject 为依赖注入

`provide`：可以让我们指定想要提供给后代组件的数据

`inject`：在任何后代组件中接收想要添加在这个组件上的数据，**不管组件嵌套多深都可以直接拿来用**

```vue
// Parent.vue
<script setup>
    import { provide } from "vue"
    provide("name", "沐华")
</script>

// Child.vue
<script setup>
    import { inject } from "vue"
    const name = inject("name")
    console.log(name) // 沐华
</script>
```

### Vuex/Pinia

### mitt

Vue3 中没有了 EventBus 跨组件通信，但是现在有了一个替代的方案 mitt.js，原理还是 EventBus

先安装 `npm i mitt -S`

封装一下

```vue
mitt.js
import mitt from 'mitt'
const mitt = mitt()
export default mitt
// 组件 A
<script setup>
import mitt from './mitt'
const handleClick = () => {
    mitt.emit('handleChange')
}
</script>

// 组件 B 
<script setup>
import mitt from './mitt'
import { onUnmounted } from 'vue'
const someMethed = () => { ... }
mitt.on('handleChange',someMethed)
onUnmounted(()=>{
    mitt.off('handleChange',someMethed)
})
</script>
```

## vue2

vue2的组件通信一共有12种

### 父子组件通信

#### props

父组件向子组件传送数据，这应该是最常用的方式了

子组件接收到数据之后，**不能直接修改**父组件的数据。会报错，所以当父组件重新渲染时，数据会被覆盖。如果子组件内要修改的话**推荐使用 computed**。

#### $emit / v-on

子组件通过派发事件的方式给父组件数据，或者触发父组件更新等操作。

```javascript
// Child.vue 派发
export default {
  data(){
    return { msg: "这是发给父组件的信息" }
  },
  methods: {
    handleClick(){
      this.$emit("sendMsg",this.msg)
    }
  },
}
  // Parent.vue 响应
<template>
<child v-on:sendMsg="getChildMsg"></child>
// 或 简写
<child @sendMsg="getChildMsg"></child>
</template>

export default {
  methods:{
    getChildMsg(msg){
      console.log(msg) // 这是父组件接收到的消息
    }
  }
}
```

#### $attrs / $listeners

`$attrs`：包含父作用域里**除 class 和 style 除外的非 props 属性集合**。通过 this.$attrs 获取父作用域中所有符合条件的属性集合，然后还要继续传给子组件内部的其他组件，就可以通过 v-bind="$attrs"

`$listeners`：包含**父作用域里 .native 除外的监听事件集合**。如果还要继续传给子组件内部的其他组件，就可以通过 v-on="$linteners"

```javascript
// Parent.vue
<template>
  <child :name="name" title="1111" ></child>
  </template
export default{
  data(){
    return {
      name:"沐华"
    }
  }
}

  // Child.vue
  <template>
  // 继续传给孙子组件
  <sun-child v-bind="$attrs"></sun-child>
  </template>
export default{
  props:["name"], // 这里可以接收，也可以不接收
  mounted(){
    // 如果props接收了name 就是 { title:1111 }，否则就是{ name:"沐华", title:1111 }
    console.log(this.$attrs)
  }
}
```

#### ref

ref 如果在普通的DOM元素上，引用指向的就是该DOM元素;

**如果在子组件上，引用的指向就是子组件实例**，然后父组件就可以通过 ref 主动获取子组件的属性或者调用子组件的方法。

```javascript
// Child.vue
export default {
    data(){
        return {
            name:"沐华"
        }
    },
    methods:{
        someMethod(msg){
            console.log(msg)
        }
    }
}

// Parent.vue
<template>
    <child ref="child"></child>
</template>
<script>
export default {
    mounted(){
        const child = this.$refs.child
        console.log(child.name) // 沐华
        child.someMethod("调用了子组件的方法")
    }
}
</script>
```

#### .sync

可以帮我们实现父组件向子组件传递的数据 的双向绑定，**所以子组件接收到数据后可以直接修改，并且会同时修改父组件的数据**。

```javascript
// Parent.vue
<template>
    <child :page.sync="page"></child>
</template>
<script>
export default {
    data(){
        return {
            page:1
        }
    }
}

// Child.vue
export default {
    props:["page"],
    computed(){
        // 当我们在子组件里修改 currentPage 时，父组件的 page 也会随之改变
        currentPage {
            get(){
                return this.page
            },
            set(newVal){
                this.$emit("update:page", newVal)
            }
        }
    }
}
</script>
```

#### v-model

和 .sync 类似，可以实现将父组件传给子组件的数据为双向绑定，**子组件通过 $emit 修改父组件的数据**

```vue
// Parent.vue
    <template>
      <child v-model="value"></child>
    </template>
  <script>
    export default {
      data(){
        return {
          value:1
        }
      }
    }

      // Child.vue
  <template>
  <input :value="value" @input="handlerChange">
  </template>
  export default {
  props:["value"],
  // 可以修改事件名，默认为 input
  model:{
    // prop:'value', // 上面传的是value这里可以不写，如果属性名不是value就要写
    event:"updateValue"
  },
  methods:{
    handlerChange(e){
      this.$emit("input", e.target.value)
      // 如果有上面的重命名就是这样
      this.$emit("updateValue", e.target.value)
    }
  }
  }
  </script>
```

#### $children / $parent

`$children`：获取到一个包含所有子组件(不包含孙子组件)的 VueComponent 对象数组，可以直接拿到子组件中所有数据和方法等

`$parent`：获取到一个父节点的 VueComponent 对象，同样包含父节点中所有数据和方法等

```javascript
// Parent.vue
export default{
  mounted(){
    this.$children[0].someMethod() // 调用第一个子组件的方法
    this.$children[0].name // 获取第一个子组件中的属性
  }
}

// Child.vue
export default{
  mounted(){
    this.$parent.someMethod() // 调用父组件的方法
    this.$parent.name // 获取父组件中的属性
  }
}
```

### 兄弟组件通信

#### vuex

#### EventBus

EventBus 是中央事件总线，不管是父子组件，兄弟组件，跨层级组件等都可以使用它完成通信操作

定义方式有三种

```javascript
// 方法一
// 抽离成一个单独的 js 文件 Bus.js ，然后在需要的地方引入
// Bus.js
import Vue from "vue"
export default new Vue()

// 方法二 直接挂载到全局
// main.js
import Vue from "vue"
Vue.prototype.$bus = new Vue()

// 方法三 注入到 Vue 根对象上
// main.js
import Vue from "vue"
new Vue({
    el:"#app",
    data:{
        Bus: new Vue()
    }
})
```

使用方式

```javascript
// 在需要向外部发送自定义事件的组件内
<template>
    <button @click="handlerClick">按钮</button>
</template>
import Bus from "./Bus.js"
export default{
    methods:{
        handlerClick(){
            // 自定义事件名 sendMsg
            Bus.$emit("sendMsg", "这是要向外部发送的数据")
        }
    }
}

// 在需要接收外部事件的组件内
import Bus from "./Bus.js"
export default{
    mounted(){
        // 监听事件的触发
        Bus.$on("sendMsg", data => {
            console.log("这是接收到的数据：", data)
        })
    },
    beforeDestroy(){
        // 取消监听
        Bus.$off("sendMsg")
    }
}
```

### 跨层级组件通信

#### provide / inject

`provide`：可以让我们指定想要提供给后代组件的数据或方法

`inject`：在任何后代组件中接收想要添加在这个组件上的数据或方法，不管组件嵌套多深都可以直接拿来用

**要注意的是 provide 和 inject 传递的数据不是响应式的**，也就是说用 inject 接收来数据后，provide 里的数据改变了，后代组件中的数据不会改变，除非传入的就是一个可监听的对象

```javascript
// 父组件
export default{
    // 方法一 不能获取 this.xxx，只能传写死的
    provide:{
        name:"沐华",
    },
    // 方法二 可以获取 this.xxx
    provide(){
        return {
            name:"沐华",
            msg: this.msg // data 中的属性
            someMethod:this.someMethod // methods 中的方法
        }
    },
    methods:{
        someMethod(){
            console.log("这是注入的方法")
        }
    }
}

// 后代组件
export default{
    inject:["name","msg","someMethod"],
    mounted(){
        console.log(this.msg) // 这里拿到的属性不是响应式的，如果需要拿到最新的，可以在下面的方法中返回
        this.someMethod()
    }
}
```