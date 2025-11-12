export type GAPlanStatus = "draft" | "pending" | "approving" | "active" | "completed" | "archived";

export const GAPlanStatusOptions = [
  { value: "all", label: "全部状态" },
  { value: "draft", label: "草稿" },
  { value: "pending", label: "待审批" },
  { value: "approving", label: "审批中" },
  { value: "active", label: "进行中" },
  { value: "completed", label: "已完成" },
  { value: "archived", label: "已归档" }
];

export const GAPlanTypes = [
  { value: "all", label: "全部类型" },
  { value: "onboard", label: "岗前培训" },
  { value: "promotion", label: "晋升培训" },
  { value: "annual", label: "年度复训" },
  { value: "special", label: "专项培训" }
];

export type GAPlanItem = {
  id: string;
  code: string;
  name: string;
  type: string;
  period: string;
  targetRoles: string[];
  targetUnits: number;
  targetPeople: number;
  status: GAPlanStatus;
  progress: number;
  examCount: number;
  certificatePolicy: string;
  owner: string;
  updatedAt: string;
  nextDeadline: string;
  reminder?: string;
};

export const GAPlansMock: GAPlanItem[] = [
  {
    id: "ga-plan-2025-01",
    code: "PLAN-BRG-2025-001",
    name: "2025 桥梁维护专项培训",
    type: "special",
    period: "2025-03-01 ~ 2025-06-30",
    targetRoles: ["桥梁工程师", "巡检班组长"],
    targetUnits: 8,
    targetPeople: 326,
    status: "active",
    progress: 0.62,
    examCount: 2,
    certificatePolicy: "完成课程+考试≥80 分自动签发",
    owner: "陈晓晨",
    updatedAt: "2025-04-06T11:20:00Z",
    nextDeadline: "距阶段考核 5 天",
    reminder: "宁波公路管理中心完成率 45%，需督办"
  },
  {
    id: "ga-plan-2025-02",
    code: "PLAN-SAF-2025-002",
    name: "隧道安全应急演练复训",
    type: "annual",
    period: "2025-04-10 ~ 2025-05-31",
    targetRoles: ["防汛指挥", "应急值班"],
    targetUnits: 5,
    targetPeople: 188,
    status: "pending",
    progress: 0.0,
    examCount: 1,
    certificatePolicy: "主管单位审批通过后签发电子证书",
    owner: "李娜",
    updatedAt: "2025-04-04T09:12:00Z",
    nextDeadline: "审批超时 2 天",
    reminder: "等待主管单位副主任审批"
  },
  {
    id: "ga-plan-2024-12",
    code: "PLAN-ONB-2024-012",
    name: "新人岗前培训（2024 Q4 扩班）",
    type: "onboard",
    period: "2024-12-01 ~ 2025-01-15",
    targetRoles: ["桥梁巡检员"],
    targetUnits: 6,
    targetPeople: 142,
    status: "completed",
    progress: 1,
    examCount: 1,
    certificatePolicy: "考试合格后签发岗位上岗证",
    owner: "王强",
    updatedAt: "2025-01-18T17:30:00Z",
    nextDeadline: "",
    reminder: "证书已全部签发，待归档"
  },
  {
    id: "ga-plan-2025-05",
    code: "PLAN-PRO-2025-005",
    name: "项目经理能力晋升班",
    type: "promotion",
    period: "2025-05-01 ~ 2025-09-30",
    targetRoles: ["项目经理", "安全管理员"],
    targetUnits: 10,
    targetPeople: 210,
    status: "approving",
    progress: 0,
    examCount: 2,
    certificatePolicy: "完成考核后由主管单位审核签发",
    owner: "陈晓晨",
    updatedAt: "2025-04-05T13:45:00Z",
    nextDeadline: "流程节点：评审委员会审批",
    reminder: "审批通过后需同步证书模板"
  },
  {
    id: "ga-plan-2024-08",
    code: "PLAN-ANN-2024-008",
    name: "年度法规复训（2024）",
    type: "annual",
    period: "2024-08-01 ~ 2024-11-30",
    targetRoles: ["安全管理员", "项目经理"],
    targetUnits: 12,
    targetPeople: 368,
    status: "archived",
    progress: 1,
    examCount: 1,
    certificatePolicy: "复训完成自动延长证书有效期 12 个月",
    owner: "平台法务中心",
    updatedAt: "2024-12-05T10:22:00Z",
    nextDeadline: "",
    reminder: "归档后可复制为 2025 年度计划"
  }
];
