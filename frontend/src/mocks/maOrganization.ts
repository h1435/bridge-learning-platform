export type OrganizationNode = {
  id: string;
  name: string;
  code?: string;
  type: "department" | "team" | "group";
  leader?: string;
  leaderTitle?: string;
  memberCount: number;
  completionRate: number;
  pendingDocs: number;
  children?: OrganizationNode[];
};

export type ProjectTag = {
  id: string;
  name: string;
  code: string;
  owner: string;
  ownerTitle?: string;
  status: "进行中" | "立项中" | "已完成";
  members: number;
  progress: number;
  startDate: string;
  endDate?: string;
  riskLevel?: "正常" | "提醒" | "严重";
  focus?: string;
};

export type MemberProfile = {
  id: string;
  name: string;
  avatar: string;
  employeeId: string;
  jobTitle: string;
  level: string;
  phone: string;
  email: string;
  gender: "男" | "女";
  age: number;
  status: "在岗" | "停用";
  joinDate: string;
  lastLogin: string;
  departmentId: string;
  departmentName: string;
  teamId: string;
  teamName: string;
  roleInTeam?: string;
  projects: string[];
  certificateStatus: "正常" | "即将到期" | "已过期";
  completionRate: number;
  pendingPlans: number;
  tags: string[];
  certificates: Array<{
    id: string;
    name: string;
    status: "有效" | "即将到期" | "已失效";
    expireAt: string;
  }>;
  plans: Array<{
    id: string;
    name: string;
    status: "进行中" | "未开始" | "已完成";
    progress: number;
    nextAction?: string;
  }>;
  approvals: Array<{
    id: string;
    type: string;
    result: "通过" | "驳回" | "待提交";
    time: string;
    remark?: string;
  }>;
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    updatedAt: string;
  }>;
};

export const MAOrganizationSummary = {
  totalStaff: 186,
  activeStaff: 172,
  inactiveStaff: 14,
  groupCount: 18,
  projectCount: 9,
  newJoiners30d: 12
};

export const MAOrganizationTree: OrganizationNode[] = [
  {
    id: "dept-bridge",
    name: "桥梁维护中心",
    code: "MA-BRD",
    type: "department",
    leader: "徐建国",
    leaderTitle: "中心主任",
    memberCount: 64,
    completionRate: 0.82,
    pendingDocs: 3,
    children: [
      {
        id: "team-bridge-a",
        name: "桥梁巡检一部",
        type: "team",
        leader: "孙杰",
        leaderTitle: "班长",
        memberCount: 21,
        completionRate: 0.76,
        pendingDocs: 1,
        children: [
          {
            id: "group-bridge-a1",
            name: "乌当快速项目组",
            type: "group",
            leader: "陈亮",
            leaderTitle: "组长",
            memberCount: 9,
            completionRate: 0.72,
            pendingDocs: 1
          },
          {
            id: "group-bridge-a2",
            name: "南明高架项目组",
            type: "group",
            leader: "李华",
            leaderTitle: "组长",
            memberCount: 12,
            completionRate: 0.79,
            pendingDocs: 0
          }
        ]
      },
      {
        id: "team-bridge-b",
        name: "桥梁巡检二部",
        type: "team",
        leader: "黄琳",
        leaderTitle: "班长",
        memberCount: 18,
        completionRate: 0.68,
        pendingDocs: 2
      },
      {
        id: "team-bridge-maintenance",
        name: "桥梁结构加固组",
        type: "team",
        leader: "吴涛",
        leaderTitle: "项目经理",
        memberCount: 12,
        completionRate: 0.84,
        pendingDocs: 0
      }
    ]
  },
  {
    id: "dept-road",
    name: "道路运维中心",
    code: "MA-RDW",
    type: "department",
    leader: "刘芳",
    leaderTitle: "中心主任",
    memberCount: 52,
    completionRate: 0.74,
    pendingDocs: 4,
    children: [
      {
        id: "team-road-a",
        name: "城市道路巡查组",
        type: "team",
        leader: "周凯",
        leaderTitle: "班长",
        memberCount: 20,
        completionRate: 0.71,
        pendingDocs: 1
      },
      {
        id: "team-road-b",
        name: "国省干线值守组",
        type: "team",
        leader: "唐跃",
        leaderTitle: "班长",
        memberCount: 16,
        completionRate: 0.69,
        pendingDocs: 2
      },
      {
        id: "team-road-emergency",
        name: "应急保障队",
        type: "team",
        leader: "郭晨",
        leaderTitle: "队长",
        memberCount: 10,
        completionRate: 0.54,
        pendingDocs: 1
      }
    ]
  },
  {
    id: "dept-lab",
    name: "检测实验中心",
    code: "MA-LAB",
    type: "department",
    leader: "韩莉",
    leaderTitle: "中心主任",
    memberCount: 34,
    completionRate: 0.81,
    pendingDocs: 0,
    children: [
      {
        id: "team-lab-structure",
        name: "结构检测组",
        type: "team",
        leader: "闫博",
        leaderTitle: "项目经理",
        memberCount: 14,
        completionRate: 0.86,
        pendingDocs: 0
      },
      {
        id: "team-lab-material",
        name: "材料检测组",
        type: "team",
        leader: "宋倩",
        leaderTitle: "项目经理",
        memberCount: 11,
        completionRate: 0.77,
        pendingDocs: 0
      },
      {
        id: "team-lab-monitor",
        name: "监测数据分析组",
        type: "team",
        leader: "邓毅",
        leaderTitle: "高级工程师",
        memberCount: 9,
        completionRate: 0.83,
        pendingDocs: 0
      }
    ]
  }
];

