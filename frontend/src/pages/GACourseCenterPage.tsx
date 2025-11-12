import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  CourseStatuses,
  CourseTypes,
  CourseSources,
  CourseTags,
  PlatformCourseMock
} from "../mocks/gaCourseLibrary";
import {
  GACourseLibraryMock,
  GACourseStatuses,
  GACourseSources,
  type GACourseItem
} from "../mocks/gaCourseLibrary";

const GACourseCenterPage = () => {
  const [publicKeyword, setPublicKeyword] = useState("");
  const [publicStatus, setPublicStatus] = useState<string>("all");
  const [publicType, setPublicType] = useState<string>("all");
  const [publicSource, setPublicSource] = useState<string>("all");
  const [publicTag, setPublicTag] = useState<string>("all");

  const [localKeyword, setLocalKeyword] = useState("");
  const [localStatus, setLocalStatus] = useState<string>("all");
  const [localSource, setLocalSource] = useState<string>("all");

  const publicCourses = useMemo(() => {
    return PlatformCourseMock.filter((course) => {
      const matchKeyword =
        publicKeyword.trim().length === 0 ||
        course.title.includes(publicKeyword.trim()) ||
        course.courseCode.toLowerCase().includes(publicKeyword.trim().toLowerCase()) ||
        course.owner.includes(publicKeyword.trim());
      const matchStatus = publicStatus === "all" ? true : course.status === publicStatus;
      const matchType = publicType === "all" ? true : course.type === publicType;
      const matchSource = publicSource === "all" ? true : course.source === publicSource;
      const matchTag = publicTag === "all" ? true : course.tags.includes(publicTag);
      return matchKeyword && matchStatus && matchType && matchSource && matchTag;
    });
  }, [publicKeyword, publicStatus, publicType, publicSource, publicTag]);

  const localCourses = useMemo(() => {
    return GACourseLibraryMock.filter((course) => {
      const matchKeyword =
        localKeyword.trim().length === 0 ||
        course.title.includes(localKeyword.trim()) ||
        course.courseCode.toLowerCase().includes(localKeyword.trim().toLowerCase());
      const matchStatus = localStatus === "all" ? true : course.status === localStatus;
      const matchSource = localSource === "all" ? true : course.source === localSource;
      return matchKeyword && matchStatus && matchSource;
    });
  }, [localKeyword, localSource, localStatus]);

  return (
    <div className="page">
      <PageSection
        title="公共课程库"
        description="从平台公共课程库挑选课程，加入主管单位课程池。"
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索课程名称 / 编号 / 上传人"
              value={publicKeyword}
              onChange={(event) => setPublicKeyword(event.target.value)}
            />
            <select value={publicStatus} onChange={(event) => setPublicStatus(event.target.value)}>
              {CourseStatuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={publicType} onChange={(event) => setPublicType(event.target.value)}>
              {CourseTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={publicSource} onChange={(event) => setPublicSource(event.target.value)}>
              {CourseSources.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={publicTag} onChange={(event) => setPublicTag(event.target.value)}>
              <option value="all">全部标签</option>
              {CourseTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link">
              重置
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>课程名称</th>
                <th>类型</th>
                <th>课时/页数</th>
                <th>适用岗位</th>
                <th>标签</th>
                <th>来源</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {publicCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="course-cell">
                      <strong>{course.title}</strong>
                      <span>{course.courseCode}</span>
                    </div>
                  </td>
                  <td>{course.type}</td>
                  <td>{course.duration}</td>
                  <td>
                    <div className="course-meta">
                      {course.roles.map((role) => (
                        <span key={role}>{role}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="tag-list">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag tag--slate">
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 3 && <span className="tag">+{course.tags.length - 3}</span>}
                    </div>
                  </td>
                  <td>{course.source === "platform" ? "平台自建" : "租户贡献"}</td>
                  <td>{statusLabel(course.status)}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button">加入课程池</button>
                    </div>
                  </td>
                </tr>
              ))}
              {publicCourses.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <h4>暂无符合条件的课程</h4>
                      <p>调整筛选条件重新搜索。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        title="主管单位课程池"
        description="维护本单位可用课程，可自建课程并提交平台审核。"
        action={
          <button type="button" className="topbar__cta">
            新建课程
          </button>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索课程名称 / 编号"
              value={localKeyword}
              onChange={(event) => setLocalKeyword(event.target.value)}
            />
            <select value={localStatus} onChange={(event) => setLocalStatus(event.target.value)}>
              {GACourseStatuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={localSource} onChange={(event) => setLocalSource(event.target.value)}>
              {GACourseSources.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link">
              导出课程清单
            </button>
          </div>
        </div>

        <div className="table-wrapper table-wrapper--selectable">
          <table className="data-table">
            <thead>
              <tr>
                <th>课程名称</th>
                <th>类型</th>
                <th>课时/页数</th>
                <th>适用岗位</th>
                <th>标签</th>
                <th>来源</th>
                <th>状态</th>
                <th>最近更新</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {localCourses.map((course) => (
                <CourseRow key={course.id} course={course} />
              ))}
              {localCourses.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <h4>课程池为空</h4>
                      <p>尝试从公共课程库加入课程或自建课程。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageSection>
    </div>
  );
};

const CourseRow = ({ course }: { course: GACourseItem }) => {
  return (
    <tr>
      <td>
        <div className="course-cell">
          <strong>{course.title}</strong>
          <span>{course.courseCode}</span>
        </div>
      </td>
      <td>{course.type}</td>
      <td>{course.duration}</td>
      <td>
        <div className="course-meta">
          {course.roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
      </td>
      <td>
        <div className="tag-list">
          {course.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag tag--slate">
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && <span className="tag">+{course.tags.length - 3}</span>}
        </div>
      </td>
      <td>{course.source === "platform" ? "公共课程库" : "自建课程"}</td>
      <td>
        <span className={`badge ${localStatusBadge(course.status)}`}>{localStatusLabel(course.status)}</span>
      </td>
      <td>{new Date(course.updatedAt).toLocaleDateString()}</td>
      <td>
        <div className="table-actions">
          <button type="button">编辑</button>
          {course.status === "pending" && <button type="button">撤回审核</button>}
          {course.status === "draft" && <button type="button">提交审核</button>}
        </div>
      </td>
    </tr>
  );
};

const statusLabel = (status: string) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审核";
    case "published":
      return "已上线";
    case "disabled":
      return "已下线";
    default:
      return status;
  }
};

const localStatusLabel = (status: GACourseItem["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审核";
    case "published":
      return "已发布";
    case "archived":
      return "已归档";
    default:
      return status;
  }
};

const localStatusBadge = (status: GACourseItem["status"]) => {
  switch (status) {
    case "draft":
      return "badge--info";
    case "pending":
      return "badge--warning";
    case "published":
      return "badge--success";
    case "archived":
      return "badge--soft";
    default:
      return "badge--soft";
  }
};

export default GACourseCenterPage;
