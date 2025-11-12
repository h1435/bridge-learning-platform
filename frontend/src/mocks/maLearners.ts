export type LearnerPlanStatus = {
  planId: string;
  planName: string;
  stage: string;
  progress: number;
  status: "正常" | "滞后" | "已完成" | "未开始";
  dueInDays?: number;
  nextAction?: string;
};

export type LearnerExamStatus = {
  examId: string;
  examName: string;
  schedule: string;
  status: "待安排" | "待参加" | "已完成" | "缺考";
  score?: number;
  remark?: string;
};

export type LearnerCertificate = {
  id: string;
  name: string;
  status: "有效" | "即将到期" | "已失效";
  expireAt: string;
};

export type LearnerRecord = {
  id: string;
  name: string;
  avatar: string;
  employeeId: string;
  phone: string;
  jobTitle: string;
  level: string;
  department: string;
  team: string;
  projects: string[];
  plans: LearnerPlanStatus[];
  completionRate: number;
  learningHours: number;
  pendingCourses: number;
  certificateStatus: "正常" | "即将到期" | "已过期";
  certificates: LearnerCertificate[];
  exams: LearnerExamStatus[];
  lastActive: string;
  status: "在岗" | "停用";
  reminders: string[];
  tags: string[];
  riskLevel?: "正常" | "提醒" | "严重";
};

export const MALearnerSummary = {
  totalLearners: 186,
  avgCompletion: 0.74,
  pendingPlans: 28,
  expiringCertificates: 14,
  needReminder: 22,
  exceptionalLearners: 9
};

export const MALearnerPlans = [
  {
    id: "plan-bridge-2025",
    name: "2025 桥梁维护专项培训",
    stage: "阶段考核前",
    deadline: "2025-05-30",
    coverage: 86,
    completion: 0.78
  },
  {
    id: "plan-road-2025",
    name: "2025 城市道路焕新计划培训",
    stage: "线下研讨",
    deadline: "2025-06-15",
    coverage: 52,
    completion: 0.64
  },
  {
    id: "plan-emergency-2025",
    name: "应急保障联动演练",
    stage: "名单确认",
    deadline: "2025-04-18",
    coverage: 38,
    completion: 0.28
  },
  {
    id: "plan-safety-2025",
    name: "安全生产专题复训",
    stage: "待开课",
    deadline: "2025-05-08",
    coverage: 42,
    completion: 0.12
  },
  {
    id: "plan-monitor-2024",
    name: "桥梁健康监测平台运维培训",
    stage: "总结回访",
    deadline: "2025-04-30",
    coverage: 24,
    completion: 0.91
  }
];

export const MALearnerExceptions = [
  { id: "lagging", label: "进度滞后" },
  { id: "overdue", label: "已逾期" },
  { id: "exam-missed", label: "考试缺考" },
  { id: "cert-expiring", label: "证书即将到期" },
  { id: "inactive", label: "长时间未登录" }
];

export const MALearnerProjects = [
  { id: "project-highway-bridge", name: "成贵二线桥梁专项" },
  { id: "project-urban-renovation", name: "贵阳城市道路焕新" },
  { id: "project-tunnel-safety", name: "隧道安全复训计划" },
  { id: "project-emergency", name: "应急保障联动演练" },
  { id: "project-bridge-monitor", name: "桥梁健康监测平台" }
];

