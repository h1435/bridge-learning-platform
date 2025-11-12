export type GAExamStatus = "draft" | "pending" | "scheduled" | "completed" | "archived";

export type GAExamSource = "platform" | "custom";

export type GAExamItem = {
  id: string;
  name: string;
  template: string;
  source: GAExamSource;
  relatedPlan?: string;
  roles: string[];
  schedule: string;
  duration: number;
  passScore: number;
  status: GAExamStatus;
  allowRetake: boolean;
  updatedAt: string;
};

export const GAExamStatusOptions = [
  { value: "all", label: "全部状态" },
  { value: "draft", label: "草稿" },
  { value: "pending", label: "待审批" },
  { value: "scheduled", label: "已排期" },
  { value: "completed", label: "已完成" }
];

export const GAExamSourceOptions = [
  { value: "all", label: "全部来源" },
  { value: "platform", label: "公共考试库" },
  { value: "custom", label: "主管单位自建" }
];

export const GAExamLibrary = {
  publicExams: [
    {
      id: "pub-exam-001",
      name: "桥梁结构健康监测理论考核",
      template: "桥梁结构健康监测理论考核",
      roles: ["桥梁工程师"],
      duration: 90,
      passScore: 80,
      knowledgePoints: ["结构监测基础", "异常分析"]
    },
    {
      id: "pub-exam-002",
      name: "巡检案例分析实作",
      template: "巡检案例分析实作",
      roles: ["巡检班组长"],
      duration: 120,
      passScore: 75,
      knowledgePoints: ["案例分析", "巡检规范"]
    },
    {
      id: "pub-exam-003",
      name: "法规合规专项测验",
      template: "法规合规专项测验",
      roles: ["安全管理员", "质检负责人"],
      duration: 60,
      passScore: 70,
      knowledgePoints: ["法规条款", "应急响应"]
    }
  ],
  tenantExams: <GAExamItem[]>[
    {
      id: "ga-exam-001",
      name: "桥梁结构健康监测理论考核（主管单位版）",
      template: "桥梁结构健康监测理论考核",
      source: "platform",
      relatedPlan: "2025 桥梁维护专项培训",
      roles: ["桥梁工程师"],
      schedule: "2025-05-12 09:00",
      duration: 90,
      passScore: 80,
      status: "scheduled",
      allowRetake: true,
      updatedAt: "2025-04-06T11:20:00Z"
    },
    {
      id: "ga-exam-002",
      name: "巡检案例分析实操测评",
      template: "巡检案例分析实作",
      source: "custom",
      relatedPlan: "巡检班组长能力提升计划",
      roles: ["巡检班组长"],
      schedule: "2025-06-05 13:30",
      duration: 120,
      passScore: 75,
      status: "pending",
      allowRetake: false,
      updatedAt: "2025-04-04T09:10:00Z"
    },
    {
      id: "ga-exam-003",
      name: "桥梁安全法规闭卷考试",
      template: "法规合规专项测验",
      source: "platform",
      relatedPlan: "法规制度年度复训",
      roles: ["安全管理员", "桥梁工程师"],
      schedule: "2025-04-28 14:00",
      duration: 80,
      passScore: 70,
      status: "draft",
      allowRetake: true,
      updatedAt: "2025-04-03T16:25:00Z"
    },
    {
      id: "ga-exam-004",
      name: "设备巡检操作规范测验",
      template: "自建考试模板",
      source: "custom",
      relatedPlan: "数字巡检技能培训",
      roles: ["巡检班组长", "设备管理员"],
      schedule: "2025-04-18 10:00",
      duration: 75,
      passScore: 78,
      status: "completed",
      allowRetake: true,
      updatedAt: "2025-04-01T08:00:00Z"
    }
  ]
};
