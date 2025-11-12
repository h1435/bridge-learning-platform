export type TenantActivityItem = {
  id: string;
  tenantName: string;
  tenantType: "省级高速" | "城市公路局" | "自营试点";
  activeUsers: number;
  learningSessions: number;
  examPassRate: number;
  healthTag: "稳定" | "观察" | "风险";
};

export type UsageTrendPoint = {
  period: string;
  publishedCourses: number;
  learningSessions: number;
  questionUsages: number;
};

export type HotResourceItem = {
  id: string;
  name: string;
  category: string;
  metric: string;
  value: number;
};

export type PlanStatusSummaryItem = {
  status: "进行中" | "待发布" | "已完成" | "逾期";
  count: number;
  percent: number;
};

export type PlanReminderItem = {
  id: string;
  planName: string;
  tenantName: string;
  deadline: string;
  completionRate: number;
};

export type ExamReminderItem = {
  id: string;
  examName: string;
  scheduledAt: string;
  tenantName: string;
  status: "待发布" | "待审核";
};

export type SystemHealthSnapshot = {
  alertsToday: number;
  highSeverityAlerts: number;
  openIssues: number;
  latestRelease: {
    version: string;
    stage: "灰度中" | "验收中" | "已发布" | "规划中" | "已回滚";
    progress: number;
  };
  riskHighlights: string[];
};

export type QuickActionItem = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  publishedAt: string;
  audience: string;
};

export const TenantActivityMock: TenantActivityItem[] = [
  {
    id: "tenant-001",
    tenantName: "浙江高速集团",
    tenantType: "省级高速",
    activeUsers: 1632,
    learningSessions: 8421,
    examPassRate: 0.92,
    healthTag: "稳定"
  },
  {
    id: "tenant-002",
    tenantName: "贵州省交通运输厅",
    tenantType: "省级高速",
    activeUsers: 1184,
    learningSessions: 5360,
    examPassRate: 0.88,
    healthTag: "观察"
  },
  {
    id: "tenant-003",
    tenantName: "宁波公路管理中心",
    tenantType: "城市公路局",
    activeUsers: 624,
    learningSessions: 2648,
    examPassRate: 0.85,
    healthTag: "稳定"
  },
  {
    id: "tenant-004",
    tenantName: "沪苏通运营公司",
    tenantType: "自营试点",
    activeUsers: 286,
    learningSessions: 1180,
    examPassRate: 0.76,
    healthTag: "风险"
  },
  {
    id: "tenant-005",
    tenantName: "江苏交控",
    tenantType: "省级高速",
    activeUsers: 968,
    learningSessions: 4286,
    examPassRate: 0.9,
    healthTag: "稳定"
  }
];

export const TenantTypeFilters = [
  { value: "all", label: "全部类型" },
  { value: "省级高速", label: "省级高速" },
  { value: "城市公路局", label: "城市公路局" },
  { value: "自营试点", label: "自营试点" }
];

export const UsageTrendMock: UsageTrendPoint[] = [
  { period: "第 1 周", publishedCourses: 4, learningSessions: 3260, questionUsages: 1680 },
  { period: "第 2 周", publishedCourses: 6, learningSessions: 3890, questionUsages: 1942 },
  { period: "第 3 周", publishedCourses: 5, learningSessions: 4124, questionUsages: 2108 },
  { period: "第 4 周", publishedCourses: 8, learningSessions: 4520, questionUsages: 2361 },
  { period: "第 5 周", publishedCourses: 7, learningSessions: 4386, questionUsages: 2284 },
  { period: "第 6 周", publishedCourses: 6, learningSessions: 4672, questionUsages: 2496 }
];

export const HotCoursesMock: HotResourceItem[] = [
  {
    id: "course-001",
    name: "桥梁结构健康监测实战",
    category: "桥梁安全",
    metric: "学习人次",
    value: 1820
  },
  {
    id: "course-002",
    name: "隧道火灾应急演练指南",
    category: "防汛应急",
    metric: "学习人次",
    value: 1468
  },
  {
    id: "course-003",
    name: "公路桥梁安全管理办法解读",
    category: "法规合规",
    metric: "学习人次",
    value: 1324
  },
  {
    id: "course-004",
    name: "缆索桥维护技术要点",
    category: "桥梁维护",
    metric: "学习人次",
    value: 1106
  },
  {
    id: "course-005",
    name: "平台操作管理员培训",
    category: "平台培训",
    metric: "学习人次",
    value: 988
  }
];

