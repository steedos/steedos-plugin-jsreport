0.1.0 / 2019-08-xx
===================

  * 尝试解决在creator项目中引用后，运行项目时报错
  ```
  While building the application:
  D:\GitHub\creator_dev\project-tap.i18n: Can't load project-tap.i18n in a package: null
  ```

0.0.8 / 2019-07-30
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

0.0.7 / 2019-07-27
===================