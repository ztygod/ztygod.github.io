## 父组件

```javascript
<template>
  <div id="parent">
    <child></child>
  </div>
</template>

<script>
import child from './components/child'
export default {
  name: 'parent',
  components: {
    child
  },
  beforeCreate() {
    console.log('I am parents beforeCreated');
  },
  created() {
    console.log('I am parents created');
  },
  beforeMount() {
    console.log('I am parents beforeMount');
  },
  mounted() {
    console.log('I am parents mounted');
  }
}
</script>
```

## 子组件

```javascript
<template>
  <div class="child">
    child
  </div>
</template>

<script>
export default {
  name: 'child',
  beforeCreate() {
    console.log('I am child beforeCreated');
  },
  created() {
    console.log('I am child created');
  },
  beforeMount() {
    console.log('I am child beforeMount');
  },
  mounted() {
    console.log('I am child mounted');
  }
}
</script>
```

## 执行顺序如下

![img](https://cdn.nlark.com/yuque/0/2024/png/40660095/1725350638719-061f4213-e782-46e8-a50f-d285c7ce9778.png)

结论

我们从而可以得出父子组件的执行顺序为：

- 父组件beforeCreated
- 父组件created
- 父组件beforeMounted
- 子组件beforeCreated
- 子组件created
- 子组件beforeMounted
- 子组件mounted
- **父组件mounted**

注意：

- 父组件的mounted是在最后执行的。
- **因此在子组件的mounted中渲染父组件在mounted阶段请求的数据，是会无反应的**。因为子组件mounted渲染数据会发生在父组件mounted请求数据之前。