export const HotQuestionsMock: HotResourceItem[] = [
  {
    id: "question-001",
    name: "光纤传感器监测原理",
    category: "桥梁结构检测",
    metric: "引用次数",
    value: 128
  },
  {
    id: "question-002",
    name: "隧道火灾应急流程",
    category: "防汛应急",
    metric: "引用次数",
    value: 102
  },
  {
    id: "question-003",
    name: "缆夹锈蚀优先级判断",
    category: "巡检管理",
    metric: "引用次数",
    value: 94
  },
  {
    id: "question-004",
    name: "安全法规填空题汇总",
    category: "法规合规",
    metric: "引用次数",
    value: 86
  },
  {
    id: "question-005",
    name: "桥梁施工安全案例分析",
    category: "施工安全",
    metric: "引用次数",
    value: 74
  }
];

export const PlanStatusSummaryMock: PlanStatusSummaryItem[] = [
  { status: "进行中", count: 18, percent: 52 },
  { status: "待发布", count: 6, percent: 17 },
  { status: "已完成", count: 8, percent: 23 },
  { status: "逾期", count: 3, percent: 8 }
];

export const PlanReminderMock: PlanReminderItem[] = [
  {
    id: "plan-001",
    planName: "2025 桥梁安全专项培训",
    tenantName: "浙江高速集团",
    deadline: "距离截止 5 天",
    completionRate: 0.78
  },
  {
    id: "plan-002",
    planName: "道路养护安全再培训",
    tenantName: "贵州省交通运输厅",
    deadline: "距离截止 9 天",
    completionRate: 0.64
  },
  {
    id: "plan-003",
    planName: "桥梁巡检年度复训",
    tenantName: "宁波公路管理中心",
    deadline: "距离截止 12 天",
    completionRate: 0.51
  }
];

export const ExamReminderMock: ExamReminderItem[] = [
  {
    id: "exam-001",
    examName: "桥梁专项认证（4 月批次）",
    tenantName: "浙江高速集团",
    scheduledAt: "待发布 · 2025-04-16",
    status: "待发布"
  },
  {
    id: "exam-002",
    examName: "隧道安全演练理论测验",
    tenantName: "江苏交控",
    scheduledAt: "待审核 · 2025-04-20",
    status: "待审核"
  }
];

export const SystemHealthSnapshotMock: SystemHealthSnapshot = {
  alertsToday: 7,
  highSeverityAlerts: 2,
  openIssues: 5,
  latestRelease: {
    version: "v2.4.0 Aurora",
    stage: "灰度中",
    progress: 62
  },
  riskHighlights: [
    "文件上传与转码服务处于高负载，请关注",
    "课程资源接口 P95 接近阈值，已通知资源中心",
    "宁波公路管理中心计划完成率低于 50%"
  ]
};

export const QuickActions: QuickActionItem[] = [
  {
    id: "action-tenant",
    label: "新建租户",
    description: "引导客户完成合同与开通流程",
    href: "/pa/tenant-wizard"
  },
  {
    id: "action-course",
    label: "课程管理",
    description: "审核课程、维护课程标签",
    href: "/pa/course-library"
  },
  {
    id: "action-plan",
    label: "创建计划",
    description: "构建跨租户培训计划",
    href: "/ga/plans"
  },
  {
    id: "action-monitor",
    label: "运行监控",
    description: "查看服务健康与告警",
    href: "/pa/monitor"
  }
];

export const AnnouncementMock: AnnouncementItem[] = [
  {
    id: "ann-001",
    title: "v2.4.0 平台升级灰度进行中",
    publishedAt: "2025-04-05 09:00",
    audience: "全部租户管理员"
  },
  {
    id: "ann-002",
    title: "课程资源导入规范更新提示",
    publishedAt: "2025-04-03 15:20",
    audience: "运营团队"
  },
  {
    id: "ann-003",
    title: "4 月平台巡检计划发布",
    publishedAt: "2025-04-01 08:30",
    audience: "内部运维"
  }
];
