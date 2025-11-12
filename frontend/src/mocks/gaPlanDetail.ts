import type { GAPlanItem } from "./gaPlans";

export const GAPlanDetailMock: GAPlanItem & {
  description: string;
  objectives: string[];
  attachments: Array<{ id: string; name: string; url: string }>;
  courses: Array<{
    id: string;
    title: string;
    type: string;
    duration: string;
    required: boolean;
    source: "platform" | "custom";
    roles: string[];
    completionRule: string;
  }>;
  units: Array<{
    id: string;
    name: string;
    admin: string;
    progress: number;
    status: "正常" | "待安排" | "滞后";
    reminder?: string;
  }>;
  roles: Array<{ name: string; requiredCount: number; assignedCount: number }>;
  exams: Array<{
    id: string;
    name: string;
    type: string;
    schedule: string;
    status: "待发布" | "报名中" | "已安排" | "已完成";
    proctor: string;
  }>;
  certificate: {
    template: string;
    autoIssue: boolean;
    rule: string;
    validity: string;
  };
  approvals: Array<{
    step: string;
    approver: string;
    status: "待处理" | "通过" | "驳回";
    time?: string;
    comment?: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    audience: string;
    channel: string;
    time: string;
    status: "已发送" | "草稿";
  }>;
  escalations: Array<{
    id: string;
    target: string;
    time: string;
    action: string;
    feedback?: string;
  }>;
  versions: Array<{
    id: string;
    version: string;
    changeSummary: string;
    operator: string;
    time: string;
  }>;
} = {
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
  reminder: "宁波公路管理中心完成率 45%，需督办",
  description:
    "针对桥梁工程师与巡检班组长开展的专项能力提升计划，聚焦结构健康监测、巡检案例分析、安全合规要求等内容，计划通过集中学习、案例研讨、统一考试的方式提升整体专业水平。",
  objectives: [
    "掌握最新桥梁健康监测技术与设备使用",
    "总结近年典型病害案例，强化巡检经验",
    "完成年度法规与安全复训要求"
  ],
  attachments: [
    {
      id: "attach-plan-001",
      name: "培训实施方案.pdf",
      url: "#"
    },
    {
      id: "attach-plan-002",
      name: "课程进度表.xlsx",
      url: "#"
    }
  ],
  courses: [
    {
      id: "course-001",
      title: "桥梁结构健康监测实战",
      type: "视频课程",
      duration: "4.5h",
      required: true,
      source: "platform",
      roles: ["桥梁工程师"],
      completionRule: "观看 ≥ 80%，章节测验 ≥ 60 分"
    },
    {
      id: "course-002",
      title: "缆索桥巡检案例解析（2025版）",
      type: "视频课程",
      duration: "3.2h",
      required: true,
      source: "custom",
      roles: ["巡检班组长"],
      completionRule: "观看 ≥ 90%，通过案例研讨提交"
    },
    {
      id: "course-003",
      title: "公路桥梁安全管理办法详解",
      type: "文档课件",
      duration: "68页",
      required: false,
      source: "custom",
      roles: ["桥梁工程师", "巡检班组长"],
      completionRule: "阅读并完成随堂测验"
    }
  ],
  units: [
    {
      id: "unit-001",
      name: "浙江高速集团",
      admin: "王敏",
      progress: 0.78,
      status: "正常"
    },
    {
      id: "unit-002",
      name: "贵州省交通运输厅",
      admin: "李强",
      progress: 0.64,
      status: "滞后",
      reminder: "关键岗位完成率低于 50%，需安排督办"
    },
    {
      id: "unit-003",
      name: "宁波公路管理中心",
      admin: "赵雪",
      progress: 0.45,
      status: "滞后",
      reminder: "巡检班组尚未开始学习"
    },
    {
      id: "unit-004",
      name: "沪苏通运营公司",
      admin: "黄凯",
      progress: 0.56,
      status: "待安排"
    }
  ],
  roles: [
    { name: "桥梁工程师", requiredCount: 180, assignedCount: 168 },
    { name: "巡检班组长", requiredCount: 146, assignedCount: 128 }
  ],
  exams: [
    {
      id: "exam-001",
      name: "桥梁结构健康监测理论考试",
      type: "在线理论",
      schedule: "2025-05-12 09:00",
      status: "已安排",
      proctor: "平台监考中心"
    },
    {
      id: "exam-002",
      name: "巡检案例分析实操考试",
      type: "线下实操",
      schedule: "2025-06-05 13:30",
      status: "待发布",
      proctor: "主管单位巡检专家"
    }
  ],
  certificate: {
    template: "桥梁维护工程师年度培训证书",
    autoIssue: true,
    rule: "课程完成度 ≥ 90% 且考试成绩 ≥ 80 分自动签发；未达标需补考或补修课程",
    validity: "有效期 12 个月，下次复训前需完成年度复训计划"
  },
  approvals: [
    {
      step: "提交审批",
      approver: "陈晓晨",
      status: "通过",
      time: "2025-02-20 10:12",
      comment: "计划内容完善，建议重点关注滞后单位"
    },
    {
      step: "主管单位副主任",
      approver: "李娜",
      status: "通过",
      time: "2025-02-23 16:45",
      comment: "同意发布，监控执行进度"
    },
    {
      step: "平台监审",
      approver: "平台教研组",
      status: "待处理"
    }
  ],
  notifications: [
    {
      id: "notify-001",
      title: "培训计划发布通知",
      audience: "所有覆盖单位管理员",
      channel: "站内信+邮件",
      time: "2025-03-01 09:00",
      status: "已发送"
    },
    {
      id: "notify-002",
      title: "阶段考核提醒",
      audience: "未完成课程的学员",
      channel: "短信",
      time: "2025-04-10 08:30",
      status: "已发送"
    }
  ],
  escalations: [
    {
      id: "esc-001",
      target: "宁波公路管理中心",
      time: "2025-04-04 14:35",
      action: "发送督办提醒",
      feedback: "单位已安排补课"
    }
  ],
  versions: [
    {
      id: "ver-001",
      version: "v1.0",
      changeSummary: "初版计划创建",
      operator: "陈晓晨",
      time: "2025-02-18 09:20"
    },
    {
      id: "ver-002",
      version: "v1.1",
      changeSummary: "增补课程《巡检案例分析》",
      operator: "王强",
      time: "2025-03-05 15:12"
    }
  ]
};
