export type QuestionType = "single" | "multiple" | "judge" | "fill" | "essay" | "case";
export type QuestionStatus = "draft" | "pending" | "published" | "disabled";
export type QuestionSource = "platform" | "tenant" | "external";
export type QuestionReviewStatus = "pending" | "approved" | "rejected";

export type QuestionItem = {
  id: string;
  code: string;
  stem: string;
  type: QuestionType;
  difficulty: "easy" | "medium" | "hard";
  knowledgePoints: string[];
  tags: string[];
  roles: string[];
  source: QuestionSource;
  status: QuestionStatus;
  reviewStatus: QuestionReviewStatus;
  referenceExam?: string;
  usageCount: number;
  updatedAt: string;
  owner: string;
  analysis: string;
  answer: string;
  options?: Array<{ key: string; label: string }>;
  history: Array<{ date: string; action: string; operator: string }>;
};

export const QuestionMetrics = [
  {
    id: "question-total",
    label: "题库总量",
    value: "4,362 道",
    trendLabel: "较上月",
    trendValue: "+128",
    status: "up" as const
  },
  {
    id: "question-new",
    label: "近30日新增",
    value: "286 道",
    trendLabel: "租户贡献",
    trendValue: "102",
    status: "up" as const
  },
  {
    id: "question-pending",
    label: "待审核",
    value: "37 道",
    trendLabel: "今日新增",
    trendValue: "5",
    status: "down" as const
  },
  {
    id: "question-risk",
    label: "异常题目",
    value: "12 道",
    trendLabel: "高错题率",
    trendValue: "8",
    status: "down" as const
  }
];

export const QuestionTypes = [
  { value: "all", label: "全部题型" },
  { value: "single", label: "单选题" },
  { value: "multiple", label: "多选题" },
  { value: "judge", label: "判断题" },
  { value: "fill", label: "填空题" },
  { value: "essay", label: "简答题" },
  { value: "case", label: "案例题" }
] as const;

export const QuestionDifficulties = [
  { value: "all", label: "全部难度" },
  { value: "easy", label: "简单" },
  { value: "medium", label: "中等" },
  { value: "hard", label: "困难" }
] as const;

export const QuestionSources = [
  { value: "all", label: "全部来源" },
  { value: "platform", label: "平台自建" },
  { value: "tenant", label: "租户贡献" },
  { value: "external", label: "第三方导入" }
] as const;

export const KnowledgePoints = [
  "桥梁结构检测",
  "日常巡检",
  "安全法规",
  "施工安全",
  "监测数据分析",
  "防汛应急"
] as const;

