import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  MonitoringMetrics,
  ServiceHealthList,
  AlertList,
  IncidentList,
  CapacityUsageList,
  severityColor,
  statusLabel,
  type ServiceStatus
} from "../mocks/monitoring";

const MonitoringPage = () => {
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const services = useMemo(
    () => Array.from(new Set(ServiceHealthList.map((item) => item.name))),
    []
  );

  const filteredAlerts = useMemo(() => {
    return AlertList.filter((alert) => {
      const matchSeverity = severityFilter === "all" ? true : alert.severity === severityFilter;
      const matchService = serviceFilter === "all" ? true : alert.service === serviceFilter;
      return matchSeverity && matchService;
    });
  }, [serviceFilter, severityFilter]);

  return (
    <div className="page">
      <PageSection
        title="运行监控概览"
        description="实时监控平台关键服务健康度、告警与容量使用情况，支持运维决策。"
      >
        <div className="kpi-grid">
          {MonitoringMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="服务健康状态"
        description="按照服务维度展示可用性、延迟与事故情况，便于识别薄弱环节。"
      >
        <div className="status-card-grid">
          {ServiceHealthList.map((service) => (
            <div key={service.id} className={`status-card status-card--${service.status}`}>
              <div className="status-card__header">
                <div>
                  <h4>{service.name}</h4>
                  <span>负责人：{service.owner}</span>
                </div>
                <span className={`badge ${healthBadge(service.status)}`}>{healthLabel(service.status)}</span>
              </div>
              <div className="status-card__body">
                <div>
                  <strong>{service.availability}%</strong>
                  <span>近30日可用性</span>
                </div>
                <div>
                  <strong>{service.latency} ms</strong>
                  <span>P95 时延</span>
                </div>
                <div>
                  <strong>{service.incidentsToday}</strong>
                  <span>今日事故</span>
                </div>
              </div>
              <footer className="status-card__footer">
                上次事故：{service.lastIncidentAt ?? "暂无记录"}
              </footer>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="告警与容量监控"
        description="关注高优先级告警与核心资源使用趋势，及时处理潜在风险。"
      >
        <div className="monitoring-grid">
          <div className="monitoring-panel">
            <header className="monitoring-panel__header">
              <div>
                <h4>实时告警</h4>
                <p>按严重程度与服务筛选告警，支持告警处理跟踪。</p>
              </div>
              <div className="monitoring-panel__filters">
                <select value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value)}>
                  <option value="all">全部级别</option>
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
                <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)}>
                  <option value="all">全部服务</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </header>
            <table className="monitoring-table">
              <thead>
                <tr>
                  <th>告警</th>
                  <th>服务</th>
                  <th>触发时间</th>
                  <th>状态</th>
                  <th>负责人</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td>
                      <div className="alert-cell">
                        <span className={`badge ${severityColor(alert.severity)}`}>{alert.severity}</span>
                        <div>
                          <strong>{alert.title}</strong>
                          <span>{alert.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{alert.service}</td>
                    <td>{alert.triggeredAt}</td>
                    <td>
                      <span className="badge badge--soft">{statusLabel(alert.status)}</span>
                    </td>
                    <td>{alert.owner}</td>
                  </tr>
                ))}
                {filteredAlerts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="monitoring-table__empty">
                      暂无匹配的告警
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="monitoring-panel">
            <header className="monitoring-panel__header">
              <div>
                <h4>资源容量</h4>
                <p>关键组件容量占用情况，超过阈值时提醒扩容。</p>
              </div>
            </header>
            <ul className="capacity-list">
              {CapacityUsageList.map((item) => (
                <li key={item.id}>
                  <div className="capacity-list__label">
                    <strong>{item.label}</strong>
                    <span>{item.percent}%</span>
                  </div>
                  <div className="capacity-list__bar">
                    <div className={`capacity-list__fill capacity-list__fill--${item.status}`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className={`capacity-list__status capacity-list__status--${item.status}`}>
                    {capacityStatusText(item.status)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="事故记录"
        description="回顾近期事故处理进展，复盘影响范围与根因分析。"
      >
        <table className="monitoring-table">
          <thead>
            <tr>
              <th>事故编号</th>
              <th>服务</th>
              <th>起止时间</th>
              <th>持续时间</th>
              <th>影响</th>
              <th>根因</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {IncidentList.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.service}</td>
                <td>
                  {incident.startAt}
                  {incident.endAt ? ` ~ ${incident.endAt}` : ""}
                </td>
                <td>{incident.duration}</td>
                <td>{incident.impact}</td>
                <td>{incident.rootCause}</td>
                <td>
                  <span className={`badge ${incidentStatusBadge(incident.status)}`}>
                    {incidentStatusLabel(incident.status)}
                  </span>
                </td>
              </tr>
            ))}
            {IncidentList.length === 0 && (
              <tr>
                <td colSpan={7} className="monitoring-table__empty">
                  暂无事故记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </PageSection>
    </div>
  );
};

const healthLabel = (status: ServiceStatus) => {
  switch (status) {
    case "healthy":
      return "运行正常";
    case "warning":
      return "关注中";
    case "critical":
      return "严重";
    default:
      return status;
  }
};

const healthBadge = (status: ServiceStatus) => {
  switch (status) {
    case "healthy":
      return "badge--success";
    case "warning":
      return "badge--warning";
    case "critical":
      return "badge--danger";
    default:
      return "badge--soft";
  }
};

const capacityStatusText = (status: "normal" | "high" | "critical") => {
  switch (status) {
    case "normal":
      return "正常";
    case "high":
      return "偏高";
    case "critical":
      return "临近上限";
    default:
      return status;
  }
};

const incidentStatusLabel = (status: (typeof IncidentList)[number]["status"]) => {
  switch (status) {
    case "investigating":
      return "定位中";
    case "mitigated":
      return "已缓解";
    case "resolved":
      return "已关闭";
    default:
      return status;
  }
};

const incidentStatusBadge = (status: (typeof IncidentList)[number]["status"]) => {
  switch (status) {
    case "investigating":
      return "badge--warning";
    case "mitigated":
      return "badge--info";
    case "resolved":
      return "badge--success";
    default:
      return "badge--soft";
  }
};

export default MonitoringPage;