export const MALearnerRecords: LearnerRecord[] = [
  {
    id: "learner-001",
    name: "李晨",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    employeeId: "MA202501",
    phone: "138-1234-5678",
    jobTitle: "桥梁巡检员",
    level: "P3",
    department: "桥梁维护中心",
    team: "桥梁巡检一部",
    projects: ["project-highway-bridge", "project-bridge-monitor"],
    completionRate: 0.86,
    learningHours: 62,
    pendingCourses: 1,
    certificateStatus: "即将到期",
    certificates: [
      {
        id: "cert-safety-01",
        name: "安全生产管理员证书",
        status: "即将到期",
        expireAt: "2025-06-30"
      },
      {
        id: "cert-bridge-01",
        name: "桥梁维护工程师（乙级）",
        status: "有效",
        expireAt: "2026-08-31"
      }
    ],
    exams: [
      {
        examId: "exam-bridge-01",
        examName: "桥梁专项理论考核",
        schedule: "2025-04-12 09:00",
        status: "待参加",
        remark: "需提前完成阶段作业"
      }
    ],
    lastActive: "2025-04-10 08:32",
    status: "在岗",
    reminders: ["阶段考核提醒（系统）"],
    tags: ["重点跟进", "安全负责人"],
    riskLevel: "提醒",
    plans: [
      {
        planId: "plan-bridge-2025",
        planName: "2025 桥梁维护专项培训",
        stage: "阶段考核前",
        progress: 82,
        status: "正常",
        dueInDays: 18,
        nextAction: "完成案例分析作业"
      },
      {
        planId: "plan-emergency-2025",
        planName: "应急保障联动演练",
        stage: "名单确认",
        progress: 12,
        status: "滞后",
        dueInDays: 6,
        nextAction: "确认参训名单"
      }
    ]
  },
  {
    id: "learner-002",
    name: "王欣",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922566.png",
    employeeId: "MA202512",
    phone: "139-4321-8765",
    jobTitle: "资料管理员",
    level: "P2",
    department: "桥梁维护中心",
    team: "桥梁巡检一部",
    projects: ["project-highway-bridge"],
    completionRate: 0.91,
    learningHours: 58,
    pendingCourses: 0,
    certificateStatus: "正常",
    certificates: [
      {
        id: "cert-archive-01",
        name: "工程档案管理员证书",
        status: "有效",
        expireAt: "2027-02-15"
      }
    ],
    exams: [
      {
        examId: "exam-bridge-01",
        examName: "桥梁专项理论考核",
        schedule: "2025-04-12 09:00",
        status: "待参加"
      }
    ],
    lastActive: "2025-04-09 17:21",
    status: "在岗",
    reminders: [],
    tags: ["资料复审人"],
    plans: [
      {
        planId: "plan-bridge-2025",
        planName: "2025 桥梁维护专项培训",
        stage: "阶段考核前",
        progress: 96,
        status: "正常",
        dueInDays: 18
      }
    ]
  },
  {
    id: "learner-003",
    name: "赵一帆",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    employeeId: "MA202436",
    phone: "137-8888-2345",
    jobTitle: "桥梁巡检员",
    level: "P2",
    department: "桥梁维护中心",
    team: "乌当快速项目组",
    projects: ["project-highway-bridge"],
    completionRate: 0.62,
    learningHours: 34,
    pendingCourses: 3,
    certificateStatus: "即将到期",
    certificates: [
      {
        id: "cert-bridge-02",
        name: "桥梁维护工程师（丙级）",
        status: "即将到期",
        expireAt: "2025-05-12"
      }
    ],
    exams: [
      {
        examId: "exam-bridge-01",
        examName: "桥梁专项理论考核",
        schedule: "2025-04-12 09:00",
        status: "待参加"
      }
    ],
    lastActive: "2025-04-10 07:58",
    status: "在岗",
    reminders: ["证书续期督办（李晨）"],
    tags: ["待督办"],
    riskLevel: "提醒",
    plans: [
      {
        planId: "plan-bridge-2025",
        planName: "2025 桥梁维护专项培训",
        stage: "阶段考核前",
        progress: 58,
        status: "滞后",
        dueInDays: 18,
        nextAction: "补完章节 4-5 学习"
      },
      {
        planId: "plan-emergency-2025",
        planName: "应急保障联动演练",
        stage: "名单确认",
        progress: 0,
        status: "未开始",
        dueInDays: 6
      }
    ]
  },
  {
    id: "learner-004",
    name: "刘娜",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219970.png",
    employeeId: "MA202344",
    phone: "136-5555-7654",
    jobTitle: "结构检测工程师",
    level: "P3",
    department: "检测实验中心",
    team: "结构检测组",
    projects: ["project-bridge-monitor"],
    completionRate: 0.95,
    learningHours: 88,
    pendingCourses: 0,
    certificateStatus: "正常",
    certificates: [
      {
        id: "cert-struct-01",
        name: "结构检测工程师",
        status: "有效",
        expireAt: "2026-11-09"
      },
      {
        id: "cert-nondestructive-01",
        name: "无损检测二级证书",
        status: "有效",
        expireAt: "2027-01-18"
      }
    ],
    exams: [
      {
        examId: "exam-monitor-01",
        examName: "监测平台运维实操",
        schedule: "2025-04-22 14:00",
        status: "待安排",
        remark: "作为导师协助组织"
      }
    ],
    lastActive: "2025-04-09 21:12",
    status: "在岗",
    reminders: [],
    tags: ["导师", "专家库"],
    plans: [
      {
        planId: "plan-monitor-2024",
        planName: "桥梁健康监测平台运维培训",
        stage: "总结回访",
        progress: 100,
        status: "已完成",
        dueInDays: 20
      },
      {
        planId: "plan-mentor-2025",
        planName: "导师带教能力提升",
        stage: "案例分享",
        progress: 63,
        status: "正常",
        dueInDays: 32,
        nextAction: "提交阶段总结"
      }
    ]
  },
  {
    id: "learner-005",
    name: "周凯",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
    employeeId: "MA201942",
    phone: "135-3333-2468",
    jobTitle: "班长",
    level: "P4",
    department: "道路运维中心",
    team: "城市道路巡查组",
    projects: ["project-urban-renovation"],
    completionRate: 0.78,
    learningHours: 54,
    pendingCourses: 2,
    certificateStatus: "正常",
    certificates: [
      {
        id: "cert-road-01",
        name: "道路巡查主管证书",
        status: "有效",
        expireAt: "2026-03-31"
      }
    ],
    exams: [
      {
        examId: "exam-road-01",
        examName: "道路巡查案例研讨",
        schedule: "2025-04-18 14:00",
        status: "待参加"
      }
    ],
    lastActive: "2025-04-10 09:15",
    status: "在岗",
    reminders: ["进度督办（系统）"],
    tags: ["负责人", "重点关注"],
    riskLevel: "提醒",
    plans: [
      {
        planId: "plan-road-2025",
        planName: "2025 城市道路焕新计划培训",
        stage: "线下研讨",
        progress: 74,
        status: "正常",
        dueInDays: 32,
        nextAction: "组织线下研讨"
      }
    ]
  },
  {
    id: "learner-006",
    name: "郭晨",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219978.png",
    employeeId: "MA202078",
    phone: "136-2222-9876",
    jobTitle: "应急队长",
    level: "P3",
    department: "道路运维中心",
    team: "应急保障队",
    projects: ["project-emergency"],
    completionRate: 0.41,
    learningHours: 18,
    pendingCourses: 4,
    certificateStatus: "即将到期",
    certificates: [
      {
        id: "cert-em-01",
        name: "应急指挥资格证",
        status: "即将到期",
        expireAt: "2025-07-15"
      }
    ],
    exams: [
      {
        examId: "exam-emergency-01",
        examName: "应急联动模拟演练",
        schedule: "2025-04-28 09:00",
        status: "待安排",
        remark: "需确认演练场地"
      }
    ],
    lastActive: "2025-04-10 10:05",
    status: "在岗",
    reminders: ["未确认参训人员（系统）"],
    tags: ["督办对象"],
    riskLevel: "严重",
    plans: [
      {
        planId: "plan-emergency-2025",
        planName: "应急保障联动演练",
        stage: "名单确认",
        progress: 28,
        status: "滞后",
        dueInDays: 6,
        nextAction: "确认参训名单"
      },
      {
        planId: "plan-safety-2025",
        planName: "安全生产专题复训",
        stage: "待开课",
        progress: 0,
        status: "未开始",
        dueInDays: 28
      }
    ]
  },
  {
    id: "learner-007",
    name: "宋倩",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    employeeId: "MA202211",
    phone: "138-7654-1234",
    jobTitle: "材料检测工程师",
    level: "P2",
    department: "检测实验中心",
    team: "材料检测组",
    projects: ["project-bridge-monitor"],
    completionRate: 0.88,
    learningHours: 72,
    pendingCourses: 1,
    certificateStatus: "正常",
    certificates: [
      {
        id: "cert-material-01",
        name: "材料检测工程师",
        status: "有效",
        expireAt: "2026-04-22"
      }
    ],
    exams: [
      {
        examId: "exam-monitor-01",
        examName: "监测平台运维实操",
        schedule: "2025-04-22 14:00",
        status: "待安排"
      }
    ],
    lastActive: "2025-04-08 13:40",
    status: "在岗",
    reminders: [],
    tags: ["后备讲师"],
    plans: [
      {
        planId: "plan-monitor-2024",
        planName: "桥梁健康监测平台运维培训",
        stage: "总结回访",
        progress: 88,
        status: "正常",
        dueInDays: 20,
        nextAction: "准备案例分享"
      }
    ]
  },
  {
    id: "learner-008",
    name: "唐跃",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219961.png",
    employeeId: "MA201822",
    phone: "139-2345-6781",
    jobTitle: "班长",
    level: "P3",
    department: "道路运维中心",
    team: "国省干线值守组",
    projects: ["project-urban-renovation", "project-emergency"],
    completionRate: 0.64,
    learningHours: 46,
    pendingCourses: 2,
    certificateStatus: "正常",
    certificates: [
      {
        id: "cert-road-02",
        name: "道路养护工程师",
        status: "有效",
        expireAt: "2025-12-31"
      }
    ],
    exams: [
      {
        examId: "exam-road-01",
        examName: "道路巡查案例研讨",
        schedule: "2025-04-18 14:00",
        status: "待参加"
      }
    ],
    lastActive: "2025-04-10 09:50",
    status: "在岗",
    reminders: ["研讨材料未提交"],
    tags: ["需跟进"],
    plans: [
      {
        planId: "plan-road-2025",
        planName: "2025 城市道路焕新计划培训",
        stage: "线下研讨",
        progress: 61,
        status: "滞后",
        dueInDays: 32,
        nextAction: "提交研讨材料"
      }
    ]
  },
  {
    id: "learner-009",
    name: "钟瑜",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    employeeId: "MA202145",
    phone: "137-3456-7890",
    jobTitle: "数据分析师",
    level: "P2",
    department: "检测实验中心",
    team: "监测数据分析组",
    projects: ["project-bridge-monitor"],
    completionRate: 0.93,
    learningHours: 76,
    pendingCourses: 0,
    certificateStatus: "正常",
    certificates: [
      {
        id: "cert-data-01",
        name: "数据分析高级证书",
        status: "有效",
        expireAt: "2026-09-18"
      }
    ],
    exams: [
      {
        examId: "exam-monitor-01",
        examName: "监测平台运维实操",
        schedule: "2025-04-22 14:00",
        status: "待安排"
      }
    ],
    lastActive: "2025-04-09 19:46",
    status: "在岗",
    reminders: [],
    tags: ["数据专家"],
    plans: [
      {
        planId: "plan-monitor-2024",
        planName: "桥梁健康监测平台运维培训",
        stage: "总结回访",
        progress: 100,
        status: "已完成"
      }
    ]
  },
  {
    id: "learner-010",
    name: "陈思远",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219945.png",
    employeeId: "MA202004",
    phone: "135-5678-9123",
    jobTitle: "安全监督员",
    level: "P2",
    department: "桥梁维护中心",
    team: "桥梁巡检二部",
    projects: ["project-tunnel-safety"],
    completionRate: 0.37,
    learningHours: 12,
    pendingCourses: 5,
    certificateStatus: "已过期",
    certificates: [
      {
        id: "cert-safety-02",
        name: "安全监督员证书",
        status: "已失效",
        expireAt: "2024-12-31"
      }
    ],
    exams: [
      {
        examId: "exam-safety-01",
        examName: "安全生产法规测验",
        schedule: "2025-04-06 10:00",
        status: "缺考",
        remark: "未请假且未参加"
      }
    ],
    lastActive: "2024-12-18 10:00",
    status: "停用",
    reminders: ["离岗手续未完成"],
    tags: ["离岗办理"],
    riskLevel: "严重",
    plans: [
      {
        planId: "plan-safety-2025",
        planName: "安全生产专题复训",
        stage: "待开课",
        progress: 0,
        status: "未开始",
        dueInDays: 28
      }
    ]
  }
];


