import { useEffect, useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  ReleaseMock,
  ReleaseMetrics,
  ReleaseStatuses,
  ReleaseRisks,
  ReleaseTypes,
  ReleaseModules,
  ReleaseOwners,
  statusLabel,
  riskLabel,
  type ReleaseItem,
  type ReleaseStatus,
  type ReleaseRisk
} from "../mocks/releases";

const ReleaseManagementPage = () => {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [moduleFilter, setModuleFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(ReleaseMock[0]?.id ?? null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredReleases = useMemo(() => {
    return ReleaseMock.filter((release) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        release.version.toLowerCase().includes(keyword.trim().toLowerCase()) ||
        release.codename.toLowerCase().includes(keyword.trim().toLowerCase()) ||
        release.changeHighlights.some((item) => item.includes(keyword.trim()));
      const matchStatus = statusFilter === "all" ? true : release.status === statusFilter;
      const matchRisk = riskFilter === "all" ? true : release.risk === riskFilter;
      const matchOwner = ownerFilter === "all" ? true : release.owner === ownerFilter;
      const matchType = typeFilter === "all" ? true : release.type === typeFilter;
      const matchModule =
        moduleFilter === "all" ? true : release.modules.includes(moduleFilter);
      return matchKeyword && matchStatus && matchRisk && matchOwner && matchType && matchModule;
    });
  }, [keyword, moduleFilter, ownerFilter, riskFilter, statusFilter, typeFilter]);

  const selectedRelease = useMemo(
    () => filteredReleases.find((release) => release.id === selectedId) ?? null,
    [filteredReleases, selectedId]
  );

  useEffect(() => {
    if (!selectedRelease && filteredReleases.length > 0) {
      setSelectedId(filteredReleases[0].id);
    }
  }, [filteredReleases, selectedRelease]);

  return (
    <div className="page">
      <PageSection
        title="版本发布概览"
        description="查看平台版本迭代节奏、灰度进展与风险状况，支撑发布决策。"
      >
        <div className="kpi-grid">
          {ReleaseMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="版本发布列表"
        description="管理版本计划、灰度推进、公告通知与回滚操作。"
        action={
          <div className="action-group">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              发布手册
            </button>
            <button type="button" className="topbar__cta" onClick={() => setModalOpen(true)}>
              新建版本
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索版本号 / 代号 / 关键变更"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">全部状态</option>
              {ReleaseStatuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>
              <option value="all">全部风险等级</option>
              {ReleaseRisks.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="all">全部版本类型</option>
              {ReleaseTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value)}>
              <option value="all">全部功能模块</option>
              {ReleaseModules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
            <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
              <option value="all">全部负责人</option>
              {ReleaseOwners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
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
                setRiskFilter("all");
                setOwnerFilter("all");
                setTypeFilter("all");
                setModuleFilter("all");
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
                <th>版本信息</th>
                <th>类型</th>
                <th>状态</th>
                <th>风险等级</th>
                <th>负责人</th>
                <th>计划窗口</th>
                <th>灰度进度</th>
                <th>影响模块</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredReleases.map((release) => (
                <ReleaseRow
                  key={release.id}
                  release={release}
                  active={release.id === selectedId}
                  onSelect={() => setSelectedId(release.id)}
                />
              ))}
              {filteredReleases.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <h4>暂无符合条件的版本计划</h4>
                      <p>调整筛选条件或创建新版本。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedRelease && <ReleasePreview release={selectedRelease} />}
      </PageSection>
      {modalOpen && <ReleaseModal onClose={() => setModalOpen(false)} onSubmit={() => setModalOpen(false)} />}
    </div>
  );
};

const ReleaseRow = ({
  release,
  active,
  onSelect
}: {
  release: ReleaseItem;
  active: boolean;
  onSelect: () => void;
}) => {
  const plannedWindow = `${new Date(release.plannedStart).toLocaleDateString()} ~ ${new Date(
    release.plannedEnd
  ).toLocaleDateString()}`;
  const rolloutCompletion =
    release.rolloutPlan.length === 0
      ? 0
      : Math.round(
          release.rolloutPlan.reduce((acc, batch) => acc + batch.completion, 0) /
            release.rolloutPlan.length
        );

  return (
    <tr className={active ? "table-row--active" : undefined} onClick={onSelect} role="button">
      <td>
        <div className="release-cell">
          <strong>{release.version}</strong>
          <span>{release.codename}</span>
        </div>
      </td>
      <td>{release.type}</td>
      <td>
        <span className={`badge ${statusBadge(release.status)}`}>{statusLabel(release.status)}</span>
      </td>
      <td>
        <span className={`badge ${riskBadge(release.risk)}`}>{riskLabel(release.risk)}</span>
      </td>
      <td>
        <div className="release-meta">
          <span>{release.owner}</span>
          <span>QA: {release.qaOwner}</span>
        </div>
      </td>
      <td>{plannedWindow}</td>
      <td>
        <div className="release-progress">
          <div className="release-progress__bar">
            <div className={`release-progress__fill release-progress__fill--${release.status}`} style={{ width: `${rolloutCompletion}%` }} />
          </div>
          <span>{rolloutCompletion}%</span>
        </div>
      </td>
      <td>
        <div className="release-meta">
          {release.modules.slice(0, 3).map((module) => (
            <span key={module} className="tag tag--slate">
              {module}
            </span>
          ))}
          {release.modules.length > 3 && <span className="tag">+{release.modules.length - 3}</span>}
        </div>
      </td>
      <td>
        <div className="table-actions">
          <button type="button">推进阶段</button>
          <button type="button">回滚</button>
        </div>
      </td>
    </tr>
  );
};

const ReleasePreview = ({ release }: { release: ReleaseItem }) => {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <span className={`badge ${statusBadge(release.status)}`}>{statusLabel(release.status)}</span>
          <h3>{release.version}</h3>
          <p className="panel__sub">
            代号 {release.codename} · 类型 {release.type} · 风险等级 {riskLabel(release.risk)}
          </p>
          <p>主要变更：{release.changeHighlights.join("；")}</p>
        </div>
        <div className="panel__meta">
          <div>
            <span>发布负责人</span>
            <strong>{release.owner}</strong>
          </div>
          <div>
            <span>QA 验收</span>
            <strong>{release.qaOwner}</strong>
          </div>
          <div>
            <span>计划窗口</span>
            <strong>
              {new Date(release.plannedStart).toLocaleString()} · {new Date(release.plannedEnd).toLocaleString()}
            </strong>
          </div>
          <div>
            <span>上线情况</span>
            <strong>
              {release.actualStart ? new Date(release.actualStart).toLocaleString() : "未开始"}
              {release.actualEnd ? ` / 完成于 ${new Date(release.actualEnd).toLocaleString()}` : ""}
            </strong>
          </div>
        </div>
      </div>
      <div className="panel__body">
        <div className="panel__grid">
          <div>
            <h4>灰度批次</h4>
            <ul className="panel__list">
              {release.rolloutPlan.map((batch) => (
                <li key={batch.id}>
                  <span>{batch.name}</span>
                  <span>{batch.targets.join("、")}</span>
                  <span>
                    {statusLabelForRollout(batch.status)} · 完成 {batch.completion}%
                  </span>
                </li>
              ))}
              {release.rolloutPlan.length === 0 && <li>暂无批次计划</li>}
            </ul>
            <h4>影响租户</h4>
            <div className="tag-list">
              {release.impactedTenants.map((tenant) => (
                <span key={tenant} className="tag tag--blue">
                  {tenant}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4>问题 & 风险</h4>
            <ul className="panel__list">
              {release.issues.map((issue) => (
                <li key={issue.id}>
                  <span>{issue.id}</span>
                  <span>{issue.title}</span>
                  <span>
                    {issue.status === "open"
                      ? "未解决"
                      : issue.status === "monitoring"
                        ? "观察中"
                        : "已解决"}
                    · {severityLabel(issue.severity)}
                  </span>
                </li>
              ))}
              {release.issues.length === 0 && <li>暂无关联问题</li>}
            </ul>
            <h4>通知记录</h4>
            <ul className="panel__list">
              {release.announcements.map((item) => (
                <li key={item.id}>
                  <span>{item.channel}</span>
                  <span>{item.audience}</span>
                  <span>
                    {item.status === "sent" ? "已发送" : item.status === "draft" ? "草稿" : "已排程"}
                    · {new Date(item.sentAt).toLocaleString()}
                  </span>
                </li>
              ))}
              {release.announcements.length === 0 && <li>尚未发送通知</li>}
            </ul>
            <h4>操作日志</h4>
            <ul className="panel__list">
              {release.logs.map((log, index) => (
                <li key={`${log.at}-${index}`}>
                  <span>{new Date(log.at).toLocaleString()}</span>
                  <span>{log.operator}</span>
                  <span>{log.action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReleaseModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const [form, setForm] = useState({
    version: "",
    codename: "",
    type: ReleaseTypes[0].value,
    risk: "medium" as ReleaseRisk,
    status: "draft" as ReleaseStatus,
    owner: ReleaseOwners[0] ?? "",
    qaOwner: ReleaseOwners[1] ?? "",
    modules: new Set<string>([ReleaseModules[0]]),
    tenants: [] as string[],
    tenantInput: "",
    changeHighlights: [""],
    plannedStart: "",
    plannedEnd: ""
  });

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const toggleModule = (module: string) => {
    setForm((prev) => {
      const next = new Set(prev.modules);
      if (next.has(module)) {
        next.delete(module);
      } else {
        next.add(module);
      }
      return { ...prev, modules: next };
    });
  };

  const addTenant = () => {
    setForm((prev) => {
      if (!prev.tenantInput.trim() || prev.tenants.includes(prev.tenantInput.trim())) {
        return prev;
      }
      return { ...prev, tenants: [...prev.tenants, prev.tenantInput.trim()], tenantInput: "" };
    });
  };

  const removeTenant = (tenant: string) => {
    setForm((prev) => ({ ...prev, tenants: prev.tenants.filter((item) => item !== tenant) }));
  };

  const updateHighlight = (index: number, value: string) => {
    setForm((prev) => {
      const next = [...prev.changeHighlights];
      next[index] = value;
      return { ...prev, changeHighlights: next };
    });
  };

  const addHighlight = () => {
    setForm((prev) => ({ ...prev, changeHighlights: [...prev.changeHighlights, ""] }));
  };

  const removeHighlight = (index: number) => {
    setForm((prev) => ({
      ...prev,
      changeHighlights: prev.changeHighlights.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">版本发布 · 新建</span>
            <h3>创建版本发布计划</h3>
            <p>填写版本基础信息、计划窗口与变更重点，可稍后完善灰度批次。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <h4>基础信息</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>版本号</span>
                <input
                  value={form.version}
                  placeholder="例如：v2.4.1"
                  onChange={(event) => setForm((prev) => ({ ...prev, version: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>版本代号</span>
                <input
                  value={form.codename}
                  placeholder="例如：Aurora"
                  onChange={(event) => setForm((prev) => ({ ...prev, codename: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>版本类型</span>
                <select
                  value={form.type}
                  onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as ReleaseItem["type"] }))}
                >
                  {ReleaseTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>风险等级</span>
                <select
                  value={form.risk}
                  onChange={(event) => setForm((prev) => ({ ...prev, risk: event.target.value as ReleaseRisk }))}
                >
                  {ReleaseRisks.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>当前状态</span>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ReleaseStatus }))}
                >
                  {ReleaseStatuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>发布负责人</span>
                <select
                  value={form.owner}
                  onChange={(event) => setForm((prev) => ({ ...prev, owner: event.target.value }))}
                >
                  {ReleaseOwners.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>QA 验收</span>
                <select
                  value={form.qaOwner}
                  onChange={(event) => setForm((prev) => ({ ...prev, qaOwner: event.target.value }))}
                >
                  {ReleaseOwners.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>计划窗口</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>预计开始时间</span>
                <input
                  type="datetime-local"
                  value={form.plannedStart}
                  onChange={(event) => setForm((prev) => ({ ...prev, plannedStart: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>预计结束时间</span>
                <input
                  type="datetime-local"
                  value={form.plannedEnd}
                  onChange={(event) => setForm((prev) => ({ ...prev, plannedEnd: event.target.value }))}
                />
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>影响范围</h4>
            <div className="modal__choices">
              {ReleaseModules.map((module) => (
                <label key={module}>
                  <input
                    type="checkbox"
                    checked={form.modules.has(module)}
                    onChange={() => toggleModule(module)}
                  />
                  {module}
                </label>
              ))}
            </div>
            <div className="modal__chips modal__chips--spaced">
              <div className="modal__chips-control">
                <input
                  value={form.tenantInput}
                  placeholder="添加影响租户，例如：浙江高速集团"
                  onChange={(event) => setForm((prev) => ({ ...prev, tenantInput: event.target.value }))}
                />
                <button type="button" onClick={addTenant}>
                  添加租户
                </button>
              </div>
              <div className="modal__chips-tags">
                {form.tenants.map((tenant) => (
                  <span key={tenant} className="tag">
                    {tenant}
                    <button type="button" onClick={() => removeTenant(tenant)}>×</button>
                  </span>
                ))}
                {form.tenants.length === 0 && <span className="modal__chips-placeholder">暂未添加租户</span>}
              </div>
            </div>
          </section>

          <section className="modal__section">
            <h4>变更重点</h4>
            <div className="modal__options">
              {form.changeHighlights.map((item, index) => (
                <div key={index} className="modal__option-row">
                  <span className="modal__option-label">{index + 1}</span>
                  <input
                    value={item}
                    placeholder="例如：新增计划自动生成考试模板"
                    onChange={(event) => updateHighlight(index, event.target.value)}
                  />
                  {form.changeHighlights.length > 1 && (
                    <button type="button" className="modal__option-remove" onClick={() => removeHighlight(index)}>
                      删除
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="modal__option-add" onClick={addHighlight}>
                + 新增变更点
              </button>
            </div>
          </section>

          <p className="modal__hint">
            创建完成后，可在版本详情中添加灰度批次、通知模板、审批流程等信息。关键阶段（灰度、回滚）会自动记录操作日志。
          </p>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            取消
          </button>
          <button type="button" className="topbar__cta" onClick={handleSubmit}>
            保存计划
          </button>
        </div>
      </div>
    </div>
  );
};

const statusBadge = (status: ReleaseStatus) => {
  switch (status) {
    case "draft":
      return "badge--info";
    case "scheduled":
      return "badge--soft";
    case "rolling":
      return "badge--warning";
    case "verifying":
      return "badge--purple";
    case "completed":
      return "badge--success";
    case "rolled_back":
      return "badge--danger";
    default:
      return "badge--soft";
  }
};

const riskBadge = (risk: ReleaseRisk) => {
  switch (risk) {
    case "low":
      return "badge--success";
    case "medium":
      return "badge--warning";
    case "high":
      return "badge--danger";
    default:
      return "badge--soft";
  }
};

const statusLabelForRollout = (status: ReleaseItem["rolloutPlan"][number]["status"]) => {
  switch (status) {
    case "pending":
      return "未开始";
    case "running":
      return "进行中";
    case "completed":
      return "已完成";
    case "blocked":
      return "阻塞";
    case "rolled_back":
      return "已回滚";
    default:
      return status;
  }
};

const severityLabel = (severity: ReleaseItem["issues"][number]["severity"]) => {
  switch (severity) {
    case "H":
      return "高";
    case "M":
      return "中";
    case "L":
      return "低";
    default:
      return severity;
  }
};

export default ReleaseManagementPage;