export const MAProjectTags: ProjectTag[] = [
  {
    id: "project-highway-bridge",
    name: "成贵二线桥梁专项",
    code: "PRJ-BR-2025-01",
    owner: "吴涛",
    ownerTitle: "项目经理",
    status: "进行中",
    members: 38,
    progress: 68,
    startDate: "2025-02-20",
    riskLevel: "提醒",
    focus: "桥梁监测数据待汇总"
  },
  {
    id: "project-urban-renovation",
    name: "贵阳城市道路焕新",
    code: "PRJ-RD-2025-02",
    owner: "刘芳",
    ownerTitle: "中心主任",
    status: "进行中",
    members: 42,
    progress: 54,
    startDate: "2025-01-10",
    riskLevel: "正常",
    focus: "春季专项巡检"
  },
  {
    id: "project-tunnel-safety",
    name: "隧道安全复训计划",
    code: "PRJ-TL-2025-05",
    owner: "黄琳",
    ownerTitle: "班长",
    status: "立项中",
    members: 18,
    progress: 24,
    startDate: "2025-03-15",
    riskLevel: "提醒",
    focus: "等待资料审核"
  },
  {
    id: "project-emergency",
    name: "应急保障联动演练",
    code: "PRJ-EM-2025-03",
    owner: "郭晨",
    ownerTitle: "队长",
    status: "进行中",
    members: 26,
    progress: 12,
    startDate: "2025-04-01",
    riskLevel: "严重",
    focus: "部分人员未确认训练计划"
  },
  {
    id: "project-bridge-monitor",
    name: "桥梁健康监测平台",
    code: "PRJ-BM-2024-12",
    owner: "邓毅",
    ownerTitle: "高级工程师",
    status: "进行中",
    members: 16,
    progress: 81,
    startDate: "2024-12-05",
    riskLevel: "正常",
    focus: "上线前的数据校验"
  }
];

export const MAProjectTagFilters = [
  { id: "project-highway-bridge", label: "桥梁专项" },
  { id: "project-urban-renovation", label: "城市道路" },
  { id: "project-tunnel-safety", label: "隧道安全" },
  { id: "project-emergency", label: "应急演练" },
  { id: "project-bridge-monitor", label: "监测平台" }
];

