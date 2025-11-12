export type PersonaKey = "PA" | "GA" | "MA" | "ST";

type Persona = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
};

export const Personas: Record<PersonaKey, Persona> = {
  PA: {
    name: "平台超级管理员（运营方）",
    tagline: "统筹租户服务、资源与运维健康状态",
    description:
      "负责开通租户、维护套餐、监控平台总体运行情况，并作为甲方的重要支撑团队。",
    highlights: ["租户开通与配置", "平台资源审核", "运行健康监控"]
  },
  GA: {
    name: "主管单位管理员（公路局）",
    tagline: "制定计划、监管执行，确保培训合规达标",
    description:
      "负责年度培训计划、课程及考试管理，以及证书发放、数据报送等核心工作。",
    highlights: ["年度计划编排", "学习进度督导", "证书签发与报送"]
  },
  MA: {
    name: "管养单位管理员",
    tagline: "执行上级安排，保障学习与考试落地",
    description:
      "负责接收计划、安排学员、维护学习与考试现场数据，反馈执行情况。",
    highlights: ["学员管理", "现场监考", "执行反馈"]
  },
  ST: {
    name: "工程师学员",
    tagline: "完成岗位学习任务，获取资质证书",
    description:
      "在系统中接收学习计划，按步骤完成课程、考试，并管理个人资料与证书。",
    highlights: ["在线学习", "模拟与正式考试", "证书自助下载"]
  }
};

