export type StudentSummaryCard = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export type StudentAction = {
  id: string;
  type: "course" | "exam" | "task";
  title: string;
  due: string;
  duration?: string;
  link: string;
  status: "待开始" | "进行中" | "即将开始";
};

export type StudentPlan = {
  id: string;
  name: string;
  progress: number;
  remainDays: number;
  nextStep: string;
  stage: string;
};

export type StudentCourse = {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: "初级" | "进阶" | "高级";
  rating: number;
  learners: number;
};

export type StudentAchievement = {
  id: string;
  label: string;
  value: string;
  icon: string;
  description: string;
};

export type StudentTask = {
  id: string;
  title: string;
  type: "课程" | "考试" | "作业" | "资料";
  source: "指派" | "自选";
  progress: number;
  deadline: string;
  status: "待开始" | "进行中" | "已完成" | "逾期";
  estimated: string;
  link: string;
};

export type StudentExam = {
  id: string;
  name: string;
  schedule: string;
  duration: string;
  status: "待参加" | "报名中" | "待发布" | "已结束";
  note?: string;
};

export type StudentExamHistory = {
  id: string;
  name: string;
  score: number;
  passed: boolean;
  time: string;
  certificate?: string;
};

export type StudentCertificate = {
  id: string;
  name: string;
  status: "有效" | "即将到期" | "已过期";
  obtainedAt: string;
  expireAt: string;
  plan: string;
};

export const StudentSummaryCards: StudentSummaryCard[] = [
  { id: "hours", label: "累计学时", value: "126 h", hint: "本月新增 14 h" },
  { id: "streak", label: "连续学习", value: "8 天", hint: "距离上次中断还有 4 天" },
  { id: "certificates", label: "证书数量", value: "4 张", hint: "即将到期 1 张" },
  { id: "plans", label: "参与计划", value: "3 个", hint: "正在执行 2 个" }
];

export const StudentNextActions: StudentAction[] = [
  {
    id: "action-course-01",
    type: "course",
    title: "桥梁结构基础与病害识别（第 3 章）",
    due: "今天 23:59 截止",
    duration: "预计 40 分钟",
    link: "/student/tasks?task=course-01",
    status: "进行中"
  },
  {
    id: "action-exam-01",
    type: "exam",
    title: "桥梁维护专项理论考核",
    due: "4 月 18 日 09:00 开考",
    duration: "90 分钟",
    link: "/student/exams?id=exam-bridge-01",
    status: "即将开始"
  },
  {
    id: "action-task-01",
    type: "task",
    title: "提交应急演练方案心得",
    due: "4 月 12 日 截止",
    duration: "预计 20 分钟",
    link: "/student/tasks?task=task-03",
    status: "待开始"
  },
  {
    id: "action-course-03",
    type: "course",
    title: "AI 在桥梁监测中的应用（回放）",
    due: "明天 23:00 截止",
    duration: "预计 35 分钟",
    link: "/student/tasks?task=course-03",
    status: "进行中"
  },
  {
    id: "action-task-02",
    type: "task",
    title: "数字化巡检工具实操练习",
    due: "4 月 15 日 截止",
    duration: "预计 25 分钟",
    link: "/student/tasks?task=task-05",
    status: "待开始"
  }
];

export const StudentActivePlans: StudentPlan[] = [
  {
    id: "plan-bridge-2025",
    name: "2025 桥梁维护专项培训",
    progress: 0.68,
    remainDays: 18,
    nextStep: "完成案例分析课程并准备线上考试",
    stage: "考试阶段"
  },
  {
    id: "plan-mentor-2025",
    name: "导师带教能力提升",
    progress: 0.45,
    remainDays: 32,
    nextStep: "提交案例分享材料",
    stage: "课程学习"
  },
  {
    id: "plan-emergency-2025",
    name: "应急保障联动演练",
    progress: 0.12,
    remainDays: 24,
    nextStep: "确认参训名单并预习应急指挥课程",
    stage: "待确认"
  },
  {
    id: "plan-digital-2025",
    name: "数字化巡检能力认证",
    progress: 0.32,
    remainDays: 40,
    nextStep: "完成 AI 辅助巡检模块并提交练习",
    stage: "课程学习"
  }
];

export const StudentRecommendedCourses: StudentCourse[] = [
  {
    id: "course-bridge-advanced",
    title: "桥梁结构安全评估进阶",
    category: "桥梁",
    duration: "2.5h",
    difficulty: "进阶",
    rating: 4.8,
    learners: 642
  },
  {
    id: "course-ai-monitor",
    title: "AI 在桥梁健康监测中的应用",
    category: "数字化",
    duration: "1.8h",
    difficulty: "高级",
    rating: 4.9,
    learners: 485
  },
  {
    id: "course-safety-ops",
    title: "应急指挥与现场协同",
    category: "安全",
    duration: "2.0h",
    difficulty: "进阶",
    rating: 4.7,
    learners: 523
  },
  {
    id: "course-data-visual",
    title: "监测数据可视化实战",
    category: "数字化",
    duration: "1.6h",
    difficulty: "初级",
    rating: 4.6,
    learners: 368
  },
  {
    id: "course-team-lead",
    title: "班组长沟通与辅导技巧",
    category: "通用能力",
    duration: "1.4h",
    difficulty: "初级",
    rating: 4.8,
    learners: 712
  },
  {
    id: "course-cross-learning",
    title: "隧道结构健康监测入门",
    category: "跨专业",
    duration: "1.9h",
    difficulty: "初级",
    rating: 4.5,
    learners: 298
  }
];

