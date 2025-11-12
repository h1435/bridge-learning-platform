import type { PersonaKey } from "./personas";

export type KpiMetric = {
  id: string;
  label: string;
  value: string;
  trendLabel?: string;
  trendValue?: string;
  status?: "up" | "down" | "stable";
};

export type PlanSummary = {
  id: string;
  name: string;
  period: string;
  targetRoles: string[];
  completionRate: number;
  status: "进行中" | "未开始" | "已结束";
  highlight?: string;
};

export type ExamSummary = {
  id: string;
  name: string;
  schedule: string;
  participants: number;
  passRate: number;
  status: "报名中" | "待开考" | "进行中" | "已结束";
};

export type CertificateSummary = {
  id: string;
  title: string;
  issued: number;
  expiresSoon: number;
  autoIssueRule: string;
};

export type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  description: string;
  persona: PersonaKey[];
};

export type UnitHighlightGA = {
  id: string;
  name: string;
  activeUsers: number;
  learningSessions: number;
  risk: string;
  reminder: string;
};

export type ApprovalTaskGA = {
  id: string;
  title: string;
  detail: string;
  deadline: string;
};

export type ExamReminderGA = {
  id: string;
  title: string;
  time: string;
  note: string;
};

export const DashboardMetrics: Record<PersonaKey, KpiMetric[]> = {
  PA: [
    {
      id: "tenant-count",
      label: "已开通租户",
      value: "28 家",
      trendLabel: "本月新增",
      trendValue: "+3",
      status: "up"
    },
    {
      id: "platform-uptime",
      label: "平台可用性",
      value: "99.98%",
      trendLabel: "近 30 天",
      trendValue: "稳定",
      status: "stable"
    },
    {
      id: "ticket-response",
      label: "客服平均响应",
      value: "12 分钟",
      trendLabel: "同比提升",
      trendValue: "15%",
      status: "up"
    }
  ],
  GA: [],
  MA: [
    {
      id: "ma-plan",
      label: "进行中培训计划",
      value: "5",
      trendLabel: "较上周",
      trendValue: "+1",
      status: "up"
    },
    {
      id: "ma-staff",
      label: "在册人员",
      value: "186",
      trendLabel: "本月新增",
      trendValue: "+12",
      status: "up"
    },
    {
      id: "ma-review",
      label: "待审核资料",
      value: "9",
      trendLabel: "紧急",
      trendValue: "2",
      status: "danger"
    },
    {
      id: "ma-cert",
      label: "近30天证书到期",
      value: "14",
      trendLabel: "需续期",
      trendValue: "+4",
      status: "warning"
    }
  ],
  ST: [
    {
      id: "tasks",
      label: "待办任务",
      value: "3 项",
      trendLabel: "最近截止",
      trendValue: "11 月 20 日",
      status: "down"
    },
    {
      id: "learning-hours",
      label: "累计学时",
      value: "46.5 h",
      trendLabel: "本月学习",
      trendValue: "12.5 h",
      status: "up"
    },
    {
      id: "certificate",
      label: "即将到期证书",
      value: "1 张",
      trendLabel: "需要复训",
      trendValue: "桥梁维护乙级",
      status: "down"
    }
  ]
};

export const PlanSummaries: Record<PersonaKey, PlanSummary[]> = {
  PA: [
    {
      id: "plan-pa-1",
      name: "贵州省交通厅 - 2025 年数字化培训升级",
      period: "2025.01-2025.12",
      targetRoles: ["运营管理员"],
      completionRate: 0.76,
      status: "进行中",
      highlight: "重点关注上云率与系统稳定性"
    }
  ],
  GA: [
    {
      id: "plan-ga-1",
      name: "2025 桥梁养护专项培训",
      period: "2025.02-2025.08",
      targetRoles: ["桥梁工程师", "质检员"],
      completionRate: 0.82,
      status: "进行中",
      highlight: "进度落后单位：成贵二线三项目部"
    },
    {
      id: "plan-ga-2",
      name: "道路养护安全再培训",
      period: "2025.03-2025.12",
      targetRoles: ["道路工程师"],
      completionRate: 0.58,
      status: "进行中"
    }
  ],
  MA: [
    {
      id: "plan-ma-1",
      name: "贵阳养护段 - 桥梁专项班",
      period: "2025.02-2025.09",
      targetRoles: ["桥梁巡检员"],
      completionRate: 0.71,
      status: "进行中",
      highlight: "需催办班组：乌当桥梁现场组"
    }
  ],
  ST: [
    {
      id: "plan-st-1",
      name: "岗位必修：桥梁维护 B 级",
      period: "需在 2025.08.31 前完成",
      targetRoles: ["桥梁维护工程师"],
      completionRate: 0.64,
      status: "进行中",
      highlight: "剩余课程：桥梁病害识别、案例考试"
    }
  ]
};

