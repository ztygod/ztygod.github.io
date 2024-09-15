HTML<meta> 元素表示那些不能由其他 HTML 元相关（meta-related）元素<font style="color:#DF2A3F;background-color:#FBDE28;">表示的</font>****<font style="color:#DF2A3F;background-color:#FBDE28;">元数据</font>****<font style="color:#DF2A3F;background-color:#FBDE28;">信息</font>**<font style="color:rgb(27, 27, 27);">。如：</font><base><font style="color:rgb(27, 27, 27);">、</font><link><font style="color:rgb(27, 27, 27);">、</font><script><font style="color:rgb(27, 27, 27);">、</font><style><font style="color:rgb(27, 27, 27);"> 或 </font><title><font style="color:rgb(27, 27, 27);">。说人话就是传递信息。</font>

`meta`<font style="color:rgb(37, 41, 51);"> 元素往往不会引起用户的注意，但是</font>`meta`<font style="color:rgb(37, 41, 51);">对</font>**<font style="color:#DF2A3F;background-color:#FBDE28;">整个网页有影响</font>**<font style="color:rgb(37, 41, 51);">，会对网页能否被搜索引擎检索，和在搜索中的排名起着关键性的作用。</font>

+ <font style="color:rgb(27, 27, 27);">如果设置了 </font>`name`<font style="color:rgb(27, 27, 27);">属性，</font>`meta`**<font style="color:rgb(27, 27, 27);"> 元素提供的是文档级别的元数据</font>**<font style="color:rgb(27, 27, 27);">，应用于整个页面。</font>
+ <font style="color:rgb(27, 27, 27);">如果设置了 </font>`http-equiv`<font style="color:rgb(27, 27, 27);">属性，</font>`meta`**<font style="color:rgb(27, 27, 27);"> 元素则是编译指令</font>**<font style="color:rgb(27, 27, 27);">，提供的信息与类似命名的 HTTP 头部相同。</font>
+ <font style="color:rgb(27, 27, 27);">如果设置了 </font>`charset`<font style="color:rgb(27, 27, 27);">属性，</font>`meta`**<font style="color:rgb(27, 27, 27);"> 元素是一个字符集声明</font>**<font style="color:rgb(27, 27, 27);">，告诉文档使用哪种字符编码。</font>
+ <font style="color:rgb(27, 27, 27);">如果设置了 </font>`itemprop`<font style="color:rgb(27, 27, 27);"> 属性，</font>`meta`**<font style="color:rgb(27, 27, 27);"> 元素提供用户定义的元数据</font>**<font style="color:rgb(27, 27, 27);">。</font>

<h2 id="fhwrX"><font style="color:rgb(37, 41, 51);">http-equiv 属性</font></h2>

`http-equiv`一般设置的都是与`http`**<font style="color:#DF2A3F;background-color:#FBDE28;">请求头</font>**相关的信息，设置的值会关联到**<font style="color:#DF2A3F;background-color:#FBDE28;">http头部</font>**。也就是说浏览器在请求服务器获取`html`的时候，服务器会将`html`**<font style="color:#DF2A3F;background-color:#FBDE28;">中设置的</font>**`meta`**<font style="color:#DF2A3F;background-color:#FBDE28;">放在响应头中返回给浏览器</font>**。常见的类型比如`content-type`, `expires`, `refresh`, `set-cookie`, `window-target`, `charset`， `pragma`等等。

举例：<font style="color:rgb(255, 80, 44);background-color:rgb(255, 245, 245);"><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></font>

<h2 id="feJzw"><font style="color:rgb(37, 41, 51);">name 属性</font></h2>

name属性主要用于描述网页,与对应的 content 中的内容主要是便于搜索引擎查找信息和分类信息用的, 用法与==**http-equiv**==相同，`name`<font style="color:rgb(37, 41, 51);">设置属性名，</font>`content`<font style="color:rgb(37, 41, 51);">设置属性值。</font>

<h4 id="1.-author"><font style="color:rgb(37, 41, 51);">1. author</font></h4>

`author`<font style="color:rgb(37, 41, 51);">用来标注网页的作者</font>

```html
<meta name="author" content="aaa@mail.abc.com">
```

<h4 id="2.-description"><font style="color:rgb(37, 41, 51);">2. description</font></h4>

`description`<font style="color:rgb(37, 41, 51);">用来告诉搜素引擎当前网页的主要内容，是关于网站的一段描述信息。</font>

```html
<meta name="description" content="这是我的HTML">
```

<h4 id="3.-keywords"><font style="color:rgb(37, 41, 51);">3. keywords</font></h4>

`keywords`<font style="color:rgb(37, 41, 51);">设置网页的</font>**<font style="color:#DF2A3F;background-color:#FBDE28;">关键字</font>**<font style="color:rgb(37, 41, 51);">，来告诉浏览器关键字是什么。是一个经常被用到的名称。它为文档定义了一组关键字。某些</font>**<font style="color:#DF2A3F;background-color:#FBDE28;">搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类</font>**<font style="color:rgb(37, 41, 51);">。</font>

```html
<meta name="keywords" content="Hello world">
```

<font style="color:rgb(37, 41, 51);">  
</font>