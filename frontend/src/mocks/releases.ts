export type ReleaseStatus = "draft" | "scheduled" | "rolling" | "verifying" | "completed" | "rolled_back";
export type ReleaseRisk = "low" | "medium" | "high";
export type RolloutStatus = "pending" | "running" | "completed" | "blocked" | "rolled_back";

export type ReleaseRollout = {
  id: string;
  name: string;
  scopeType: "tenant" | "region" | "module";
  targets: string[];
  plannedAt: string;
  actualAt?: string;
  status: RolloutStatus;
  completion: number;
  approver: string;
};

export type ReleaseIssue = {
  id: string;
  title: string;
  status: "open" | "resolved" | "monitoring";
  severity: "L" | "M" | "H";
  owner: string;
};

export type ReleaseAnnouncement = {
  id: string;
  channel: "站内信" | "邮件" | "短信" | "系统公告";
  sentAt: string;
  audience: string;
  status: "sent" | "draft" | "scheduled";
};

export type ReleaseLog = {
  at: string;
  operator: string;
  action: string;
};

export type ReleaseItem = {
  id: string;
  version: string;
  codename: string;
  type: "功能迭代" | "缺陷修复" | "安全补丁";
  status: ReleaseStatus;
  risk: ReleaseRisk;
  owner: string;
  qaOwner: string;
  changeLead: string;
  createdAt: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  actualEnd?: string;
  modules: string[];
  impactedTenants: string[];
  changeHighlights: string[];
  rolloutPlan: ReleaseRollout[];
  issues: ReleaseIssue[];
  announcements: ReleaseAnnouncement[];
  logs: ReleaseLog[];
};

export const ReleaseMetrics = [
  {
    id: "release-total",
    label: "近90日发布次数",
    value: "12 次",
    trendLabel: "环比",
    trendValue: "+2",
    status: "up" as const
  },
  {
    id: "release-progress",
    label: "进行中版本",
    value: "3 个",
    trendLabel: "灰度租户",
    trendValue: "18",
    status: "stable" as const
  },
  {
    id: "release-rollback",
    label: "回滚次数",
    value: "1 次",
    trendLabel: "同比",
    trendValue: "-2",
    status: "down" as const
  },
  {
    id: "release-issue",
    label: "公开问题",
    value: "5 条",
    trendLabel: "高风险",
    trendValue: "1",
    status: "down" as const
  }
];

export const ReleaseStatuses = [
  { value: "draft" as const, label: "规划中" },
  { value: "scheduled" as const, label: "已排期" },
  { value: "rolling" as const, label: "灰度中" },
  { value: "verifying" as const, label: "验收中" },
  { value: "completed" as const, label: "已发布" },
  { value: "rolled_back" as const, label: "已回滚" }
];

export const ReleaseRisks = [
  { value: "low" as const, label: "低风险" },
  { value: "medium" as const, label: "中风险" },
  { value: "high" as const, label: "高风险" }
];

export const ReleaseTypes = [
  { value: "功能迭代" as const, label: "功能迭代" },
  { value: "缺陷修复" as const, label: "缺陷修复" },
  { value: "安全补丁" as const, label: "安全补丁" }
];

export const ReleaseModules = [
  "租户中心",
  "资源中心",
  "计划管理",
  "考试管理",
  "证书模块",
  "报表中心",
  "安全审计"
] as const;

export const ReleaseOwners = [
  "陈晓晨",
  "李娜",
  "王强",
  "平台运维组"
] as const;

