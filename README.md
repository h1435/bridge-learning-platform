# 学习平台项目

一个面向公路养护行业的在线学习培训平台,支持课程学习、考试认证、证书管理等功能。

## 项目结构

```
学习平台项目/
├── backend/                 # 后端服务(NestJS)
│   ├── src/                # 源代码
│   ├── dist/               # 编译产物
│   ├── package.json        # 后端依赖
│   └── README.md          # 后端说明文档
├── frontend/               # 前端应用(React + Vite)
│   ├── src/               # 源代码
│   ├── dist/              # 构建产物
│   ├── package.json       # 前端依赖
│   └── vite.config.ts     # Vite 配置
├── 需求文档.md             # 产品需求文档
├── 系统设计文档.md         # 技术设计文档
└── 开发扫盲.md             # 开发指南
```

## 快速开始

### 1. 后端服务

```bash
# 进入后端目录
cd backend

# 安装依赖(首次运行)
npm install

# 启动开发模式(热更新)
npm run start:dev

# 或者编译后运行
npm run build
npm run start
```

后端服务将运行在 `http://localhost:3000`

**后端常用命令:**
- `npm run start:dev` - 开发模式(热更新)
- `npm run build` - 编译TypeScript
- `npm run start` - 生产模式启动
- `npm run lint` - 代码检查
- `npm run format` - 代码格式化

### 2. 前端应用

```bash
# 进入前端目录
cd frontend

# 安装依赖(首次运行)
npm install

# 启动开发服务器
npm run dev

# 或者构建生产版本
npm run build
npm run preview
```

前端应用将运行在 `http://localhost:5173`

**前端常用命令:**
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建

### 3. 完整启动流程

**首次运行需要安装依赖:**

```bash
# 1. 安装后端依赖
cd backend
npm install

# 2. 安装前端依赖
cd ../frontend
npm install
```

**日常开发:**

打开两个终端窗口:

**终端1 - 启动后端:**
```bash
cd /Users/lh/coding/学习平台项目/backend
npm run start:dev
```

**终端2 - 启动前端:**
```bash
cd /Users/lh/coding/学习平台项目/frontend
npm run dev
```

然后在浏览器访问 `http://localhost:5173` 即可看到前端界面。

## 技术栈

### 后端
- **框架**: NestJS (Node.js + TypeScript)
- **架构**: 模块化单体架构(Modular Monolith)
- **主要模块**: 健康检查、认证、课程、计划、考试、证书等

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Ant Design
- **状态管理**: React Hooks
- **路由**: React Router

## 角色与功能

平台支持以下角色:

1. **平台超级管理员(PA)** - 租户管理、资源库、运维监控
2. **主管单位管理员(GA)** - 课程、培训计划、考试、证书管理
3. **管养单位管理员(MA)** - 学员管理、计划执行、进度跟踪
4. **工程师学员(ST)** - 学习课程、参加考试、获取证书

详细功能说明请参考 [需求文档.md](./需求文档.md) 和 [系统设计文档.md](./系统设计文档.md)

## 开发说明

- 后端采用按领域划分的模块化架构,便于后续拆分为微服务
- 前端已实现多个页面的演示版本,数据使用 mock 数据
- 项目正在开发中,部分功能仍在实现阶段

## 常见问题

**Q: 为什么在根目录运行 npm run dev 报错?**

A: 因为这是前后端分离项目,需要分别进入 `backend/` 和 `frontend/` 目录运行。根目录没有 package.json 文件。

**Q: 如何同时运行前后端?**

A: 打开两个终端窗口,一个运行后端(`cd backend && npm run start:dev`),另一个运行前端(`cd frontend && npm run dev`)。

**Q: 端口冲突怎么办?**

A: 后端默认 3000 端口,前端默认 5173 端口。如有冲突可在配置文件中修改。

## 项目文档

- [需求文档](./需求文档.md) - 详细的产品需求和功能规划
- [系统设计文档](./系统设计文档.md) - 技术架构和实现方案
- [开发扫盲](./开发扫盲.md) - 开发入门指南
- [后端README](./backend/README.md) - 后端详细说明

## 许可证

[待补充]

