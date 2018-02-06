# IRIS前端小组HTML和CSS规范

## HTML规范

### 书写规范
```
保持良好的树形结构:
每一个块级元素都另起一行，每一行都是用tab缩进对齐。
如果不是块级元素，比如几个行内元素，我们把他写在一行即可。
注意：html、 head、 body 以及body下的第1级标签（即直接子元素）不缩进，其他的都正常缩进。
```
        
### 文档规范
```
使用 HTML5 的文档声明类型 : <!DOCTYPE html>
DOCTYPE标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。
使用文档声明类型的作用是为了防止开启浏览器的怪异模式。 
没有DOCTYPE文档类型声明会开启浏览器的怪异模式，浏览器会按照自己的解析方式渲染页面，在不同的浏览器下面会有不同的样式。
如果你的页面添加了<!DOCTYPE html>那么，那么就等同于开启了标准模式。浏览器会按照W3C标准解析渲染页面。
```
        
### 语言属性
```
html根元素指定lang属性, 为文档设置正确的语言:
<html lang="zh-CN">
</html>
```
       
### 编码格式
```
编码格式统一设置为utf-8: 
<meta charset="utf-8"/>
```

### IE兼容模式
```
IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。
除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式:
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

### <HEAD>中添加信息
```
<meta name="author" content="smile@kang.cool">//作者

<meta name="description" content="hello">//网页描述

<meta name="keywords" content="a,b,c">//关键字,“，”分隔

<meta http-equiv="expires" content="Wed, 26 Feb 1997 08：21：57 GMT">//设定网页的到期时间。一旦网页过期，必须到服务器上重新调阅

<meta http-equiv="Pragma" content="no-cache">//禁止浏览器从本地机的缓存中调阅页面内容

<meta http-equiv="Window-target" content="_top">//用来防止别人在框架里调用你的页面

<meta http-equiv="Refresh" content="5;URL=http://kahn1990.com/">//跳转页面，5指时间停留5秒 网页搜索机器人向导。用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引

<meta name="robots" content="none">//content的参数有all,none,index,noindex,follow,nofollow，默认是all

<link rel="Shortcut Icon" href="favicon.ico">//收藏图标

<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">//网页不会被缓存
```
### 属性顺序

* -> class

* -> id, name

* -> data-*

* -> src, for, type, href

* -> title, alt

* -> aria-*, role

### 脚本加载

说到js和css的位置，大家应该都知道js放在下面，css放在上面。但是，如果你的项目只需要兼容ie10+或者只是在移动端访问，那么可以使用HTML5的新属性async，将脚本文件放在内兼容老旧浏览器(IE9-)时：脚本引用写在 body
结束标签之前，并带上 async 属性。这虽然在老旧浏览器中不会异步加载脚本，但它只阻塞了 body 结束标签之前的 DOM 解析，这就大大降低了其阻塞影响。而在现代浏览器中：脚本将在 DOM 解析器发现 body 尾部的 script
标签才进行加载，此时加载属于异步加载，不会阻塞 CSSOM（但其执行仍发生在 CSSOM 之后）
综上所述，所有浏览器中推荐:
```
<html>
    <head>
        <link rel="stylesheet" href="main.css">
    </head>
    <body>
        <!-- body goes here -->
        <script src="main.js" async>
        </script>
    </body>
</html>
```

### 语义化
我们一直都在说语义化编程，语义化编程，但是在代码中很少有人完全使用正确的元素。使用语义化标签也是有理由SEO的。
语义化是指：根据元素其被创造出来时的初始意义来使用它。 意思就是用正确的标签干正确的事，而不是只有div和span。
```
不推荐：
    <b>My page title</b>
    <div class="top-navigation">
      <div class="nav-item"><a href="#home">Home</a></div>
      <div class="nav-item"><a href="#news">News</a></div>
      <div class="nav-item"><a href="#about">About</a></div>
    </div>
    <div class="news-page">
      <div class="page-section news">
        <div class="title">All news articles</div>
        <div class="news-article">
          <h2>Bad article</h2>
          <div class="intro">Introduction sub-title</div>
          <div class="content">This is a very bad example for HTML semantics</div>
          <div class="article-side-notes">I think I'm more on the side and should not receive the main credits</div>
          <div class="article-foot-notes">
            This article was created by David <div class="time">2014-01-01 00:00</div>
          </div>
        </div>
        <div class="section-footer">
          Related sections: Events, Public holidays
        </div>
      </div>
    </div>
    <div class="page-footer">
      Copyright 2014
    </div>