export const StudentAchievements: StudentAchievement[] = [
  {
    id: "achievement-1",
    label: "月度学习之星",
    value: "3 次",
    icon: "⭐️",
    description: "连续完成主管单位下发的培训计划，获得表彰。"
  },
  {
    id: "achievement-2",
    label: "桥梁维护证书",
    value: "乙级",
    icon: "🏅",
    description: "桥梁维护专项培训考试成绩 92 分，通过认证。"
  },
  {
    id: "achievement-3",
    label: "技能标签",
    value: "3 项",
    icon: "🎯",
    description: "桥梁巡检、应急指挥、数字化监测技能已认证。"
  }
];

export const StudentTasks: StudentTask[] = [
  {
    id: "task-course-01",
    title: "桥梁结构基础与病害识别（第 3 章）",
    type: "课程",
    source: "指派",
    progress: 0.5,
    deadline: "2025-04-11",
    status: "进行中",
    estimated: "40 分钟",
    link: "/student/tasks?task=course-01"
  },
  {
    id: "task-course-02",
    title: "桥梁巡检现场安全演练（直播回放）",
    type: "课程",
    source: "指派",
    progress: 0.0,
    deadline: "2025-04-17",
    status: "待开始",
    estimated: "60 分钟",
    link: "/student/tasks?task=course-02"
  },
  {
    id: "task-exam-01",
    title: "桥梁维护专项理论考核",
    type: "考试",
    source: "指派",
    progress: 0,
    deadline: "2025-04-18",
    status: "待开始",
    estimated: "90 分钟",
    link: "/student/exams?id=exam-bridge-01"
  },
  {
    id: "task-assignment-01",
    title: "应急演练方案心得提交",
    type: "作业",
    source: "指派",
    progress: 0.2,
    deadline: "2025-04-12",
    status: "进行中",
    estimated: "20 分钟",
    link: "/student/tasks?task=assignment-01"
  },
  {
    id: "task-course-03",
    title: "AI 在桥梁监测中的应用",
    type: "课程",
    source: "自选",
    progress: 0.7,
    deadline: "不限",
    status: "进行中",
    estimated: "1.5 小时",
    link: "/student/courses?id=course-ai-monitor"
  },
  {
    id: "task-course-04",
    title: "应急指挥与现场协同",
    type: "课程",
    source: "自选",
    progress: 1,
    deadline: "2025-03-28",
    status: "已完成",
    estimated: "2 小时",
    link: "/student/courses?id=course-safety-ops"
  }
];

export const StudentExamUpcoming: StudentExam[] = [
  {
    id: "exam-bridge-01",
    name: "桥梁维护专项理论考核",
    schedule: "2025-04-18 09:00（线上）",
    duration: "90 分钟",
    status: "报名中",
    note: "请提前完成阶段课程并进行网络检查。"
  },
  {
    id: "exam-bridge-02",
    name: "桥梁案例分析补考",
    schedule: "2025-04-28 14:00（线上）",
    duration: "60 分钟",
    status: "待发布",
    note: "针对未通过的学员开放。"
  },
  {
    id: "exam-safety-01",
    name: "安全生产法规测验",
    schedule: "随时可参加（线上）",
    duration: "45 分钟",
    status: "待参加",
    note: "建议在安全复训计划开始前完成。"
  }
];

export const StudentExamHistory: StudentExamHistory[] = [
  {
    id: "history-bridge-2024-01",
    name: "桥梁维护专项理论考核（2024）",
    score: 92,
    passed: true,
    time: "2024-09-16",
    certificate: "桥梁维护工程师（乙级）"
  },
  {
    id: "history-road-2024-02",
    name: "道路巡查案例研讨测验",
    score: 86,
    passed: true,
    time: "2024-11-02"
  },
  {
    id: "history-emergency-2023-01",
    name: "应急指挥协调测试",
    score: 74,
    passed: false,
    time: "2023-12-18"
  }
];

export const StudentCertificates: StudentCertificate[] = [
  {
    id: "cert-bridge-01",
    name: "桥梁维护工程师（乙级）",
    status: "有效",
    obtainedAt: "2024-09-20",
    expireAt: "2026-09-20",
    plan: "桥梁维护专项培训"
  },
  {
    id: "cert-safety-01",
    name: "安全生产管理员证书",
    status: "即将到期",
    obtainedAt: "2023-07-18",
    expireAt: "2025-07-18",
    plan: "安全生产专题复训"
  },
  {
    id: "cert-road-01",
    name: "道路巡查能力证书",
    status: "有效",
    obtainedAt: "2024-04-10",
    expireAt: "2026-04-10",
    plan: "道路焕新计划"
  },
  {
    id: "cert-emergency-01",
    name: "应急指挥资格证",
    status: "已过期",
    obtainedAt: "2021-05-30",
    expireAt: "2024-05-30",
    plan: "应急保障演练"
  }
];

