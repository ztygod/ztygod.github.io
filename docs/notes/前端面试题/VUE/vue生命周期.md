## vue2生命周期

### 1. 实例初始化阶段

- **beforeCreate**: 在实例初始化之后，数据观测 (data observer) 和事件/ watcher 事件配置之前被调用。
- **created**: 实例已经创建完成，**data、props、methods 已经初始化，但还未渲染模板**，el 还未挂载。

### 2. 模板编译和挂载阶段

- **beforeMount**: 在**挂载开始之前被调用**，相关的 render 函数首次被调用。
- **mounted**: el 被新创建的 vm.el替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounnted 被调用时 vm.el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。

### 3. 更新阶段

- **beforeUpdate**: 数据更新时调用，**发生在虚拟 DOM 打补丁之前**。
- **updated**: 组件 DOM 已经更新，但是在这个阶段不会触发重新渲染。

### 4. 销毁阶段

- **beforeDestroy**: 实例销毁之前调用。**在这一步，实例仍然完全可用**。
- **destroyed**: Vue 实例销毁后调用。**在这一步，所有的事件监听器已经被移除，所有的子实例也已经被销毁**。

## vue3生命周期

Vue 3 的生命周期钩子命名与 Vue 2 略有不同，以 `on` 开头：

- **onBeforeMount** : 在组件挂载之前调用，与 Vue 2 中的 `beforeMount` 相似。
- **onMounted** : 在组件挂载完成后调用，与 Vue 2 中的 `mounted` 相似。
- **onBeforeUpdate** : 在组件更新之前调用，与 Vue 2 中的 `beforeUpdate` 相似。
- **onUpdated** : 在组件更新后调用，与 Vue 2 中的 `updated` 相似。
- **onBeforeUnmount** : 在组件卸载之前调用，与 Vue 2 中的 `beforeDestroy` 相似。
- **onUnmounted** : 在组件卸载后调用，与 Vue 2 中的 `destroyed` 相似。

与此同时，Vue 3 引入了两个新的生命周期钩子，用于渲染函数的追踪和触发：

- **renderTracked : 当依赖项被追踪时调用。**
- **renderTriggered : 当依赖项变化并触发重新渲染时调用。**

## 二者区别

- vue3大部分生命周期钩子名称上 + “on”，功能上是类似的。
- Vue3 在组合式API（Composition API，下面展开）中使用**生命周期钩子时需要先引入**，而 Vue2 在选项API（Options API）中可以直接调用生命周期钩子