export const MAJobRoles = ["桥梁巡检员", "结构检测工程师", "资料管理员", "安全监督员", "应急队员", "项目经理"];

export const MACertificateStatusOptions = ["正常", "即将到期", "已过期"] as const;

export const MAOrganizationMembers: MemberProfile[] = [
  {
    id: "staff-001",
    name: "李晨",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    employeeId: "MA202501",
    jobTitle: "桥梁巡检员",
    level: "P3",
    phone: "138-1234-5678",
    email: "lichen@ma-group.com",
    gender: "男",
    age: 32,
    status: "在岗",
    joinDate: "2021-08-16",
    lastLogin: "2025-04-10 08:32",
    departmentId: "dept-bridge",
    departmentName: "桥梁维护中心",
    teamId: "team-bridge-a",
    teamName: "桥梁巡检一部",
    roleInTeam: "副班长",
    projects: ["project-highway-bridge", "project-bridge-monitor"],
    certificateStatus: "正常",
    completionRate: 86,
    pendingPlans: 1,
    tags: ["安全负责人", "重点跟进"],
    certificates: [
      {
        id: "cert-bridge-01",
        name: "桥梁维护工程师（乙级）",
        status: "有效",
        expireAt: "2026-08-31"
      },
      {
        id: "cert-safety-01",
        name: "安全生产管理员证书",
        status: "即将到期",
        expireAt: "2025-06-30"
      }
    ],
    plans: [
      {
        id: "plan-bridge-2025",
        name: "2025 桥梁维护专项培训",
        status: "进行中",
        progress: 82,
        nextAction: "4 月 12 日阶段考核"
      },
      {
        id: "plan-emergency-2025",
        name: "应急保障联动演练",
        status: "未开始",
        progress: 0,
        nextAction: "确认参训名单"
      }
    ],
    approvals: [
      {
        id: "approval-001",
        type: "资料复审",
        result: "通过",
        time: "2024-11-22 14:10"
      },
      {
        id: "approval-002",
        type: "证书续期申请",
        result: "待提交",
        time: "2025-03-06 09:24",
        remark: "需上传安全生产证书扫描件"
      }
    ],
    attachments: [
      {
        id: "file-001",
        name: "身份证扫描件",
        type: "证件",
        updatedAt: "2024-04-08"
      },
      {
        id: "file-002",
        name: "桥梁巡检现场记录样例",
        type: "证明材料",
        updatedAt: "2024-12-02"
      }
    ]
  },
  {
    id: "staff-002",
    name: "王欣",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922566.png",
    employeeId: "MA202512",
    jobTitle: "资料管理员",
    level: "P2",
    phone: "139-4321-8765",
    email: "wangxin@ma-group.com",
    gender: "女",
    age: 28,
    status: "在岗",
    joinDate: "2022-05-21",
    lastLogin: "2025-04-09 17:21",
    departmentId: "dept-bridge",
    departmentName: "桥梁维护中心",
    teamId: "team-bridge-a",
    teamName: "桥梁巡检一部",
    projects: ["project-highway-bridge"],
    certificateStatus: "正常",
    completionRate: 91,
    pendingPlans: 0,
    tags: ["资料复审人"],
    certificates: [
      {
        id: "cert-archive-01",
        name: "工程档案管理员证书",
        status: "有效",
        expireAt: "2027-02-15"
      }
    ],
    plans: [
      {
        id: "plan-bridge-2025",
        name: "2025 桥梁维护专项培训",
        status: "进行中",
        progress: 96
      }
    ],
    approvals: [
      {
        id: "approval-003",
        type: "资料初审",
        result: "通过",
        time: "2025-02-12 09:30"
      }
    ],
    attachments: [
      {
        id: "file-101",
        name: "个人简历",
        type: "证明材料",
        updatedAt: "2024-05-09"
      }
    ]
  },
  {
    id: "staff-003",
    name: "赵一帆",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    employeeId: "MA202436",
    jobTitle: "桥梁巡检员",
    level: "P2",
    phone: "137-8888-2345",
    email: "zhaoyifan@ma-group.com",
    gender: "男",
    age: 30,
    status: "在岗",
    joinDate: "2020-04-15",
    lastLogin: "2025-04-10 07:58",
    departmentId: "dept-bridge",
    departmentName: "桥梁维护中心",
    teamId: "group-bridge-a1",
    teamName: "乌当快速项目组",
    projects: ["project-highway-bridge"],
    certificateStatus: "即将到期",
    completionRate: 62,
    pendingPlans: 2,
    tags: ["待督办"],
    certificates: [
      {
        id: "cert-bridge-02",
        name: "桥梁维护工程师（丙级）",
        status: "即将到期",
        expireAt: "2025-05-12"
      }
    ],
    plans: [
      {
        id: "plan-bridge-2025",
        name: "2025 桥梁维护专项培训",
        status: "进行中",
        progress: 58,
        nextAction: "完成章节 4 学习"
      },
      {
        id: "plan-emergency-2025",
        name: "应急保障联动演练",
        status: "未开始",
        progress: 0
      }
    ],
    approvals: [
      {
        id: "approval-004",
        type: "证书续期申请",
        result: "驳回",
        time: "2025-03-28 16:18",
        remark: "缺少现场考核记录"
      }
    ],
    attachments: [
      {
        id: "file-201",
        name: "现场巡检记录（3 月）",
        type: "工作记录",
        updatedAt: "2025-03-05"
      }
    ]
  },
  {
    id: "staff-004",
    name: "刘娜",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219970.png",
    employeeId: "MA202344",
    jobTitle: "结构检测工程师",
    level: "P3",
    phone: "136-5555-7654",
    email: "liuna@ma-group.com",
    gender: "女",
    age: 35,
    status: "在岗",
    joinDate: "2019-07-19",
    lastLogin: "2025-04-09 21:12",
    departmentId: "dept-lab",
    departmentName: "检测实验中心",
    teamId: "team-lab-structure",
    teamName: "结构检测组",
    projects: ["project-bridge-monitor"],
    certificateStatus: "正常",
    completionRate: 95,
    pendingPlans: 0,
    tags: ["专家库", "导师"],
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
    plans: [
      {
        id: "plan-monitor-2024",
        name: "桥梁健康监测平台运维培训",
        status: "已完成",
        progress: 100
      },
      {
        id: "plan-mentor-2025",
        name: "导师带教能力提升",
        status: "进行中",
        progress: 63,
        nextAction: "提交阶段总结"
      }
    ],
    approvals: [
      {
        id: "approval-005",
        type: "导师资格申请",
        result: "通过",
        time: "2024-12-06 10:45"
      }
    ],
    attachments: [
      {
        id: "file-301",
        name: "检测成果汇编",
        type: "工作成果",
        updatedAt: "2024-09-01"
      }
    ]
  },
  {
    id: "staff-005",
    name: "周凯",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
    employeeId: "MA201942",
    jobTitle: "班长",
    level: "P4",
    phone: "135-3333-2468",
    email: "zhoukai@ma-group.com",
    gender: "男",
    age: 38,
    status: "在岗",
    joinDate: "2016-03-10",
    lastLogin: "2025-04-10 09:15",
    departmentId: "dept-road",
    departmentName: "道路运维中心",
    teamId: "team-road-a",
    teamName: "城市道路巡查组",
    roleInTeam: "班长",
    projects: ["project-urban-renovation"],
    certificateStatus: "正常",
    completionRate: 78,
    pendingPlans: 1,
    tags: ["负责人", "重点关注"],
    certificates: [
      {
        id: "cert-road-01",
        name: "道路巡查主管证书",
        status: "有效",
        expireAt: "2026-03-31"
      }
    ],
    plans: [
      {
        id: "plan-road-2025",
        name: "2025 城市道路焕新计划培训",
        status: "进行中",
        progress: 74,
        nextAction: "4 月 18 日线上研讨"
      }
    ],
    approvals: [
      {
        id: "approval-006",
        type: "资料复审",
        result: "通过",
        time: "2025-01-18 15:02"
      }
    ],
    attachments: [
      {
        id: "file-401",
        name: "道路巡查排班计划",
        type: "计划",
        updatedAt: "2025-03-25"
      }
    ]
  },
  {
    id: "staff-006",
    name: "郭晨",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219978.png",
    employeeId: "MA202078",
    jobTitle: "应急队长",
    level: "P3",
    phone: "136-2222-9876",
    email: "guochen@ma-group.com",
    gender: "男",
    age: 33,
    status: "在岗",
    joinDate: "2018-11-05",
    lastLogin: "2025-04-10 10:05",
    departmentId: "dept-road",
    departmentName: "道路运维中心",
    teamId: "team-road-emergency",
    teamName: "应急保障队",
    roleInTeam: "队长",
    projects: ["project-emergency"],
    certificateStatus: "即将到期",
    completionRate: 41,
    pendingPlans: 3,
    tags: ["督办对象"],
    certificates: [
      {
        id: "cert-em-01",
        name: "应急指挥资格证",
        status: "即将到期",
        expireAt: "2025-07-15"
      }
    ],
    plans: [
      {
        id: "plan-emergency-2025",
        name: "应急保障联动演练",
        status: "进行中",
        progress: 28,
        nextAction: "确认参训人员清单"
      },
      {
        id: "plan-safety-2025",
        name: "安全生产专题复训",
        status: "未开始",
        progress: 0
      }
    ],
    approvals: [
      {
        id: "approval-007",
        type: "资料初审",
        result: "驳回",
        time: "2025-03-02 18:22",
        remark: "应急演练方案缺少签字"
      }
    ],
    attachments: [
      {
        id: "file-501",
        name: "应急演练预案（草案）",
        type: "规划",
        updatedAt: "2025-03-01"
      }
    ]
  },
  {
    id: "staff-007",
    name: "宋倩",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    employeeId: "MA202211",
    jobTitle: "材料检测工程师",
    level: "P2",
    phone: "138-7654-1234",
    email: "songqian@ma-group.com",
    gender: "女",
    age: 29,
    status: "在岗",
    joinDate: "2022-03-11",
    lastLogin: "2025-04-08 13:40",
    departmentId: "dept-lab",
    departmentName: "检测实验中心",
    teamId: "team-lab-material",
    teamName: "材料检测组",
    projects: ["project-bridge-monitor"],
    certificateStatus: "正常",
    completionRate: 88,
    pendingPlans: 0,
    tags: ["后备讲师"],
    certificates: [
      {
        id: "cert-material-01",
        name: "材料检测工程师",
        status: "有效",
        expireAt: "2026-04-22"
      }
    ],
    plans: [
      {
        id: "plan-monitor-2024",
        name: "桥梁健康监测平台运维培训",
        status: "进行中",
        progress: 88,
        nextAction: "准备案例分享"
      }
    ],
    approvals: [
      {
        id: "approval-008",
        type: "讲师资格申请",
        result: "通过",
        time: "2025-01-05 10:12"
      }
    ],
    attachments: [
      {
        id: "file-601",
        name: "材料检测报告模板",
        type: "模板",
        updatedAt: "2025-02-26"
      }
    ]
  },
  {
    id: "staff-008",
    name: "唐跃",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219961.png",
    employeeId: "MA201822",
    jobTitle: "班长",
    level: "P3",
    phone: "139-2345-6781",
    email: "tangyue@ma-group.com",
    gender: "男",
    age: 36,
    status: "在岗",
    joinDate: "2015-09-22",
    lastLogin: "2025-04-10 09:50",
    departmentId: "dept-road",
    departmentName: "道路运维中心",
    teamId: "team-road-b",
    teamName: "国省干线值守组",
    roleInTeam: "班长",
    projects: ["project-urban-renovation", "project-emergency"],
    certificateStatus: "正常",
    completionRate: 64,
    pendingPlans: 1,
    tags: ["需跟进"],
    certificates: [
      {
        id: "cert-road-02",
        name: "道路养护工程师",
        status: "有效",
        expireAt: "2025-12-31"
      }
    ],
    plans: [
      {
        id: "plan-road-2025",
        name: "2025 城市道路焕新计划培训",
        status: "进行中",
        progress: 61,
        nextAction: "完成线下巡检实训"
      }
    ],
    approvals: [
      {
        id: "approval-009",
        type: "资料复审",
        result: "通过",
        time: "2025-02-18 11:31"
      }
    ],
    attachments: [
      {
        id: "file-701",
        name: "道路巡查异常清单",
        type: "工作记录",
        updatedAt: "2025-03-18"
      }
    ]
  },
  {
    id: "staff-009",
    name: "钟瑜",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    employeeId: "MA202145",
    jobTitle: "数据分析师",
    level: "P2",
    phone: "137-3456-7890",
    email: "zhongyu@ma-group.com",
    gender: "女",
    age: 27,
    status: "在岗",
    joinDate: "2021-09-09",
    lastLogin: "2025-04-09 19:46",
    departmentId: "dept-lab",
    departmentName: "检测实验中心",
    teamId: "team-lab-monitor",
    teamName: "监测数据分析组",
    projects: ["project-bridge-monitor"],
    certificateStatus: "正常",
    completionRate: 93,
    pendingPlans: 0,
    tags: ["数据专家"],
    certificates: [
      {
        id: "cert-data-01",
        name: "数据分析高级证书",
        status: "有效",
        expireAt: "2026-09-18"
      }
    ],
    plans: [
      {
        id: "plan-monitor-2024",
        name: "桥梁健康监测平台运维培训",
        status: "已完成",
        progress: 100
      }
    ],
    approvals: [
      {
        id: "approval-010",
        type: "导师带教申请",
        result: "通过",
        time: "2025-01-28 15:18"
      }
    ],
    attachments: [
      {
        id: "file-801",
        name: "数据分析报告（桥梁健康）",
        type: "工作成果",
        updatedAt: "2025-02-12"
      }
    ]
  },
  {
    id: "staff-010",
    name: "陈思远",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219945.png",
    employeeId: "MA202004",
    jobTitle: "安全监督员",
    level: "P2",
    phone: "135-5678-9123",
    email: "chensiyuan@ma-group.com",
    gender: "男",
    age: 31,
    status: "停用",
    joinDate: "2019-05-20",
    lastLogin: "2024-12-18 10:00",
    departmentId: "dept-bridge",
    departmentName: "桥梁维护中心",
    teamId: "team-bridge-b",
    teamName: "桥梁巡检二部",
    projects: ["project-tunnel-safety"],
    certificateStatus: "已过期",
    completionRate: 37,
    pendingPlans: 2,
    tags: ["离岗办理中"],
    certificates: [
      {
        id: "cert-safety-02",
        name: "安全监督员证书",
        status: "已失效",
        expireAt: "2024-12-31"
      }
    ],
    plans: [
      {
        id: "plan-safety-2025",
        name: "安全生产专题复训",
        status: "未开始",
        progress: 0
      }
    ],
    approvals: [
      {
        id: "approval-011",
        type: "离岗手续",
        result: "待提交",
        time: "2025-04-02 09:12"
      }
    ],
    attachments: [
      {
        id: "file-901",
        name: "离岗申请表",
        type: "流程文件",
        updatedAt: "2025-04-02"
      }
    ]
  }
];


