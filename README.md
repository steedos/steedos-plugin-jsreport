# Steedos Jsreport报表插件

### WEB界面路由
- /plugins/jsreport/web/ #报表浏览界面，显示报表列表，点击查看报表明细
- /plugins/jsreport/web/viewer/:id #查看报表详细
- /plugins/jsreport/web/pdf/:id #查看报表PDF


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
- 可以在xxx.report.html文件中编写报表界面效果

参考：https://github.com/steedos/steedos-plugin-jsreport/blob/master/src/contracts.report.yml

Example：https://github.com/steedos/steedos-contracts-app/blob/master/src/contracts-jsr.report.yml
