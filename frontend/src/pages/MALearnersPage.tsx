import { useEffect, useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  MALearnerSummary,
  MALearnerPlans,
  MALearnerRecords,
  MALearnerProjects,
  MALearnerExceptions,
  type LearnerRecord
} from "../mocks/maLearners";

type ViewMode = "all" | "plan" | "exception";

const viewTabs: { key: ViewMode; label: string }[] = [
  { key: "all", label: "全部学员" },
  { key: "plan", label: "按计划查看" },
  { key: "exception", label: "异常关注" }
];

const certificateBadge: Record<LearnerRecord["certificateStatus"], string> = {
  正常: "badge--success",
  即将到期: "badge--warning",
  已过期: "badge--danger"
};

const riskTone: Record<NonNullable<LearnerRecord["riskLevel"]>, string> = {
  正常: "tag--green",
  提醒: "tag--amber",
  严重: "tag--red"
};

const completionRanges = [
  { id: "all", label: "完成率（全部）", min: 0, max: 1 },
  { id: "90up", label: "≥ 90%", min: 0.9, max: 1 },
  { id: "70_90", label: "70% - 90%", min: 0.7, max: 0.9 },
  { id: "50_70", label: "50% - 70%", min: 0.5, max: 0.7 },
  { id: "below50", label: "< 50%", min: 0, max: 0.5 }
];

const MALearnersPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [keyword, setKeyword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [exceptionFilter, setExceptionFilter] = useState<string>("all");
  const [certificateFilter, setCertificateFilter] = useState<"all" | LearnerRecord["certificateStatus"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LearnerRecord["status"]>("all");
  const [completionFilter, setCompletionFilter] = useState(completionRanges[0]);
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);

  useEffect(() => {
    if (viewMode === "plan" && selectedPlan === "all" && MALearnerPlans.length > 0) {
      setSelectedPlan(MALearnerPlans[0].id);
    }
    if (viewMode !== "plan" && selectedPlan !== "all") {
      setSelectedPlan("all");
    }
    if (viewMode !== "exception" && exceptionFilter !== "all") {
      setExceptionFilter("all");
    }
  }, [viewMode, selectedPlan, exceptionFilter]);

  const planMap = useMemo(() => {
    const map = new Map<string, (typeof MALearnerPlans)[number]>();
    MALearnerPlans.forEach((plan) => map.set(plan.id, plan));
    return map;
  }, []);

  const filteredLearners = useMemo(() => {
    const keywordValue = keyword.trim().toLowerCase();

    return MALearnerRecords.filter((learner) => {
      const matchKeyword =
        keywordValue.length === 0 ||
        learner.name.toLowerCase().includes(keywordValue) ||
        learner.employeeId.toLowerCase().includes(keywordValue) ||
        learner.phone.includes(keywordValue);

      const matchPlan =
        selectedPlan === "all"
          ? true
          : learner.plans.some((plan) => plan.planId === selectedPlan);

      const matchProject =
        projectFilter === "all" ? true : learner.projects.includes(projectFilter);

      const matchException =
        exceptionFilter === "all"
          ? true
          : exceptionFilter === "lagging"
            ? learner.plans.some((plan) => plan.status === "滞后")
            : exceptionFilter === "overdue"
              ? learner.plans.some((plan) => plan.status === "滞后" && (plan.dueInDays ?? 0) < 0)
              : exceptionFilter === "exam-missed"
                ? learner.exams.some((exam) => exam.status === "缺考")
                : exceptionFilter === "cert-expiring"
                  ? learner.certificateStatus !== "正常"
                  : exceptionFilter === "inactive"
                    ? learner.lastActive < "2025-03-15"
                    : true;

      const matchCertificate = certificateFilter === "all" ? true : learner.certificateStatus === certificateFilter;

      const matchStatus = statusFilter === "all" ? true : learner.status === statusFilter;

      const matchCompletion =
        learner.completionRate >= completionFilter.min && learner.completionRate < completionFilter.max;

      if (viewMode === "plan" && selectedPlan === "all") {
        return (
          matchKeyword &&
          matchProject &&
          matchCertificate &&
          matchStatus &&
          matchCompletion &&
          matchException
        );
      }

      return (
        matchKeyword &&
        matchPlan &&
        matchProject &&
        matchCertificate &&
        matchStatus &&
        matchCompletion &&
        matchException
      );
    });
  }, [
    keyword,
    selectedPlan,
    projectFilter,
    exceptionFilter,
    certificateFilter,
    statusFilter,
    completionFilter
  ]);

  const selectedLearner = useMemo(
    () => MALearnerRecords.find((learner) => learner.id === selectedLearnerId) ?? null,
    [selectedLearnerId]
  );

  const summaryCards = [
    {
      id: "total",
      label: "学员总数",
      value: `${MALearnerSummary.totalLearners}`,
      hint: `筛选范围内：${filteredLearners.length} 人`
    },
    {
      id: "completion",
      label: "平均完成率",
      value: `${Math.round(MALearnerSummary.avgCompletion * 100)}%`,
      hint: `当前列表：${Math.round(
        filteredLearners.reduce((sum, learner) => sum + learner.completionRate, 0) /
          Math.max(filteredLearners.length || 1, 1) *
          100
      )}%`
    },
    {
      id: "pending-plan",
      label: "待办计划",
      value: `${MALearnerSummary.pendingPlans}`,
      hint: `滞后学员 ${filteredLearners.filter((learner) =>
        learner.plans.some((plan) => plan.status === "滞后")
      ).length} 人`
    },
    {
      id: "certificate",
      label: "证书到期",
      value: `${MALearnerSummary.expiringCertificates}`,
      hint: `当前列表：${
        filteredLearners.filter((learner) => learner.certificateStatus !== "正常").length
      } 人`
    }
  ];

  return (
    <div className="page">
      <PageSection
        title="学员列表"
        description="查看单位内所有学员的培训计划、考试与证书执行情况，及时跟进异常学员。"
        action={
          <div className="section-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              批量发送提醒
            </button>
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导出学习数据
            </button>
            <button type="button" className="topbar__cta">
              分派培训计划
            </button>
          </div>
        }
      >
        <div className="summary-cards">
          {summaryCards.map((card) => (
            <div key={card.id} className="summary-card">
              <div className="summary-card__label">{card.label}</div>
              <div className="summary-card__value">{card.value}</div>
              <div className="summary-card__hint">{card.hint}</div>
            </div>
          ))}
        </div>

        <div className="ma-learners__header">
          <div className="tabs tabs--pill">
            {viewTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`tabs__item ${viewMode === tab.key ? "is-active" : ""}`}
                onClick={() => setViewMode(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="ma-learners__summary-hint">
            {viewMode === "plan" && selectedPlan !== "all"
              ? (
                <>
                  当前计划：<strong>{planMap.get(selectedPlan)?.name}</strong>
                </>
                )
              : viewMode === "exception" && exceptionFilter !== "all"
                ? (
                  <>当前关注：<strong>{MALearnerExceptions.find((item) => item.id === exceptionFilter)?.label}</strong></>
                  )
                : (
                  <>当前视图：<strong>{viewTabs.find((tab) => tab.key === viewMode)?.label}</strong></>
                  )}
          </div>
        </div>

        {viewMode === "plan" ? (
          <div className="ma-learners__plans">
            {MALearnerPlans.map((plan) => {
              const isActive = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  className={`ma-learners__plan-card ${isActive ? "is-active" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <header>
                    <strong>{plan.name}</strong>
                    <span>{plan.stage}</span>
                  </header>
                  <div className="ma-learners__plan-meta">
                    <span>覆盖 {plan.coverage} 人</span>
                    <span>完成 {Math.round(plan.completion * 100)}%</span>
                    <span>截止 {plan.deadline}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}

        {viewMode === "exception" ? (
          <div className="ma-learners__exceptions">
            {MALearnerExceptions.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`ma-learners__exception-chip ${exceptionFilter === item.id ? "is-active" : ""}`}
                onClick={() => setExceptionFilter(exceptionFilter === item.id ? "all" : item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className={`ma-learners__exception-chip ${exceptionFilter === "all" ? "is-active" : ""}`}
              onClick={() => setExceptionFilter("all")}
            >
              全部
            </button>
          </div>
        ) : null}

        <div className="ma-org__filters">
          <div className="ma-org__filters-left">
            <input
              type="search"
              placeholder="搜索姓名 / 工号 / 手机号"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)}>
              <option value="all">项目标签（全部）</option>
              {MALearnerProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <select
              value={certificateFilter}
              onChange={(event) => setCertificateFilter(event.target.value as typeof certificateFilter)}
            >
              <option value="all">证书状态（全部）</option>
              <option value="正常">正常</option>
              <option value="即将到期">即将到期</option>
              <option value="已过期">已过期</option>
            </select>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            >
              <option value="all">在岗状态（全部）</option>
              <option value="在岗">在岗</option>
              <option value="停用">停用</option>
            </select>
            <select
              value={completionFilter.id}
              onChange={(event) => {
                const range = completionRanges.find((item) => item.id === event.target.value);
                if (range) {
                  setCompletionFilter(range);
                }
              }}
            >
              {completionRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <div className="ma-org__filters-right">
            <button
              type="button"
              className="filter-bar__link"
              onClick={() => {
                setKeyword("");
                setProjectFilter("all");
                setCertificateFilter("all");
                setStatusFilter("all");
                setCompletionFilter(completionRanges[0]);
                setSelectedPlan(viewMode === "plan" && MALearnerPlans.length > 0 ? MALearnerPlans[0].id : "all");
                setExceptionFilter("all");
              }}
            >
              重置
            </button>
            <button type="button" className="filter-bar__link">
              保存筛选视图
            </button>
          </div>
        </div>

        <div className="ma-learners__table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>学员</th>
                <th>计划执行</th>
                <th>学习进度</th>
                <th>考试安排</th>
                <th>证书状态</th>
                <th>最近动态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredLearners.map((learner) => (
                <tr key={learner.id}>
                  <td>
                    <div className="ma-org__person">
                      <img src={learner.avatar} alt={learner.name} />
                      <div>
                        <strong>{learner.name}</strong>
                        <span>
                          {learner.jobTitle} · {learner.level}
                        </span>
                        <span>{learner.phone}</span>
                        <div className="tag-list tag-list--compact">
                          <span className="tag tag--slate">{learner.department}</span>
                          <span className="tag tag--slate">{learner.team}</span>
                          {learner.projects.map((project) => (
                            <span key={project} className="tag tag--blue">
                              {MALearnerProjects.find((item) => item.id === project)?.name ?? project}
                            </span>
                          ))}
                          {learner.riskLevel ? (
                            <span className={`tag ${riskTone[learner.riskLevel]}`}>{learner.riskLevel}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="ma-learners__plan-badges">
                      {learner.plans.map((plan) => (
                        <div key={plan.planId} className="ma-learners__plan-chip">
                          <strong>{plan.planName}</strong>
                          <span>{plan.stage}</span>
                          <span className="ma-learners__plan-chip-meta">
                            进度 {plan.progress}%
                            {plan.dueInDays !== undefined ? ` · 剩余 ${plan.dueInDays} 天` : ""}
                          </span>
                          <span className={`tag tag--${plan.status === "滞后" ? "red" : plan.status === "已完成" ? "green" : "slate"}`}>
                            {plan.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="plan-progress">
                      <div className="plan-progress__bar">
                        <div className="plan-progress__fill" style={{ width: `${learner.completionRate * 100}%` }} />
                      </div>
                      <span>{Math.round(learner.completionRate * 100)}%</span>
                    </div>
                    <div className="plan-meta">学习总时长 {learner.learningHours} h</div>
                    <div className="plan-meta">待学课程 {learner.pendingCourses} 个</div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      {learner.exams.length === 0 ? (
                        <span>暂无考试安排</span>
                      ) : (
                        learner.exams.map((exam) => (
                          <span key={exam.examId}>
                            {exam.examName} · {exam.schedule}
                            {exam.status !== "待安排" ? ` · ${exam.status}` : ""}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${certificateBadge[learner.certificateStatus]}`}>
                      {learner.certificateStatus}
                    </span>
                    <div className="plan-meta">证书 {learner.certificates.length} 张</div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span>最近登录：{learner.lastActive}</span>
                      {learner.reminders.map((reminder, index) => (
                        <span key={index}>{reminder}</span>
                      ))}
                      {learner.tags.length > 0 ? (
                        <div className="tag-list tag-list--compact">
                          {learner.tags.map((tag) => (
                            <span key={tag} className="tag tag--slate">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" onClick={() => setSelectedLearnerId(learner.id)}>
                        查看详情
                      </button>
                      <button type="button">发送提醒</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLearners.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <h4>暂无符合条件的学员</h4>
                      <p>尝试调整筛选条件，或切换至其他视图。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageSection>

      {selectedLearner ? (
        <div className="drawer is-open">
          <div className="drawer__overlay" onClick={() => setSelectedLearnerId(null)} />
          <div className="drawer__panel">
            <header className="drawer__header">
              <div className="ma-org__drawer-header">
                <img src={selectedLearner.avatar} alt={selectedLearner.name} />
                <div>
                  <h3>{selectedLearner.name}</h3>
                  <p>
                    {selectedLearner.jobTitle} · {selectedLearner.level}
                  </p>
                  <div className="tag-list">
                    <span className="tag tag--slate">{selectedLearner.department}</span>
                    <span className="tag tag--slate">{selectedLearner.team}</span>
                    {selectedLearner.projects.map((project) => (
                      <span key={project} className="tag tag--blue">
                        {MALearnerProjects.find((item) => item.id === project)?.name ?? project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button type="button" className="modal__close" onClick={() => setSelectedLearnerId(null)}>
                ×
              </button>
            </header>
            <div className="drawer__body drawer__body--list">
              <section className="ma-org__section">
                <h4>基础信息</h4>
                <div className="ma-org__info-grid">
                  <div>
                    <span className="ma-org__info-label">工号</span>
                    <span>{selectedLearner.employeeId}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">联系方式</span>
                    <span>{selectedLearner.phone}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">最近登录</span>
                    <span>{selectedLearner.lastActive}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">学习总时长</span>
                    <span>{selectedLearner.learningHours} 小时</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">当前状态</span>
                    <span>{selectedLearner.status}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">风险级别</span>
                    <span>{selectedLearner.riskLevel ?? "正常"}</span>
                  </div>
                </div>
              </section>

              <section className="ma-org__section">
                <h4>培训计划执行</h4>
                <div className="ma-org__list">
                  {selectedLearner.plans.map((plan) => (
                    <div key={plan.planId} className="ma-org__list-item">
                      <div>
                        <strong>{plan.planName}</strong>
                        <span>{plan.stage}</span>
                      </div>
                      <div className="plan-progress">
                        <div className="plan-progress__bar">
                          <div className="plan-progress__fill" style={{ width: `${plan.progress}%` }} />
                        </div>
                        <span>{plan.progress}%</span>
                      </div>
                      <div className="ma-org__list-hint">
                        状态：{plan.status}
                        {plan.dueInDays !== undefined ? ` · 剩余 ${plan.dueInDays} 天` : ""}
                      </div>
                      {plan.nextAction ? <p className="ma-org__list-hint">下一步：{plan.nextAction}</p> : null}
                    </div>
                  ))}
                  {selectedLearner.plans.length === 0 && <div className="ma-org__list-empty">暂无培训计划</div>}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>考试安排与结果</h4>
                <div className="ma-org__list">
                  {selectedLearner.exams.map((exam) => (
                    <div key={exam.examId} className="ma-org__list-item ma-org__list-item--inline">
                      <div>
                        <strong>{exam.examName}</strong>
                        <span>{exam.schedule}</span>
                      </div>
                      <span className="ma-org__list-hint">
                        {exam.status}
                        {exam.score !== undefined ? ` · 成绩 ${exam.score}` : ""}
                      </span>
                      {exam.remark ? <span className="ma-org__list-hint">{exam.remark}</span> : null}
                    </div>
                  ))}
                  {selectedLearner.exams.length === 0 && <div className="ma-org__list-empty">暂无考试安排</div>}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>证书情况</h4>
                <div className="ma-org__list">
                  {selectedLearner.certificates.map((cert) => (
                    <div key={cert.id} className="ma-org__list-item ma-org__list-item--inline">
                      <div>
                        <strong>{cert.name}</strong>
                        <span>{cert.status}</span>
                      </div>
                      <span className="ma-org__list-hint">有效期至 {cert.expireAt}</span>
                    </div>
                  ))}
                  {selectedLearner.certificates.length === 0 && <div className="ma-org__list-empty">暂无证书记录</div>}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>提醒与备注</h4>
                <div className="ma-org__timeline">
                  {selectedLearner.reminders.length === 0 ? (
                    <div className="ma-org__list-empty">暂无提醒记录</div>
                  ) : (
                    selectedLearner.reminders.map((reminder, index) => (
                      <div key={index} className="ma-org__timeline-item">
                        <div className="ma-org__timeline-time">2025-04-10</div>
                        <div className="ma-org__timeline-body">
                          <strong>系统提醒</strong>
                          <span>{reminder}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
            <footer className="drawer__footer-actions">
              <button type="button" className="topbar__cta topbar__cta--subtle">
                标记为重点跟进
              </button>
              <button type="button" className="topbar__cta">
                发送督办提醒
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MALearnersPage;


