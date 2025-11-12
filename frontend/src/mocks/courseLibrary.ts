export type CourseStatus = "draft" | "pending" | "published" | "retired";
export type ReviewStatus = "approved" | "pending" | "rejected";
export type CourseSource = "platform" | "tenant";

export type CourseItem = {
  id: string;
  title: string;
  courseCode: string;
  type: "video" | "document" | "live" | "assessment";
  duration: string;
  roles: string[];
  tags: string[];
  version: string;
  updatedAt: string;
  tenantCount: number;
  status: CourseStatus;
  reviewStatus: ReviewStatus;
  source: CourseSource;
  owner: string;
  rating?: number;
  description: string;
  attachments: Array<{ name: string; size: string }>;
  history: Array<{ version: string; date: string; comment: string }>;
};

export const CourseMetrics = [
  {
    id: "course-total",
    label: "课程总量",
    value: "182 门",
    trendLabel: "较上月",
    trendValue: "+12",
    status: "up" as const
  },
  {
    id: "course-new",
    label: "近30日新增",
    value: "18 门",
    trendLabel: "租户贡献",
    trendValue: "7",
    status: "up" as const
  },
  {
    id: "course-pending",
    label: "待审核课程",
    value: "5 门",
    trendLabel: "需处理",
    trendValue: "今日新增 2",
    status: "down" as const
  },
  {
    id: "course-tenant-cover",
    label: "覆盖租户数",
    value: "41 家",
    trendLabel: "平均授权",
    trendValue: "4.4 / 课",
    status: "stable" as const
  }
];

export const CourseTypes = [
  { value: "all", label: "全部类型" },
  { value: "video", label: "视频课件" },
  { value: "document", label: "文档课件" },
  { value: "live", label: "直播回放" },
  { value: "assessment", label: "测验课件" }
] as const;

export const CourseStatuses = [
  { value: "all", label: "全部状态" },
  { value: "published", label: "已上线" },
  { value: "pending", label: "待审核" },
  { value: "draft", label: "草稿" },
  { value: "retired", label: "已下线" }
] as const;

export const CourseSources = [
  { value: "all", label: "全部来源" },
  { value: "platform", label: "平台自建" },
  { value: "tenant", label: "租户贡献" }
] as const;

export const CourseTags = [
  "桥梁安全",
  "结构检测",
  "隧道运维",
  "防汛应急",
  "智能监测",
  "法规制度"
] as const;

export const CourseLibraryMock: CourseItem[] = [
  {
    id: "course-001",
    title: "桥梁结构健康监测与评估",
    courseCode: "BRG-STR-001",
    type: "video",
    duration: "45 分钟",
    roles: ["桥梁工程师", "监测人员"],
    tags: ["桥梁安全", "智能监测"],
    version: "v3.2",
    updatedAt: "2024-04-12T09:20:00Z",
    tenantCount: 29,
    status: "published",
    reviewStatus: "approved",
    source: "platform",
    owner: "平台教研组",
    rating: 4.8,
    description:
      "讲解桥梁结构健康监测体系搭建、监测数据分析、预警策略与案例实操，适合桥梁工程技术人员。",
    attachments: [
      { name: "课程讲义.pdf", size: "12MB" },
      { name: "监测案例数据.xlsx", size: "3MB" }
    ],
    history: [
      { version: "v3.2", date: "2024-04-12", comment: "新增 AI 智能诊断模块" },
      { version: "v3.1", date: "2023-12-05", comment: "补充案例视频" }
    ]
  },
  {
    id: "course-002",
    title: "公路隧道防火与应急演练",
    courseCode: "TUN-SAFE-014",
    type: "live",
    duration: "1 小时 20 分",
    roles: ["隧道值守", "安全员"],
    tags: ["防汛应急", "隧道运维"],
    version: "v1.6",
    updatedAt: "2024-04-16T14:05:00Z",
    tenantCount: 18,
    status: "pending",
    reviewStatus: "pending",
    source: "tenant",
    owner: "浙江高速集团",
    description:
      "演示隧道火灾应急预案、组织演练流程、装备使用与协同通信，含直播互动答疑。",
    attachments: [{ name: "演练流程手册.docx", size: "2MB" }],
    history: [
      { version: "v1.6", date: "2024-04-16", comment: "上传租户贡献直播回放" },
      { version: "v1.5", date: "2024-03-01", comment: "补充应急预案模板" }
    ]
  },
  {
    id: "course-003",
    title: "桥梁检测机器人巡检操作规程",
    courseCode: "BRG-EMG-023",
    type: "document",
    duration: "26 页",
    roles: ["巡检班组长"],
    tags: ["智能监测"],
    version: "v2.0",
    updatedAt: "2024-03-22T10:45:00Z",
    tenantCount: 15,
    status: "published",
    reviewStatus: "approved",
    source: "platform",
    owner: "平台教研组",
    description:
      "系统介绍桥梁巡检机器人的部署、操作要点、常见故障排查及巡检报告生成。",
    attachments: [
      { name: "巡检指引.pdf", size: "8MB" },
      { name: "机器人配置说明.xlsx", size: "1.3MB" }
    ],
    history: [
      { version: "v2.0", date: "2024-03-22", comment: "升级巡检流程规范" },
      { version: "v1.4", date: "2023-11-30", comment: "扩充常见问题解答" }
    ]
  },
  {
    id: "course-004",
    title: "跨海大桥缆索养护关键技术",
    courseCode: "BRG-MNT-045",
    type: "video",
    duration: "55 分钟",
    roles: ["桥梁工程师"],
    tags: ["桥梁安全"],
    version: "v1.2",
    updatedAt: "2024-04-01T08:50:00Z",
    tenantCount: 9,
    status: "draft",
    reviewStatus: "pending",
    source: "tenant",
    owner: "粤港澳大湾区交通指挥中心",
    description:
      "聚焦跨海大桥缆索监测与养护要点，分享典型案例及风险预警经验。",
    attachments: [{ name: "缆索检测流程.pptx", size: "18MB" }],
    history: [
      { version: "v1.2", date: "2024-04-01", comment: "上传租户新版课程" },
      { version: "v1.0", date: "2024-02-18", comment: "课程初稿" }
    ]
  },
  {
    id: "course-005",
    title: "国省干线桥梁安全检查规范解读",
    courseCode: "STD-BRG-010",
    type: "document",
    duration: "38 页",
    roles: ["安全管理人员"],
    tags: ["法规制度", "桥梁安全"],
    version: "v2.5",
    updatedAt: "2024-02-28T11:30:00Z",
    tenantCount: 35,
    status: "published",
    reviewStatus: "approved",
    source: "platform",
    owner: "平台教研组",
    description:
      "逐条解读最新版国省干线桥梁安全检查规范，结合典型案例说明执行要点。",
    attachments: [
      { name: "检查规范解读.pdf", size: "15MB" },
      { name: "检查表单模板.xlsx", size: "1.6MB" }
    ],
    history: [
      { version: "v2.5", date: "2024-02-28", comment: "更新政策条文" },
      { version: "v2.3", date: "2023-09-12", comment: "补充案例" }
    ]
  }
];

export const CoursePreviewBadges: Record<CourseStatus, string> = {
  draft: "badge--info",
  pending: "badge--warning",
  published: "badge--success",
  retired: "badge--danger"
};

