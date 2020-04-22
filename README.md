# dg-cli-template
>基于[ng-alain](https://ng-alain.com/docs/getting-started/en)快速生成自定义项目模板。

### 项目启动
* `安装依赖`: 进入项目根目录, 执行`npm i`
* `本地开发`: 进入项目根目录，执行`npm start`
* `打包部署`: 进入项目根目录，执行`npm run build`可对代码进行打包。

### 项目结构
```
.
├── _mock                                                 (mock数据)
├── angular.json                                          (angular配置项)
├── build                                                 (CI/CD脚本)
├── commitlint.config.js
├── karma.conf.js
├── package-lock.json
├── package.json
├── proxy.config.json                                     (代理配置)
├── scripts
├── src
│   ├── app                                               (项目源码)
│   │   ├── app.component.ts
│   │   ├── app.module.ts                                 (app根模块)
│   │   ├── core                                          (app核心模块，包含拦截器，启动模块等)
│   │   ├── delon.module.ts                               (delon根模块)
│   │   ├── layout                                        (布局模块)
│   │   ├── routes                                        (路由模块，业务逻辑)
│   │   │   ├── passport
│   │   │   └── business                                  (业务模块，注意添加pages, components, services文件夹)
│   │   │       ├── pages                                 (业务页面)
│   │   │       ├── service                               (业务服务)
│   │   │       ├── components                            (业务组件)
│   │   │       ├── business-routing.module.ts
│   │   │       └── business.module.ts
│   │   └── shared                                        (共享模块)
│   │       ├── api                                       (api请求)
│   │       ├── components                                (公共组件)
│   │       ├── index.ts
│   │       ├── interfaces                                (公共接口)
│   │       ├── json-schema
│   │       ├── shared.module.ts
│   │       └── utils                                     (工具类)
│   ├── assets                                            (静态文件)
│   ├── environments                                      (环境变量)
│   ├── favicon.ico
│   ├── hmr.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── style-icons-auto.ts
│   ├── style-icons.ts
│   ├── styles                                            (全局样式)
│   ├── styles.less
│   ├── test.ts
│   └── typings.d.ts
├── tsconfig.app.json
├── tsconfig.json
└── tslint.json

```

### 开发规范
详见[风格指南](https://angular.cn/guide/styleguide)
