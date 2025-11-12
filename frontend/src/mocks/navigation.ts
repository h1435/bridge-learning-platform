import type { PersonaKey } from "./personas";

export type Priority = "P1" | "P2" | "P3";

export type NavItem = {
  code: string;
  title: string;
  path: string;
  priority: Priority;
  implemented: boolean;
  component?:
    | "overview"
    | "plans"
    | "exams"
    | "certificates"
    | "notifications"
    | "tenants"
    | "tenantDetail"
    | "tenantWizard"
    | "courseLibrary"
    | "questionBank"
    | "examTemplates"
    | "tagManagement"
    | "releaseManagement"
    | "runMonitoring"
    | "platformDashboard"
    | "gaCourseCenter"
    | "gaTrainingPlans"
    | "gaPlanDetail"
    | "gaPlanEditor"
    | "gaExams"
    | "gaCertificates"
    | "gaReviewWorkspace"
  | "gaUnits"
  | "maOrganization"
  | "maLearners"
  | "maPlans"
  | "maPlanDetail";
};

export type NavModule = {
  label: string;
  items: NavItem[];
};

export const NavigationByPersona: Record<PersonaKey, NavModule[]> = {
  PA: [
    {
      label: "租户与资源",
      items: [
        {
          code: "PA-01-01",
          title: "租户列表",
          path: "/pa/tenant-list",
          priority: "P2",
          implemented: true,
          component: "tenants"
        },
        {
          code: "PA-01-02",
          title: "租户详情",
          path: "/pa/tenant-detail",
          priority: "P2",
          implemented: true,
          component: "tenantDetail"
        },
        {
          code: "PA-01-03",
          title: "新建租户向导",
          path: "/pa/tenant-wizard",
          priority: "P3",
          implemented: true,
          component: "tenantWizard"
        }
      ]
    },
    {
      label: "资源中心",
      items: [
        {
          code: "PA-02-01",
          title: "公共课程库",
          path: "/pa/course-library",
          priority: "P3",
          implemented: true,
          component: "courseLibrary"
        },
        {
          code: "PA-02-02",
          title: "公共题库",
          path: "/pa/question-bank",
          priority: "P3",
          implemented: true,
          component: "questionBank"
        },
        {
          code: "PA-02-03",
          title: "标签管理",
          path: "/pa/tag-management",
          priority: "P3",
          implemented: true,
          component: "tagManagement"
        },
        {
          code: "PA-02-04",
          title: "试卷管理",
          path: "/pa/exam-templates",
          priority: "P3",
          implemented: true,
          component: "examTemplates"
        }
      ]
    },
    {
      label: "平台运维",
      items: [
        {
          code: "PA-03-01",
          title: "版本发布",
          path: "/pa/releases",
          priority: "P2",
          implemented: true,
          component: "releaseManagement"
        },
        {
          code: "PA-03-02",
          title: "运行监控",
          path: "/pa/monitor",
          priority: "P2",
          implemented: true,
          component: "runMonitoring"
        },
        {
          code: "PA-03-03",
          title: "工单中心",
          path: "/pa/tickets",
          priority: "P2",
          implemented: false
        },
        {
          code: "PA-04-01",
          title: "消息通知",
          path: "/pa/notifications",
          priority: "P1",
          implemented: true,
          component: "notifications"
        },
        {
          code: "PA-04-02",
          title: "平台运营仪表盘",
          path: "/pa/overview",
          priority: "P2",
          implemented: true,
          component: "platformDashboard"
        }
      ]
    }
  ],
  GA: [
    {
      label: "概览",
      items: [
        {
          code: "GA-01-01",
          title: "主管单位仪表盘",
          path: "/ga/overview",
          priority: "P1",
          implemented: true,
          component: "overview"
        }
      ]
    },
    {
      label: "课程中心",
      items: [
        {
          code: "GA-02-01",
          title: "课程中心",
          path: "/ga/course-center",
          priority: "P1",
          implemented: true,
          component: "gaCourseCenter"
        }
      ]
    },
    {
      label: "培训计划与考试",
      items: [
        {
          code: "GA-03-01",
          title: "培训计划列表",
          path: "/ga/plans",
          priority: "P1",
          implemented: true,
          component: "gaTrainingPlans"
        },
        {
          code: "GA-03-02",
          title: "培训计划编辑向导",
          path: "/ga/plan-editor",
          priority: "P2",
          implemented: true,
          component: "gaPlanEditor"
        },
        {
          code: "GA-03-03",
          title: "培训计划详情",
          path: "/ga/plan-detail",
          priority: "P2",
          implemented: true,
          component: "gaPlanDetail"
        },
        {
          code: "GA-03-04",
          title: "考试列表",
          path: "/ga/exams",
          priority: "P1",
          implemented: true,
          component: "gaExams"
        },
        {
          code: "GA-03-05",
          title: "证书管理",
          path: "/ga/certificates",
          priority: "P1",
          implemented: true,
          component: "gaCertificates"
        }
      ]
    },
    {
      label: "监管与报表",
      items: [
        {
          code: "GA-04-03",
          title: "资料审核工作台",
          path: "/ga/profile-review",
          priority: "P2",
          implemented: true,
          component: "gaReviewWorkspace"
        },
        {
          code: "GA-04-01",
          title: "管养单位列表",
          path: "/ga/unit-list",
          priority: "P2",
          implemented: true,
          component: "gaUnits"
        },
        {
          code: "GA-04-02",
          title: "消息中心",
          path: "/ga/notifications",
          priority: "P1",
          implemented: true,
          component: "notifications"
        }
      ]
    }
  ],
  MA: [
    {
      label: "概览",
      items: [
        {
          code: "MA-01-01",
          title: "单位仪表盘",
          path: "/ma/overview",
          priority: "P1",
          implemented: true,
          component: "overview"
        }
      ]
    },
    {
      label: "组织管理",
      items: [
        {
          code: "MA-02-01",
          title: "单位组织管理",
          path: "/ma/organization",
          priority: "P1",
          implemented: true,
          component: "maOrganization"
        },
        {
          code: "MA-02-02",
          title: "学员列表",
          path: "/ma/learners",
          priority: "P1",
          implemented: true,
          component: "maLearners"
        }
      ]
    },
    {
      label: "计划执行",
      items: [
        {
          code: "MA-03-01",
          title: "培训计划清单",
          path: "/ma/plans",
          priority: "P1",
          implemented: true,
          component: "maPlans"
        },
        {
          code: "MA-03-02",
          title: "计划执行详情",
          path: "/ma/plan-detail",
          priority: "P2",
          implemented: true,
          component: "maPlanDetail"
        }
      ]
    },
  ],
  ST: [
    {
      label: "学习中心",
      items: [
        {
          code: "ST-01-01",
          title: "学习仪表盘",
          path: "/st/overview",
          priority: "P1",
          implemented: true,
          component: "studentDashboard"
        },
        {
          code: "ST-02-01",
          title: "我的学习任务",
          path: "/st/tasks",
          priority: "P1",
          implemented: true,
          component: "studentTasks"
        },
        {
          code: "ST-02-02",
          title: "课程探索",
          path: "/st/courses",
          priority: "P2",
          implemented: true,
          component: "studentCourses"
        },
        {
          code: "ST-03-01",
          title: "考试中心",
          path: "/st/exams",
          priority: "P2",
          implemented: true,
          component: "studentExams"
        }
      ]
    },
    {
      label: "证书与消息",
      items: [
        {
          code: "ST-04-01",
          title: "证书列表",
          path: "/st/certificates",
          priority: "P1",
          implemented: true,
          component: "studentCertificates"
        },
        {
          code: "ST-05-01",
          title: "消息列表",
          path: "/st/notifications",
          priority: "P1",
          implemented: true,
          component: "notifications"
        },
        {
          code: "ST-06-01",
          title: "个人资料",
          path: "/st/profile",
          priority: "P2",
          implemented: true,
          component: "studentProfile"
        }
      ]
    }
  ]
};

