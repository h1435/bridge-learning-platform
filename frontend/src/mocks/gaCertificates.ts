export type GACertificateStatus = "draft" | "pending" | "active" | "disabled";

export type GACertificateTemplate = {
  id: string;
  name: string;
  code: string;
  version: string;
  roles: string[];
  relatedPlans: string[];
  relatedExams: string[];
  issueStrategy: "auto" | "manual";
  approvalFlow: string;
  validityType: "fixed" | "duration" | "permanent";
  validityValue: string;
  renewalPolicy: string;
  status: GACertificateStatus;
  updatedAt: string;
  updatedBy: string;
  previewImage: string;
  versionHistory: Array<{
    version: string;
    date: string;
    operator: string;
    changeSummary: string;
  }>;
  approvalSteps: Array<{
    step: string;
    owner: string;
    status: "通过" | "待处理" | "驳回";
  }>;
  autoConditions: {
    courseCompletion: number;
    examScore: number;
    profileApproved: boolean;
    onsiteAssessment?: boolean;
  };
};

export type GACertificateRecordStatus = "valid" | "expiring" | "expired" | "revoked";

export type GACertificateRecord = {
  id: string;
  certificateName: string;
  templateCode: string;
  personName: string;
  unitName: string;
  role: string;
  issuedAt: string;
  expireAt: string | null;
  status: GACertificateRecordStatus;
  issueMethod: "auto" | "manual";
  approver?: string;
  remark?: string;
  renewable: boolean;
  certificateUrl?: string;
};

export const GACertificateTemplatesMock: GACertificateTemplate[] = [
  {
    id: "ga-cert-tpl-001",
    name: "桥梁维护工程师专业证书",
    code: "CERT-BRG-ENG-2025",
    version: "v1.3",
    roles: ["桥梁工程师"],
    relatedPlans: ["2025 桥梁维护专项培训"],
    relatedExams: ["桥梁结构健康监测理论考核"],
    issueStrategy: "auto",
    approvalFlow: "主管单位审批流 A",
    validityType: "duration",
    validityValue: "12 个月",
    renewalPolicy: "到期前需完成年度复训并补考成绩≥80 分",
    status: "active",
    updatedAt: "2025-04-06T11:20:00Z",
    updatedBy: "陈晓晨",
    previewImage: "/images/cert-preview-bridge.png",
    versionHistory: [
      {
        version: "v1.3",
        date: "2025-04-06",
        operator: "陈晓晨",
        changeSummary: "调整续期条件，新增现场考核要求"
      },
      {
        version: "v1.2",
        date: "2024-12-15",
        operator: "李娜",
        changeSummary: "更新证书背景与电子章"
      }
    ],
    approvalSteps: [
      { step: "主管单位教研审批", owner: "李娜", status: "通过" },
      { step: "平台备案", owner: "平台合规组", status: "通过" }
    ],
    autoConditions: {
      courseCompletion: 90,
      examScore: 80,
      profileApproved: true,
      onsiteAssessment: true
    }
  },
  {
    id: "ga-cert-tpl-002",
    name: "巡检班组长岗位能力证书",
    code: "CERT-INSP-LEAD-2025",
    version: "v1.0",
    roles: ["巡检班组长"],
    relatedPlans: ["巡检班组长能力提升计划"],
    relatedExams: ["巡检案例分析实作"],
    issueStrategy: "manual",
    approvalFlow: "主管单位审批流 B",
    validityType: "duration",
    validityValue: "24 个月",
    renewalPolicy: "需提交巡检案例报告并通过复核",
    status: "pending",
    updatedAt: "2025-04-04T09:10:00Z",
    updatedBy: "王强",
    previewImage: "/images/cert-preview-inspection.png",
    versionHistory: [
      {
        version: "v1.0",
        date: "2025-04-01",
        operator: "王强",
        changeSummary: "创建模板"
      }
    ],
    approvalSteps: [
      { step: "主管单位政工部", owner: "王强", status: "待处理" },
      { step: "专家评审", owner: "专家组", status: "待处理" }
    ],
    autoConditions: {
      courseCompletion: 85,
      examScore: 75,
      profileApproved: true
    }
  },
  {
    id: "ga-cert-tpl-003",
    name: "安全合规培训合格证",
    code: "CERT-SAFE-2025",
    version: "v2.1",
    roles: ["安全管理员", "桥梁工程师"],
    relatedPlans: ["法规制度年度复训"],
    relatedExams: ["法规合规专项测验"],
    issueStrategy: "auto",
    approvalFlow: "自动发证+平台备案",
    validityType: "fixed",
    validityValue: "2025-12-31",
    renewalPolicy: "需要参加次年复训并通过考核",
    status: "active",
    updatedAt: "2025-03-30T14:05:00Z",
    updatedBy: "李娜",
    previewImage: "/images/cert-preview-safe.png",
    versionHistory: [
      {
        version: "v2.1",
        date: "2025-03-30",
        operator: "李娜",
        changeSummary: "补充电子签章验证链接"
      },
      {
        version: "v2.0",
        date: "2025-01-10",
        operator: "平台合规组",
        changeSummary: "增加数据加密水印"
      }
    ],
    approvalSteps: [
      { step: "系统自动校验", owner: "平台系统", status: "通过" }
    ],
    autoConditions: {
      courseCompletion: 100,
      examScore: 80,
      profileApproved: true
    }
  },
  {
    id: "ga-cert-tpl-004",
    name: "巡检机器人操作授权",
    code: "CERT-ROBOT-OP-2025",
    version: "草稿",
    roles: ["巡检班组长", "设备管理员"],
    relatedPlans: ["数字巡检技能培训"],
    relatedExams: ["设备巡检操作规范测验"],
    issueStrategy: "manual",
    approvalFlow: "专家评审 + 主管审批",
    validityType: "duration",
    validityValue: "18 个月",
    renewalPolicy: "需提交设备运行记录并完成现场考核",
    status: "draft",
    updatedAt: "2025-04-01T08:00:00Z",
    updatedBy: "黄凯",
    previewImage: "/images/cert-preview-robot.png",
    versionHistory: [
      {
        version: "草稿",
        date: "2025-04-01",
        operator: "黄凯",
        changeSummary: "新增模板"
      }
    ],
    approvalSteps: [
      { step: "专家评审", owner: "设备专家组", status: "待处理" },
      { step: "主管单位审批", owner: "陈晓晨", status: "待处理" }
    ],
    autoConditions: {
      courseCompletion: 90,
      examScore: 78,
      profileApproved: true,
      onsiteAssessment: true
    }
  }
];

