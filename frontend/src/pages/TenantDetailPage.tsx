import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageSection from "../components/PageSection";
import {
  TenantDetailMock,
  type TenantDetail,
  type TenantTimeline
} from "../mocks/tenantDetail";
import { TenantsMock } from "../mocks/tenants";

const statusBadgeClass: Record<TenantDetail["status"], string> = {
  active: "badge--success",
  trial: "badge--info",
  expiring: "badge--warning",
  suspended: "badge--danger"
};

const TenantDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTenantId, setSelectedTenantId] = useState<string>(TenantDetailMock[0]?.id ?? "");

  const detail = useMemo<TenantDetail | undefined>(
    () => TenantDetailMock.find((item) => item.id === selectedTenantId),
    [selectedTenantId]
  );

  const tenantOptions = useMemo(
    () =>
      TenantsMock.map((tenant) => ({
        id: tenant.id,
        name: tenant.name
      })),
    []
  );

  useEffect(() => {
    const tenantId = searchParams.get("tenantId");
    if (tenantId && tenantId !== selectedTenantId) {
      const exists = TenantDetailMock.some((item) => item.id === tenantId);
      if (exists) {
        setSelectedTenantId(tenantId);
      }
    }
  }, [searchParams, selectedTenantId]);

  const handleSelectChange = (nextId: string) => {
    setSelectedTenantId(nextId);
    setSearchParams(nextId ? { tenantId: nextId } : {});
  };

  const handleBack = () => {
    navigate("/pa/tenant-list");
  };

  if (!detail) {
    return (
      <div className="page">
        <PageSection title="租户详情">
          <div className="empty-state">
            <h4>未找到租户信息</h4>
            <p>请选择已有租户，或返回列表页面重新选择。</p>
          </div>
        </PageSection>
      </div>
    );
  }

  return (
    <div className="page tenant-detail">
      <PageSection
        title="租户详情"
        description="查看租户总体信息、管理员、资源使用情况，执行常用运维操作。"
        action={
          <div className="tenant-detail__action-bar">
            <button type="button" className="topbar__cta topbar__cta--ghost" onClick={handleBack}>
              返回租户列表
            </button>
            <select
              value={selectedTenantId}
              onChange={(event) => handleSelectChange(event.target.value)}
              className="tenant-detail__selector"
            >
              {tenantOptions.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <header className="tenant-detail__header">
          <div>
            <div className="tenant-detail__breadcrumbs">租户中心 / {detail.name}</div>
            <h2>{detail.name}</h2>
            <p>{detail.description}</p>
            <div className="tag-list">
              <span className={`badge ${statusBadgeClass[detail.status]}`}>
                {labelForStatus(detail.status)}
              </span>
              <span className={`tag ${packageBadge(detail.package)}`}>{detail.package}</span>
              {detail.tags?.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="tenant-detail__actions">
            <button type="button" className="topbar__cta topbar__cta--ghost">
              进入租户后台
            </button>
            <button type="button" className="topbar__cta topbar__cta--subtle">
              发送续费提醒
            </button>
            <button type="button" className="topbar__cta">
              编辑租户信息
            </button>
          </div>
        </header>

        <div className="tenant-detail__metrics">
          {detail.metrics.map((metric) => (
            <div key={metric.label} className="tenant-detail__metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              {metric.caption && <p>{metric.caption}</p>}
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="基础信息"
        description="合同信息、联系人、租户基础配置数据。"
      >
        <div className="tenant-detail__info-grid">
          <InfoItem label="行业">
            {detail.industry}
          </InfoItem>
          <InfoItem label="地区">
            {detail.region}
          </InfoItem>
          <InfoItem label="合同编号">
            {detail.contractCode}
          </InfoItem>
          <InfoItem label="开通时间">
            {formatDate(detail.createdAt)}
          </InfoItem>
          <InfoItem label="到期时间">
            {formatDate(detail.expireAt)}
          </InfoItem>
          <InfoItem label="主要联系人">
            <span>{detail.contact.person}</span>
            <span>{detail.contact.phone}</span>
            <span>{detail.contact.email}</span>
          </InfoItem>
        </div>
      </PageSection>

      <PageSection
        title="管理员账号"
        description="当前租户的管理员权限与最近登录情况。"
      >
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>角色</th>
                <th>手机号</th>
                <th>邮箱</th>
                <th>最近登录</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {detail.admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.role}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>{admin.lastLogin}</td>
                  <td>
                    <span className={`badge ${admin.status === "active" ? "badge--success" : "badge--danger"}`}>
                      {admin.status === "active" ? "启用" : "停用"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button">重置密码</button>
                      <button type="button">
                        {admin.status === "active" ? "禁用账号" : "启用账号"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        title="资源使用情况"
        description="掌握租户在账号、存储、题库、并发等资源上的使用情况，提前预警超额。"
      >
        <div className="tenant-detail__usage-grid">
          {detail.usage.map((item) => (
            <div key={item.name} className="usage-card">
              <div className="usage-card__header">
                <span>{item.name}</span>
                <strong>{item.used.toLocaleString()} / {item.total.toLocaleString()} {item.unit}</strong>
              </div>
              <div className="usage-card__progress">
                <div
                  className="usage-card__progress-bar"
                  style={{ width: `${Math.min(100, Math.round((item.used / item.total) * 100))}%` }}
                />
              </div>
              <div className="usage-card__footnote">
                已使用 {Math.round((item.used / item.total) * 100)}%，支持自动扩容。
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="最近动态"
        description="自动记录租户重要运维动态与业务事件，支持点击查看详情。"
      >
        <TenantTimelineList items={detail.timeline} />
      </PageSection>
    </div>
  );
};

const labelForStatus = (status: TenantDetail["status"]) => {
  switch (status) {
    case "active":
      return "运行中";
    case "trial":
      return "试用中";
    case "expiring":
      return "即将到期";
    case "suspended":
      return "已停用";
    default:
      return status;
  }
};

const packageBadge = (pkg: string) => {
  switch (pkg) {
    case "旗舰版":
      return "tag--purple";
    case "专业版":
      return "tag--blue";
    case "标准版":
      return "tag--slate";
    case "试用版":
      return "tag--amber";
    default:
      return "";
  }
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString();

const InfoItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="tenant-detail__info-cell">
    <span>{label}</span>
    <div>{children}</div>
  </div>
);

const TenantTimelineList = ({ items }: { items: TenantTimeline[] }) => (
  <div className="tenant-timeline">
    {items.map((item, index) => (
      <div key={item.id} className="tenant-timeline__item">
        <div className="tenant-timeline__time">
          <span>{item.time}</span>
        </div>
        <div className="tenant-timeline__content">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
        {index !== items.length - 1 && <div className="tenant-timeline__line" />}
      </div>
    ))}
  </div>
);

export default TenantDetailPage;

