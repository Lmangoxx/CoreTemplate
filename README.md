# CoreTemplate
一个简单的模板解析小工具
```
<div id="app"></div>

<script id="template" type="text/html">
  <p>姓名：{{user.name}}</p>
  <p>年龄：{{user.age}}</p>
  <p>简介：{{user.des}}</p>
  #IF(isShow)
    <a href="{{homeUrl}}" target="_blank">欢迎来光临我的gitHub博客小屋</a>
  #ENDIF
  <ul>
    #LOOP(interest as item)
      <li>{{item.name}}</li>
    #ENDLOOP
  </ul>
</script>

<script>
  const template = document.getElementById('template').innerHTML;
  const data = {
    user: { name: 'Lmango', age: 33, des: '我快要到35岁危机了' },
    isShow: true,
    homeUrl: 'https://lmangoxx.github.io/about/index.html',
    interest: [
      { name: '电影' },
      { name: '烹饪' },
      { name: '思考' }
    ]
  };
  document.getElementById('app').innerHTML = core.template(template, data);
</script>
```
