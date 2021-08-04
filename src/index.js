;(function (window) {
  var core = typeof module === 'undefined' ? (window.core = window.core || {}) : module.exports;

  //HTML转义
  core._encodeHTML = function (source) {
    return String(source)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/\\/g,'&#92;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39;');
  };

  //转义影响正则的字符
  core._encodeReg = function (source) {
    return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
  };

  //转义UI UI变量使用在HTML页面标签onclick等事件函数参数中
  core._encodeEventHTML = function (source) {
    return String(source)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39;')
        .replace(/\\\\/g,'\\')
        .replace(/\\\//g,'\/')
        .replace(/\\n/g,'\n')
        .replace(/\\r/g,'\r');
  };

  core.template = function (text, data) {
    const _analysisStr = function (text) {
      return text = String(text)
        //默认支持HTML注释，将HTML注释匹配掉的原因是用户有可能用 <! !>来做分割符
        .replace(new RegExp("<!--.*?-->", "g"),"")
        //把所有换行去掉  \r回车符 \t制表符 \n换行符
        .replace(new RegExp("[\\r\\t\\n]","g"), "")
        //将 斜杠 单引 HTML转义
        .replace(/\\/g,"&#92;").replace(/'/g,'&#39;')
        // 匹配 {{}} 变量
        .replace(/{{([\s\S]+?)}}/g, "',typeof($1) === 'undefined' ? '' : core._encodeHTML($1),'")
        // 匹配if判断
        .replace(/#IF\((.*?)\)/g, "'); if($1) { _template_fun_array.push('")
        .replace(/#ENDIF/g, "');}_template_fun_array.push('")
        // 匹配for循环
        .replace(/#LOOP\((.*?)\s+as\s+(.*?)\)/g, "'); for(var i=0; i < $1.length; i++) { var $2 = $1[i]; _template_fun_array.push('")
        .replace(/#ENDLOOP/g, "');}_template_fun_array.push('");
    }
    var funBody = "var _template_fun_array=[];\nvar fn=(function(__data__){\nvar _template_varName='';\nfor(name in __data__){\n_template_varName+=('var '+name+'=__data__[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('"+_analysisStr(text)+"');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
    console.log(funBody)
    const render = new Function("_template_object", funBody);
    return render(data)
  }
})(window);