export const ExamSummaries: Record<PersonaKey, ExamSummary[]> = {
  PA: [],
  GA: [
    {
      id: "exam-ga-1",
      name: "桥梁维护专项考试 - 第 1 期",
      schedule: "2025-04-18 09:00",
      participants: 326,
      passRate: 0.0,
      status: "待开考"
    },
    {
      id: "exam-ga-2",
      name: "特种设备上岗证年度复检",
      schedule: "2025-05-06 14:00",
      participants: 188,
      passRate: 0.0,
      status: "报名中"
    }
  ],
  MA: [
    {
      id: "exam-ma-1",
      name: "现场安全作业测验",
      schedule: "2025-04-20 19:00",
      participants: 56,
      passRate: 0.78,
      status: "已结束"
    },
    {
      id: "exam-ma-2",
      name: "桥梁结构巡检实操",
      schedule: "2025-04-25 09:00",
      participants: 24,
      passRate: 0,
      status: "报名中"
    }
  ],
  ST: [
    {
      id: "exam-st-1",
      name: "桥梁维护专项模拟考试",
      schedule: "可随时参加",
      participants: 0,
      passRate: 0.86,
      status: "进行中"
    },
    {
      id: "exam-st-2",
      name: "桥梁维护专项正式考试",
      schedule: "2025-04-18 09:00",
      participants: 0,
      passRate: 0,
      status: "待开考"
    }
  ]
};

export const CertificateSummaries: Record<PersonaKey, CertificateSummary[]> = {
  PA: [
    {
      id: "cert-pa-1",
      title: "平台资源认证",
      issued: 18,
      expiresSoon: 0,
      autoIssueRule: "上线新租户即刻生效"
    }
  ],
  GA: [
    {
      id: "cert-ga-1",
      title: "桥梁维护工程师（乙级）",
      issued: 278,
      expiresSoon: 16,
      autoIssueRule: "完成专项培训+考试得分≥80"
    },
    {
      id: "cert-ga-2",
      title: "道路安全管理员",
      issued: 192,
      expiresSoon: 8,
      autoIssueRule: "计划完成率 100% + 现场考核通过"
    }
  ],
  MA: [
    {
      id: "cert-ma-1",
      title: "项目巡检员（年度合格）",
      issued: 58,
      expiresSoon: 4,
      autoIssueRule: "主管单位复核后自动发放"
    }
  ],
  ST: [
    {
      id: "cert-st-1",
      title: "桥梁维护工程师（乙级）",
      issued: 1,
      expiresSoon: 1,
      autoIssueRule: "证书到期提醒提前 60 天"
    }
  ]
};

export const TimelineEvents: TimelineEvent[] = [
  {
    id: "timeline-1",
    time: "09:30",
    title: "贵州桥梁专项计划审批通过",
    description: "主管单位管理员完成计划审核，已自动推送至 12 家管养单位。",
    persona: ["GA"]
  },
  {
    id: "timeline-2",
    time: "11:00",
    title: "桥梁维护专项课件转码完成",
    description: "平台运营完成新课件审核并发布至课程库。",
    persona: ["PA", "GA"]
  },
  {
    id: "timeline-3",
    time: "14:20",
    title: "工程师学员资料复审通过",
    description: "2 名学员资料复审通过，已自动解锁学习任务。",
    persona: ["GA", "MA"]
  },
  {
    id: "timeline-4",
    time: "16:10",
    title: "桥梁专项考试监考提醒",
    description: "考试会在 48 小时后开始，提醒管养单位完成监考排班安排。",
    persona: ["GA", "MA"]
  }
];

export const UnitHighlightsGA: UnitHighlightGA[] = [
  {
    id: "unit-001",
    name: "浙江高速集团",
    activeUsers: 1632,
    learningSessions: 8421,
    risk: "无",
    reminder: "完成率 78%，建议督促下属单位跟进"
  },
  {
    id: "unit-002",
    name: "贵州省交通运输厅",
    activeUsers: 1184,
    learningSessions: 5360,
    risk: "计划滞后",
    reminder: "桥梁专项计划完成率 64%，需安排督办"
  },
  {
    id: "unit-003",
    name: "宁波公路管理中心",
    activeUsers: 624,
    learningSessions: 2648,
    risk: "资料待审",
    reminder: "新导入 12 名人员待复审"
  }
];

