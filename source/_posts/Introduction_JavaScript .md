---
title: JS入门
---
### JavaScript的组成

1.核心（ECMAScript）是一个标准 ES6

2.文档对象模型（DOM）Document Obj Model

3.浏览器对象模型（BOM）Browser Obj Model

### 特点

1.一种解释性执行的脚本语言（无需编译）

2.一种基于对象的脚本语言

3.一种简单弱类型的脚本语言（数字、字符、函数、对象、数组、undefined）

4.一种相对安全的脚本语言（只能在浏览器运行）

5.一种事件驱动的脚本语言

6.一种跨平台性的脚本语言

### 引入方式和弹出框
直接上颗栗子

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<!--外部引入-->
		<script src="a.js" type="text/javascript" charset="utf-8"></script>
		<!--内部引入-->
		<script type="text/javascript">
//			消息框
			alert("a");
//			确认框
			var a = confirm("是否？");
			alert(a);
//			提示框
			var n = prompt("请输入姓名？");
			alert(n);
		</script>
	</head>
	<body>
	</body>
</html>
```

### 注释

单行注释  //

多行注释 /* */

变量

number  值为数值

string 值为字符串

boolean 值为布尔值（true、false）

undifined 值未定义

null 值为空

命名规范

区分大小写

1.首字符只能使用字母、下划线和$

2.其他字符可以使用字母下划线、$和数字

3.命名字符中间不能含有空格

4.不能以关键字或保留字命名

注：不能使用name命名
### javascript操作符

#### 赋值操作符
 = 赋值运算符并不是等于 , var a = 5: 把5赋给a

#### 算术操作符

+、- 、/ 、* 、%（模/取余）(输出数字）

模的算法栗子：

	2%7 = 2              7%4  = 3 	
		
	(-2)%7 = -2         (-7)%4  = -3 
			
	2%(-7) =  2          7%(-4) = 3 
		
	(-2)%(-7) =  -2     (-7)%(-4)  = -3 
	
+=  -=    *=      /=（算法简写）

直接上颗栗子

```html
<script type="text/javascript">
	var a = 1;
	a = 5+7;
//	a = a+1;//a= 12+1
//	简写
	a += 1;//a= 12+1
	a *= 2;//a= 13*2
	alert(a);
</script>
```
++    —   （a=a+1 a=a-1 的简写）

#### 关系操作符(返回布尔值)
	>       大于
	<       小于
	==     等于
	===   全等于（判断类型和值）
	<=     小于等于
	>=     大于等于
	!=      不等于

直接上颗栗子

```html
<script type="text/javascript">
	var a = 5;
	var b = 6;
	var c = "5";
	var bol = null;
	bol = a<b;//true
	bol = a>b;//false
	bol = a==b;//false
	bol = a!=b;//true
	bol = a>c;//false
	bol = a>=c;//true
	bol = a==c;//true
	bol = a===c;//false
	bol = a!=c;//false
	bol = !true;//false
	bol = "abc" > "addd";//ASCII 码
	alert(bol);
</script>
```

#### 逻辑操作符

与     &&      真真为真 真假为假 假假为假

或      ||       真真为真 真假为真 假假为假

非      ！     相反

直接上颗栗子

```html
<script type="text/javascript">
	var a = 5;
	var b = 10;
	var c =15;
	var bol = null;
	bol = a>b && c>b;//false
	bol = a<b && c>b;//true
	bol = a>b || c>b;//true
	bol = (a>b && c>b) || !false;//true
	alert(bol);	
</script>
```
#### 条件操作符

if 语句语法

	if (判断语句) {
		语句1			
	} else{
		语句2			
	}
	语句3
	
	if (判断语句1) {
		语句1			
	} else if(判断语句2){
		语句2			
	}else{
		语句3			
	}
	语句4

简写: 判断表达式 ？ 表达式1 ：表达式2       例：a>b? c=1:c=2;     true c=1, false c=2

### 获取元素

getElementById()    根据id获取元素
getElementByITagName()   根据标签名获取元素
getElementByName()   根据name获取元素
getElementByClassName()  根据类获取元素  ie6不兼容

直接上颗栗子

```html
<script type="text/javascript">
window.onload = function(){//等页面内容加载完成后执行
//	根据ID获取
	var d = document.getElementById('d1');//document整个HTML文档
	alert(d);//[object HTMLDivElement]  object--对象
//	根据name属性获取
	var p = document.getElementsByName('pp');
	alert(p);//[object NodeList] 数组集合
	alert(p[0]);//[object HTMLParagraphElement]
//	根据类名获取
	var a = document.getElementsByClassName('aa');
	alert(a[0]);//http://127.0.0.1:8020/20160524-js/js_link.html###
//	根据标签名获取
	var li = document.getElementsByTagName('li');
	alert(li[0]);//[object HTMLLIElement]
}
</script>

```
### onclick 事件

直接上颗栗子

```html
<!--例子：显示隐藏-->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			div{
				width: 100px;
				height: 100px;
				background: cornflowerblue;
			}
		</style>
	</head>
	<body>
		<input type="button" name="btn" id="btn" value="显示隐藏" />
		<div id="d1"></div>
	</body>
	<script type="text/javascript">
//		根据id名获取
		var btn = document.getElementById('btn');
		var div = document.getElementById('d1');
		btn.onclick = function (){
//			显示隐藏
			if(div.style.display !="none") {
				div.style.display = 'none';
			} else{
				div.style.display = 'block';
			}
//			简写
//			div.style.display=="block"?div.style.display = 'none':div.style.display = 'block';
			if (bol) {
				div.style.display = 'none';//语句1
			} else{
				div.style.display = 'block';//语句2
			}
			bol = !bol;
//			第一次点击
//			bol = true
//			判断,执行语句1
//			给bol赋值bol = !bol 得 bol = false
//			第二次点击
//			bol = false
//			判断,执行语句2
//			给bol赋值bol = !bol 得 bol = true
//			第三次点击
//			bol = true
//			判断,执行语句1
//			给bol赋值bol = !bol 得 bol = false
//			...

		}
	</script>
</html>

```
###onmouseover onmouseout 事件
直接上颗栗子

```html
<script type="text/javascript">
	var div = document.getElementById('d1');
//	div.onmouseover = function(){//当鼠标移到div里面的时候触发的事件 有bug
//		div.style.background = "darkorange";
//	}
//	div.onmouseout = function(){//当鼠标离开div里面的时候触发的事件  有bug
//		div.style.background ="cornflowerblue";
//	}
	div.onmouseenter = function(){//当鼠标移到div里面的时候触发的事件  无bug  兼容ie8
		div.style.background = "darkorange";
	}
	div.onmouseleave = function(){//当鼠标离开div里面的时候触发的事件  无bug  兼容ie8
	div.style.background ="";
	}
</script>
```


### ++a与a++
++a 先加再执行、a++ 先执行再加

直接上颗栗子

```html
<script type="text/javascript">
	var i = 0;
	var a = i++ + 1;//计算之前 i=0 计算完后i=1
	var b = ++i +1;//i= 1 计算之前 i+=1 计算完后i=2
	alert("a= "+a+", b= "+b);//a= 1, b= 3
</script>
```
() 提升优先级

[]  数组
 
{} 对象
 
Number() 转换为数字类型

paresInt() 整数

NaN 非数字，不知道类型，所以 NaN 不等于 NaN，这是个神奇的东西

