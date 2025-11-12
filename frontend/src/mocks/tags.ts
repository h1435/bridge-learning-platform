export type TagStatus = "active" | "inactive" | "archived";

export type TagCategory =
  | "knowledge"
  | "operation"
  | "difficulty"
  | "compliance";

export type TagItem = {
  id: string;
  name: string;
  code: string;
  category: TagCategory;
  scopes: string[];
  roles: string[];
  status: TagStatus;
  usageCount: number;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string;
  color: string;
  associatedCourses: string[];
  associatedQuestions: string[];
  associatedPlans: string[];
};

export const TagMetrics = [
  {
    id: "tags-total",
    label: "标签总量",
    value: "126 个",
    trendLabel: "较上季度",
    trendValue: "+18",
    status: "up" as const
  },
  {
    id: "tags-active",
    label: "活跃标签",
    value: "92 个",
    trendLabel: "近30日使用",
    trendValue: "68",
    status: "stable" as const
  },
  {
    id: "tags-usage",
    label: "累计引用次数",
    value: "3,842 次",
    trendLabel: "环比",
    trendValue: "+12%",
    status: "up" as const
  },
  {
    id: "tags-audit",
    label: "待清理标签",
    value: "11 个",
    trendLabel: "建议归档",
    trendValue: "5",
    status: "down" as const
  }
];

export const TagCategories = [
  { value: "knowledge" as const, label: "知识主题" },
  { value: "operation" as const, label: "运营标签" },
  { value: "difficulty" as const, label: "难度标签" },
  { value: "compliance" as const, label: "合规要求" }
];

export const TagStatuses = [
  { value: "active" as const, label: "启用" },
  { value: "inactive" as const, label: "停用" },
  { value: "archived" as const, label: "已归档" }
];

export const TagScopes = [
  "课程",
  "题库",
  "试卷",
  "培训计划",
  "学习路线",
  "通知公告",
  "证书模板"
] as const;

export const TagColors = [
  { value: "#6366F1", label: "靛蓝" },
  { value: "#0EA5E9", label: "青蓝" },
  { value: "#F59E0B", label: "琥珀" },
  { value: "#10B981", label: "青翠" },
  { value: "#EF4444", label: "绛红" }
];

export const TagManagementMock: TagItem[] = [
  {
    id: "tag-0001",
    name: "桥梁结构安全",
    code: "BRG-SAFETY",
    category: "knowledge",
    scopes: ["课程", "题库", "培训计划", "试卷"],
    roles: ["桥梁工程师", "安全管理员"],
    status: "active",
    usageCount: 842,
    description: "涵盖桥梁结构巡检、病害识别、维护加固等安全类内容，用于安全培训与考核。",
    owner: "平台教研组",
    createdAt: "2023-08-12T09:40:00Z",
    updatedAt: "2024-04-02T12:10:00Z",
    lastUsedAt: "2024-04-18T08:25:00Z",
    color: "#6366F1",
    associatedCourses: ["桥梁结构健康监测指南", "桥梁病害识别案例课"],
    associatedQuestions: ["q-0001", "q-0003", "q-0005"],
    associatedPlans: ["2024 桥梁巡检专项培训", "桥梁安全复训计划"]
  },
  {
    id: "tag-0002",
    name: "应急响应",
    code: "EMERGENCY-OPS",
    category: "operation",
    scopes: ["课程", "题库", "培训计划", "通知公告"],
    roles: ["防汛指挥", "应急值班", "隧道值守"],
    status: "active",
    usageCount: 516,
    description: "用于标识应急响应流程、演练、案例复盘等内容，支持演练复盘和预案培训。",
    owner: "浙江高速集团",
    createdAt: "2023-11-06T10:05:00Z",
    updatedAt: "2024-03-20T15:42:00Z",
    lastUsedAt: "2024-04-15T09:10:00Z",
    color: "#0EA5E9",
    associatedCourses: ["高速公路突发事件应急处置流程", "隧道火灾应急演练指引"],
    associatedQuestions: ["q-0002"],
    associatedPlans: ["2024 汛期联合应急演练"]
  },
  {
    id: "tag-0003",
    name: "高危工种",
    code: "HIGH-RISK-JOB",
    category: "operation",
    scopes: ["课程", "培训计划", "证书模板"],
    roles: ["吊装作业员", "桥面施工班组"],
    status: "inactive",
    usageCount: 184,
    description: "聚焦高危特种作业相关法规、资质要求与操作规程，关联岗前培训与资格复审。",
    owner: "平台运营团队",
    createdAt: "2022-05-18T14:20:00Z",
    updatedAt: "2024-02-11T13:32:00Z",
    lastUsedAt: "2024-02-02T07:55:00Z",
    color: "#F59E0B",
    associatedCourses: ["吊装作业安全规范"],
    associatedQuestions: [],
    associatedPlans: ["2024 特种作业持证复训"]
  },
  {
    id: "tag-0004",
    name: "法规合规",
    code: "COMPLIANCE",
    category: "compliance",
    scopes: ["课程", "题库", "学习路线"],
    roles: ["安全管理员", "项目经理"],
    status: "active",
    usageCount: 302,
    description: "公路桥梁相关法律法规、监管要求与内控制度，覆盖最新规范与案例解读。",
    owner: "交通知识中心",
    createdAt: "2023-01-08T08:30:00Z",
    updatedAt: "2024-03-28T11:24:00Z",
    lastUsedAt: "2024-04-12T16:05:00Z",
    color: "#10B981",
    associatedCourses: ["公路桥梁安全管理办法详解"],
    associatedQuestions: ["q-0004"],
    associatedPlans: ["法规更新与合规培训"]
  },
  {
    id: "tag-0005",
    name: "错题回顾",
    code: "REVIEW-INCORRECT",
    category: "operation",
    scopes: ["题库", "试卷", "学习路线"],
    roles: ["桥梁工程师", "巡检班组长"],
    status: "archived",
    usageCount: 54,
    description: "历史考试错题的整理标签，用于生成后续针对性练习或提醒，目前计划归档。",
    owner: "平台教研组",
    createdAt: "2022-09-15T09:15:00Z",
    updatedAt: "2023-12-20T10:40:00Z",
    lastUsedAt: "2023-10-06T17:20:00Z",
    color: "#EF4444",
    associatedCourses: [],
    associatedQuestions: ["q-0003"],
    associatedPlans: []
  }
];

export const categoryLabel = (value: TagCategory) =>
  TagCategories.find((item) => item.value === value)?.label ?? value;

export const statusLabel = (value: TagStatus) =>
  TagStatuses.find((item) => item.value === value)?.label ?? value;
