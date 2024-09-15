在 Vuex 中，action 和 mutation 有以下区别。

1. 首先，mutation 是用来直接修改状态的，必须是**同步操作**。而 action 可以包含**异步操作**，比如进行网络请求等，然后通过**提交 mutation** 来修改状态。
2. 其次，action 可以进行一系列的操作，比如可以包含多个 mutation 的调用，或者进行复杂的业务逻辑处理后再修改状态。
3. 另外，**action 通常是通过 dispatch** 方法来触发，而 **mutation 是通过 commit 方法来触发**。

