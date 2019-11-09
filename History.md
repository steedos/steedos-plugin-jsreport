1.9.2 / 2019-11-09
===================

  * 报表中返回report_config、report_config
  * 当报表过滤条件中有is_required的空值条件时，要求user_filters传入，未传入时直接返回错误信息
1.9.1 / 2019-11-08
===================

  * 支持src中深层文件夹下的报表文件加载
1.6.2-patch.1 / 2019-09-16
===================

  * jsreport-core等jsreport内核包版本固定住，以防止高版本报错Cannot find module 'handlebars'
1.6.2 / 2019-09-16
===================

  * objectql等steedos内核包引用最新版本1.6.2
0.1.0 / 2019-08-08
===================

  * 使用pluginContext = { app, settings: Meteor.settings }来获取process.env.ROOT_URL等参数，方便后续自动扩展
  * 引用最新的@steedos/filters包，让this_year这样的内置范围支持utcOffset参数使用不同时区
0.0.11 / 2019-08-07
===================

  * 新增配置参数 ROOT_URL_INTRANET，用于配置内网访问地址
  * between过滤器未能正确处理时区偏差
0.0.10 / 2019-08-06
===================

  * 支持nodemon跑服务（未生效），不应该重复初始化yml文件变更脚本造成服务重启
  * 日期、时间字段时区问题


0.0.9 / 2019-08-03
===================

  * 尝试将puppeteer降到1.17.0解决在docker中转pdf timeout的问题


0.0.8 / 2019-07-30
===================
  * 尝试解决在creator项目中引用后，运行项目时报错
  ```
  While building the application:
  D:\GitHub\creator_dev\project-tap.i18n: Can't load project-tap.i18n in a package: null
  ```

0.0.7 / 2019-07-27
===================

  * 识别url中space_id参数查询数据
  * 识别url中user_filters参数查询数据
  * 支持user_session验证验证
  * 导出excel/pdf功能优化完善
  * 引入metro的table部分静态资源样式
  * 脚本中支持req.data.user_filters取得用户从url中传入的过滤条件
  * 脚本中支持req.data.user_session取得当前登录用户的session信息
  * 脚本中支持req.data.report取得当前报表信息
  * 脚本中支持req.data.root_url取得当前站点ROOT_URL
