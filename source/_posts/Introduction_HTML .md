---
title: Html入门
---
HTML是一种超文本标签语言

## html的基本结构如下：
```html
	 <!DOCTYPE html>    <!--文档声明（告诉浏览器页面版本）-->
      <html lang=“en"> <!-- 网页语言（中文：zh）-->
      <head>
	      <meta charset=“UTF-8"> <!-- 编码格式 （提供页面的元信息，常用属性：charset，name，content）-->
	      <title>Document</title>      <!--  网页标题-->
      </head>     <!--  页头-->
      <body>
	      <!--  页身-->
      </body>
      </html>  <!--  HTML文档-->
```
## meta的其他属性值(与SEO优化有关联)
```html
<meta name=“Keywords”  content=“关键字”>
<meta name=“Description”  content=“描述”> 
```
## 基本标签
### 块属性标签（块嵌套行）
div:无语义标签，主要用于布局

```html
<div class="wrap">
	<div class="header">头部</div>
	<div class="content">内容</div>
	<div class="footer">脚部</div>
</div>
```

h1~h6:定义标题，作为标题使用

```html
<h1>I'm H1</h1>
<h2>I'm H2</h2>
<h3>I'm H3</h3>
<h4>I'm H4</h4>
<h5>I'm H5</h5>
<h6>I'm H6</h6>
```

p:定义段落

```html
<p>我是一个段落</p>
```

br:换行

```html
<p>我是一个段落，这里准备换行<br>已经换行了</p>
```

ol:有序列表

```html
<ol>
	<li>我是li</li>
	<li>我是li</li>
	<li>我是li</li>
</ol>
```

ul:无序列表

```html
<ul>
	<li>我是li</li>
	<li>我是li</li>
	<li>我是li</li>
</ul>
```

dl   定义列表（dl—dt—dd）比如词典中的解释

```html
<dl>
	<dt>我是DT</dt>
	<dd>我是DD</dd>
	<dt>我是DT</dt>
	<dd>我是DD</dd>
	<dt>我是DT</dt>
	<dd>我是DD</dd>
</dl>
```

table表格  (顺序thead-tbody-tfoot）

```html
<table  border="1">
	<tr>
		<td>星期1</td>
		<td>星期2</td>
		<td>星期3</td>
	</tr>
	<tr>
		<td>内容1</td>
		<td>内容2</td>
		<td>内容3</td>
	</tr>
</table>
```
table的一些属性:
cellpadding 内边距、
cellspacing 外边距、
colspan 跨列合并、
rowspan 跨行合并.

### 行属性标签
在行内显示，内容撑开宽高，不可以设置宽高（img、input 除外），行只能套行

span：无语义标签(全角空格算中文)

```html
<span>我是　SPAN</span>
```

 a  ： 定义超链接  (target:_blank ,_self  超链接链接方式)
 
```html
<a href="http://baidu.com" target="_blank">百度</a>
<a href="###">###</a> <!--不刷新页面-->
<a href=“#d1”>跳转</a> <!--（锚点链接# ）-->
<br><br><br><br><br><br><br><br><br>
<div id="d1">我是DIV</div><!--（锚点链接终点 ）-->
```

img：定义图片

```html
<img src="a.gif" alt=“我是百度图片” title="我是title">  
<!--
	alt：解释图片内容，只有在找不到图片时显示
	title:鼠标停留时显示内容
   相对路径： ../ 返回上一目录
   ./  根目录        |       
   绝对路径：详细路径
-->
```
var：显示为斜体 定义变量文本

em：斜体 定义强调文本

strong：（更强的强调）显示为粗体 定义强调文本

```html
<var>I'm var</var>
<em>I'm em</em>
<strong>I'm strong</strong>
```

### 表单标签
textarea：定义多行的文本输入控件

select：定义选择列表

option: 定义列表的选项

input:  定义文本的变量部分

```html
<form action=“http://baidu.com/s”>
	提交<input type="submit"><br>
	文本<input type="text"><br>
	密码<input type="password"><br>
	文件<input type="file"><br>
	单选框<input type="radio" name="a">
	<input type="radio" name="a"><!--以name为分组-->
	<input type="radio" name="a"><br>
	复选框<input type="checkbox" name="b">
	<input type="checkbox" name="b"><!--以name为分组-->
	<input type="checkbox" name="b"><br>
	重置<input type="reset"><br>
	隐藏<input type="hidden" name="w" value="HTML5"><br>	
</form>
<!--
input 属性：disable （不可用状态）  placeholder（默认值） readonly （只读）

form 定义表单（块属性标签）向服务器传输数据--method
get：通过URL提交数据 ，容量小，不安全，有缓存
post：不通过URL提交数据 ，容量大，安全，无缓存
action： 提交数据的URL
-->
```

### SEO
与SEO有关的属性:title,strong,h1-h3,a,em,img&alt

### 拓展
EMMET插件的初级应用----emmet 快速添加类名、ID、文本和属性

在Emmet中，还有一个功效，能快速帮助你添加类名、ID、文本和属性。


```html
<!--1.使用E#ID添加ID名-->
<!--a#a1-->
<a href="" id="a1"></a>
<!--2.使用E.class添加类名-->
<!--a.a1-->
<a href="" class="a1"></a>
<!--3.使用E[attr]添加属性-->
<!--a.a1[href="http://baidu.com"]-->
<a href="http://baidu.com" class="a1"></a>
<!--4.使用E{text}添加文本-->
<!--a.a1{我是a}-->
<a href="" class="a1">我是a</a>
<!--5.+并列元素-->
<!--a.a1+span-->
<a href="" class="a1"></a>
<span></sapn>
<!--6.*元素个数-->
<!--a.a1*3-->
<a href="" class="a1"></a>
<a href="" class="a1"></a>
<a href="" class="a1"></a>
<!--7.>元素向内创建子元素-->
<!--a.a1>span-->
<a href="" class="a1">
	<span></span>
</a>
<!--8.>元素向上创建子元素-->
<!--a.a1>span^span-->
<a href="" class="a1">
	<span></span>
</a>
<span></span>
```