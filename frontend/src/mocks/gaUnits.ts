export type GAUnitStatus = "normal" | "pending" | "suspended" | "risk";

export type GAUnitItem = {
  id: string;
  name: string;
  code: string;
  type: "养护公司" | "检测中心" | "运营单位" | "监测单位";
  region: string;
  serviceScope: string[];
  admin: {
    name: string;
    phone: string;
    email: string;
  };
  staffCount: number;
  pendingReview: number;
  activePlans: number;
  status: GAUnitStatus;
  updatedAt: string;
  remark?: string;
};

export type GAUnitSummary = {
  id: string;
  label: string;
  value: number | string;
  hint: string;
  status: "info" | "warning" | "success" | "danger";
};

export const GAUnitSummaryCards: GAUnitSummary[] = [
  {
    id: "total",
    label: "入驻管养单位",
    value: 28,
    hint: "含 8 家检测中心",
    status: "info"
  },
  {
    id: "pending",
    label: "资料待完善",
    value: 5,
    hint: "需跟进联系人",
    status: "warning"
  },
  {
    id: "risk",
    label: "风险单位",
    value: 2,
    hint: "执行进度滞后",
    status: "danger"
  },
  {
    id: "new",
    label: "近 7 天新增",
    value: 3,
    hint: "均已配置管理员",
    status: "success"
  }
];

export const GAUnitListMock: GAUnitItem[] = [
  {
    id: "unit-001",
    name: "杭州路桥养护公司",
    code: "UNIT-BRG-001",
    type: "养护公司",
    region: "浙江 · 杭州",
    serviceScope: ["高速桥梁", "城市快速路"],
    admin: {
      name: "王敏",
      phone: "138 **** 5620",
      email: "wangmin@hzbridge.com"
    },
    staffCount: 186,
    pendingReview: 12,
    activePlans: 5,
    status: "normal",
    updatedAt: "2025-04-06 09:20"
  },
  {
    id: "unit-002",
    name: "宁波桥梁检测中心",
    code: "UNIT-CHK-014",
    type: "检测中心",
    region: "浙江 · 宁波",
    serviceScope: ["桥梁检测", "结构监测"],
    admin: {
      name: "刘爽",
      phone: "139 **** 4310",
      email: "lius@nbinspect.cn"
    },
    staffCount: 94,
    pendingReview: 4,
    activePlans: 3,
    status: "pending",
    updatedAt: "2025-04-05 18:05",
    remark: "资料缺少最新资质证明"
  },
  {
    id: "unit-003",
    name: "沪苏通隧道检测公司",
    code: "UNIT-TUN-009",
    type: "检测中心",
    region: "江苏 · 南通",
    serviceScope: ["隧道检测", "应急抢险"],
    admin: {
      name: "陈敏",
      phone: "137 **** 2975",
      email: "chenm@hstunnel.com"
    },
    staffCount: 120,
    pendingReview: 9,
    activePlans: 2,
    status: "risk",
    updatedAt: "2025-04-04 15:42",
    remark: "培训计划执行率低于 60%"
  },
  {
    id: "unit-004",
    name: "贵阳高速养护股份有限公司",
    code: "UNIT-GUI-021",
    type: "养护公司",
    region: "贵州 · 贵阳",
    serviceScope: ["高速桥梁", "山区道路"],
    admin: {
      name: "李洋",
      phone: "136 **** 7842",
      email: "liyang@gyroad.com"
    },
    staffCount: 204,
    pendingReview: 0,
    activePlans: 6,
    status: "normal",
    updatedAt: "2025-04-02 11:18"
  },
  {
    id: "unit-005",
    name: "台州沿海运维中心",
    code: "UNIT-OPS-032",
    type: "运营单位",
    region: "浙江 · 台州",
    serviceScope: ["沿海高速", "桥梁巡检"],
    admin: {
      name: "赵敏",
      phone: "135 **** 8890",
      email: "zhaomin@tzops.cn"
    },
    staffCount: 78,
    pendingReview: 3,
    activePlans: 1,
    status: "suspended",
    updatedAt: "2025-03-28 09:05",
    remark: "停用原因：组织架构调整，资料待更新"
  }
];

