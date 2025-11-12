export type MAPlanItem = {
  id: string;
  name: string;
  code: string;
  source: "主管单位下发" | "公共计划" | "自建计划";
  priority: "高" | "中" | "常规";
  status: "待确认" | "执行中" | "滞后" | "已完成" | "已终止";
  stage: "待确认" | "课程学习" | "考试阶段" | "证书统计" | "总结报告";
  startDate: string;
  endDate: string;
  pushDate: string;
  owner: {
    organization: string;
    contact: string;
    phone: string;
  };
  coverage: {
    groups: number;
    projects: number;
    targetLearners: number;
    confirmedLearners: number;
    finishedLearners: number;
  };
  progress: number;
  alerts: string[];
  updatedAt: string;
};

export type MAPlanSummary = {
  total: number;
  toConfirm: number;
  inProgress: number;
  delayed: number;
};

export type MADetailPlan = {
  id: string;
  name: string;
  code: string;
  description: string;
  source: string;
  priority: "高" | "中" | "常规";
  status: "待确认" | "执行中" | "滞后" | "已完成" | "已终止";
  stage: string;
  startDate: string;
  endDate: string;
  pushDate: string;
  owner: {
    organization: string;
    contact: string;
    phone: string;
  };
  summary: {
    overallProgress: number;
    learnerCompletion: number;
    examCompletion: number;
    certificateReady: number;
  };
  timeline: Array<{
    id: string;
    title: string;
    status: "已完成" | "进行中" | "待开始" | "滞后";
    start: string;
    end: string;
    owner: string;
    remark?: string;
  }>;
  coverageByGroup: Array<{
    id: string;
    name: string;
    leader: string;
    target: number;
    finished: number;
    completionRate: number;
    laggingLearners: number;
    reminder?: string;
  }>;
  courses: Array<{
    id: string;
    name: string;
    type: "线上课件" | "直播培训" | "线下研讨";
    duration: string;
    completionRate: number;
    pendingLearners: number;
    nextAction?: string;
  }>;
  exams: Array<{
    id: string;
    name: string;
    schedule: string;
    status: "待发布" | "报名中" | "待参加" | "进行中" | "已结束";
    participants: number;
    attended: number;
    passRate: number;
    remark?: string;
  }>;
  certificateStats: {
    templateName: string;
    strategy: string;
    issued: number;
    pending: number;
    expiringSoon: number;
  };
  reminders: Array<{
    id: string;
    time: string;
    title: string;
    content: string;
    owner: string;
    status: "已处理" | "待处理";
  }>;
  attachments: Array<{
    id: string;
    name: string;
    type: "计划文件" | "签到" | "总结" | "图片";
    updatedAt: string;
  }>;
};

export const MAPlansSummary: MAPlanSummary = {
  total: 18,
  toConfirm: 2,
  inProgress: 11,
  delayed: 3
};

