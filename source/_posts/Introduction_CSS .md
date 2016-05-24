---
title: CSS入门
---
CCS（是一组格式设置规则，用于控制web外观） 

### web标准结构

  结构 HTML+
  样式 CSS+
  行为  交互行为javascript
  	
  	特点
    1.页面内容与表现形式分离
    2.可很好控制页面布局
    3.提高网页加载速度
    4.降低服务器的成本
    5.呈现一致的效果
### CSS引入方式
 1)	有3中引入方式，第一种head标签内用link标签引入外部css文件，这种引入方式使用最为广泛，优点一个css文件可以控制n多个页面，便于维护，从整站上减少代码量，有效利用缓存机制。
 
2)	第二种head标签里加入style标签，写css样式。这种引入方式也比较常用，通常用在访问量大的网站或首页使用。优点是加载速度快，整站缺点代码多，不易维护。

3)	第三种标签内加style，这种引入方式用的比较少，优点是优先级最高，缺点是代码量大、不易维护。

4)	@import url(css/name.css) 用户体验不好，不建议使用;

 
```html
<head>
<!--外部引入： 可以多页面引用-->
<link rel=“stylesheet” type=“text/css” href=“css.css” />
<!--头部引入：在head内引入   加载速度快-->
<style></style>
</head>
<body>
<!--标签内引入：在标签内引入    优先级最高，不利于维护-->
<p style=""></p>
</body>
```
### CSS基础语法
选择器{属性：值；属性：值；}选择器是HTML元素

例如：p{color：red； width：100px；}

	1.ID选择器   优先最高 使用方式：#+ID名
	2.类选择器   优先仅次于ID 使用方式：.+类名
	3.标签选择器 优先最低 使用方式：标签名
	4.后代选择器 后代会影响优先级  使用方式 父级选择器+空格+子级选择器
	5.群组选择器 使用方式： 选择器+，+选择器
	6.筛选      使用方式：选择器+选择器
	!important；绝对最高优先级

### CSS属性
 margin（外边框）
 
margin:盒子从上往顺时针方向设置值 （上、右、下、左）或可详细描述margin-top、margin-right、margin-bottom、margin-left

padding（内边框） 与上类似


	扩展：
 	兄弟之间用 margin   父子之间用 padding
 	处理父子之间margin的后遗症可用 overflow：hidden；

border（边框）

border-top|right|bottom|left、border-width

三角形制作（可改变其它属性来制作图形）例如

```css
 div{
	width: 0;
	height: 0;
	border: 50px solid black;
	border-color: transparent green transparent transparent<!--（透明）-->;
		}
```
  display
  
	block：块属性
  	inline：行属性
  	inline-block：并排
  	none：隐藏属性

小贴士：
      网页body基本命名结构：
      
```html
       <div class="wrap">
          <div class=“header”></div>
          <div class=“content”></div>
          <div class=“footer”></div>
       </div>
```

网页中主页一般命名为index.html 

### 字体属性设置：
   font-family:字体1,字体2,…          字体类型
   
```css
p{
      font-family:“宋体”,Arail,Tahoma;
      /*建议：中文网站——宋体  英文网站——Arail，Tahoma,中英文网站——建议用英文字体   特殊符号——建议使用图片*/
}

```