export const GAUnitFilters = {
  type: [
    { value: "all", label: "全部类型" },
    { value: "养护公司", label: "养护公司" },
    { value: "检测中心", label: "检测中心" },
    { value: "运营单位", label: "运营单位" },
    { value: "监测单位", label: "监测单位" }
  ],
  status: [
    { value: "all", label: "全部状态" },
    { value: "normal", label: "正常" },
    { value: "pending", label: "待完善" },
    { value: "risk", label: "风险" },
    { value: "suspended", label: "停用" }
  ],
  scope: [
    { value: "bridge", label: "桥梁" },
    { value: "tunnel", label: "隧道" },
    { value: "road", label: "道路" },
    { value: "inspection", label: "检测" }
  ]
};

export const GAUnitDetailMock = {
  basicInfo: {
    creditCode: "91330100MA2H3F5K9W",
    establishDate: "2012-07-18",
    parentGroup: "省交通投资集团",
    address: "杭州市上城区延安路 156-2 号",
    serviceScope: ["高速桥梁", "城市快速路", "危桥抢险"],
    serviceArea: ["沪杭甬高速", "杭金衢高速", "绍诸高速"],
    assets: [
      {
        type: "桥梁",
        name: "钱塘江大桥",
        location: "杭州市萧山区",
        status: "在管"
      },
      {
        type: "桥梁",
        name: "富春江特大桥",
        location: "杭州市富阳区",
        status: "在管"
      },
      {
        type: "隧道",
        name: "天目山隧道",
        location: "临安市",
        status: "维保中"
      }
    ]
  },
  contacts: [
    {
      name: "王敏",
      role: "主联系人",
      phone: "138 **** 5620",
      email: "wangmin@hzbridge.com"
    },
    {
      name: "张伟",
      role: "技术负责人",
      phone: "137 **** 8920",
      email: "zhangwei@hzbridge.com"
    }
  ],
  accounts: [
    {
      account: "wangmin",
      role: "单位管理员",
      status: "启用",
      lastLogin: "2025-04-05 20:13"
    },
    {
      account: "zhangwei",
      role: "业务协作",
      status: "启用",
      lastLogin: "2025-04-02 09:42"
    }
  ],
  metrics: {
    pendingReview: 12,
    engineers: 186,
    activePlans: 5,
    overdueTasks: 2
  },
  attachments: [
    {
      name: "入驻协议.pdf",
      uploadTime: "2024-01-12",
      size: "2.1MB"
    },
    {
      name: "营业执照.jpg",
      uploadTime: "2025-03-18",
      size: "680KB"
    }
  ],
  history: [
    {
      date: "2025-03-30",
      operator: "李娜",
      action: "更新服务范围，新增危桥抢险"
    },
    {
      date: "2025-02-18",
      operator: "王敏",
      action: "新增单位协作者账号"
    }
  ]
};

export const GAUnitPersonnelMock: Record<
  string,
  Array<{
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    status: "在岗" | "待审核" | "停用";
    lastLogin: string;
  }>