export const MAPlansList: MAPlanItem[] = [
  {
    id: "plan-bridge-2025",
    name: "2025 桥梁维护专项培训",
    code: "GA-PLAN-2025-01",
    source: "主管单位下发",
    priority: "高",
    status: "执行中",
    stage: "考试阶段",
    startDate: "2025-02-15",
    endDate: "2025-09-30",
    pushDate: "2025-02-01",
    owner: {
      organization: "省交通运输主管单位",
      contact: "陈博",
      phone: "138-8888-2101"
    },
    coverage: {
      groups: 8,
      projects: 3,
      targetLearners: 86,
      confirmedLearners: 81,
      finishedLearners: 48
    },
    progress: 0.71,
    alerts: ["考试安排未确认监考人员", "乌当快速项目组完成率 52%"],
    updatedAt: "2025-04-10 09:20"
  },
  {
    id: "plan-road-2025",
    name: "2025 城市道路焕新计划培训",
    code: "GA-PLAN-2025-03",
    source: "主管单位下发",
    priority: "中",
    status: "执行中",
    stage: "课程学习",
    startDate: "2025-03-01",
    endDate: "2025-07-15",
    pushDate: "2025-02-22",
    owner: {
      organization: "省交通运输主管单位",
      contact: "刘芳",
      phone: "139-8899-3321"
    },
    coverage: {
      groups: 5,
      projects: 2,
      targetLearners: 68,
      confirmedLearners: 60,
      finishedLearners: 34
    },
    progress: 0.52,
    alerts: ["城市道路巡查组未提交阶段研讨材料"],
    updatedAt: "2025-04-09 16:42"
  },
  {
    id: "plan-emergency-2025",
    name: "应急保障联动演练",
    code: "GA-PLAN-2025-06",
    source: "主管单位下发",
    priority: "高",
    status: "滞后",
    stage: "待确认",
    startDate: "2025-04-08",
    endDate: "2025-06-01",
    pushDate: "2025-03-28",
    owner: {
      organization: "省交通运输主管单位",
      contact: "胡云",
      phone: "137-7788-4502"
    },
    coverage: {
      groups: 4,
      projects: 1,
      targetLearners: 42,
      confirmedLearners: 18,
      finishedLearners: 5
    },
    progress: 0.18,
    alerts: ["计划尚未确认", "应急保障队未确认参训名单"],
    updatedAt: "2025-04-10 11:05"
  },
  {
    id: "plan-safety-2025",
    name: "安全生产专题复训",
    code: "MA-PLAN-2025-02",
    source: "自建计划",
    priority: "常规",
    status: "待确认",
    stage: "待确认",
    startDate: "2025-04-12",
    endDate: "2025-08-30",
    pushDate: "2025-04-05",
    owner: {
      organization: "贵阳养护单位",
      contact: "周凯",
      phone: "135-3333-2468"
    },
    coverage: {
      groups: 6,
      projects: 2,
      targetLearners: 72,
      confirmedLearners: 0,
      finishedLearners: 0
    },
    progress: 0,
    alerts: ["待确认计划，计划将于 2 天后过期"],
    updatedAt: "2025-04-10 08:40"
  },
  {
    id: "plan-monitor-2024",
    name: "桥梁健康监测平台运维培训",
    code: "GA-PLAN-2024-08",
    source: "主管单位下发",
    priority: "中",
    status: "已完成",
    stage: "总结报告",
    startDate: "2024-11-01",
    endDate: "2025-03-31",
    pushDate: "2024-10-20",
    owner: {
      organization: "省交通运输主管单位",
      contact: "韩莉",
      phone: "136-9988-8876"
    },
    coverage: {
      groups: 3,
      projects: 1,
      targetLearners: 24,
      confirmedLearners: 24,
      finishedLearners: 24
    },
    progress: 1,
    alerts: ["总结报告待审核"],
    updatedAt: "2025-04-08 15:30"
  }
];