export const GACertificateRecordsMock: GACertificateRecord[] = [
  {
    id: "ga-cert-rec-001",
    certificateName: "桥梁维护工程师专业证书",
    templateCode: "CERT-BRG-ENG-2025",
    personName: "赵明",
    unitName: "浙江高速集团",
    role: "桥梁工程师",
    issuedAt: "2025-03-18 10:20",
    expireAt: "2026-03-17",
    status: "valid",
    issueMethod: "auto",
    approver: "系统自动发证",
    renewable: true,
    certificateUrl: "#"
  },
  {
    id: "ga-cert-rec-002",
    certificateName: "巡检班组长岗位能力证书",
    templateCode: "CERT-INSP-LEAD-2025",
    personName: "林雪",
    unitName: "宁波公路管理中心",
    role: "巡检班组长",
    issuedAt: "2024-09-05 14:30",
    expireAt: "2026-09-04",
    status: "expiring",
    issueMethod: "manual",
    approver: "王强",
    remark: "已提醒提交复训申请",
    renewable: true
  },
  {
    id: "ga-cert-rec-003",
    certificateName: "安全合规培训合格证",
    templateCode: "CERT-SAFE-2025",
    personName: "周立",
    unitName: "贵州省交通运输厅",
    role: "安全管理员",
    issuedAt: "2024-12-20 09:00",
    expireAt: "2025-12-31",
    status: "valid",
    issueMethod: "auto",
    approver: "系统自动发证",
    renewable: true,
    certificateUrl: "#"
  },
  {
    id: "ga-cert-rec-004",
    certificateName: "巡检机器人操作授权",
    templateCode: "CERT-ROBOT-OP-2025",
    personName: "韩飞",
    unitName: "沪苏通运营公司",
    role: "设备管理员",
    issuedAt: "2023-11-02 16:10",
    expireAt: "2025-05-01",
    status: "expired",
    issueMethod: "manual",
    approver: "专家评审团",
    remark: "未在有效期内提交续期资料",
    renewable: false
  },
  {
    id: "ga-cert-rec-005",
    certificateName: "桥梁维护工程师专业证书",
    templateCode: "CERT-BRG-ENG-2025",
    personName: "李洋",
    unitName: "贵州省交通运输厅",
    role: "桥梁工程师",
    issuedAt: "2024-03-22 13:45",
    expireAt: "2025-03-21",
    status: "revoked",
    issueMethod: "manual",
    approver: "陈晓晨",
    remark: "考核复查不合格，证书撤销",
    renewable: false
  }
];

export const GACertificateStats = [
  {
    id: "cert-pending",
    label: "待审批证书模板",
    value: 3,
    hint: "需尽快完成审批",
    status: "warning" as const
  },
  {
    id: "cert-expiring",
    label: "30 天内到期证书",
    value: 28,
    hint: "建议发送续期提醒",
    status: "info" as const
  },
  {
    id: "cert-valid",
    label: "有效证书总量",
    value: 186,
    hint: "覆盖 12 个岗位",
    status: "success" as const
  }
];

export const GACertificateFilters = {
  status: [
    { value: "all", label: "全部状态" },
    { value: "draft", label: "草稿" },
    { value: "pending", label: "待审批" },
    { value: "active", label: "已发布" },
    { value: "disabled", label: "已停用" }
  ],
  issueStrategy: [
    { value: "all", label: "全部策略" },
    { value: "auto", label: "自动发证" },
    { value: "manual", label: "人工发证" }
  ],
  validityType: [
    { value: "all", label: "全部有效期" },
    { value: "fixed", label: "固定日期" },
    { value: "duration", label: "固定时长" },
    { value: "permanent", label: "永久有效" }
  ],
  expiryRange: [
    { value: "all", label: "全部到期时间" },
    { value: "30", label: "30 天内到期" },
    { value: "60", label: "60 天内到期" },
    { value: "90", label: "90 天内到期" }
  ]
};

export const GACertificateRecordFilters = {
  status: [
    { value: "all", label: "全部" },
    { value: "valid", label: "有效" },
    { value: "expiring", label: "即将到期" },
    { value: "expired", label: "已过期" },
    { value: "revoked", label: "已撤销" }
  ],
  issueMethod: [
    { value: "all", label: "全部方式" },
    { value: "auto", label: "自动发证" },
    { value: "manual", label: "人工发证" }
  ],
  expiryRange: [
    { value: "all", label: "全部到期时间" },
    { value: "expiring", label: "即将到期" },
    { value: "expired", label: "已过期" }
  ]
};
