import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  MAPlansSummary,
  MAPlansList,
  type MAPlanItem
} from "../mocks/maPlans";
import { useNavigate } from "react-router-dom";

type StatusFilter = "all" | MAPlanItem["status"];
type SourceFilter = "all" | MAPlanItem["source"];
type StageFilter = "all" | MAPlanItem["stage"];
type PriorityFilter = "all" | MAPlanItem["priority"];

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "状态（全部）" },
  { value: "待确认", label: "待确认" },
  { value: "执行中", label: "执行中" },
  { value: "滞后", label: "滞后" },
  { value: "已完成", label: "已完成" },
  { value: "已终止", label: "已终止" }
];

const sourceOptions: Array<{ value: SourceFilter; label: string }> = [
  { value: "all", label: "计划来源（全部）" },
  { value: "主管单位下发", label: "主管单位下发" },
  { value: "公共计划", label: "公共计划" },
  { value: "自建计划", label: "自建计划" }
];

const stageOptions: Array<{ value: StageFilter; label: string }> = [
  { value: "all", label: "当前阶段（全部）" },
  { value: "待确认", label: "待确认" },
  { value: "课程学习", label: "课程学习" },
  { value: "考试阶段", label: "考试阶段" },
  { value: "证书统计", label: "证书统计" },
  { value: "总结报告", label: "总结报告" }
];

const priorityOptions: Array<{ value: PriorityFilter; label: string }> = [
  { value: "all", label: "优先级（全部）" },
  { value: "高", label: "高" },
  { value: "中", label: "中" },
  { value: "常规", label: "常规" }
];

const badgeClassByStatus: Record<MAPlanItem["status"], string> = {
  待确认: "badge--warning",
  执行中: "badge--info",
  滞后: "badge--danger",
  已完成: "badge--success",
  已终止: "badge--slate"
};

const stageColor: Record<MAPlanItem["stage"], string> = {
  待确认: "tag--amber",
  课程学习: "tag--blue",
  考试阶段: "tag--purple",
  证书统计: "tag--slate",
  总结报告: "tag--green"
};

const priorityTag: Record<MAPlanItem["priority"], string> = {
  高: "tag--red",
  中: "tag--amber",
  常规: "tag--slate"
};

const MAPlansPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const filteredPlans = useMemo(() => {
    const keywordValue = keyword.trim().toLowerCase();

    return MAPlansList.filter((plan) => {
      const matchKeyword =
        keywordValue.length === 0 ||
        plan.name.toLowerCase().includes(keywordValue) ||
        plan.code.toLowerCase().includes(keywordValue) ||
        plan.owner.organization.toLowerCase().includes(keywordValue);

      const matchStatus = statusFilter === "all" ? true : plan.status === statusFilter;
      const matchSource = sourceFilter === "all" ? true : plan.source === sourceFilter;
      const matchStage = stageFilter === "all" ? true : plan.stage === stageFilter;
      const matchPriority = priorityFilter === "all" ? true : plan.priority === priorityFilter;

      return matchKeyword && matchStatus && matchSource && matchStage && matchPriority;
    });
  }, [keyword, statusFilter, sourceFilter, stageFilter, priorityFilter]);

  const summaryCards = [
    {
      id: "total",
      label: "接收计划",
      value: MAPlansSummary.total.toString(),
      hint: `当前筛选：${filteredPlans.length} 项`
    },
    {
      id: "todo",
      label: "待确认",
      value: MAPlansSummary.toConfirm.toString(),
      hint: "优先确认临期计划"
    },
    {
      id: "progress",
      label: "执行中",
      value: MAPlansSummary.inProgress.toString(),
      hint: "包含课程学习 / 考试阶段"
    },
    {
      id: "delayed",
      label: "滞后计划",
      value: MAPlansSummary.delayed.toString(),
      hint: "需重点跟进督办"
    }
  ];

  const resetFilters = () => {
    setKeyword("");
    setStatusFilter("all");
    setSourceFilter("all");
    setStageFilter("all");
    setPriorityFilter("all");
  };

  return (
    <div className="page">
      <PageSection
        title="培训计划清单"
        description="查看上级下发及内部自建的培训计划，及时确认并跟进执行进度。"
        action={
          <div className="section-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导出计划清单
            </button>
            <button type="button" className="topbar__cta topbar__cta--subtle">
              查看督办记录
            </button>
            <button type="button" className="topbar__cta">
              打开执行看板
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

        <div className="ma-org__filters">
          <div className="ma-org__filters-left">
            <input
              type="search"
              placeholder="搜索计划名称 / 编码 / 下发单位"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value as SourceFilter)}>
              {sourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value as StageFilter)}>
              {stageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value as PriorityFilter)}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="ma-org__filters-right">
            <button type="button" className="filter-bar__link" onClick={resetFilters}>
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
                <th>计划名称</th>
                <th>执行周期</th>
                <th>覆盖范围</th>
                <th>当前状态</th>
                <th>进度</th>
                <th>下发单位</th>
                <th>提醒</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td>
                    <div className="plan-cell">
                      <strong>{plan.name}</strong>
                      <span>{plan.code}</span>
                      <div className="tag-list tag-list--compact">
                        <span className="tag tag--slate">{plan.source}</span>
                        <span className={`tag ${priorityTag[plan.priority]}`}>{plan.priority}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span>
                        {plan.startDate} - {plan.endDate}
                      </span>
                      <span>下发：{plan.pushDate}</span>
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span>班组 {plan.coverage.groups} 个 · 项目 {plan.coverage.projects} 个</span>
                      <span>
                        已确认 {plan.coverage.confirmedLearners}/{plan.coverage.targetLearners}
                      </span>
                      <span>已完成 {plan.coverage.finishedLearners} 人</span>
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span className={`badge ${badgeClassByStatus[plan.status]}`}>{plan.status}</span>
                      <span className={`tag ${stageColor[plan.stage]}`}>{plan.stage}</span>
                    </div>
                  </td>
                  <td>
                    <div className="plan-progress">
                      <div className="plan-progress__bar">
                        <div className="plan-progress__fill" style={{ width: `${plan.progress * 100}%` }} />
                      </div>
                      <span>{Math.round(plan.progress * 100)}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span>{plan.owner.organization}</span>
                      <span>{plan.owner.contact}</span>
                      <span>{plan.owner.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      {plan.alerts.length === 0 ? <span>暂无提醒</span> : null}
                      {plan.alerts.map((alert, index) => (
                        <span key={index} className="plan-meta--reminder">
                          {alert}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button">确认计划</button>
                      <button type="button" onClick={() => navigate(`/ma/plan-detail?id=${plan.id}`)}>
                        查看详情
                      </button>
                      <button type="button" className="table-actions__primary">
                        添加督办
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPlans.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <h4>暂无符合条件的计划</h4>
                      <p>调整筛选条件或清空关键字，再试一次。</p>
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

export default MAPlansPage;