export const ReleaseMock: ReleaseItem[] = [
  {
    id: "rel-202404-01",
    version: "v2.4.0",
    codename: "Aurora",
    type: "功能迭代",
    status: "rolling",
    risk: "medium",
    owner: "陈晓晨",
    qaOwner: "李娜",
    changeLead: "王强",
    createdAt: "2024-03-28T10:12:00Z",
    plannedStart: "2024-04-01T02:00:00Z",
    plannedEnd: "2024-04-05T14:00:00Z",
    actualStart: "2024-04-01T02:30:00Z",
    modules: ["计划管理", "考试管理", "资源中心"],
    impactedTenants: ["浙江高速集团", "江苏交控", "平台租户试点组"],
    changeHighlights: [
      "新增培训计划自动生成考试模板功能",
      "优化题库批量导入性能，单次支持 5 万条",
      "上线考试监考大屏 Beta 版"
    ],
    rolloutPlan: [
      {
        id: "rollout-01",
        name: "内测租户",
        scopeType: "tenant",
        targets: ["平台租户试点组"],
        plannedAt: "2024-04-01T02:00:00Z",
        actualAt: "2024-04-01T02:30:00Z",
        status: "completed",
        completion: 100,
        approver: "赵敏"
      },
      {
        id: "rollout-02",
        name: "省级客户批次",
        scopeType: "tenant",
        targets: ["浙江高速集团", "江苏交控"],
        plannedAt: "2024-04-02T03:00:00Z",
        status: "running",
        completion: 60,
        approver: "陈晓晨"
      },
      {
        id: "rollout-03",
        name: "全国租户",
        scopeType: "module",
        targets: ["计划管理", "考试管理"],
        plannedAt: "2024-04-04T03:00:00Z",
        status: "pending",
        completion: 0,
        approver: "李娜"
      }
    ],
    issues: [
      {
        id: "ISSUE-1024",
        title: "考试监控实时图表偶现空白",
        status: "open",
        severity: "M",
        owner: "李娜"
      },
      {
        id: "ISSUE-1042",
        title: "题库导入失败率升高预警",
        status: "monitoring",
        severity: "H",
        owner: "平台运维组"
      }
    ],
    announcements: [
      {
        id: "ANN-8001",
        channel: "系统公告",
        sentAt: "2024-03-30T09:00:00Z",
        audience: "全部租户管理员",
        status: "sent"
      },
      {
        id: "ANN-8002",
        channel: "邮件",
        sentAt: "2024-03-31T02:00:00Z",
        audience: "即将灰度租户",
        status: "sent"
      }
    ],
    logs: [
      { at: "2024-04-01T02:30:00Z", operator: "陈晓晨", action: "完成批次 rollout-01" },
      { at: "2024-04-01T03:00:00Z", operator: "平台运维组", action: "部署考试监控服务" }
    ]
  },
  {
    id: "rel-202403-02",
    version: "v2.3.3",
    codename: "BridgeGuard",
    type: "缺陷修复",
    status: "completed",
    risk: "low",
    owner: "王强",
    qaOwner: "李娜",
    changeLead: "陈晓晨",
    createdAt: "2024-03-10T06:12:00Z",
    plannedStart: "2024-03-12T01:30:00Z",
    plannedEnd: "2024-03-12T04:00:00Z",
    actualStart: "2024-03-12T01:45:00Z",
    actualEnd: "2024-03-12T03:50:00Z",
    modules: ["资源中心", "考试管理"],
    impactedTenants: ["全部租户"],
    changeHighlights: [
      "修复题库导出偶发缺少选项的问题",
      "优化课程封面上传失败的错误提示",
      "改进考试异常上报的告警通知节奏"
    ],
    rolloutPlan: [
      {
        id: "rollout-11",
        name: "全量部署",
        scopeType: "module",
        targets: ["资源中心", "考试管理"],
        plannedAt: "2024-03-12T01:30:00Z",
        actualAt: "2024-03-12T01:45:00Z",
        status: "completed",
        completion: 100,
        approver: "王强"
      }
    ],
    issues: [
      {
        id: "ISSUE-988",
        title: "课程封面上传接口 500",
        status: "resolved",
        severity: "M",
        owner: "王强"
      }
    ],
    announcements: [
      {
        id: "ANN-7901",
        channel: "系统公告",
        sentAt: "2024-03-11T09:00:00Z",
        audience: "全部租户管理员",
        status: "sent"
      }
    ],
    logs: [
      { at: "2024-03-12T01:45:00Z", operator: "王强", action: "触发全量部署" },
      { at: "2024-03-12T03:50:00Z", operator: "李娜", action: "完成 QA 验收" }
    ]
  },
  {
    id: "rel-202402-05",
    version: "v2.3.1",
    codename: "Sentinel",
    type: "安全补丁",
    status: "rolled_back",
    risk: "high",
    owner: "平台运维组",
    qaOwner: "李娜",
    changeLead: "王强",
    createdAt: "2024-02-20T08:22:00Z",
    plannedStart: "2024-02-22T02:00:00Z",
    plannedEnd: "2024-02-22T04:30:00Z",
    actualStart: "2024-02-22T02:05:00Z",
    actualEnd: "2024-02-22T05:10:00Z",
    modules: ["安全审计", "登录认证"],
    impactedTenants: ["全国租户"],
    changeHighlights: [
      "修复 SSO token 刷新逻辑安全漏洞",
      "强化操作日志篡改检测"
    ],
    rolloutPlan: [
      {
        id: "rollout-21",
        name: "安全租户先行",
        scopeType: "tenant",
        targets: ["平台租户试点组"],
        plannedAt: "2024-02-22T02:00:00Z",
        actualAt: "2024-02-22T02:05:00Z",
        status: "rolled_back",
        completion: 30,
        approver: "李娜"
      }
    ],
    issues: [
      {
        id: "ISSUE-932",
        title: "部分租户登录延迟超阈值",
        status: "open",
        severity: "H",
        owner: "平台运维组"
      }
    ],
    announcements: [
      {
        id: "ANN-7721",
        channel: "系统公告",
        sentAt: "2024-02-22T01:00:00Z",
        audience: "全部租户管理员",
        status: "sent"
      },
      {
        id: "ANN-7722",
        channel: "短信",
        sentAt: "2024-02-22T05:30:00Z",
        audience: "存在影响的租户负责人",
        status: "sent"
      }
    ],
    logs: [
      { at: "2024-02-22T02:05:00Z", operator: "平台运维组", action: "启动安全补丁" },
      { at: "2024-02-22T05:10:00Z", operator: "陈晓晨", action: "执行回滚" }
    ]
  }
];

export const statusLabel = (value: ReleaseStatus) =>
  ReleaseStatuses.find((item) => item.value === value)?.label ?? value;

export const riskLabel = (value: ReleaseRisk) =>
  ReleaseRisks.find((item) => item.value === value)?.label ?? value;
