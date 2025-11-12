import type { TenantStatus } from "./tenants";

export type TenantAdmin = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  lastLogin: string;
  status: "active" | "disabled";
};

export type TenantUsage = {
  name: string;
  used: number;
  total: number;
  unit: string;
};

export type TenantTimeline = {
  id: string;
  time: string;
  title: string;
  description: string;
};

export type TenantDetail = {
  id: string;
  name: string;
  description: string;
  status: TenantStatus;
  package: string;
  industry: string;
  region: string;
  createdAt: string;
  expireAt: string;
  contractCode: string;
  tags?: string[];
  contact: {
    person: string;
    phone: string;
    email: string;
  };
  metrics: Array<{ label: string; value: string; caption?: string }>;
  admins: TenantAdmin[];
  usage: TenantUsage[];
  timeline: TenantTimeline[];
};

export const TenantDetailMock: TenantDetail[] = [
  {
    id: "tenant-001",
    name: "贵州省公路局",
    description: "负责贵州省高速公路、桥梁的建设与养护，覆盖 12 个直属单位及 80+ 个项目部。",
    status: "active",
    package: "旗舰版",
    industry: "交通运输",
    region: "贵州省 贵阳市",
    createdAt: "2024-01-15T09:30:00Z",
    expireAt: "2025-01-14T23:59:59Z",
    contractCode: "HT-2024-001",
    tags: ["重点客户", "省级"],
    contact: {
      person: "陈主任",
      phone: "138-1234-5678",
      email: "chenzr@gz-highway.gov.cn"
    },
    metrics: [
      { label: "学员总数", value: "3,482 人", caption: "近 30 天新增 268 人" },
      { label: "活跃项目部", value: "37 个", caption: "共 42 个项目部" },
      { label: "考试通过率", value: "92%", caption: "近 6 个月平均" },
      { label: "证书有效", value: "2,946 张", caption: "到期提醒已开启" }
    ],
    admins: [
      {
        id: "admin-1",
        name: "李敏",
        role: "租户超级管理员",
        phone: "139-8888-1122",
        email: "limin@gz-highway.gov.cn",
        lastLogin: "2024-04-18 09:32",
        status: "active"
      },
      {
        id: "admin-2",
        name: "黄志",
        role: "培训主管",
        phone: "139-8888-3344",
        email: "huangzhi@gz-highway.gov.cn",
        lastLogin: "2024-04-17 17:40",
        status: "active"
      },
      {
        id: "admin-3",
        name: "周美",
        role: "考试管理员",
        phone: "139-6666-7788",
        email: "zhoumei@gz-highway.gov.cn",
        lastLogin: "2024-04-10 10:12",
        status: "active"
      }
    ],
    usage: [
      { name: "学员账号", used: 3482, total: 4000, unit: "人" },
      { name: "课程存储", used: 320, total: 500, unit: "GB" },
      { name: "考试题库", used: 1860, total: 3000, unit: "题" },
      { name: "并发配额", used: 120, total: 300, unit: "人" }
    ],
    timeline: [
      {
        id: "evt-1",
        time: "2024-04-18 09:30",
        title: "年度安全培训计划上线",
        description: "主管单位发布 2024 安全培训计划，覆盖 6 大岗位类别。"
      },
      {
        id: "evt-2",
        time: "2024-03-28 16:20",
        title: "新增考务管理员账号",
        description: "新增 2 名考务管理员，负责各项目部考试安排。"
      },
      {
        id: "evt-3",
        time: "2024-02-14 11:05",
        title: "套餐升级至旗舰版",
        description: "完成合同续约并开通旗舰版套餐，新增并发与存储配额。"
      }
    ]
  },
  {
    id: "tenant-002",
    name: "浙江高速集团",
    description: "覆盖浙江全省高速公路、桥梁运维单位，重点推进在线培训与考试闭环。",
    status: "expiring",
    package: "旗舰版",
    industry: "交通运输",
    region: "浙江省 杭州市",
    createdAt: "2023-09-08T10:20:00Z",
    expireAt: "2024-09-07T23:59:59Z",
    contractCode: "HT-2023-212",
    tags: ["续费提醒"],
    contact: {
      person: "张强",
      phone: "138-0000-2222",
      email: "zhangqiang@zje-highway.com"
    },
    metrics: [
      { label: "学员总数", value: "4,128 人" },
      { label: "考试通过率", value: "88%" },
      { label: "证书有效", value: "3,402 张" },
      { label: "续费状态", value: "洽谈中" }
    ],
    admins: [
      {
        id: "admin-4",
        name: "郑杰",
        role: "租户管理员",
        phone: "136-8888-9999",
        email: "zhengjie@zje-highway.com",
        lastLogin: "2024-04-17 14:01",
        status: "active"
      }
    ],
    usage: [
      { name: "学员账号", used: 4128, total: 4500, unit: "人" },
      { name: "课程存储", used: 410, total: 600, unit: "GB" },
      { name: "考试题库", used: 2100, total: 3500, unit: "题" },
      { name: "并发配额", used: 180, total: 350, unit: "人" }
    ],
    timeline: [
      {
        id: "evt-4",
        time: "2024-04-05 09:15",
        title: "续费提醒已发送",
        description: "自动发送续费提醒邮件给主要联系人和商务负责人。"
      }
    ]
  }
];

