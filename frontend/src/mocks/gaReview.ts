export type ReviewStatus = "pending" | "inProgress" | "approved" | "rejected" | "returned";

export type ReviewItem = {
  id: string;
  name: string;
  unit: string;
  role: string;
  applyType: "first" | "update" | "renewal";
  urgency: "normal" | "urgent";
  submitTime: string;
  completeness: number;
  status: ReviewStatus;
  reviewer?: string;
  reviewTime?: string;
  remark?: string;
};

export type ReviewSummaryCard = {
  id: string;
  label: string;
  value: number | string;
  hint: string;
  status: "info" | "warning" | "success" | "danger";
};

export const GAReviewSummary: ReviewSummaryCard[] = [
  {
    id: "pending",
    label: "待审核资料",
    value: 34,
    hint: "涵盖 6 个管养单位",
    status: "warning"
  },
  {
    id: "today",
    label: "今日已处理",
    value: 12,
    hint: "平均耗时 16 分钟",
    status: "info"
  },
  {
    id: "rejected",
    label: "驳回次数",
    value: 3,
    hint: "请关注驳回原因",
    status: "danger"
  },
  {
    id: "passRate",
    label: "近 7 天通过率",
    value: "82%",
    hint: "对比上周 +5%",
    status: "success"
  }
];

export const GAReviewPending: ReviewItem[] = [
  {
    id: "review-001",
    name: "赵明",
    unit: "杭州路桥养护公司",
    role: "桥梁工程师",
    applyType: "first",
    urgency: "urgent",
    submitTime: "2025-04-06 09:30",
    completeness: 92,
    status: "pending"
  },
  {
    id: "review-002",
    name: "林雪",
    unit: "宁波桥梁检测中心",
    role: "巡检班组长",
    applyType: "update",
    urgency: "normal",
    submitTime: "2025-04-05 17:40",
    completeness: 100,
    status: "pending"
  },
  {
    id: "review-003",
    name: "周立",
    unit: "贵阳高速养护股份有限公司",
    role: "安全管理员",
    applyType: "renewal",
    urgency: "normal",
    submitTime: "2025-04-04 11:22",
    completeness: 88,
    status: "pending"
  },
  {
    id: "review-004",
    name: "韩飞",
    unit: "沪苏通隧道检测公司",
    role: "设备管理员",
    applyType: "update",
    urgency: "urgent",
    submitTime: "2025-04-06 08:05",
    completeness: 76,
    status: "pending"
  }
];

export const GAReviewHistory: ReviewItem[] = [
  {
    id: "review-101",
    name: "李洋",
    unit: "贵阳高速养护股份有限公司",
    role: "桥梁工程师",
    applyType: "first",
    urgency: "normal",
    submitTime: "2025-03-28 14:16",
    completeness: 100,
    status: "approved",
    reviewer: "陈晓晨",
    reviewTime: "2025-03-29 10:12",
    remark: "资料齐全，证件有效"
  },
  {
    id: "review-102",
    name: "刘爽",
    unit: "宁波桥梁检测中心",
    role: "巡检班组长",
    applyType: "update",
    urgency: "normal",
    submitTime: "2025-03-30 09:40",
    completeness: 84,
    status: "rejected",
    reviewer: "王敏",
    reviewTime: "2025-03-30 15:25",
    remark: "缺少现场考核证明"
  },
  {
    id: "review-103",
    name: "陈敏",
    unit: "沪苏通隧道检测公司",
    role: "安全管理员",
    applyType: "renewal",
    urgency: "normal",
    submitTime: "2025-03-25 13:05",
    completeness: 100,
    status: "approved",
    reviewer: "李娜",
    reviewTime: "2025-03-26 09:55",
    remark: "续期完成"
  }
];

export const GAReviewFilters = {
  applyType: [
    { value: "all", label: "全部类型" },
    { value: "first", label: "首次资料" },
    { value: "update", label: "资料更新" },
    { value: "renewal", label: "续期审核" }
  ],
  urgency: [
    { value: "all", label: "全部优先级" },
    { value: "urgent", label: "紧急" },
    { value: "normal", label: "普通" }
  ],
  completeness: [
    { value: "all", label: "全部完整度" },
    { value: "full", label: "资料齐全" },
    { value: "partial", label: "缺少资料" }
  ]
};
