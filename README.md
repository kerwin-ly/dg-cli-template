## 项目说明
rpa辅助系统

## 项目介绍

### 项目启动
* `安装依赖`: 进入项目根目录, 执行`npm i`
* `本地测试`: 进入项目根目录，执行`npm start`
* `打包部署`: 进入项目根目录，执行`npm run build`可对代码进行打包。
* `建信打包`: 进入项目根目录，执行`npm run build:pjf`可对代码进行打包，注意**index.html需引入pjf相关框架**

### 项目结构
```
.
├── app                               (项目源码)
│   ├── app.module.ts                   (app根模块)
│   ├── core                            (app核心模块，包含拦截器，启动模块等)
│   ├── delon.module.ts
│   ├── layout                          (布局模块)
│   ├── routes                          (路由模块，放置业务逻辑)
│   └── shared                          (通用组件加载模块)
├── assets                            (静态资源)
├── browserslist
├── environments                      (环境变量目录)
│   ├── environment.hmr.ts
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── hmr.ts
├── index.html                        (入口页面)
├── karma.conf.js
├── main.ts                           (ts入口模块)
├── polyfills.ts
├── style-icons-auto.ts
├── style-icons.ts
├── styles                            (全局样式目录)
│   ├── index.less
│   └── theme.less
├── styles.less
├── test.ts
├── tsconfig.app.json                 (tsconfig配置)
├── tsconfig.spec.json
├── tslint.json                       (tslint配置)
└── typings.d.ts
```

### 开发规范

#### 页面结构
* 请参考`src/app/routes/bi`模块构建，拿`bi模块`举例
```
/bi
  /pages       (路由页面) 
  /components  (组件)
  /services    (数据服务)
  ...
```

#### git提交规范
[前端协作约定](https://git.datagrand.com/frontend_utils/fe-conventions)**务必细读第2，3，4条**

### docker封装
docker目录存放的关于docker操作的常用命令，我们在进入docker目录后，执行`sh build_image.sh`进行打包
待补充

### CI/CD
`.gitlab-ci.yml`配置