export const MAPlanDetailMock: Record<string, MADetailPlan> = {
  "plan-bridge-2025": {
    id: "plan-bridge-2025",
    name: "2025 桥梁维护专项培训",
    code: "GA-PLAN-2025-01",
    description: "针对桥梁巡检与维护人员的年度专项培训，覆盖理论课程、现场案例和考试评估。",
    source: "主管单位下发",
    priority: "高",
    status: "执行中",
    stage: "考试阶段",
    startDate: "2025-02-15",
    endDate: "2025-09-30",
    pushDate: "2025-02-01",
    owner: {
      organization: "省交通运输主管单位",
      contact: "陈博",
      phone: "138-8888-2101"
    },
    summary: {
      overallProgress: 0.71,
      learnerCompletion: 0.68,
      examCompletion: 0.24,
      certificateReady: 0.18
    },
    timeline: [
      {
        id: "step-confirm",
        title: "计划确认",
        status: "已完成",
        start: "2025-02-03",
        end: "2025-02-05",
        owner: "李晨",
        remark: "按时确认并补充执行班组信息。"
      },
      {
        id: "step-course",
        title: "课程学习阶段",
        status: "进行中",
        start: "2025-02-06",
        end: "2025-04-25",
        owner: "王欣",
        remark: "课程共 12 门，需在 4 月底完成。"
      },
      {
        id: "step-exam",
        title: "在线考试阶段",
        status: "进行中",
        start: "2025-04-10",
        end: "2025-05-10",
        owner: "孙杰",
        remark: "第一场考试已发布，待催促未确认人员。"
      },
      {
        id: "step-certificate",
        title: "证书统计",
        status: "待开始",
        start: "2025-05-15",
        end: "2025-06-05",
        owner: "王欣"
      },
      {
        id: "step-summary",
        title: "总结报告",
        status: "待开始",
        start: "2025-06-06",
        end: "2025-06-20",
        owner: "李晨"
      }
    ],
    coverageByGroup: [
      {
        id: "team-bridge-a",
        name: "桥梁巡检一部",
        leader: "孙杰",
        target: 21,
        finished: 14,
        completionRate: 0.76,
        laggingLearners: 3,
        reminder: "阶段作业提交率 62%，需督办。"
      },
      {
        id: "team-bridge-b",
        name: "桥梁巡检二部",
        leader: "黄琳",
        target: 18,
        finished: 9,
        completionRate: 0.62,
        laggingLearners: 5,
        reminder: "2 人未开始在线课程。"
      },
      {
        id: "group-bridge-a1",
        name: "乌当快速项目组",
        leader: "陈亮",
        target: 9,
        finished: 5,
        completionRate: 0.52,
        laggingLearners: 3,
        reminder: "完成率低于平均值，需要重点跟进。"
      }
    ],
    courses: [
      {
        id: "course-bridge-01",
        name: "桥梁结构基础与病害识别",
        type: "线上课件",
        duration: "2.5 h",
        completionRate: 0.84,
        pendingLearners: 6
      },
      {
        id: "course-bridge-02",
        name: "桥梁巡检现场安全",
        type: "线上课件",
        duration: "1.5 h",
        completionRate: 0.69,
        pendingLearners: 12,
        nextAction: "安排 4 月 15 日线上问答。"
      },
      {
        id: "course-bridge-03",
        name: "桥梁维护案例分享（直播回放）",
        type: "直播培训",
        duration: "2 h",
        completionRate: 0.58,
        pendingLearners: 18,
        nextAction: "直播回放 4 月 16 日下线，请督促学员及时观看。"
      }
    ],
    exams: [
      {
        id: "exam-bridge-01",
        name: "桥梁维护专项理论考核",
        schedule: "2025-04-18 09:00（线上考试）",
        status: "报名中",
        participants: 86,
        attended: 0,
        passRate: 0,
        remark: "需在 4 月 15 日前完成监考规则确认。"
      },
      {
        id: "exam-bridge-02",
        name: "案例分析补考",
        schedule: "2025-04-28 14:00（线上考核）",
        status: "待发布",
        participants: 24,
        attended: 0,
        passRate: 0
      }
    ],
    certificateStats: {
      templateName: "桥梁维护工程师（乙级）证书",
      strategy: "系统根据学员完成率与考试成绩自动统计发证名单，提交主管单位审批。",
      issued: 0,
      pending: 48,
      expiringSoon: 12
    },
    reminders: [
      {
        id: "reminder-001",
        time: "2025-04-08 10:20",
        title: "督办：确认考试名单",
        content: "请在 4 月 10 日前完成考试名单确认工作。",
        owner: "主管单位",
        status: "待处理"
      },
      {
        id: "reminder-002",
        time: "2025-04-05 17:45",
        title: "系统提醒：阶段考核即将开始",
        content: "线上考试将于 4 月 18 日举行，请督促未完成课程的学员尽快补课。",
        owner: "系统",
        status: "已处理"
      }
    ],
    attachments: [
      {
        id: "file-bridge-001",
        name: "计划执行方案（单位版）.docx",
        type: "计划文件",
        updatedAt: "2025-02-04"
      },
      {
        id: "file-bridge-002",
        name: "阶段学习情况统计表.xlsx",
        type: "计划文件",
        updatedAt: "2025-04-06"
      },
      {
        id: "file-bridge-003",
        name: "考试动员会议笔记.pdf",
        type: "总结",
        updatedAt: "2025-04-09"
      }
    ]
  }
};