> = {
  "unit-001": [
    {
      id: "staff-001",
      name: "陈海",
      role: "桥梁工程师",
      phone: "139 **** 5621",
      email: "chenhai@hzbridge.com",
      status: "在岗",
      lastLogin: "2025-04-05 21:18"
    },
    {
      id: "staff-002",
      name: "沈倩",
      role: "巡检班组长",
      phone: "138 **** 9076",
      email: "shenqian@hzbridge.com",
      status: "待审核",
      lastLogin: "—"
    },
    {
      id: "staff-003",
      name: "刘凯",
      role: "安全管理员",
      phone: "137 **** 5520",
      email: "liukai@hzbridge.com",
      status: "在岗",
      lastLogin: "2025-04-04 09:42"
    },
    {
      id: "staff-012",
      name: "高婷",
      role: "结构检测师",
      phone: "139 **** 7731",
      email: "gaoting@hzbridge.com",
      status: "待审核",
      lastLogin: "—"
    },
    {
      id: "staff-013",
      name: "孙杰",
      role: "巡检班组长",
      phone: "136 **** 4410",
      email: "sunjie@hzbridge.com",
      status: "在岗",
      lastLogin: "2025-04-06 06:35"
    },
    {
      id: "staff-014",
      name: "何颖",
      role: "资料员",
      phone: "135 **** 9087",
      email: "heying@hzbridge.com",
      status: "在岗",
      lastLogin: "2025-04-05 16:12"
    }
  ],
  "unit-002": [
    {
      id: "staff-004",
      name: "王嘉",
      role: "检测工程师",
      phone: "139 **** 8730",
      email: "wangjia@nbinspect.cn",
      status: "在岗",
      lastLogin: "2025-04-06 08:12"
    },
    {
      id: "staff-005",
      name: "徐俊",
      role: "数据分析师",
      phone: "136 **** 4471",
      email: "xujun@nbinspect.cn",
      status: "待审核",
      lastLogin: "—"
    },
    {
      id: "staff-015",
      name: "顾蕾",
      role: "桥检工程师",
      phone: "138 **** 2270",
      email: "gulei@nbinspect.cn",
      status: "在岗",
      lastLogin: "2025-04-04 20:02"
    },
    {
      id: "staff-016",
      name: "潘越",
      role: "实验室主管",
      phone: "139 **** 8891",
      email: "panyue@nbinspect.cn",
      status: "停用",
      lastLogin: "2025-03-10 09:12"
    }
  ],
  "unit-003": [
    {
      id: "staff-006",
      name: "赵航",
      role: "隧道检测工程师",
      phone: "135 **** 8842",
      email: "zhaohang@hstunnel.com",
      status: "在岗",
      lastLogin: "2025-04-05 19:05"
    },
    {
      id: "staff-007",
      name: "郭晨",
      role: "应急抢险组长",
      phone: "138 **** 2247",
      email: "guochen@hstunnel.com",
      status: "停用",
      lastLogin: "2025-03-18 11:20"
    },
    {
      id: "staff-017",
      name: "穆成",
      role: "安全员",
      phone: "137 **** 6634",
      email: "mucheng@hstunnel.com",
      status: "在岗",
      lastLogin: "2025-04-05 14:01"
    },
    {
      id: "staff-018",
      name: "姜楠",
      role: "检测工程师",
      phone: "135 **** 8830",
      email: "jiangnan@hstunnel.com",
      status: "待审核",
      lastLogin: "—"
    }
  ],
  "unit-004": [
    {
      id: "staff-008",
      name: "罗鹏",
      role: "桥梁工程师",
      phone: "139 **** 9901",
      email: "luopeng@gyroad.com",
      status: "在岗",
      lastLogin: "2025-04-06 10:12"
    },
    {
      id: "staff-009",
      name: "熊怡",
      role: "资料员",
      phone: "137 **** 6210",
      email: "xiongyi@gyroad.com",
      status: "待审核",
      lastLogin: "—"
    },
    {
      id: "staff-019",
      name: "蒋亮",
      role: "项目经理",
      phone: "139 **** 4402",
      email: "jiangliang@gyroad.com",
      status: "在岗",
      lastLogin: "2025-04-06 09:58"
    },
    {
      id: "staff-020",
      name: "裴月",
      role: "安全管理员",
      phone: "138 **** 7725",
      email: "peiyue@gyroad.com",
      status: "在岗",
      lastLogin: "2025-04-04 21:32"
    }
  ],
  "unit-005": [
    {
      id: "staff-010",
      name: "吴东",
      role: "运营调度员",
      phone: "136 **** 7789",
      email: "wudong@tzops.cn",
      status: "在岗",
      lastLogin: "2025-04-03 17:32"
    },
    {
      id: "staff-011",
      name: "钱静",
      role: "安全管理员",
      phone: "135 **** 5530",
      email: "qianjing@tzops.cn",
      status: "停用",
      lastLogin: "2025-02-24 08:40"
    },
    {
      id: "staff-021",
      name: "姚航",
      role: "监控调度员",
      phone: "137 **** 8869",
      email: "yaohang@tzops.cn",
      status: "在岗",
      lastLogin: "2025-04-03 12:05"
    },
    {
      id: "staff-022",
      name: "倪彤",
      role: "巡检班组长",
      phone: "139 **** 6611",
      email: "nitong@tzops.cn",
      status: "待审核",
      lastLogin: "—"
    }
  ]
};