export const QuestionBankMock: QuestionItem[] = [
  {
    id: "q-0001",
    code: "BRG-SIG-202404-001",
    stem: "在桥梁结构健康监测系统中，光纤光栅传感器的主要作用是什么？",
    type: "single",
    difficulty: "medium",
    knowledgePoints: ["桥梁结构检测", "监测数据分析"],
    tags: ["桥梁安全", "智能监测"],
    roles: ["桥梁工程师"],
    source: "platform",
    status: "published",
    reviewStatus: "approved",
    referenceExam: "2024Q1 桥梁工程师认证考试",
    usageCount: 182,
    updatedAt: "2024-04-18T10:32:00Z",
    owner: "平台教研组",
    answer: "C",
    options: [
      { key: "A", label: "采集温度变化数据" },
      { key: "B", label: "监测桥面交通流量" },
      { key: "C", label: "感知结构应变与位移变化" },
      { key: "D", label: "记录环境风速风向" }
    ],
    analysis:
      "光纤光栅传感器具有抗电磁干扰、灵敏度高等特点，常用于结构应变、位移监测，是桥梁健康监测系统中的核心传感器。",
    history: [
      { date: "2024-04-18", action: "更新解析内容", operator: "平台教研组" },
      { date: "2023-12-02", action: "完成审核", operator: "王敏" }
    ]
  },
  {
    id: "q-0002",
    code: "TUN-EMG-202403-021",
    stem: "多选题：隧道火灾应急演练时，应重点检查以下哪些要素？",
    type: "multiple",
    difficulty: "medium",
    knowledgePoints: ["防汛应急"],
    tags: ["隧道运维", "防汛应急"],
    roles: ["安全员", "隧道值守"],
    source: "tenant",
    status: "pending",
    reviewStatus: "pending",
    usageCount: 14,
    updatedAt: "2024-04-16T15:12:00Z",
    owner: "浙江高速集团",
    answer: "ABCD",
    options: [
      { key: "A", label: "人员疏散指引与广播系统" },
      { key: "B", label: "消防水源及灭火器材" },
      { key: "C", label: "应急照明与供电切换" },
      { key: "D", label: "现场通信与指挥联动" }
    ],
    analysis:
      "演练应综合检验指挥联动、物资保障、通信保障及疏散流程，确保应急预案在真实场景下可执行。",
    history: [
      { date: "2024-04-16", action: "租户提交审核", operator: "浙江高速集团" }
    ]
  },
  {
    id: "q-0003",
    code: "MNT-OPS-202402-008",
    stem: "判断题：缆索桥缆夹锈蚀属于巡检的低优先级问题，可在年度大修时统一处理。",
    type: "judge",
    difficulty: "easy",
    knowledgePoints: ["日常巡检"],
    tags: ["桥梁安全"],
    roles: ["巡检班组长"],
    source: "platform",
    status: "published",
    reviewStatus: "approved",
    usageCount: 248,
    updatedAt: "2024-03-10T08:22:00Z",
    owner: "平台教研组",
    answer: "错误",
    analysis:
      "缆夹锈蚀属于结构安全隐患，应优先排查处理，不应延后至年度大修；应及时采取除锈与防护措施。",
    history: [
      { date: "2024-03-10", action: "补充解析", operator: "平台教研组" },
      { date: "2023-10-18", action: "完成审核", operator: "李工" }
    ]
  },
  {
    id: "q-0004",
    code: "LAW-SAFE-202401-015",
    stem: "填空题：根据《公路桥梁安全管理办法》，运营单位应当每隔 ___ 进行一次经专业机构参与的定期检测。",
    type: "fill",
    difficulty: "medium",
    knowledgePoints: ["安全法规"],
    tags: ["法规制度"],
    roles: ["安全管理人员"],
    source: "external",
    status: "published",
    reviewStatus: "approved",
    usageCount: 63,
    updatedAt: "2024-02-05T16:40:00Z",
    owner: "交通运输部知识中心",
    answer: "三年",
    analysis:
      "法规要求运营单位至少每三年组织一次专业机构参与的定期检测，以确保桥梁整体结构安全。",
    history: [
      { date: "2024-02-05", action: "导入题库并审核通过", operator: "王敏" }
    ]
  },
  {
    id: "q-0005",
    code: "BRG-CASE-202402-003",
    stem: "案例题：某跨江大桥主梁出现异常振动，请分析可能的原因并提出监测与处置方案。",
    type: "case",
    difficulty: "hard",
    knowledgePoints: ["监测数据分析", "桥梁结构检测"],
    tags: ["桥梁安全", "智能监测"],
    roles: ["桥梁工程师"],
    source: "platform",
    status: "draft",
    reviewStatus: "pending",
    usageCount: 6,
    updatedAt: "2024-04-08T11:05:00Z",
    owner: "平台教研组",
    answer:
      "可能原因包括风致振动、车辆荷载异常或结构损伤。应部署临时传感器监测振动加速度、风速、车辆荷载，结合有限元分析评估结构状态，并制定限速、加固或交通分流方案。",
    analysis:
      "应综合考虑环境荷载、结构状态与运营状况，先控制风险再展开详细检测。",
    history: [
      { date: "2024-04-08", action: "提交审核", operator: "平台教研组" }
    ]
  }
];

export const QuestionStatusBadge: Record<QuestionStatus, string> = {
  draft: "badge--info",
  pending: "badge--warning",
  published: "badge--success",
  disabled: "badge--danger"
};

