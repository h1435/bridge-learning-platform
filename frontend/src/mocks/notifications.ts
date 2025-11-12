export type NotificationCategory = "学习任务" | "系统公告" | "资质" | "审批" | "消息";

export type NotificationItem = {
  id: string;
  title: string;
  content: string;
  time: string;
  category: NotificationCategory;
  unread?: boolean;
  link?: string;
};

export const NotificationsMock: Record<string, NotificationItem[]> = {
  PA: [
    {
      id: "pa-001",
      title: "系统维护通知",
      content: "学习平台将于 4 月 15 日凌晨 01:00-03:00 进行维护，期间可能短暂无法访问。",
      time: "5 分钟前",
      category: "系统公告",
      unread: true
    },
    {
      id: "pa-002",
      title: "部署审批已完成",
      content: "新版本 V2.4.0 已部署完成，监控数据正常。",
      time: "今天 09:30",
      category: "审批"
    }
  ],
  GA: [
    {
      id: "ga-001",
      title: "桥梁专项培训督办回复",
      content: "贵阳养护单位反馈：考试名单已确认，预计明日完成提醒。",
      time: "10 分钟前",
      category: "审批",
      unread: true,
      link: "/ga/plan-detail"
    },
    {
      id: "ga-002",
      title: "资料复审提醒",
      content: "宁波桥梁检测中心上传 12 份复审材料，请在 3 个工作日内完成审核。",
      time: "今天 11:05",
      category: "资质"
    },
    {
      id: "ga-003",
      title: "系统公告：考试规则更新",
      content: "线上考试支持自动监测，建议提前通知各单位学员。",
      time: "昨天 18:30",
      category: "系统公告"
    }
  ],
  MA: [
    {
      id: "ma-001",
      title: "桥梁维护专项考试提醒",
      content: "线上考试将于 4 月 18 日 09:00 开始，请确认监考安排与学员名单。",
      time: "8 分钟前",
      category: "学习任务",
      unread: true,
      link: "/ma/plan-detail?id=plan-bridge-2025"
    },
    {
      id: "ma-002",
      title: "资质续期审批通过",
      content: "安全生产管理员证书续期申请已通过，证书有效期延长至 2025-07-18。",
      time: "今天 10:16",
      category: "资质"
    },
    {
      id: "ma-003",
      title: "系统公告：版本升级",
      content: "学习平台将于 4 月 15 日凌晨升级，届时将短暂停机，请提前安排学习计划。",
      time: "昨天 18:40",
      category: "系统公告"
    }
  ],
  ST: [
    {
      id: "st-001",
      title: "桥梁维护专项考试提醒",
      content: "线上考试将于 4 月 18 日 09:00 开始，请提前完成阶段课程。",
      time: "5 分钟前",
      category: "学习任务",
      unread: true,
      link: "/st/exams"
    },
    {
      id: "st-002",
      title: "资质续期审批通过",
      content: "安全生产管理员证书续期申请已审核通过，证书有效期延长至 2025-07-18。",
      time: "今天 10:16",
      category: "资质",
      link: "/st/certificates"
    },
    {
      id: "st-003",
      title: "应急演练心得提醒",
      content: "请在 4 月 12 日前提交应急演练方案心得，以便主管复核。",
      time: "今天 09:00",
      category: "学习任务",
      link: "/st/tasks"
    },
    {
      id: "st-004",
      title: "系统公告：版本升级",
      content: "学习平台将于 4 月 15 日凌晨升级，届时将短暂停机，请提前安排学习计划。",
      time: "昨天 18:40",
      category: "系统公告"
    }
  ]
};

import type { NotificationItem } from "../components/NotificationFeed";
import type { PersonaKey } from "./personas";

export const NotificationMocks: Record<PersonaKey, NotificationItem[]> = {
  PA: [
    {
      id: "pa-notice-1",
      title: "新租户试用申请待处理",
      description: "贵州交控运营中心提交试用申请，预计下周进行导入。",
      time: "今天 10:12",
      tag: "租户运营"
    },
    {
      id: "pa-notice-2",
      title: "平台监控告警已恢复",
      description: "凌晨的 CDN 回源延迟问题已恢复，影响范围 < 5 分钟。",
      time: "今天 07:48"
    }
  ],
  GA: [
    {
      id: "ga-notice-1",
      title: "桥梁专项计划预警",
      description: "成贵二线三项目部完成率 62%，需安排督导。",
      time: "昨天 17:35",
      tag: "督导提醒"
    },
    {
      id: "ga-notice-2",
      title: "证书签发自动完成",
      description: "24 名学员完成复核，证书已发送，可在证书中心查看。",
      time: "昨天 09:20"
    }
  ],
  MA: [
    {
      id: "ma-notice-1",
      title: "考试监考排班确认",
      description: "桥梁专项考试将在 48 小时后开考，请尽快确认监考人员。",
      time: "今天 08:05",
      tag: "监考提醒"
    }
  ],
  ST: [
    {
      id: "st-notice-1",
      title: "新课程待学习：《桥梁病害识别》",
      description: "该课程属于桥梁维护 B 级必修，请在 4 月 30 日前完成。",
      time: "今天 09:15",
      tag: "必修课程"
    },
    {
      id: "st-notice-2",
      title: "证书即将到期提醒",
      description: "桥梁维护工程师（乙级）证书将在 60 天后到期，点击查看复训安排。",
      time: "昨天 11:02"
    }
  ]
};

