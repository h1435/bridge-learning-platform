import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSection from "../components/PageSection";
import {
  GAPlansMock,
  GAPlanStatusOptions,
  GAPlanTypes,
  type GAPlanItem
} from "../mocks/gaPlans";

const GATrainingPlansPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");

  const ownerOptions = useMemo(() => {
    return ["全部负责人", ...Array.from(new Set(GAPlansMock.map((plan) => plan.owner)))];
  }, []);

  const filteredPlans = useMemo(() => {
    return GAPlansMock.filter((plan) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        plan.name.includes(keyword.trim()) ||
        plan.code.toLowerCase().includes(keyword.trim().toLowerCase());
      const matchStatus = statusFilter === "all" ? true : plan.status === statusFilter;
      const matchType = typeFilter === "all" ? true : plan.type === typeFilter;
      const matchOwner = ownerFilter === "全部负责人" || ownerFilter === "all" ? true : plan.owner === ownerFilter;
      return matchKeyword && matchStatus && matchType && matchOwner;
    });
  }, [keyword, ownerFilter, statusFilter, typeFilter]);

  return (
    <div className="page">
      <PageSection
        title="培训计划列表"
        description="查看与维护主管单位的全部培训计划，掌握执行进度并及时催办。"
        action={
          <button type="button" className="topbar__cta" onClick={() => navigate("/ga/plan-editor")}>新建培训计划</button>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索计划名称 / 编号"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {GAPlanStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              {GAPlanTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
              {ownerOptions.map((owner) => (
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
                setTypeFilter("all");
                setOwnerFilter("all");
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
                <th>培训计划</th>
                <th>计划周期</th>
                <th>覆盖范围</th>
                <th>状态</th>
                <th>完成率</th>
                <th>考试配置</th>
                <th>证书策略</th>
                <th>最近更新</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <PlanRow
                  key={plan.id}
                  plan={plan}
                  onView={() => navigate("/ga/plan-detail")}
                />
              ))}
              {filteredPlans.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <h4>暂无符合条件的培训计划</h4>
                      <p>调整筛选条件或新建培训计划。</p>
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

const PlanRow = ({ plan, onView }: { plan: GAPlanItem; onView: () => void }) => {
  return (
    <tr>
      <td>
        <div className="plan-cell">
          <strong>{plan.name}</strong>
          <span>{plan.code}</span>
          <div className="plan-cell__tags">
            <span className="tag tag--slate">{planTypeLabel(plan.type)}</span>
            <span className="tag tag--blue">负责人：{plan.owner}</span>
          </div>
        </div>
      </td>
      <td>{plan.period}</td>
      <td>
        <div className="plan-meta">
          <span>{plan.targetRoles.join("、")}</span>
          <span>{plan.targetUnits} 个单位 · {plan.targetPeople} 人</span>
        </div>
      </td>
      <td>
        <span className={`badge ${planStatusBadge(plan.status)}`}>{planStatusLabel(plan.status)}</span>
        {plan.reminder && <div className="plan-meta plan-meta--reminder">{plan.reminder}</div>}
      </td>
      <td>
        <div className="plan-progress">
          <div className="plan-progress__bar">
            <div className="plan-progress__fill" style={{ width: `${Math.round(plan.progress * 100)}%` }} />
          </div>
          <span>{Math.round(plan.progress * 100)}%</span>
        </div>
        <small className="plan-meta plan-meta--deadline">{plan.nextDeadline}</small>
      </td>
      <td>
        <div className="plan-meta">
          <span>{plan.examCount} 场考试</span>
        </div>
      </td>
      <td>
        <div className="plan-meta">
          <span>{plan.certificatePolicy}</span>
        </div>
      </td>
      <td>{new Date(plan.updatedAt).toLocaleString()}</td>
      <td>
        <div className="table-actions">
          <button type="button" onClick={onView}>
            查看详情
          </button>
          <button type="button">复制计划</button>
          <button type="button" className="table-actions__primary">
            催办
          </button>
        </div>
      </td>
    </tr>
  );
};

const planStatusLabel = (status: GAPlanItem["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审批";
    case "approving":
      return "审批中";
    case "active":
      return "进行中";
    case "completed":
      return "已完成";
    case "archived":
      return "已归档";
    default:
      return status;
  }
};

const planStatusBadge = (status: GAPlanItem["status"]) => {
  switch (status) {
    case "draft":
      return "badge--info";
    case "pending":
      return "badge--warning";
    case "approving":
      return "badge--purple";
    case "active":
      return "badge--success";
    case "completed":
      return "badge--soft";
    case "archived":
      return "badge--soft";
    default:
      return "badge--soft";
  }
};

const planTypeLabel = (type: string) => {
  switch (type) {
    case "onboard":
      return "岗前培训";
    case "promotion":
      return "晋升培训";
    case "annual":
      return "年度复训";
    case "special":
      return "专项培训";
    default:
      return type;
  }
};

export default GATrainingPlansPage;
