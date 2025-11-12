# 首批接口规划（v1）

本规划聚焦最优先的三大模块：认证与租户上下文、培训计划管理（GA/MA）、消息中心（全角色共享）。所有接口均以 `/api/v1` 为前缀，默认返回结构：

```json
{
  "code": 0,
  "message": "OK",
  "data": { ... },
  "traceId": "uuid"
}
```

## 1. 认证与租户上下文（Auth Module）

| 接口 | 方法 | 描述 | 备注 |
| ---- | ---- | ---- | ---- |
| `/auth/login` | POST | 账号密码登录，返回 Access/Refresh Token、租户信息、角色列表 | 请求体包含 `tenantCode`、`username`、`password`、`otp`（可选） |
| `/auth/refresh` | POST | 刷新 Token | 请求 Header 中带 Refresh Token |
| `/auth/logout` | POST | 主动登出，作废 Refresh Token | |
| `/auth/switch-role` | POST | 在多角色间切换，返回新的权限列表 | 请求体 `{ role: "GA" }` |
| `/auth/profile` | GET | 获取当前用户档案、所属组织、可访问权限 | 用于前端刷新上下文 |
| `/auth/sessions` | GET | 查询当前账号的活跃登录会话 | 用于安全中心 |
| `/auth/sessions/:sessionId` | DELETE | 终止指定会话 | |

### 登录请求示例

```json
POST /api/v1/auth/login
{
  "tenantCode": "HZA-OPS",
  "username": "ga_admin",
  "password": "******",
  "otp": "123456"
}
```

### 登录响应示例

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "accessToken": "jwt...",
    "refreshToken": "jwt...",
    "expiresIn": 3600,
    "tenant": {
      "id": "tenant_001",
      "code": "HZA-OPS",
      "name": "杭州市公路桥梁管理中心",
      "package": "standard"
    },
    "user": {
      "id": "user_123",
      "name": "李晨",
      "roles": ["GA", "PA"],
      "primaryRole": "GA"
    }
  },
  "traceId": "7dc1c2f4-..."
}
```

## 2. 培训计划管理（Training Plan Module）

目标：支撑主管单位 GA 与管养单位 MA 的计划列表、详情、执行视图。

### 2.1 计划列表（GA 视角）

| 接口 | 方法 | 描述 |
| ---- | ---- | ---- |
| `/plans` | GET | 分页查询计划列表，支持关键词、状态、时间范围、来源筛选 |
| `/plans` | POST | 新建培训计划，进入“草稿”状态 |
| `/plans/:id` | GET | 查看计划详情（基础信息、课程、覆盖单位、考试、证书等） |
| `/plans/:id` | PUT | 更新计划（草稿或驳回状态） |
| `/plans/:id/status` | PATCH | 修改状态：提交审批、审批通过、驳回、终止 |
| `/plans/:id/duplicate` | POST | 复制计划（返回新计划 ID） |

#### 列表筛选参数
- `page`, `pageSize`
- `status`：`draft`、`reviewing`、`active`、`completed`、`closed`
- `source`：`assigned`（上级下发）、`self`（本单位自建）
- `keyword`：匹配名称、编码
- `periodStart` / `periodEnd`

### 2.2 管养单位计划执行（MA 视角）

| 接口 | 方法 | 描述 |
| ---- | ---- | ---- |
| `/plans/:id/assignments` | GET | 查询该计划下本单位的学员任务、进度、提醒信息 |
| `/plans/:id/timeline` | GET | 获取执行时间轴（确认、学习、考试、反馈节点） |
| `/plans/:id/escalations` | POST | 提交异常上报 / 催办 |
| `/plans/:id/acknowledge` | POST | 确认接收计划（含备注） |

### 2.3 数据结构要点

- `TrainingPlan`：包含基本信息、适用岗位、适用单位范围。
- `PlanCourse`：计划关联课程，含必修/选修、学时要求。
- `PlanExam`：关联线上考试配置。
- `TrainingAssignment`：学员任务记录；字段 `status`（`pending` / `in_progress` / `completed` / `overdue`）、`progress`（0-100）。
- `PlanNotification`：计划相关的提醒记录，方便展示“催办历史”。

## 3. 消息中心（Notification Module）

统一服务所有角色（PA/GA/MA/ST）。

| 接口 | 方法 | 描述 |
| ---- | ---- | ---- |
| `/notifications` | GET | 查询消息列表，支持按类型、状态、时间筛选 |
| `/notifications/unread-count` | GET | 获取未读数量 |
| `/notifications/:id` | GET | 查看详细内容（含跳转链接、附件） |
| `/notifications/:id/read` | POST | 标记单条已读 |
| `/notifications/mark-read` | POST | 批量标记已读（请求体传 ID 列表或按类型） |
| `/notifications/preferences` | GET | 获取提醒偏好（站内信、邮件、短信等渠道） |
| `/notifications/preferences` | PUT | 更新提醒偏好 |

### 列表筛选参数
- `type`: `学习任务` / `审批` / `系统公告` / `资质`
- `status`: `unread` / `read`
- `startTime`, `endTime`
- `keyword`（匹配标题或内容）

### 数据结构

```json
{
  "id": "notif_1001",
  "title": "桥梁维护专项考试提醒",
  "content": "线上考试将于 4 月 18 日 09:00 开始...",
  "category": "学习任务",
  "link": "/st/exams?plan=plan_bridge_2025",
  "unread": true,
  "createdAt": "2025-04-10T02:16:00.000Z",
  "channels": ["inbox", "email"],
  "metadata": {
    "planId": "plan_bridge_2025",
    "assignmentId": "assignment_987"
  }
}
```

### 通用约束
- 站内信未读数据记录在 `notification_user_status` 表；接口返回时按用户维度合并。
- 消息中心与抽屉联动：抽屉点击“前往查看”时，前端调用 `/notifications/:id/read` + 跳转至 `link`。
- 将通知模板与业务事件解耦，后续支持在 `notification` 模块内配置策略。

## 4. 公共约定

- 所有接口要求 Header：`Authorization: Bearer <AccessToken>`；特殊匿名接口（如登录）除外。
- 每个请求透传 `X-Tenant-Code`（或从 Token 中解析），便于后端校验租户隔离。
- 分页响应统一格式：

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "items": [],
    "page": 1,
    "pageSize": 20,
    "total": 120
  },
  "traceId": "..."
}
```

- 错误码示例：
  - `1000`：成功
  - `2001`：账号或密码错误
  - `2002`：租户状态异常（停用/过期）
  - `2403`：无访问权限
  - `2601`：计划状态不允许当前操作
  - `2999`：业务通用错误
  - `5000`：系统内部错误

## 5. 后续迭代

- 第 2 批接口将覆盖：组织/人员管理、学员学习记录、考试答卷、证书模板配置等。
- 渐进引入异步任务接口，如计划导出、报表生成、批量通知。
- 按模块补充 Swagger 注解，配合自动化测试（Jest + Supertest）保障稳定性。

