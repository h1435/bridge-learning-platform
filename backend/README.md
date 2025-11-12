# 学习平台后端服务

基于 NestJS 构建的模块化单体（Modular Monolith）架构，承载培训计划、考试、证书、通知等业务能力。脚手架遵循“按领域划分模块、横切能力独立封装”的原则，为后续演进到微服务做好准备。

## 目录结构

```
backend/
├── README.md
├── package.json
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── src/
│   ├── main.ts                # 应用入口，统一注册全局配置、验证管道
│   ├── app.module.ts          # 顶层模块，汇总配置与业务模块
│   ├── config/                # 全局配置加载
│   └── modules/
│       └── health/            # 健康检查模块示例
└── libs/                      # 预留公共库（实体、工具、事件等）
```

## 常用命令

- `npm run start:dev`：本地开发模式（热更新）。
- `npm run build`：编译 TypeScript，输出到 `dist/`。
- `npm run start`：以编译产物启动。
- `npm run lint` / `npm run format`：代码规范检查与格式化。

## 后续规划

- 在 `src/modules/` 下按领域新增模块（如 `auth`、`training-plan`、`notification` 等）。
- 在 `libs/` 中抽象公共组件（实体定义、领域事件、工具函数）。
- 引入数据库访问层（Prisma / TypeORM）、多环境配置、Docker/K8s 部署脚本等。