export type StudentQualification = {
  id: string;
  name: string;
  level: string;
  licenseNo: string;
  obtainedAt: string;
  expireAt: string;
  status: "有效" | "即将到期" | "已过期" | "待审核" | "已驳回";
  issuer: string;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    uploadedAt: string;
  }>;
  remark?: string;
};

export type StudentCareerRecord = {
  id: string;
  period: string;
  organization: string;
  role: string;
  description?: string;
};

export type StudentAttachment = {
  id: string;
  name: string;
  type: "资质材料" | "项目成果" | "总结报告" | "其他";
  updatedAt: string;
  url: string;
};

export const StudentProfile = {
  name: "李晨",
  avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  employeeId: "MA202501",
  role: "桥梁巡检员",
  level: "P3",
  department: "桥梁维护中心",
  team: "桥梁巡检一部",
  projects: ["成贵二线桥梁专项", "桥梁健康监测平台"],
  skills: ["桥梁巡检", "应急指挥", "数字化监测"],
  contact: {
    phone: "138-1234-5678",
    email: "lichen@ma-group.com",
    wechat: "LC_bridge"
  },
  reminders: {
    email: true,
    sms: true,
    app: true,
    dailyTime: "20:00"
  },
  goals: [
    "通过桥梁维护高级证书考试",
    "掌握 AI 辅助巡检分析工具",
    "本季度累计学时达到 40 小时"
  ]
};

export const StudentQualifications: StudentQualification[] = [
  {
    id: "qual-bridge-01",
    name: "桥梁维护工程师",
    level: "乙级",
    licenseNo: "BR-2024-068",
    obtainedAt: "2024-09-20",
    expireAt: "2026-09-20",
    status: "有效",
    issuer: "省交通运输主管单位",
    attachments: [
      {
        id: "file-qual-001",
        name: "桥梁维护工程师证书.jpg",
        url: "/files/qual-bridge-01.jpg",
        uploadedAt: "2024-09-21"
      }
    ],
    remark: "需每两年参加复训并通过考核。"
  },
  {
    id: "qual-safety-01",
    name: "安全生产管理员证书",
    level: "专业级",
    licenseNo: "SAF-2018-332",
    obtainedAt: "2023-07-18",
    expireAt: "2025-07-18",
    status: "即将到期",
    issuer: "省应急管理厅",
    attachments: [
      {
        id: "file-qual-002",
        name: "安全生产管理员证书.pdf",
        url: "/files/qual-safety-01.pdf",
        uploadedAt: "2023-07-20"
      }
    ]
  },
  {
    id: "qual-em-01",
    name: "应急指挥资格证",
    level: "专项",
    licenseNo: "EM-2019-112",
    obtainedAt: "2019-06-02",
    expireAt: "2022-06-02",
    status: "已过期",
    issuer: "城市管理局",
    attachments: [],
    remark: "计划 2025 年补训后重新申请。"
  },
  {
    id: "qual-ai-01",
    name: "数字化监测数据分析师",
    level: "进阶",
    licenseNo: "AI-2025-045",
    obtainedAt: "-",
    expireAt: "-",
    status: "待审核",
    issuer: "平台 AI 实验室",
    attachments: [
      {
        id: "file-qual-003",
        name: "报名资料.zip",
        url: "/files/qual-ai-01.zip",
        uploadedAt: "2025-04-08"
      }
    ],
    remark: "等待平台审核，预计 3 个工作日内完成。"
  }
];

export const StudentCareerTimeline: StudentCareerRecord[] = [
  {
    id: "career-2025",
    period: "2024.10 - 至今",
    organization: "桥梁维护中心 · 桥梁巡检一部",
    role: "副班长 / 指导员",
    description: "负责桥梁巡检方案制定与新人带教，推进数字化巡检工具落地。"
  },
  {
    id: "career-2023",
    period: "2022.05 - 2024.09",
    organization: "桥梁维护中心 · 桥梁巡检二部",
    role: "桥梁巡检员",
    description: "负责日常巡检、病害采集与应急处置，参与应急保障演练。"
  },
  {
    id: "career-2021",
    period: "2019.07 - 2022.04",
    organization: "市桥梁检测中心",
    role: "检测工程师",
    description: "负责桥梁结构检测与数据分析，完成多项专题检测项目。"
  }
];

export const StudentAttachments: StudentAttachment[] = [
  {
    id: "attachment-01",
    name: "桥梁巡检案例汇编.pdf",
    type: "项目成果",
    updatedAt: "2025-03-18",
    url: "/files/attachment-bridge-case.pdf"
  },
  {
    id: "attachment-02",
    name: "应急演练总结报告.docx",
    type: "总结报告",
    updatedAt: "2025-02-06",
    url: "/files/attachment-emergency-report.docx"
  },
  {
    id: "attachment-03",
    name: "桥梁巡检员岗位证明.jpg",
    type: "资质材料",
    updatedAt: "2024-11-12",
    url: "/files/attachment-position-proof.jpg"
  }
];



