import { useMemo, useState, useEffect } from "react";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  CourseLibraryMock,
  CourseMetrics,
  CourseSources,
  CourseStatuses,
  CourseTags,
  CourseTypes,
  CoursePreviewBadges,
  type CourseItem
} from "../mocks/courseLibrary";

const CourseLibraryPage = () => {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    CourseLibraryMock[0]?.id ?? null
  );
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return CourseLibraryMock.filter((course) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        course.title.includes(keyword.trim()) ||
        course.courseCode.toLowerCase().includes(keyword.trim().toLowerCase()) ||
        course.owner.includes(keyword.trim());
      const matchStatus =
        statusFilter === "all" ? true : course.status === statusFilter;
      const matchType = typeFilter === "all" ? true : course.type === typeFilter;
      const matchSource =
        sourceFilter === "all" ? true : course.source === sourceFilter;
      const matchTag =
        tagFilter === "all" ? true : course.tags.includes(tagFilter);
      return matchKeyword && matchStatus && matchType && matchSource && matchTag;
    });
  }, [keyword, sourceFilter, statusFilter, tagFilter, typeFilter]);

  const selectedCourse = useMemo(
    () => filteredCourses.find((course) => course.id === selectedCourseId) ?? null,
    [filteredCourses, selectedCourseId]
  );

  return (
    <div className="page">
      <PageSection
        title="公共课程库概览"
        description="集中管理跨租户共享的课程，掌握审核进度与授权情况。"
      >
        <div className="kpi-grid">
          {CourseMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="课程资源列表"
        description="筛选课程并执行上线、授权、审核等操作。"
        action={
          <div className="action-group">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              批量授权
            </button>
            <button type="button" className="topbar__cta" onClick={() => setCourseModalOpen(true)}>
              新建课程
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索课程名称 / 编号 / 上传人"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {CourseStatuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              {CourseTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
              {CourseSources.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
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
              保存视图
            </button>
            <button
              type="button"
              className="filter-bar__link"
              onClick={() => {
                setKeyword("");
                setStatusFilter("all");
                setTypeFilter("all");
                setSourceFilter("all");
                setTagFilter("all");
              }}
            >
              重置
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
                <th>版本号</th>
                <th>覆盖租户</th>
                <th>状态</th>
                <th>审核状态</th>
                <th>来源</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  active={course.id === selectedCourseId}
                  onSelect={() => setSelectedCourseId(course.id)}
                />
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={11}>
                    <div className="empty-state">
                      <h4>暂无符合条件的课程</h4>
                      <p>试着调整筛选条件，或新建课程。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedCourse && (
          <CoursePreview course={selectedCourse} />
        )}
      </PageSection>
      {courseModalOpen && (
        <CourseModal onClose={() => setCourseModalOpen(false)} onSubmit={() => setCourseModalOpen(false)} />
      )}
    </div>
  );
};

const CourseRow = ({
  course,
  active,
  onSelect
}: {
  course: CourseItem;
  active: boolean;
  onSelect: () => void;
}) => {
  return (
    <tr
      className={active ? "table-row--active" : undefined}
      onClick={onSelect}
      role="button"
    >
      <td>
        <div className="course-cell">
          <strong>{course.title}</strong>
          <span>{course.courseCode}</span>
        </div>
      </td>
      <td>{courseTypeLabel(course.type)}</td>
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
          {course.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td>{course.version}</td>
      <td>{course.tenantCount}</td>
      <td>
        <span className={`badge ${CoursePreviewBadges[course.status]}`}>
          {courseStatusLabel(course.status)}
        </span>
      </td>
      <td>
        <span className={`badge ${course.reviewStatus === "approved" ? "badge--success" : course.reviewStatus === "pending" ? "badge--warning" : "badge--danger"}`}>
          {reviewStatusLabel(course.reviewStatus)}
        </span>
      </td>
      <td>{course.source === "platform" ? "平台自建" : "租户贡献"}</td>
      <td>
        <div className="table-actions">
          <button type="button">授权</button>
          <button type="button">上线</button>
        </div>
      </td>
    </tr>
  );
};

const CoursePreview = ({ course }: { course: CourseItem }) => (
  <div className="panel">
    <div className="panel__header">
      <div>
        <span className={`badge ${CoursePreviewBadges[course.status]}`}>
          {courseStatusLabel(course.status)}
        </span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <div className="panel__meta">
        <div>
          <span>版本</span>
          <strong>{course.version}</strong>
        </div>
        <div>
          <span>最近更新</span>
          <strong>{new Date(course.updatedAt).toLocaleDateString()}</strong>
        </div>
        <div>
          <span>覆盖租户</span>
          <strong>{course.tenantCount}</strong>
        </div>
      </div>
    </div>
    <div className="panel__body">
      <div className="panel__grid">
        <div>
          <h4>适用岗位</h4>
          <div className="course-meta course-meta--stack">
            {course.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
          <h4>标签</h4>
          <div className="tag-list">
            {course.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <h4>资源附件</h4>
          <ul className="panel__list">
            {course.attachments.map((file) => (
              <li key={file.name}>
                <span>{file.name}</span>
                <span>{file.size}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>审核与版本记录</h4>
          <ul className="panel__list">
            {course.history.map((record) => (
              <li key={record.version}>
                <span>{record.date}</span>
                <span>{record.version}</span>
                <span>{record.comment}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const courseTypeLabel = (type: CourseItem["type"]) => {
  switch (type) {
    case "video":
      return "视频课件";
    case "document":
      return "文档课件";
    case "live":
      return "直播回放";
    case "assessment":
      return "测验课件";
    default:
      return type;
  }
};

const courseStatusLabel = (status: CourseItem["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审核";
    case "published":
      return "已上线";
    case "retired":
      return "已下线";
    default:
      return status;
  }
};

const reviewStatusLabel = (status: CourseItem["reviewStatus"]) => {
  switch (status) {
    case "approved":
      return "已审核";
    case "pending":
      return "审核中";
    case "rejected":
      return "已驳回";
    default:
      return status;
  }
};

const CourseRoleOptions = [
  "桥梁工程师",
  "隧道值守",
  "养护班组长",
  "安全管理员",
  "监测人员"
];

const CourseModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const [form, setForm] = useState({
    title: "",
    code: "",
    type: "video",
    duration: "",
    source: "platform",
    description: "",
    roles: [] as string[],
    roleInput: CourseRoleOptions[0],
    tags: [] as string[],
    tagInput: CourseTags[0],
    videoFiles: [] as File[],
    docFiles: [] as File[]
  });

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleAddRole = () => {
    setForm((prev) => {
      if (!prev.roleInput || prev.roles.includes(prev.roleInput)) {
        return prev;
      }
      return { ...prev, roles: [...prev.roles, prev.roleInput] };
    });
  };

  const handleRemoveRole = (role: string) => {
    setForm((prev) => ({ ...prev, roles: prev.roles.filter((item) => item !== role) }));
  };

  const handleAddTag = () => {
    setForm((prev) => {
      if (!prev.tagInput || prev.tags.includes(prev.tagInput)) {
        return prev;
      }
      return { ...prev, tags: [...prev.tags, prev.tagInput] };
    });
  };

  const handleRemoveTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((item) => item !== tag) }));
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    setForm((prev) => ({
      ...prev,
      videoFiles: [...prev.videoFiles, ...Array.from(files)]
    }));
    event.target.value = "";
  };

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    setForm((prev) => ({
      ...prev,
      docFiles: [...prev.docFiles, ...Array.from(files)]
    }));
    event.target.value = "";
  };

  const handleRemoveVideo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      videoFiles: prev.videoFiles.filter((_, idx) => idx !== index)
    }));
  };

  const handleRemoveDoc = (index: number) => {
    setForm((prev) => ({
      ...prev,
      docFiles: prev.docFiles.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">公共课程库 · 新建课程</span>
            <h3>新建课程</h3>
            <p>填写课程基础信息，后续可上传课件、提交审核并授权至租户使用。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <h4>课程基础信息</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>课程名称</span>
                <input
                  value={form.title}
                  placeholder="请输入课程名称"
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>课程编号</span>
                <input
                  value={form.code}
                  placeholder="用于区分课程的唯一编号"
                  onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>课程类型</span>
                <select
                  value={form.type}
                  onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                >
                  {CourseTypes.filter((option) => option.value !== "all").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>课时 / 时长</span>
                <input
                  value={form.duration}
                  placeholder="例如：45 分钟 / 20 页"
                  onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>来源</span>
                <select
                  value={form.source}
                  onChange={(event) => setForm((prev) => ({ ...prev, source: event.target.value }))}
                >
                  {CourseSources.filter((option) => option.value !== "all").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>适用岗位</h4>
            <div className="modal__chips">
              <div className="modal__chips-control">
                <select
                  value={form.roleInput}
                  onChange={(event) => setForm((prev) => ({ ...prev, roleInput: event.target.value }))}
                >
                  {CourseRoleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleAddRole}>
                  添加岗位
                </button>
              </div>
              <div className="modal__chips-tags">
                {form.roles.map((role) => (
                  <span key={role} className="tag">
                    {role}
                    <button type="button" onClick={() => handleRemoveRole(role)}>
                      ×
                    </button>
                  </span>
                ))}
                {form.roles.length === 0 && <span className="modal__chips-placeholder">暂未选择岗位</span>}
              </div>
            </div>
          </section>

          <section className="modal__section">
            <h4>课程标签</h4>
            <div className="modal__chips">
              <div className="modal__chips-control">
                <select
                  value={form.tagInput}
                  onChange={(event) => setForm((prev) => ({ ...prev, tagInput: event.target.value }))}
                >
                  {CourseTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleAddTag}>
                  添加标签
                </button>
              </div>
              <div className="modal__chips-tags">
                {form.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      ×
                    </button>
                  </span>
                ))}
                {form.tags.length === 0 && <span className="modal__chips-placeholder">暂未选择标签</span>}
              </div>
            </div>
          </section>

          <section className="modal__section">
            <h4>课程简介</h4>
            <label className="modal__field">
              <span>简介内容</span>
              <textarea
                rows={3}
                value={form.description}
                placeholder="简要介绍课程内容、目标与亮点"
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>
          </section>

          <section className="modal__section">
            <h4>课件上传</h4>
            <div className="modal__upload-grid">
              <div className="modal__upload-card">
                <span className="modal__upload-title">视频课件</span>
                <p className="modal__upload-desc">支持 MP4、MOV，单个文件不超过 500MB，可多选上传。</p>
                <label className="modal__upload-drop">
                  <input type="file" accept="video/*" multiple onChange={handleVideoUpload} />
                  <div className="modal__upload-icon">📹</div>
                  <div>
                    <strong>点击上传或拖拽至此</strong>
                    <p>建议分辨率 1080p，支持多文件上传。</p>
                  </div>
                </label>
                <ul className="modal__upload-list">
                  {form.videoFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      <span>{file.name}</span>
                      <button type="button" onClick={() => handleRemoveVideo(index)}>
                        删除
                      </button>
                    </li>
                  ))}
                  {form.videoFiles.length === 0 && <li className="modal__upload-empty">暂未上传视频课件</li>}
                </ul>
              </div>
              <div className="modal__upload-card">
                <span className="modal__upload-title">文档课件</span>
                <p className="modal__upload-desc">支持 PPT、PPTX、PDF，单个文件不超过 100MB，可多选上传。</p>
                <label className="modal__upload-drop">
                  <input type="file" accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" multiple onChange={handleDocUpload} />
                  <div className="modal__upload-icon">📄</div>
                  <div>
                    <strong>点击上传或拖拽至此</strong>
                    <p>可上传课件讲义、操作指南等文档。</p>
                  </div>
                </label>
                <ul className="modal__upload-list">
                  {form.docFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      <span>{file.name}</span>
                      <button type="button" onClick={() => handleRemoveDoc(index)}>
                        删除
                      </button>
                    </li>
                  ))}
                  {form.docFiles.length === 0 && <li className="modal__upload-empty">暂未上传文档课件</li>}
                </ul>
              </div>
            </div>
          </section>

          <p className="modal__hint">
            保存为草稿后，可在课程详情中继续上传课件、设置授权策略并提交审核。
          </p>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            取消
          </button>
          <button type="button" className="topbar__cta" onClick={onSubmit}>
            保存为草稿
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseLibraryPage;

