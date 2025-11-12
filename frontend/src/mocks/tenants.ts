export type TenantStatus = "active" | "trial" | "expiring" | "suspended";

export type TenantInfo = {
  id: string;
  name: string;
  industry: string;
  region: string;
  package: string;
  status: TenantStatus;
  createdAt: string;
  expireAt: string;
  activeUsers7d: number;
  contractCode: string;
  opsOwner: string;
  tags?: string[];
};

export type TenantDetail = TenantInfo & {
  description?: string;
  logoUrl?: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  domain: {
    loginDomain: string;
    customDomain?: string;
    ssoEnabled: boolean;
    ssoProvider?: string;
  };
  packageDetail: {
    package: string;
    startDate: string;
    endDate: string;
    maxUsers: number;
    storageQuotaGB: number;
    features: string[];
  };
  auditLog: Array<{
    time: string;
    operator: string;
    action: string;
    remark?: string;
  }>;
};

export const TenantStats = {
  total: 28,
  active: 21,
  expiring: 3,
  newToday: 1
};

export const TenantPackages = ["旗舰版", "专业版", "标准版", "试用版"] as const;

export const TenantStatusOptions: { value: TenantStatus | "all"; label: string }[] = [
  { value: "all", label: "全部状态" },
  { value: "active", label: "运行中" },
  { value: "trial", label: "试用中" },
  { value: "expiring", label: "即将到期" },
  { value: "suspended", label: "已停用" }
];

export const TenantPackageOptions = [
  { value: "all", label: "全部套餐" },
  ...TenantPackages.map((pkg) => ({ value: pkg, label: pkg }))
];

export const TenantsMock: TenantInfo[] = [
  {
    id: "tenant-001",
    name: "贵州省公路局",
    industry: "交通运输",
    region: "贵州省 贵阳市",
    package: "旗舰版",
    status: "active",
    createdAt: "2024-01-15T09:30:00Z",
    expireAt: "2025-01-14T23:59:59Z",
    activeUsers7d: 458,
    contractCode: "HT-2024-001",
    opsOwner: "李工",
    tags: ["省级", "重点客户"]
  },
  {
    id: "tenant-002",
    name: "浙江高速集团",
    industry: "交通运输",
    region: "浙江省 杭州市",
    package: "旗舰版",
    status: "expiring",
    createdAt: "2023-09-08T10:20:00Z",
    expireAt: "2024-09-07T23:59:59Z",
    activeUsers7d: 612,
    contractCode: "HT-2023-212",
    opsOwner: "陈敏",
    tags: ["续费提醒", "高并发"]
  },
  {
    id: "tenant-003",
    name: "辽河桥梁养护中心",
    industry: "交通运输",
    region: "辽宁省 沈阳市",
    package: "专业版",
    status: "trial",
    createdAt: "2024-04-01T08:00:00Z",
    expireAt: "2024-07-01T23:59:59Z",
    activeUsers7d: 86,
    contractCode: "TRY-2024-045",
    opsOwner: "杨静"
  },
  {
    id: "tenant-004",
    name: "京津高速项目部",
    industry: "交通运输",
    region: "北京市",
    package: "专业版",
    status: "active",
    createdAt: "2023-11-05T14:30:00Z",
    expireAt: "2024-11-04T23:59:59Z",
    activeUsers7d: 302,
    contractCode: "HT-2023-331",
    opsOwner: "王磊",
    tags: ["重点培训"]
  },
  {
    id: "tenant-005",
    name: "成渝高管处",
    industry: "交通运输",
    region: "四川省 成都市",
    package: "标准版",
    status: "suspended",
    createdAt: "2022-03-16T09:00:00Z",
    expireAt: "2023-03-15T23:59:59Z",
    activeUsers7d: 0,
    contractCode: "HT-2022-118",
    opsOwner: "杜鹏",
    tags: ["停用"]
  },
  {
    id: "tenant-006",
    name: "粤港澳大湾区交通指挥中心",
    industry: "交通运输",
    region: "广东省 广州市",
    package: "旗舰版",
    status: "active",
    createdAt: "2023-02-10T11:45:00Z",
    expireAt: "2025-02-09T23:59:59Z",
    activeUsers7d: 734,
    contractCode: "HT-2023-025",
    opsOwner: "贾欣",
    tags: ["重点客户", "多租户"]
  },
  {
    id: "tenant-007",
    name: "湘江桥隧维护公司",
    industry: "交通运输",
    region: "湖南省 长沙市",
    package: "专业版",
    status: "active",
    createdAt: "2023-07-22T09:00:00Z",
    expireAt: "2024-07-21T23:59:59Z",
    activeUsers7d: 254,
    contractCode: "HT-2023-198",
    opsOwner: "文婷"
  },
  {
    id: "tenant-008",
    name: "内蒙古路桥集团",
    industry: "交通运输",
    region: "内蒙古 呼和浩特市",
    package: "标准版",
    status: "expiring",
    createdAt: "2023-05-12T09:00:00Z",
    expireAt: "2024-05-11T23:59:59Z",
    activeUsers7d: 142,
    contractCode: "HT-2023-152",
    opsOwner: "任强"
  },
  {
    id: "tenant-009",
    name: "青岛港口管理局",
    industry: "交通运输",
    region: "山东省 青岛市",
    package: "旗舰版",
    status: "active",
    createdAt: "2024-02-18T09:00:00Z",
    expireAt: "2025-02-17T23:59:59Z",
    activeUsers7d: 389,
    contractCode: "HT-2024-032",
    opsOwner: "周峰"
  },
  {
    id: "tenant-010",
    name: "西北交通建设集团",
    industry: "交通运输",
    region: "陕西省 西安市",
    package: "专业版",
    status: "trial",
    createdAt: "2024-03-28T09:00:00Z",
    expireAt: "2024-06-28T23:59:59Z",
    activeUsers7d: 112,
    contractCode: "TRY-2024-078",
    opsOwner: "赵越"
  }
];

export const TenantDetailMock: TenantDetail = {
  ...TenantsMock[0],
  description:
    "贵州省公路局负责全省公路、桥梁、隧道等交通基础设施的建设与运维，2024 年启动线上培训体系升级。",
  logoUrl: "https://dummyimage.com/120x120/0f172a/ffffff&text=GZ",
  contact: {
    name: "王晨",
    phone: "139-1234-5678",
    email: "wangchen@gz-highway.gov.cn"
  },
  domain: {
    loginDomain: "gz-highway.bridgecare.cn",
    customDomain: "training.gz-highway.gov.cn",
    ssoEnabled: true,
    ssoProvider: "贵州省桥梁管理系统"
  },
  packageDetail: {
    package: "旗舰版",
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    maxUsers: 2000,
    storageQuotaGB: 500,
    features: ["自定义品牌", "高级报表", "在线监考", "API 集成"]
  },
  auditLog: [
    {
      time: "2024-03-12 10:18",
      operator: "李工",
      action: "调整套餐资源",
      remark: "并发从 500 提升到 1000"
    },
    {
      time: "2024-02-08 14:32",
      operator: "系统",
      action: "启用 SSO",
      remark: "成功对接贵州省桥梁管理系统"
    },
    {
      time: "2024-01-15 09:30",
      operator: "陈敏",
      action: "新建租户",
      remark: "正式上线"
    }
  ]
};

