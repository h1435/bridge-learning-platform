export type ServiceStatus = "healthy" | "warning" | "critical";

export type MonitoringMetric = {
  id: string;
  label: string;
  value: string;
  trendLabel?: string;
  trendValue?: string;
  status?: "up" | "down" | "stable";
};

export type ServiceHealth = {
  id: string;
  name: string;
  owner: string;
  status: ServiceStatus;
  availability: number;
  latency: number;
  incidentsToday: number;
  lastIncidentAt?: string;
};

export type AlertItem = {
  id: string;
  severity: "P0" | "P1" | "P2";
  title: string;
  service: string;
  triggeredAt: string;
  status: "triggered" | "acknowledged" | "resolved";
  owner: string;
};

export type IncidentItem = {
  id: string;
  service: string;
  startAt: string;
  endAt?: string;
  duration: string;
  impact: string;
  rootCause: string;
  status: "investigating" | "mitigated" | "resolved";
};

export type CapacityUsage = {
  id: string;
  label: string;
  percent: number;
  status: "normal" | "high" | "critical";
};

export const MonitoringMetrics: MonitoringMetric[] = [
  {
    id: "metric-uptime",
    label: "近30日平台可用性",
    value: "99.94%",
    trendLabel: "SLA",
    trendValue: "99.90%",
    status: "up"
  },
  {
    id: "metric-latency",
    label: "接口 P95 时延",
    value: "286ms",
    trendLabel: "较昨日",
    trendValue: "-12%",
    status: "down"
  },
  {
    id: "metric-alerts",
    label: "今日告警",
    value: "7 条",
    trendLabel: "处理中",
    trendValue: "3",
    status: "stable"
  },
  {
    id: "metric-incidents",
    label: "当月事故率",
    value: "0.03%",
    trendLabel: "同比",
    trendValue: "-0.01%",
    status: "up"
  }
];

export const ServiceHealthList: ServiceHealth[] = [
  {
    id: "svc-auth",
    name: "身份认证服务",
    owner: "平台运维组",
    status: "healthy",
    availability: 99.98,
    latency: 210,
    incidentsToday: 0,
    lastIncidentAt: "2024-03-12 08:42"
  },
  {
    id: "svc-course",
    name: "课程资源服务",
    owner: "资源中心团队",
    status: "warning",
    availability: 99.63,
    latency: 420,
    incidentsToday: 1,
    lastIncidentAt: "2024-04-05 09:18"
  },
  {
    id: "svc-exam",
    name: "考试与监考服务",
    owner: "考试产品组",
    status: "healthy",
    availability: 99.91,
    latency: 265,
    incidentsToday: 0,
    lastIncidentAt: "2024-03-28 16:10"
  },
  {
    id: "svc-file",
    name: "文件上传与转码",
    owner: "平台运维组",
    status: "critical",
    availability: 98.74,
    latency: 860,
    incidentsToday: 2,
    lastIncidentAt: "2024-04-05 07:50"
  }
];

export const AlertList: AlertItem[] = [
  {
    id: "ALERT-1042",
    severity: "P0",
    title: "文件转码失败率超过 10%",
    service: "文件上传与转码",
    triggeredAt: "2024-04-05 08:05",
    status: "triggered",
    owner: "平台运维组"
  },
  {
    id: "ALERT-1048",
    severity: "P1",
    title: "课程资源接口 P95 超阈值",
    service: "课程资源服务",
    triggeredAt: "2024-04-05 08:32",
    status: "acknowledged",
    owner: "资源中心团队"
  },
  {
    id: "ALERT-1051",
    severity: "P2",
    title: "考试监控服务日志异常增长",
    service: "考试与监考服务",
    triggeredAt: "2024-04-05 07:48",
    status: "resolved",
    owner: "考试产品组"
  }
];

export const IncidentList: IncidentItem[] = [
  {
    id: "INC-3021",
    service: "文件上传与转码",
    startAt: "2024-04-05 07:42",
    endAt: "2024-04-05 08:20",
    duration: "38 分钟",
    impact: "部分租户上传课件失败，需重试",
    rootCause: "对象存储区域网络抖动导致转码服务不可用",
    status: "resolved"
  },
  {
    id: "INC-3016",
    service: "课程资源服务",
    startAt: "2024-04-04 16:30",
    duration: "处理中",
    impact: "课程详情接口响应增大，影响后台运营查询",
    rootCause: "Redis 缓存命中率下降，正在排查",
    status: "investigating"
  }
];

export const CapacityUsageList: CapacityUsage[] = [
  {
    id: "capacity-db",
    label: "数据库连接池",
    percent: 82,
    status: "normal"
  },
  {
    id: "capacity-oss",
    label: "对象存储容量",
    percent: 68,
    status: "normal"
  },
  {
    id: "capacity-redis",
    label: "Redis 内存使用",
    percent: 74,
    status: "high"
  },
  {
    id: "capacity-mq",
    label: "消息队列积压",
    percent: 36,
    status: "normal"
  }
];

export const severityColor = (severity: AlertItem["severity"]) => {
  switch (severity) {
    case "P0":
      return "badge--danger";
    case "P1":
      return "badge--warning";
    case "P2":
      return "badge--info";
    default:
      return "badge--soft";
  }
};

export const statusLabel = (status: AlertItem["status"]) => {
  switch (status) {
    case "triggered":
      return "未恢复";
    case "acknowledged":
      return "已接手";
    case "resolved":
      return "已恢复";
    default:
      return status;
  }
};