font-size：px|%|em|rem   字体大小(body默认字体为16px）

1em=1*父级字体大小（1rem用于手机移动端 1rem = 1*html字体大小）

```css
p{
    font-size:16px;
}
```
    
font-style：normal（常规字体） | italic（斜体） | oblique （倾斜）字体风格

font-weight： normal （常规字体） | bold（加粗字体） | bolder（更粗字体） | lighter（更细字体） | number（400-normal，700-bold ，【100-900】）

  font：font-style | font-weight | font-size | font-family（按顺序可统一设置）


### 文本设置
####  1.颜色设置：
  
  color：颜色值：（颜色值可以是一个名称标示的关键字，如 color：red； 

也可以是一个RGB数字， 如color：rgb（0，0，0）；或color：#ffffff；或 color：#fff；）


####  2.文本修饰：
text-decoration：none | underline(下划线) | overline（上划线） | line-through（删除线）


####  3.行距：
line-height:normal （浏览器默认行高）| length（px | em）；（可用于垂直居中，行距与高度一致时文本垂直居中）

文本缩进：text-indent：length（px | em）；

文本对齐： text-align:left （左对齐）| center（居中对齐） | right（右对齐） | justify(两端对齐)；

文本垂直对齐：vertical-align：top（靠上） | middle（居中） | bottom（靠下）根据行高调节（

 注：本属性对行元素友好，在块元素里不存在垂直居中，一般使用行高）

字词间隔：word-spacing：normal | length  单词之间间距 （控制空格）

字符间隔：letter-spacing：normal | length  字符之间间距 （控制字符）



#### 背景设置：
背景色：background-color：颜色值；

背景图：background-image：none | url();（挡住背景颜色）

背景图重复： background-repeat：no-repeat | repeat-x | repeat-y

背景图定位： background-position：x轴位移   y轴位移 ；

背景图滚动：background-attachment：scroll （）| fixed（设置背景图随滚动条滚动）

简写： background：#ccc scroll …；

### 常用布局
   1.float：none | left | right   浮动
   
 float后行内元素可设置width和height，块元素可以并排
 
  2.clear: none | left | right | both 清除浮动    需要兄弟级块元素属性才可以清除浮动
  
  常用清除浮动方式
  
```css
 .clear:after{
      content:'';
      display:block;
      clear:both;
}/*在父级调用类clear*/
```
父级浮动也可清除浮动（不常用）

3.overflow:处理超出的内容（给x轴设超出处理：overflow-x，给y轴设置超出处理：overflow-y）
  
       visble（显示超出内容） 
       hidden（隐藏超出内容，也可以清除浮动）
       auto （自动识别，超出就给予滚动条）
       scroll（给超出的元素一个滚动条）
4.visitlity:visible| hidden 可视
    
 visitlity:hidden;后元素不可见，但是还占据空间，而dispaly：none;后元素消失，空间会清除占   据位置
   
 5.position:absolute（绝对定位：脱离） | relative（相对定位） | static（默认值） | fixed(浏览器窗口定位：ie8以下不兼容) | inherit（继承父级）
 
      相关属性：
       z-index：数值（层级）
       left/right/top/bottom:length | auto(定位位移)
  6.opacity:number(0-1之间数值)定义元素的不透明（IE8以下不兼容）
  
filter：alpha（opacity=number）IE的半透明滤镜（IE兼容专用）

### a标签的伪类（编辑时请注意按顺序编写）

	  link：有链接属性
	  visited：链接地址已被访问
	  hover：鼠标悬停在上面
	  active：被用户激活（鼠标在点击与释放之间发生的事件）

### 默认清除样式格式：

```css
body,h1,h2,h3,h4,p,dl,dd,ul,ol,form,input,textarea,th,td,select{margin: 0;padding: 0;}
	em{font-style: normal;}
	li{list-style: none;}
	a{text-decoration: none;}
	img{border: none;vertical-align: top;}
	table{border-collapse: collapse;}
	input,textarea{outline: none;}
	textarea{resize:none;overflow: auto;}
	body{font-size:12px;font-family: arial;}

```
拓展

英文默认是不会换行，但是如果网站是全英文，不换行的话看起会好恶心，所以请拿好下面的一个英文换行的CSS样式

```css
word-wrap:break-word;
```

### 盒模型
什么是“盒模型”，它都涉及什么css属性？

任何一个html元素都可以把它理解为一个“盒子”在浏览器里显示。
通过盒模型 可以更形象的理解什么是margin和padding。还有border。

### CSS 注意的问题
	1.	子元素有相对定位并且溢出，父级overflow包不住子元素
	2.	兄弟之间用margin父子之间用padding
	3.  P不能嵌套DIV ,A不能嵌套A
	4.  英文字换行 word-wrap:break-word;
	5.  文字和块的水平居中和垂直居中

### BFC
BFC(Block Formatting Contexts)直译为"块级格式化范围"。Block Formatting Contexts就是页面上的一个隔离的渲染区域，容器里面的子元素不会在布局上影响到外面的元素，反之也是如此。如何产生BFC？

	float的值不为none。 
	overflow的值不为visible。 
	position的值不为relative和static。
	display的值为table-cell, table-caption, inline-block中的任何一个。 
那BFC一般有什么用呢？比如常见的多栏布局，结合块级别元素浮动，里面的元素则是在一个相对隔离的环境里运行。


### IFC
IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)

那么IFC一般有什么用呢？

水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。

垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。




### IE6怪癖解析
解释下IE6怪癖解析，如何解决的？

  IE6怪癖解析其实是因为IE6存在两种解析模式，一种是hasLayout，一种是IE6私有的。触发怪癖解析有很多情况，比如最常见的当IE6没有书写doctype声明。
  
  怪癖解析与正常解析有很多细微的差异，其中最明显的就是对盒模型的解析。怪癖解析下，盒模型的宽高是指盒子的border+padding+内容宽高。
  
  解决办法就是触发hasLayout，使IE6进入正常的解析模式，比如css属性zoom:1;当然最好的解决办法就是避免进入怪癖解析，修改正确的doctype声明。

### cCSS hack
	1.大部分特殊字符IE浏览器支持，其他主流浏览器firefox，chrome，opera，safari不支持 。
	2.\9    ：所有IE浏览器都支持 background:red\9;
	3._和-  ：仅IE6支持 _background:orange;
	4.*     ：IE6、E7支持 *background:black;
	5.\0    ：IE8、IE9支持，opera部分支持
	6.\9\0  ：IE8部分支持、IE9支持
	7.\0\9  ：IE8、IE9支持

