import {
  CourseLibraryMock,
  CourseStatuses,
  CourseTypes,
  CourseSources,
  CourseTags
} from "./courseLibrary";

export type GACourseStatus = "draft" | "pending" | "published" | "archived";

export type GACourseItem = {
  id: string;
  title: string;
  courseCode: string;
  type: string;
  duration: string;
  roles: string[];
  tags: string[];
  owner: string;
  status: GACourseStatus;
  source: "platform" | "custom";
  updatedAt: string;
  reviewNote?: string;
};

export const GACourseStatuses = [
  { value: "all", label: "全部状态" },
  { value: "draft", label: "草稿" },
  { value: "pending", label: "待审核" },
  { value: "published", label: "已发布" },
  { value: "archived", label: "已归档" }
];

export const GACourseSources = [
  { value: "all", label: "全部来源" },
  { value: "platform", label: "公共课程库" },
  { value: "custom", label: "自建课程" }
];

export const GACourseLibraryMock: GACourseItem[] = [
  {
    id: "ga-course-001",
    title: "桥梁健康监测能力提升",
    courseCode: "GA-BRG-2024-001",
    type: "视频课程",
    duration: "4.5h",
    roles: ["桥梁工程师"],
    tags: ["桥梁安全", "智能监测"],
    owner: "主管单位教研组",
    status: "published",
    source: "platform",
    updatedAt: "2025-04-05T08:32:00Z"
  },
  {
    id: "ga-course-002",
    title: "隧道火灾应急联动演练",
    courseCode: "GA-TUN-2024-003",
    type: "直播回放",
    duration: "2.0h",
    roles: ["防汛指挥", "应急值班"],
    tags: ["防汛应急"],
    owner: "主管单位教研组",
    status: "pending",
    source: "custom",
    updatedAt: "2025-04-04T10:18:00Z",
    reviewNote: "等待平台审核课件版权说明"
  },
  {
    id: "ga-course-003",
    title: "公路桥梁安全管理办法实务班",
    courseCode: "GA-LAW-2024-002",
    type: "文档课件",
    duration: "68页",
    roles: ["安全管理员"],
    tags: ["法规合规"],
    owner: "主管单位法务中心",
    status: "published",
    source: "custom",
    updatedAt: "2025-03-30T14:05:00Z"
  },
  {
    id: "ga-course-004",
    title: "桥梁巡检案例解析（2025版）",
    courseCode: "GA-BRG-2025-009",
    type: "视频课程",
    duration: "3.2h",
    roles: ["巡检班组长"],
    tags: ["巡检管理"],
    owner: "主管单位教研组",
    status: "draft",
    source: "custom",
    updatedAt: "2025-04-02T07:40:00Z"
  }
];

export {
  CourseLibraryMock as PlatformCourseMock,
  CourseStatuses,
  CourseTypes,
  CourseSources,
  CourseTags
};
