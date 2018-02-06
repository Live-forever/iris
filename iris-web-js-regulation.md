# JavaScript 开发规范
## 1. 命名规范

* `大驼峰式命名法`：首字母大写。例：StudentInfo、UserInfo、ProductInfo

        推荐:  
      
      import MyComponent from 'components/my-component/my-component' 
      
        不推荐: 
    
      import myComponent from 'components/myComponent/myComponent'

* `小驼峰式命名法`：首字母小写。例：studentInfo、userInfo、productInfo
   
        推荐: 
        // 是否可阅读
        function canRead() {
           return true
        }
        
        // 获取名字
        function getName() {
           return this.name
        }
        

* `常量`: 使用全大写, 中间使用'_'连接
    
       推荐: 
       var MAX_COUNT = 10;
       var URL = 'www.baidu.com'
       

* `备注`: 在vue开发中引入组件时, 构造函数使用大驼峰命名. 变量( 名词开头 ), 函数( 动词开头 )命名使用小驼峰命名, 文件命名使用小写字母中间使用 '-' 连接, 函数命名一般使用 ( can, has, is, get, set, load... )前面三个返回的都是布尔值 

       
## 2. 注释

* `a)单行注释`: 

        ① 单独一行：//(双斜线)与注释文字之间保留一个空格。

        ② 在代码后面添加注释：//(双斜线)与代码之间保留一个空格，并且//(双斜线)与注释文字之间保留一个空格。

        ③ 注释代码：//(双斜线)与代码之间保留一个空格。
        
        示例：
		// 调用了一个函数；1)单独在一行
		setTitle();
		 
		var maxCount = 10; // 设置最大量；2)在代码后面注释
		 
		// setName(); // 3)注释代码

* `b)多行注释`: 
        
        ① 若开始(/*)和结束(*/)都在一行，推荐采用单行注释。

		② 若至少三行注释时，第一行为/*，最后行为*/，其他行以*开始，并且注释文字与*保留一个空格。
		
		示例：
		
		/*
		* 代码执行到这里后会调用setTitle()函数
		* setTitle()：设置title的值
		*/
		setTitle();
		
* `c)函数注释`: 

        函数(方法)注释也是多行注释的一种，但是包含了特殊的注释要求，参照 javadoc(百度百科)
        
	        语法: 
	        /** 
	        * 函数说明 
	        * @关键字 
	        */
	    @param  =>  @param 参数名 {参数类型} 描述信息
	    @return  =>  @return {返回类型} 描述信息
	    @author  =>  @author 作者信息 [附属信息：如邮箱、日期]
	    @version  =>  @version xxx.xxx.xxx
	    @example  =>  @example  示例代码
	    
## 3. 对齐缩进与空格换行

* `对齐`: 在进行字符串拼接, 条件判断( 过多 ), 三目运算( 字符串过长 )的时候, 

	``` javascript
	        统一使用这种格式编写:  obj.getSomeone() === 'apple' 
	                               ? this.data.sun = 'a'
	                               : this.data.sun = 'b'
	```
* `缩进`: 代码统一缩进4个空格, 看着舒服没有之一

* `空格`: 写函数的大括号之前空一格, '=' 左右各空一格     ',' 后面空一格...

* `换行`: 基本所有的大括号后面都会换行, 函数的一个功能结束后换行, 引入模块后的也可根据功能来换行( 让代码看起来不是一坨, 层次分明 )

## 4. 避免全局命名空间污染
 
        如何避免全局变量污染, 
        1. 闭包  
              (function() {
                  var str = 'string'
              })()
              
        2. 命名空间 
            var obj = {
                fac: {
                  ...
                },
                bra: {
                  ...
                },
                mod: {
                  ...
                }
            }
            
        function test() {
            var a = b = 8;  ( 这里的b会被隐试的创建成全局对象 )
        }   
        
        注: 现在模块化开发框架已经帮我们做好了这些事, 就像css作用域一样, 每一个模块独有单独的scoped 作用域,互相不影响! 
        
## 5. 使用 === 严格等 
 
        总是使用 === 精确的比较操作符，避免在判断的过程中，由 JavaScript 的强制类型转换所造成的困扰。例如：  
        (function(log){
		  'use strict';
		
		  log('0' == 0); // true
		  log('' == false); // true
		  log('1' == true); // true
		  log(null == undefined); // true
		
		  var x = {
		    valueOf: function() {
		      return 'X';
		    }
		  };
		
		  log(x == 'X');
		
		}(window.console.log)); 
		
## 6. 使用函数式编程   
     
        函数式编程让你可以简化代码并缩减维护成本，因为它容易复用，又适当地解耦和更少的依赖。 接下来的例子中，在一组数字求和的同一问题上，比较了两种解决方案。第一个例子是经典的程序处理，而第二个例子则是采用了函数式编程和 ECMA Script 5.1 的数组方法。
    
                不推荐: 
            (function(log){
			  'use strict';
			
			  var arr = [10, 3, 7, 9, 100, 20],
			      sum = 0,
			      i;
			
			
			  for(i = 0; i < arr.length; i++) {
			    sum += arr[i];
			  }
			
			  log('The sum of array ' + arr + ' is: ' + sum)
			
			}(window.console.log));
			
	    推荐: 
	    
	        (function(log){
			  'use strict';
			
			  var arr = [10, 3, 7, 9, 100, 20];
			
			  var sum = arr.reduce(function(prevValue, currentValue) {
			    return prevValue + currentValue;
			  }, 0);
			
			  log('The sum of array ' + arr + ' is: ' + sum);
			
			}(window.console.log));
			
## 7. 严禁修改内建对象的原型链
    
        修改内建的诸如 Object.prototype 和 Array.prototype 是被严厉禁止的。修改其它的内建对象比如 Function.prototype，虽危害没那么大，但始终还是会导致在开发过程中难以 debug 的问题，应当也要避免。			

## 8. vue项目开发规范

* `es6`: 尽量去使用es6的书写格式, 极大程度的简化项目代码( 例: 箭头函数, 解构赋值... )

* `vuex`: 统一使用vuex提供的语法糖( mapState,  mapGetters, mapMutation,  mapAction )

* `模块化`: 在项目开发中应该将复杂的模块按照功能不同来拆分, 以及通用模块的抽离.封装

* `代码书写位置`: 生命周期一般放在methods上面, 注册组件components 一般放在最上面

* `文件引入根路径`: src下一级目录用的多的统一再webpack配置，直接使用配置的变量替代相对路径

* `代码精简`: 代码中不要出现过多的注释, 所有的代码都应该是有价值的代码, 不要出现无意义的代码, 没用的代码全部删掉( console调式完成后删掉 )

* `组件划分`: components用于存放单一功能的逻辑组件, views存放业务功能的各个模块组件, ( 不可互相胡乱放置 )

* `错误警告及时处理`: 项目开发中出现的警告和错误( 控制台.可能不会影响当前开发 ), 在团队开发中请保持控制台的干净, 方便大家单独调试

