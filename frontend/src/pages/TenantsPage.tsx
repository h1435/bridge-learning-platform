import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  TenantStats,
  TenantsMock,
  TenantStatusOptions,
  TenantPackageOptions,
  type TenantInfo,
  type TenantStatus
} from "../mocks/tenants";

const statusLabel: Record<TenantStatus, string> = {
  active: "运行中",
  trial: "试用中",
  expiring: "即将到期",
  suspended: "已停用"
};

const statusBadgeClass: Record<TenantStatus, string> = {
  active: "badge--success",
  trial: "badge--info",
  expiring: "badge--warning",
  suspended: "badge--danger"
};

const packageColor: Record<string, string> = {
  旗舰版: "tag--purple",
  专业版: "tag--blue",
  标准版: "tag--slate",
  试用版: "tag--amber"
};

const TenantsPage = () => {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<TenantStatus | "all">("all");
  const [packageFilter, setPackageFilter] = useState<string>("all");
  const navigate = useNavigate();

  const metrics = useMemo(
    () => [
      {
        id: "tenant-total",
        label: "租户总数",
        value: `${TenantStats.total} 家`,
        trendLabel: "新增演示",
        trendValue: "+1",
        status: "up"
      },
      {
        id: "tenant-active",
        label: "运行中租户",
        value: `${TenantStats.active} 家`,
        trendLabel: "活跃率",
        trendValue: `${Math.round((TenantStats.active / TenantStats.total) * 100)}%`,
        status: "stable"
      },
      {
        id: "tenant-expiring",
        label: "即将到期",
        value: `${TenantStats.expiring} 家`,
        trendLabel: "需跟进",
        trendValue: "续费提醒",
        status: "down"
      },
      {
        id: "tenant-new",
        label: "今日新增",
        value: `${TenantStats.newToday} 家`,
        trendLabel: "试用转正",
        trendValue: "进行中",
        status: "up"
      }
    ],
    []
  );

  const filteredTenants = useMemo(() => {
    return TenantsMock.filter((tenant) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        tenant.name.includes(keyword.trim()) ||
        tenant.region.includes(keyword.trim()) ||
        tenant.contractCode.toLowerCase().includes(keyword.trim().toLowerCase());
      const matchStatus =
        statusFilter === "all" ? true : tenant.status === statusFilter;
      const matchPackage =
        packageFilter === "all" ? true : tenant.package === packageFilter;
      return matchKeyword && matchStatus && matchPackage;
    });
  }, [keyword, packageFilter, statusFilter]);

  return (
    <div className="page">
      <PageSection
        title="租户运行概览"
        description="掌握当前租户的运营状态与续约风险，为运维和商务动作提供依据。"
      >
        <div className="kpi-grid">
          {metrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="租户列表"
        description="支持按行业、套餐、状态等维度筛选租户，并可快速进行启用停用、续费提醒等操作。"
        action={
          <div className="action-group">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导出列表
            </button>
            <button type="button" className="topbar__cta">
              新建租户
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索租户名称 / 地区 / 合同编号"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as TenantStatus | "all")
              }
            >
              {TenantStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={packageFilter}
              onChange={(event) => setPackageFilter(event.target.value)}
            >
              {TenantPackageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link">
              保存视图
            </button>
            <button type="button" className="filter-bar__link">
              重置
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>租户名称</th>
                <th>行业 / 地区</th>
                <th>套餐版本</th>
                <th>状态</th>
                <th>开通时间</th>
                <th>到期时间</th>
                <th>近7日活跃</th>
                <th>合同编号</th>
                <th>运维负责人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <TenantRow
                  key={tenant.id}
                  tenant={tenant}
                  onView={() => navigate(`/pa/tenant-detail?tenantId=${tenant.id}`)}
                />
              ))}
              {filteredTenants.length === 0 && (
                <tr>
                  <td colSpan={10}>
                    <div className="empty-state">
                      <h4>没有符合条件的租户</h4>
                      <p>尝试调整筛选条件，或创建新的租户。</p>
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

const TenantRow = ({ tenant, onView }: { tenant: TenantInfo; onView: () => void }) => {
  const statusClass = statusBadgeClass[tenant.status] ?? "badge--soft";
  const pkgClass = packageColor[tenant.package] ?? "tag--slate";

  return (
    <tr>
      <td>
        <div className="tenant-cell">
          <div>
            <strong>{tenant.name}</strong>
            {tenant.tags && (
              <div className="tag-list">
                {tenant.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </td>
      <td>
        <div className="tenant-meta">
          <span>{tenant.industry}</span>
          <span>{tenant.region}</span>
        </div>
      </td>
      <td>
        <span className={`tag ${pkgClass}`}>{tenant.package}</span>
      </td>
      <td>
        <span className={`badge ${statusClass}`}>{statusLabel[tenant.status]}</span>
      </td>
      <td>{new Date(tenant.createdAt).toLocaleDateString()}</td>
      <td>{new Date(tenant.expireAt).toLocaleDateString()}</td>
      <td>{tenant.activeUsers7d.toLocaleString()}</td>
      <td>{tenant.contractCode}</td>
      <td>{tenant.opsOwner}</td>
      <td>
        <div className="table-actions">
          <button type="button" onClick={onView}>
            查看
          </button>
          <button type="button">启用/停用</button>
          <button type="button">重置密码</button>
        </div>
      </td>
    </tr>
  );
};

export default TenantsPage;