推荐:

html 代码:
    <!-- The page header should go into a header element -->
    <header>
      <!-- As this title belongs to the page structure it's a heading and h1 should be used -->
      <h1>My page title</h1>
    </header>
    <!-- All navigation should go into a nav element -->
    <nav class="top-navigation">
      <!-- A listing of elements should always go to UL (OL for ordered listings) -->
      <ul>
        <li class="nav-item"><a href="#home">Home</a></li>
        <li class="nav-item"><a href="#news">News</a></li>
        <li class="nav-item"><a href="#about">About</a></li>
      </ul>
    </nav>
    <!-- The main part of the page should go into a main element (also use role="main" for accessibility) -->
    <main class="news-page" role="main">
      <!-- A section of a page should go into a section element. Divide a page into sections with semantic elements. -->
      <section class="page-section news">
        <!-- A section header should go into a section element -->
        <header>
          <!-- As a page section belongs to the page structure heading elements should be used (in this case h2) -->
          <h2 class="title">All news articles</h2>
        </header>
        <!-- If a section / module can be seen as an article (news article, blog entry, products teaser, any other
         re-usable module / section that can occur multiple times on a page) a article element should be used -->
        <article class="news-article">
          <!-- An article can contain a header that contains the summary / introduction information of the article -->
          <header>
            <!-- As a article title does not belong to the overall page structure there should not be any heading tag! -->
            <div class="article-title">Good article</div>
            <!-- Small can optionally be used to reduce importance -->
            <small class="intro">Introduction sub-title</small>
          </header>

          <!-- For the main content in a section or article there is no semantic element -->
          <div class="content">
            <p>This is a good example for HTML semantics</p>
          </div>
          <!-- For content that is represented as side note or less important information in a given context use aside -->
          <aside class="article-side-notes">
            <p>I think I'm more on the side and should not receive the main credits</p>
          </aside>
          <!-- Articles can also contain footers. If you have footnotes for an article place them into a footer element -->
          <footer class="article-foot-notes">
            <!-- The time element can be used to annotate a timestamp. Use the datetime attribute to specify ISO time
             while the actual text in the time element can also be more human readable / relative -->
            <p>This article was created by David <time datetime="2014-01-01 00:00" class="time">1 month ago</time></p>
          </footer>
        </article>
        <!-- In a section, footnotes or similar information can also go into a footer element -->
        <footer class="section-footer">
          <p>Related sections: Events, Public holidays</p>
        </footer>
      </section>
    </main>
    <!-- Your page footer should go into a global footer element -->
    <footer class="page-footer">
      Copyright 2014
    </footer>    
 ```  

### alt标签不为空
&lt;img&gt;标签的 alt 属性指定了替代文本，用于在图像无法显示或者用户禁用图像显示时，代替图像显示在浏览器中的内容。假设由于下列原因用户无法查看图像，alt 属性可以为图像提供替代的信息：

    网速太慢
    src 属性中的错误
    浏览器禁用图像
    用户使用的是屏幕阅读器

    从SEO角度考虑，浏览器的爬虫爬不到图片的内容，所以我们要有文字告诉爬虫图片的内容
### 结构、表现、行为三者分离

结构、表现、行为三者分离尽量在文档和模板中只包含结构性的 HTML；而将所有表现代码，移入样式表中；将所有动作行为，移入脚本之中。在此之外，为使得它们之间的联系尽可能的小，在文档和模板中也尽量少地引入样式和脚本文件。

建议：

    不使用超过一到两张样式表
    不使用超过一到两个脚本（学会用合并脚本）
    不使用行内样式（<style>.no-good {}</style>）
    不在元素上使用 style 属性（<hr style="border-top: 5px solid black">）
    不使用行内脚本（<script>alert('no good')</script>）
    不使用表象元素（i.e. <b>, <u>, <center>, <font>, <b>）
    不使用表象 class 名（i.e. red, left, center） 

## CSS规范

### 命名规范

id和class的命名 ID和class的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称

推荐 :

        .fw-800 {
            font-weight: 800;
        }

        .red {
            color: red;
        }

不推荐 :

        .heavy {
            font-weight: 800;
        }

        .important {
            color: red;
        }

### 单行规则声明

对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行:

        /* Single declarations on one line */
        .span1 { width: 60px; }
        .span2 { width: 140px; }
        .span3 { width: 220px; }

        /* Multiple declarations, one per line */
        .sprite {
            display: inline-block;
            width: 16px;
            height: 15px;
            background-image: url(../img/sprite.png);
        }   
        .icon           { background-position: 0 0; }
        .icon-home      { background-position: 0 -20px; }
        .icon-account   { background-position: 0 -40px; }

### 合理的使用ID

一般情况下ID不应该被用于样式，并且ID的权重很高，所以不使用ID解决样式的问题，而是使用class

不推荐：

        #content .title {
            font-size: 2em;
        }

推荐：

        .content .title {
            font-size: 2em;
        }

### css选择器中避免使用标签名

从结构、表现、行为分离的原则来看，应该尽量避免css中出现HTML标签，并且在css选择器中出现标签名会存在潜在的问题。

### 使用子选择器

很多前端开发人员写选择器链的时候不使用 直接子选择器（注：直接子选择器和后代选择器的区别）。有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能。然而，在任何情况下，这是一个非常不好的做法。如果你不写很通用的，需要匹配到DOM末端的选择器, 你应该总是考虑直接子选择器。

不推荐:

        .content .title {
            font-size: 2rem;
        }

推荐:

        .content > .title {
            font-size: 2rem;
        }

### 尽量使用缩写属性

尽量使用缩写属性对于代码效率和可读性是很有用的，比如font属性。

不推荐：

        border-top-style: none;
        font-family: palatino, georgia, serif;
        font-size: 100%;
        line-height: 1.6;
        padding-bottom: 2em;
        padding-left: 1em;
        padding-right: 1em;
        padding-top: 0;

推荐：

        border-top: 0;
        font: 100%/1.6 palatino, georgia, serif;
        padding: 0 1em 2em;

### 0后面不带单位

不推荐：

        padding-bottom: 0px;
        margin: 0em;

推荐：

        padding-bottom: 0;
        margin: 0;

结构性属性：

        display
            position, left, top, right etc.
            overflow, float, clear etc.
            margin, padding

表现性属性：

        background, border etc.
            font, text

不推荐：

        .box {
              font-family: 'Arial', sans-serif;
              border: 3px solid #ddd;
              left: 30%;
              position: absolute;
              text-transform: uppercase;
              background-color: #eee;
              right: 30%;
              isplay: block;
              font-size: 1.5rem;
              overflow: hidden;
              padding: 1em;
              margin: 1em;
        }

推荐：

        .box {
              display: block;
              position: absolute;
              left: 30%;
              right: 30%;
              overflow: hidden;
              margin: 1em;
              padding: 1em;
              background-color: #eee;
              border: 3px solid #ddd;
              font-family: 'Arial', sans-serif;
              font-size: 1.5rem;
              text-transform: uppercase;
        }

### 声明顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

        1. Positioning
        2. Box model
        3. Typographic
        4. Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。
其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

### 不要使用@import

        与 <link> 标签相比，@import 指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题。替代办法有以下几种：
        使用多个 <link> 元素
        通过 Sass 或 Less 类似的 CSS 预处理器将多个 CSS 文件编译为一个文件
        通过 Rails、Jekyll 或其他系统中提供过 CSS 文件合并功能

### 媒体查询（Media query）的位置

媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部:

        .element { ... }
        .element-avatar { ... }
        .element-selected { ... }

        @media (min-width: 480px) {
           .element { ...}
           .element-avatar { ... }
           .element-selected { ... }
        }

### 带前缀的属性

当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑:

        /* Prefixed properties */
        .selector {
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
            box-shadow: 0 1px 2px rgba(0,0,0,.15);
        }

### Less 和 Sass 中的嵌套

避免非必要的嵌套。这是因为虽然你可以使用嵌套，但是并不意味着应该使用嵌套。只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套:

        // Without nesting
        .table > thead > tr > th { … }
        .table > thead > tr > td { … }

        // With nesting
        .table > thead > tr {
            > th { … }
            > td { … }
        }  