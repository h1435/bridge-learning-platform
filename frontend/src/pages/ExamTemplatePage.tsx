import { useEffect, useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  ExamTemplateMock,
  ExamTemplateMetrics,
  ExamTemplateRoles,
  ExamTemplateSources,
  ExamTemplateStatusBadge,
  ExamTemplateStatuses,
  type ExamTemplate
} from "../mocks/examTemplates";
import {
  KnowledgePoints,
  QuestionBankMock,
  QuestionSources,
  type QuestionItem
} from "../mocks/questionBank";

const ExamTemplatePage = () => {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [tenantFilter, setTenantFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    ExamTemplateMock[0]?.id ?? null
  );
  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const tenants = useMemo(() => {
    const unique = new Set(ExamTemplateMock.map((item) => item.tenantName));
    return ["全部租户/平台", ...Array.from(unique)];
  }, []);

  const filteredTemplates = useMemo(() => {
    return ExamTemplateMock.filter((template) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        template.title.includes(keyword.trim()) ||
        template.templateCode.toLowerCase().includes(keyword.trim()) ||
        template.associatedPlans.some((plan) => plan.includes(keyword.trim())) ||
        template.associatedCourses.some((course) => course.includes(keyword.trim()));
      const matchStatus =
        statusFilter === "all" ? true : template.status === statusFilter;
      const matchSource =
        sourceFilter === "all" ? true : template.source === sourceFilter;
      const matchRole =
        roleFilter === "all" ? true : template.roles.includes(roleFilter);
      const matchTenant =
        tenantFilter === "all" || tenantFilter === "全部租户/平台"
          ? true
          : template.tenantName === tenantFilter;
      return matchKeyword && matchStatus && matchSource && matchRole && matchTenant;
    });
  }, [keyword, roleFilter, sourceFilter, statusFilter, tenantFilter]);

  const selectedTemplate = useMemo(
    () => filteredTemplates.find((template) => template.id === selectedId) ?? null,
    [filteredTemplates, selectedId]
  );

  return (
    <div className="page">
      <PageSection
        title="试卷模板概览"
        description="从公共题库构建考试模板，支持关联课程或培训计划。"
      >
        <div className="kpi-grid">
          {ExamTemplateMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="试卷列表"
        description="维护试卷元数据、题目组成和关联关系，可提交审核或引用。"
        action={
          <div className="action-group">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              批量导出
            </button>
            <button type="button" className="topbar__cta" onClick={() => setTemplateModalOpen(true)}>
              新建试卷
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索试卷名称 / 试卷编号 / 关联课程"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {ExamTemplateStatuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
              {ExamTemplateSources.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <option value="all">全部岗位/角色</option>
              {ExamTemplateRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select value={tenantFilter} onChange={(event) => setTenantFilter(event.target.value)}>
              {tenants.map((tenant) => (
                <option key={tenant} value={tenant}>
                  {tenant}
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
                setSourceFilter("all");
                setRoleFilter("all");
                setTenantFilter("all");
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
                <th>试卷名称</th>
                <th>题目数量</th>
                <th>预计完成</th>
                <th>合格线</th>
                <th>适用岗位</th>
                <th>关联计划/课程</th>
                <th>来源</th>
                <th>状态</th>
                <th>最近更新</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <ExamTemplateRow
                  key={template.id}
                  template={template}
                  active={template.id === selectedId}
                  onSelect={() => setSelectedId(template.id)}
                />
              ))}
              {filteredTemplates.length === 0 && (
                <tr>
                  <td colSpan={10}>
                    <div className="empty-state">
                      <h4>暂无符合条件的试卷模板</h4>
                      <p>调整筛选条件或新建试卷。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedTemplate && <ExamTemplatePreview template={selectedTemplate} />}
      </PageSection>
      {templateModalOpen && (
        <ExamTemplateModal
          onClose={() => setTemplateModalOpen(false)}
          onSubmit={() => setTemplateModalOpen(false)}
        />
      )}
    </div>
  );
};

const ExamTemplateRow = ({
  template,
  active,
  onSelect
}: {
  template: ExamTemplate;
  active: boolean;
  onSelect: () => void;
}) => (
  <tr className={active ? "table-row--active" : undefined} onClick={onSelect} role="button">
    <td>
      <div className="exam-template-cell">
        <strong>{template.title}</strong>
        <span>{template.templateCode}</span>
      </div>
    </td>
    <td>{template.questionCount}</td>
    <td>{template.estimatedDuration} 分钟</td>
    <td>{template.passScore} 分</td>
    <td>
      <div className="exam-template-meta">
        {template.roles.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
    </td>
    <td>
      <div className="tag-list">
        {template.associatedPlans.slice(0, 2).map((plan) => (
          <span key={plan} className="tag tag--slate">
            {plan}
          </span>
        ))}
        {template.associatedPlans.length === 0 && template.associatedCourses.slice(0, 2).map((course) => (
          <span key={course} className="tag tag--slate">
            {course}
          </span>
        ))}
      </div>
    </td>
    <td>{template.source === "platform" ? "平台自建" : template.tenantName}</td>
    <td>
      <span className={`badge ${ExamTemplateStatusBadge[template.status]}`}>
        {statusLabel(template.status)}
      </span>
    </td>
    <td>
      <div className="exam-template-meta exam-template-meta--stack">
        <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
        <span>{template.updatedBy}</span>
      </div>
    </td>
    <td>
      <div className="table-actions">
        <button type="button">编辑</button>
        <button type="button">提交审核</button>
      </div>
    </td>
  </tr>
);

const ExamTemplatePreview = ({ template }: { template: ExamTemplate }) => (
  <div className="panel">
    <div className="panel__header">
      <div>
        <span className={`badge ${ExamTemplateStatusBadge[template.status]}`}>
          {statusLabel(template.status)}
        </span>
        <h3>{template.title}</h3>
        <p className="panel__sub">
          预计完成 {template.estimatedDuration} 分 · 合格线 {template.passScore} 分 · 题目顺序
          {template.shuffleOption === "fixed" ? "固定" : "可配置"}
        </p>
        <p>{template.description}</p>
      </div>
      <div className="panel__meta">
        <div>
          <span>模板编号</span>
          <strong>{template.templateCode}</strong>
        </div>
        <div>
          <span>来源</span>
          <strong>{template.source === "platform" ? "平台自建" : template.tenantName}</strong>
        </div>
        <div>
          <span>适用岗位</span>
          <strong>{template.roles.join("、")}</strong>
        </div>
      </div>
    </div>
    <div className="panel__body">
      <div className="panel__grid">
        <div>
          <h4>题目组成</h4>
          <ul className="panel__list">
            {template.questionBreakdown.map((item, index) => (
              <li key={index}>
                <span>{item.knowledgePoint}</span>
                <span>{item.questionType}</span>
                <span>{item.count} 题</span>
              </li>
            ))}
          </ul>
          <h4>关联课程 / 计划</h4>
          <div className="tag-list">
            {template.associatedCourses.map((course) => (
              <span key={course} className="tag">
                {course}
              </span>
            ))}
          </div>
          <div className="tag-list">
            {template.associatedPlans.map((plan) => (
              <span key={plan} className="tag tag--blue">
                {plan}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4>题目清单（节选）</h4>
          <ul className="panel__list">
            {template.composition.map((question) => (
              <li key={question.id}>
                <span>{question.type}</span>
                <span>{question.stem.slice(0, 40)}{question.stem.length > 40 ? "..." : ""}</span>
                <span>{question.score} 分 · {difficultyLabel(question.difficulty)}</span>
              </li>
            ))}
          </ul>
          <h4>操作记录</h4>
          <ul className="panel__list">
            {template.history.map((record, index) => (
              <li key={`${record.date}-${index}`}>
                <span>{record.date}</span>
                <span>{record.action}</span>
                <span>{record.operator}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const ExamTemplateModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const [form, setForm] = useState({
    title: "",
    templateCode: "",
    tenant: "平台通用",
    duration: "",
    passScore: "",
    shuffleOption: "fixed" as "fixed" | "configurable",
    description: "",
    roles: [] as string[],
    roleInput: ExamTemplateRoles[0],
    planInput: "",
    courseInput: "",
    plans: [] as string[],
    courses: [] as string[],
    selectedQuestionIds: [] as string[]
  });

  const [questionKeyword, setQuestionKeyword] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState<string>("all");
  const [questionDifficultyFilter, setQuestionDifficultyFilter] = useState<string>("all");
  const [questionSourceFilter, setQuestionSourceFilter] = useState<string>("all");
  const [questionStatusFilter, setQuestionStatusFilter] = useState<string>("all");
  const [questionReviewFilter, setQuestionReviewFilter] = useState<string>("all");
  const [questionKnowledgeFilter, setQuestionKnowledgeFilter] = useState<string>("all");
  const [questionRoleFilter, setQuestionRoleFilter] = useState<string>("all");
  const [questionTagFilter, setQuestionTagFilter] = useState<string>("all");

  const roleOptions = useMemo(() => {
    return Array.from(new Set(QuestionBankMock.flatMap((question) => question.roles)));
  }, []);

  const tagOptions = useMemo(() => {
    return Array.from(new Set(QuestionBankMock.flatMap((question) => question.tags)));
  }, []);

  const questionSources = useMemo(() => {
    const unique = new Set<string>(QuestionBankMock.map((question) => question.source));
    return ["all", ...Array.from(unique)];
  }, []);

  const questionStatuses = useMemo(() => {
    const unique = new Set<string>(QuestionBankMock.map((question) => question.status));
    return ["all", ...Array.from(unique)];
  }, []);

  const questionReviewStatuses = useMemo(() => {
    const unique = new Set<string>(QuestionBankMock.map((question) => question.reviewStatus));
    return ["all", ...Array.from(unique)];
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const filteredQuestions = useMemo(() => {
    return QuestionBankMock.filter((question) => {
      const matchKeyword =
        questionKeyword.trim().length === 0 ||
        question.stem.includes(questionKeyword.trim()) ||
        question.code.toLowerCase().includes(questionKeyword.trim().toLowerCase());
      const matchType =
        questionTypeFilter === "all" ? true : question.type === questionTypeFilter;
      const matchDifficulty =
        questionDifficultyFilter === "all"
          ? true
          : question.difficulty === questionDifficultyFilter;
      const matchSource =
        questionSourceFilter === "all" ? true : question.source === questionSourceFilter;
      const matchStatus =
        questionStatusFilter === "all" ? true : question.status === questionStatusFilter;
      const matchReview =
        questionReviewFilter === "all" ? true : question.reviewStatus === questionReviewFilter;
      const matchRole =
        questionRoleFilter === "all" ? true : question.roles.includes(questionRoleFilter);
      const matchKnowledge =
        questionKnowledgeFilter === "all"
          ? true
          : question.knowledgePoints.includes(questionKnowledgeFilter);
      const matchTag =
        questionTagFilter === "all" ? true : question.tags.includes(questionTagFilter);
      return (
        matchKeyword &&
        matchType &&
        matchDifficulty &&
        matchSource &&
        matchStatus &&
        matchReview &&
        matchRole &&
        matchKnowledge &&
        matchTag
      );
    });
  }, [
    questionKeyword,
    questionTypeFilter,
    questionDifficultyFilter,
    questionSourceFilter,
    questionStatusFilter,
    questionReviewFilter,
    questionKnowledgeFilter,
    questionRoleFilter,
    questionTagFilter
  ]);

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

  const handleAddPlan = () => {
    setForm((prev) => {
      if (!prev.planInput.trim() || prev.plans.includes(prev.planInput.trim())) {
        return prev;
      }
      return { ...prev, plans: [...prev.plans, prev.planInput.trim()], planInput: "" };
    });
  };

  const handleRemovePlan = (plan: string) => {
    setForm((prev) => ({ ...prev, plans: prev.plans.filter((item) => item !== plan) }));
  };

  const handleAddCourse = () => {
    setForm((prev) => {
      if (!prev.courseInput.trim() || prev.courses.includes(prev.courseInput.trim())) {
        return prev;
      }
      return { ...prev, courses: [...prev.courses, prev.courseInput.trim()], courseInput: "" };
    });
  };

  const handleRemoveCourse = (course: string) => {
    setForm((prev) => ({ ...prev, courses: prev.courses.filter((item) => item !== course) }));
  };

  const toggleQuestionSelection = (questionId: string) => {
    setForm((prev) => {
      const exists = prev.selectedQuestionIds.includes(questionId);
      return {
        ...prev,
        selectedQuestionIds: exists
          ? prev.selectedQuestionIds.filter((id) => id !== questionId)
          : [...prev.selectedQuestionIds, questionId]
      };
    });
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">试卷管理 · 新建试卷</span>
            <h3>新建试卷模板</h3>
            <p>配置试卷元数据并从题库中选择题目，支持关联课程或培训计划。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <h4>试卷基础信息</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>试卷名称</span>
                <input
                  value={form.title}
                  placeholder="请输入试卷名称"
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>试卷编号</span>
                <input
                  value={form.templateCode}
                  placeholder="例如：EX-BRG-2024-001"
                  onChange={(event) => setForm((prev) => ({ ...prev, templateCode: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>适用租户 / 平台</span>
                <input
                  value={form.tenant}
                  placeholder="例如：平台通用 / 浙江高速集团"
                  onChange={(event) => setForm((prev) => ({ ...prev, tenant: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>预计完成时间（分钟）</span>
                <input
                  value={form.duration}
                  placeholder="如：60"
                  onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>合格线（分）</span>
                <input
                  value={form.passScore}
                  placeholder="如：80"
                  onChange={(event) => setForm((prev) => ({ ...prev, passScore: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>题目顺序</span>
                <select
                  value={form.shuffleOption}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      shuffleOption: event.target.value as "fixed" | "configurable"
                    }))
                  }
                >
                  <option value="fixed">固定顺序</option>
                  <option value="configurable">引用时可随机</option>
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
                  {ExamTemplateRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleAddRole}>添加岗位</button>
              </div>
              <div className="modal__chips-tags">
                {form.roles.map((role) => (
                  <span key={role} className="tag">
                    {role}
                    <button type="button" onClick={() => handleRemoveRole(role)}>×</button>
                  </span>
                ))}
                {form.roles.length === 0 && <span className="modal__chips-placeholder">暂未选择岗位</span>}
              </div>
            </div>
          </section>

          <section className="modal__section">
            <h4>关联课程 / 计划</h4>
            <div className="modal__chips">
              <div className="modal__chips-control">
                <input
                  value={form.planInput}
                  placeholder="添加关联培训计划，例如 2024 桥梁安全培训"
                  onChange={(event) => setForm((prev) => ({ ...prev, planInput: event.target.value }))}
                />
                <button type="button" onClick={handleAddPlan}>添加计划</button>
              </div>
              <div className="modal__chips-tags">
                {form.plans.map((plan) => (
                  <span key={plan} className="tag">
                    {plan}
                    <button type="button" onClick={() => handleRemovePlan(plan)}>×</button>
                  </span>
                ))}
                {form.plans.length === 0 && <span className="modal__chips-placeholder">暂未关联计划</span>}
              </div>
            </div>
            <div className="modal__chips modal__chips--spaced">
              <div className="modal__chips-control">
                <input
                  value={form.courseInput}
                  placeholder="添加关联课程，例如 桥梁结构健康监测"
                  onChange={(event) => setForm((prev) => ({ ...prev, courseInput: event.target.value }))}
                />
                <button type="button" onClick={handleAddCourse}>添加课程</button>
              </div>
              <div className="modal__chips-tags">
                {form.courses.map((course) => (
                  <span key={course} className="tag">
                    {course}
                    <button type="button" onClick={() => handleRemoveCourse(course)}>×</button>
                  </span>
                ))}
                {form.courses.length === 0 && <span className="modal__chips-placeholder">暂未关联课程</span>}
              </div>
            </div>
          </section>

          <section className="modal__section">
            <h4>试卷简介</h4>
            <label className="modal__field">
              <span>简介内容</span>
              <textarea
                rows={3}
                value={form.description}
                placeholder="简要描述试卷的考核目标、适用场景"
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>
          </section>

          <section className="modal__section">
            <h4>题库选题</h4>
            <div className="modal__question-filter">
              <input
                type="search"
                placeholder="搜索题干 / 题目编号"
                value={questionKeyword}
                onChange={(event) => setQuestionKeyword(event.target.value)}
              />
              <select value={questionTypeFilter} onChange={(event) => setQuestionTypeFilter(event.target.value)}>
                <option value="all">全部题型</option>
                <option value="single">单选题</option>
                <option value="multiple">多选题</option>
                <option value="judge">判断题</option>
                <option value="fill">填空题</option>
                <option value="essay">简答题</option>
                <option value="case">案例题</option>
              </select>
              <select
                value={questionDifficultyFilter}
                onChange={(event) => setQuestionDifficultyFilter(event.target.value)}
              >
                <option value="all">全部难度</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
              <select
                value={questionSourceFilter}
                onChange={(event) => setQuestionSourceFilter(event.target.value)}
              >
                <option value="all">全部来源</option>
                {QuestionSources.filter((option) => option.value !== "all").map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={questionStatusFilter}
                onChange={(event) => setQuestionStatusFilter(event.target.value)}
              >
                <option value="all">全部状态</option>
                <option value="draft">草稿</option>
                <option value="pending">待审核</option>
                <option value="published">已发布</option>
                <option value="disabled">已停用</option>
              </select>
              <select
                value={questionReviewFilter}
                onChange={(event) => setQuestionReviewFilter(event.target.value)}
              >
                <option value="all">全部审核状态</option>
                <option value="pending">待审核</option>
                <option value="approved">审核通过</option>
                <option value="rejected">审核驳回</option>
              </select>
              <select
                value={questionKnowledgeFilter}
                onChange={(event) => setQuestionKnowledgeFilter(event.target.value)}
              >
                <option value="all">全部知识点</option>
                {KnowledgePoints.map((point) => (
                  <option key={point} value={point}>
                    {point}
                  </option>
                ))}
              </select>
              <select value={questionRoleFilter} onChange={(event) => setQuestionRoleFilter(event.target.value)}>
                <option value="all">全部岗位</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <select value={questionTagFilter} onChange={(event) => setQuestionTagFilter(event.target.value)}>
                <option value="all">全部标签</option>
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal__question-table">
              <table>
                <thead>
                  <tr>
                    <th>选择</th>
                    <th>题干</th>
                    <th>题型</th>
                    <th>难度</th>
                    <th>知识点</th>
                    <th>标签</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question) => {
                    const selected = form.selectedQuestionIds.includes(question.id);
                    return (
                      <tr key={question.id} className={selected ? "modal__question-row--active" : undefined}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleQuestionSelection(question.id)}
                          />
                        </td>
                        <td>
                          <div className="modal__question-stem">
                            <strong>{question.stem.slice(0, 80)}{question.stem.length > 80 ? "..." : ""}</strong>
                            <span>{question.code}</span>
                          </div>
                        </td>
                        <td>{questionTypeLabel(question.type)}</td>
                        <td>
                          <span className={`badge ${difficultyBadge(question.difficulty)}`}>
                            {difficultyLabel(question.difficulty)}
                          </span>
                        </td>
                        <td>
                          <div className="tag-list">
                            {question.knowledgePoints.map((kp) => (
                              <span key={kp} className="tag tag--blue">
                                {kp}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="tag-list">
                            {question.tags.map((tag) => (
                              <span key={tag} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredQuestions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="modal__question-empty">
                        暂无符合条件的题目，调整筛选条件试试
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal__question-summary">
              已选择 <strong>{form.selectedQuestionIds.length}</strong> 道题目
            </div>
          </section>

          <p className="modal__hint">
            保存后可在试卷详情中继续配置题目分值、题序，并提交审核或引用到课程/计划。
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

const statusLabel = (status: ExamTemplate["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审核";
    case "published":
      return "已发布";
    case "disabled":
      return "已停用";
    default:
      return status;
  }
};

const difficultyLabel = (difficulty: "easy" | "medium" | "hard") => {
  switch (difficulty) {
    case "easy":
      return "简单";
    case "medium":
      return "中等";
    case "hard":
      return "困难";
    default:
      return difficulty;
  }
};

const questionTypeLabel = (type: QuestionItem["type"]) => {
  switch (type) {
    case "single":
      return "单选题";
    case "multiple":
      return "多选题";
    case "judge":
      return "判断题";
    case "fill":
      return "填空题";
    case "essay":
      return "简答题";
    case "case":
      return "案例题";
    default:
      return type;
  }
};

const difficultyBadge = (difficulty: QuestionItem["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "badge--success";
    case "medium":
      return "badge--info";
    case "hard":
      return "badge--danger";
    default:
      return "badge--soft";
  }
};

const questionSourceLabel = (source: QuestionItem["source"] | "all") => {
  switch (source) {
    case "platform":
      return "平台自建";
    case "tenant":
      return "租户贡献";
    case "external":
      return "第三方导入";
    default:
      return "全部来源";
  }
};

const questionReviewStatusLabel = (status: QuestionItem["reviewStatus"] | "all") => {
  switch (status) {
    case "pending":
      return "待审核";
    case "approved":
      return "已通过";
    case "rejected":
      return "已驳回";
    default:
      return "审核状态";
  }
};

export default ExamTemplatePage;

