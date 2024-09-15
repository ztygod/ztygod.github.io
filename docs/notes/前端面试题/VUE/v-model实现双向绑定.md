## V-model实现双向绑定

Vue 组件可以通过使用 `v-model` 指令以实现双向绑定。

`v-model` 是 vue 的一个语法糖，它用于监听数据的改变并将数据更新。以 input 元素为例：

```vue
<el-input v-model="foo" />
```

等价于

```vue
<input :value="searchText" @input="searchText = $event.target.value" />
```

## 在组件中实现v-model

### vue2中，只需在子组件中定义 `model` 属性即可。

```vue
// 默认的 model 属性
export default {
  model: {
    prop: 'value',
    event: 'input'
  }
}
```

也就是说，如果你不定义 `model` 属性，或者你按照当面方法定义属性，当其他人使用你的自定义组件时，`v-model="foo"` 就完全等价于 `:value="foo"` 加上 `@input="foo = $event"`。

如果把 `model` 属性进行一些改装，如下：

```vue
// 默认的 model 属性
export default {
  model: {
    prop: 'ame',
    event: 'zard'
  }
}
```

那么，`v-model="foo"` 就等价于 `:ame="foo"` 加上 `@zard="foo = $event"`。

子组件如下：

```vue
<template>
<div>
  我们是TI{{ ame }}冠军
  <el-button @click="playDota2(1)">加</el-button>
  <el-button @click="playDota2(-1)">减</el-button>
</div>
</template>
<script>
export default {
  props: {
    ame: {
      type: Number,
      default: 8
    }
  },
  model: { // 自定义v-model的格式
    prop: 'ame', // 代表 v-model 绑定的prop名
    event: 'zard' // 代码 v-model 通知父组件更新属性的事件名
  },
  methods: {
    playDota2(step) {
      const newYear = this.ame + step
      this.$emit('zard', newYear)
    }
  }
}
</script>
```

父组件：

```vue
// template中
    <dota v-model="ti"></dota>
      // script中
      export default {
        data() {
          return {
            ti: 8
          }
        }
      }
```

### Vue 3 组合式 API 实现 defineModel()

底层机制

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

defineModel()举例（这个方法更加方便）：

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
<!-- Parent.vue -->
<Child v-model="countModel" />
```

### 多个 `v-model` 绑定

给v-model设置一个参数
```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```