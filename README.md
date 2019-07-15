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
initPlugin(app);
...
```

参考：https://github.com/steedos/steedos-plugin-jsreport/blob/master/server.js

Example：https://github.com/steedos/steedos-contracts-app/blob/master/server.js