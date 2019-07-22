# Steedos Jsreport报表插件

### WEB界面及接口路由
#### yml配置的报表相关路由
- /plugins/jsreport/web/ #报表浏览界面，显示yml配置的报表列表，点击查看报表明细
- /plugins/jsreport/web/viewer/:id #查看yml配置的报表详细
- /plugins/jsreport/api/report/:report_id/pdf #导出yml配置的报表PDF
- /plugins/jsreport/api/report/:report_id/excel #导出yml配置的报表Excel
#### 数据库中的报表相关路由
- /plugins/jsreport/web/viewer_db/:id #查看db中的报表详细
- /plugins/jsreport/api/report_db/:report_id/pdf #导出db中的报表PDF
- /plugins/jsreport/api/report_db/:report_id/excel #导出db中的报表Excel

# 开发说明

### 安装依赖包

```
$ yarn
```

### 运行
```
$ yarn start
```

访问地址: `http://localhost:3600/plugins/jsreport/web/`

### 插件使用
```
...
let app = express();
...
plugin.init(app);
...
```

参考：https://github.com/steedos/steedos-plugin-jsreport/blob/master/server.js

Example：https://github.com/steedos/steedos-contracts-app/blob/master/server.js

### 插件配置
- 插件会自动加载src文件夹中以report.yml后缀且其内容中report_type为'jsreport'的报表文件
- 识别到的报表会自动生成对应的以report.html后缀的文件
- 识别到的报表会自动生成对应的以report.js后缀的文件
- 可以在xxx.report.html文件中编写报表界面效果，模板语法见：http://handlebarsjs.com
- 可以在xxx.report.helper.js文件中编写html对应的模板脚本，参考：https://jsreport.net/learn/handlebars
- 可以在xxx.report.script.js文件中编写报表加载相关脚本，参考：https://jsreport.net/learn/scripts
- 可以在项目根目录下新建jsreport.config.json文件来配置jsreport相关行为，参考：https://jsreport.net/learn/configuration

> xxx.report.script.js文件中如果想使用require引用第三方包，比如想require('request')，则需要在jsreport.config.json文件中配置以下参数。

> 也可以直接配置参数允许所有本地包：extensions.scripts.allowedModules="*" or using config allowLocalFilesAccess=true

```
{
  "extensions": {
    "scripts": {
      "allowedModules": ["request"]
    }
  }
}
```

参考：https://github.com/steedos/steedos-plugin-jsreport/blob/master/src/contracts.report.yml

Example：https://github.com/steedos/steedos-contracts-app/blob/master/src/contracts-jsr.report.yml