export const ApprovalTasksGA: ApprovalTaskGA[] = [
  {
    id: "task-001",
    title: "新导入人员资质复审",
    detail: "宁波公路管理中心提交 12 名工程师资料",
    deadline: "今日内完成"
  },
  {
    id: "task-002",
    title: "桥梁专项计划审批",
    detail: "浙江高速集团提报《桥梁专项复训（4 月）》",
    deadline: "2 天后超时"
  }
];

export const ExamRemindersGA: ExamReminderGA[] = [
  {
    id: "reminder-001",
    title: "桥梁专项认证（4 月批次）",
    time: "待发布 · 2025-04-16",
    note: "等待确认考试场次与监考安排"
  },
  {
    id: "reminder-002",
    title: "隧道安全演练理论测验",
    time: "待审核 · 2025-04-20",
    note: "需主管单位确认考题及监考人员"
  }
];

export const MADashboardData = {
  planSummary: [
    { id: "summary-confirm", label: "待确认计划", value: 2, trend: "需立即确认" },
    { id: "summary-progress", label: "进行中计划", value: 5, trend: "其中 1 个滞后" },
    { id: "summary-complete", label: "平均完成率", value: "72%", trend: "本周 +8%" },
    { id: "summary-lagging", label: "滞后班组", value: 3, trend: "建议催办" }
  ],
  learningPlans: [
    {
      id: "plan-001",
      name: "2025 桥梁维护专项培训",
      audience: "桥梁工程师 · 86 人",
      period: "2025.02.01 - 2025.09.30",
      progress: 78,
      status: "进行中 · 课程学习阶段",
      nextMilestone: "4 月 12 日阶段考核",
      warning: "2 名工程师未开始学习",
      link: "/ma/plans/detail/plan-001"
    },
    {
      id: "plan-002",
      name: "巡检班组长能力提升计划",
      audience: "巡检班组长 · 42 人",
      period: "2025.03.10 - 2025.08.20",
      progress: 46,
      status: "待执行 · 资料审核阶段",
      nextMilestone: "完成资料补充后确认计划",
      warning: "宁波检测中心 4 人资料待补",
      link: "/ma/plans/detail/plan-002"
    },
    {
      id: "plan-003",
      name: "公路应急保障实操演练",
      audience: "应急保障组 · 28 人",
      period: "2025.04.05 - 2025.06.30",
      progress: 12,
      status: "未开始 · 等待计划确认",
      nextMilestone: "4 月 8 日完成计划确认",
      warning: "3 个班组尚未确认参训人员",
      link: "/ma/plans/detail/plan-003"
    }
  ],
  followUps: {
    pendingConfirm: [
      {
        id: "confirm-001",
        name: "隧道维护专项培训",
        impact: "关联巡检班组 3 个",
        deadline: "今日 18:00",
        link: "/ma/plans"
      }
    ],
    pendingReview: [
      {
        id: "review-001",
        name: "宁波桥梁检测中心",
        count: 4,
        note: "资料缺少职业证书",
        link: "/ma/profile-review"
      }
    ]
  },
  learning: {
    completionRate: 68,
    laggingGroups: [
      {
        id: "lag-001",
        name: "桥梁维护一部",
        issue: "完成率 52%",
        responsible: "组长 孙杰",
        link: "/ma/learning"
      },
      {
        id: "lag-002",
        name: "巡检应急队",
        issue: "学习未开始",
        responsible: "组长 郭晨",
        link: "/ma/learning"
      }
    ],
    actions: [
      { id: "action-001", label: "发送学习提醒", link: "/ma/learning" },
      { id: "action-002", label: "下载落后名单", link: "/ma/learning" }
    ]
  },
  assessments: {
    upcomingExams: [
      {
        id: "exam-001",
        name: "桥梁结构健康监测理论考核",
        time: "2025-04-12 09:00",
        status: "待安排监考",
        link: "/ma/exams"
      },
      {
        id: "exam-002",
        name: "巡检案例分析实作补考",
        time: "2025-04-18 14:00",
        status: "待通知学员",
        link: "/ma/exams"
      }
    ],
    expiringCertificates: [
      {
        id: "cert-001",
        name: "桥梁维护工程师专业证书",
        count: 8,
        deadline: "30 天内",
        link: "/ma/certificates"
      },
      {
        id: "cert-002",
        name: "安全合规培训合格证",
        count: 6,
        deadline: "60 天内",
        link: "/ma/certificates"
      }
    ]
  }
};

