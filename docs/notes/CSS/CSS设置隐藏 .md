## display:none 与 visibility:hidden 的区别

<font style="color:rgb(56, 56, 56);">这两个属性都是让元素隐藏，不可见。</font>**<font style="color:rgb(56, 56, 56);">两者区别如下：</font>**

1. **<font style="color:rgb(56, 56, 56);">在渲染树中</font>**

+ display:none<font style="color:rgb(56, 56, 56);">会让元素完全从**渲染树中消失**，渲染时不会占据任何空间；</font>
+ visibility:hidden**不会让元素从渲染树中消失**，渲染的元素还会占据相应的空间，只是内容不可见。

2. 是否有继承性

+ `display:none`是**非继承属性**，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示；
+ `visibility:hidden`是**继承属性**，子孙节点消失是由于继承了`hidden`，通过设置`visibility:visible`可以让子孙节点显示；

3. 重排与重绘

+ 修改常规文档流中元素的 **display通常会造成文档的重排**
+ <font style="color:rgb(56, 56, 56);">但是修改</font>**visibility属性只会造成本元素的重绘**；

##  opacity: 0

1. opacity=0只是透明度为100%,元素隐藏，依然占据空间。

2. opacity: 0 也会被子元素继承，但是不能通过设置子元素opacity: 1使其重新显示；
3. ==此外visibility:hidden无法进行 DOM 事件监听；<font style="color:rgb(37, 41, 51);">opacity: 0</font>可以进行 DOM 事件监听==；