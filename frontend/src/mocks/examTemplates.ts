export type ExamTemplateStatus = "draft" | "pending" | "published" | "disabled";
export type ExamTemplateSource = "platform" | "tenant";

export type ExamTemplate = {
  id: string;
  title: string;
  templateCode: string;
  tenantName: string;
  source: ExamTemplateSource;
  tags: string[];
  roles: string[];
  questionCount: number;
  estimatedDuration: number;
  passScore: number;
  status: ExamTemplateStatus;
  associatedPlans: string[];
  associatedCourses: string[];
  updatedAt: string;
  updatedBy: string;
  description: string;
  shuffleOption: "fixed" | "configurable";
  questionBreakdown: Array<{
    knowledgePoint: string;
    questionType: string;
    count: number;
  }>;
  composition: Array<{
    id: string;
    stem: string;
    type: string;
    difficulty: "easy" | "medium" | "hard";
    score: number;
    isMandatory: boolean;
  }>;
  history: Array<{ date: string; action: string; operator: string }>;
};

export const ExamTemplateMetrics = [
  {
    id: "exam-template-total",
    label: "试卷模板总数",
    value: "86 套",
    trendLabel: "较上月",
    trendValue: "+6",
    status: "up" as const
  },
  {
    id: "exam-template-published",
    label: "已发布",
    value: "48 套",
    trendLabel: "可引用",
    trendValue: "平台 28 / 租户 20",
    status: "stable" as const
  },
  {
    id: "exam-template-pending",
    label: "待审核",
    value: "7 套",
    trendLabel: "今日新增",
    trendValue: "2",
    status: "down" as const
  },
  {
    id: "exam-template-linked",
    label: "关联计划",
    value: "124 个",
    trendLabel: "平均引用",
    trendValue: "1.8 / 套",
    status: "up" as const
  }
];

export const ExamTemplateStatuses = [
  { value: "all", label: "全部状态" },
  { value: "draft", label: "草稿" },
  { value: "pending", label: "待审核" },
  { value: "published", label: "已发布" },
  { value: "disabled", label: "已停用" }
] as const;

export const ExamTemplateSources = [
  { value: "all", label: "全部来源" },
  { value: "platform", label: "平台自建" },
  { value: "tenant", label: "租户创建" }
] as const;

export const ExamTemplateRoles = [
  "桥梁工程师",
  "隧道值守",
  "养护班组长",
  "安全管理员",
  "监测人员"
] as const;

export const ExamTemplateMock: ExamTemplate[] = [
  {
    id: "exam-template-001",
    title: "桥梁结构健康监测专项考核",
    templateCode: "EX-BRG-2024-01",
    tenantName: "平台通用",
    source: "platform",
    tags: ["桥梁安全", "智能监测"],
    roles: ["桥梁工程师", "监测人员"],
    questionCount: 45,
    estimatedDuration: 60,
    passScore: 80,
    status: "published",
    associatedPlans: ["2024Q2 桥梁工程师认证计划"],
    associatedCourses: ["桥梁结构健康监测与评估", "桥梁检测机器人巡检操作规程"],
    updatedAt: "2024-04-12T10:12:00Z",
    updatedBy: "平台教研组",
    description:
      "覆盖桥梁监测体系搭建、传感器应用、数据分析与预警策略，适配桥梁工程师上岗认证需求。",
    shuffleOption: "configurable",
    questionBreakdown: [
      { knowledgePoint: "桥梁结构检测", questionType: "单选题", count: 20 },
      { knowledgePoint: "监测数据分析", questionType: "多选题", count: 10 },
      { knowledgePoint: "防汛应急", questionType: "判断题", count: 5 },
      { knowledgePoint: "桥梁结构检测", questionType: "案例题", count: 5 },
      { knowledgePoint: "智能监测", questionType: "简答题", count: 5 }
    ],
    composition: [
      {
        id: "q-0001",
        stem: "在桥梁结构健康监测系统中，光纤光栅传感器的主要作用是什么？",
        type: "单选题",
        difficulty: "medium",
        score: 2,
        isMandatory: true
      },
      {
        id: "q-0005",
        stem: "案例题：某跨江大桥主梁出现异常振动，请分析可能的原因并提出监测与处置方案。",
        type: "案例题",
        difficulty: "hard",
        score: 10,
        isMandatory: true
      }
    ],
    history: [
      { date: "2024-04-12", action: "发布新版本 v2.0", operator: "平台教研组" },
      { date: "2024-03-05", action: "完成审核", operator: "赵强" },
      { date: "2024-02-28", action: "提交审核", operator: "平台教研组" }
    ]
  },
  {
    id: "exam-template-002",
    title: "隧道防火与应急演练考核",
    templateCode: "EX-TUN-2024-03",
    tenantName: "浙江高速集团",
    source: "tenant",
    tags: ["隧道运维", "防汛应急"],
    roles: ["隧道值守", "安全管理员"],
    questionCount: 35,
    estimatedDuration: 45,
    passScore: 75,
    status: "pending",
    associatedPlans: ["2024 浙江高速隧道安全专项培训"],
    associatedCourses: ["公路隧道防火与应急演练"],
    updatedAt: "2024-04-16T15:30:00Z",
    updatedBy: "浙江高速集团",
    description:
      "围绕隧道火灾应急演练流程和关键检查点设计，校验应急组织能力与协同响应效率。",
    shuffleOption: "configurable",
    questionBreakdown: [
      { knowledgePoint: "防汛应急", questionType: "多选题", count: 12 },
      { knowledgePoint: "隧道运维", questionType: "单选题", count: 15 },
      { knowledgePoint: "隧道运维", questionType: "判断题", count: 8 }
    ],
    composition: [
      {
        id: "q-0002",
        stem: "多选题：隧道火灾应急演练时，应重点检查以下哪些要素？",
        type: "多选题",
        difficulty: "medium",
        score: 4,
        isMandatory: false
      }
    ],
    history: [
      { date: "2024-04-16", action: "租户提交审核", operator: "浙江高速集团" }
    ]
  },
  {
    id: "exam-template-003",
    title: "桥梁安全法规与标准考试",
    templateCode: "EX-LAW-2024-02",
    tenantName: "平台通用",
    source: "platform",
    tags: ["法规制度"],
    roles: ["安全管理员"],
    questionCount: 30,
    estimatedDuration: 40,
    passScore: 85,
    status: "draft",
    associatedPlans: [],
    associatedCourses: ["国省干线桥梁安全检查规范解读"],
    updatedAt: "2024-04-08T11:05:00Z",
    updatedBy: "平台教研组",
    description:
      "聚焦最新桥梁安全管理法规条文及执行要求，覆盖检查频次、应急响应、责任体系等内容。",
    shuffleOption: "fixed",
    questionBreakdown: [
      { knowledgePoint: "安全法规", questionType: "单选题", count: 20 },
      { knowledgePoint: "安全法规", questionType: "判断题", count: 10 }
    ],
    composition: [
      {
        id: "q-0004",
        stem: "填空题：根据《公路桥梁安全管理办法》，运营单位应当每隔 ___ 进行一次经专业机构参与的定期检测。",
        type: "填空题",
        difficulty: "medium",
        score: 3,
        isMandatory: true
      }
    ],
    history: [
      { date: "2024-04-08", action: "草稿保存", operator: "平台教研组" }
    ]
  }
];

export const ExamTemplateStatusBadge: Record<ExamTemplateStatus, string> = {
  draft: "badge--info",
  pending: "badge--warning",
  published: "badge--success",
  disabled: "badge--danger"
};

