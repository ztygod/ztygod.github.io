## px

<font style="color:#000000;">px，表示像素，所谓像素就是呈现在我们显示器上的一个个小点，每个像素点都是大小等同的，所以像素为计量单位被分在了绝对长度单位中。</font>

## <font style="color:rgb(37, 41, 51);">em，rem</font>

`em和rem`**<font style="color:#DF2A3F;background-color:#FBDE28;"> 分别相对于父元素和根元素的字体大小</font>**

1. em是**<font style="background-color:#FBDE28;">相对长度单位</font>**。<font style="background-color:#FBDE28;">相对于当前对象内文本的字体尺寸</font>。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（`1em = 16px`）。为了简化 font-size 的换算，我们需要在css中的 body 选择器中声明`font-size= 62.5%`，这就使 em 值变为 `16px*62.5% = 10px`。<font style="color:#000000;">是说只需要将你的原来的px 数值除以 </font>`10`<font style="color:#000000;">，然后换上 em作为单位就行了。</font>
2. <font style="color:#000000;">rem，</font>**<font style="color:#DF2A3F;background-color:#FBDE28;">相对单位，相对的只是HTML根元素font-size的值</font>**<font style="color:#000000;">。同理，如果想要简化</font>`font-size`<font style="color:#000000;">的转化，我们可以在</font>`根元素HTML`<font style="color:#000000;">中加入</font>`font-size: 62.5%`<font style="color:#000000;">。</font>

## <font style="color:rgb(37, 41, 51);">rem 与 em 的区别</font>

<font style="color:rgb(37, 41, 51);">rem只能在html标签里面设置</font>**<font style="color:#DF2A3F;background-color:#FBDE28;">rem的依赖的值</font>**<font style="color:rgb(37, 41, 51);">到底是多少</font>

<font style="color:rgb(37, 41, 51);">而em是可以在自己元素以及父级元素设置em依赖的值到底是多少</font>

## <font style="color:rgb(37, 41, 51);">vh、vw</font>

`vh,vw`<font style="color:#DF2A3F;background-color:#FBDE28;"> 分别相对于视口的高度和宽度。</font>

<font style="color:#000000;">vw是根据</font>**<font style="color:#DF2A3F;background-color:#FBDE28;">窗口的宽度，分成</font>**`100`**<font style="color:#DF2A3F;background-color:#FBDE28;">等份</font>**<font style="color:#000000;">，</font>`100vw`<font style="color:#000000;">就表示</font>`满宽`<font style="color:#000000;">，50vw就表示一半宽。（vw 始终是针对窗口的宽），同理，</font>`vh`

<font style="color:#000000;">则为窗口的高度。</font>

## <font style="color:#000000;">补充：vm</font>

**<font style="color:#DF2A3F;background-color:#FBDE28;">相对于视口的</font>**`宽度`**<font style="color:#DF2A3F;background-color:#FBDE28;">或</font>**`高度`**<font style="color:#DF2A3F;background-color:#FBDE28;">中</font>**`较小`**<font style="color:#DF2A3F;background-color:#FBDE28;">的那个</font>**<font style="color:#000000;">。其中</font>`最小`<font style="color:#000000;">的那个被均分为</font>`100`<font style="color:#000000;">单位的</font>`vm`<font style="color:#000000;">。 举个例子：浏览器高度900px，宽度1200px，取最小的浏览器高度，1 vm = 900px/100 = 9 px。</font>

