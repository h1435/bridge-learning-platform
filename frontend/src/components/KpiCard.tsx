import type { KpiMetric } from "../mocks/dashboard";

type KpiCardProps = {
  metric: KpiMetric;
};

const statusColor: Record<
  NonNullable<KpiMetric["status"]>,
  { background: string; text: string }
> = {
  up: { background: "rgba(34,197,94,0.14)", text: "#15803d" },
  down: { background: "rgba(239,68,68,0.14)", text: "#b91c1c" },
  stable: { background: "rgba(59,130,246,0.14)", text: "#1d4ed8" }
};

const KpiCard = ({ metric }: KpiCardProps) => {
  const badgeStyle =
    metric.status != null ? statusColor[metric.status] : undefined;

  return (
    <div className="kpi-card">
      <div>
        <span className="kpi-card__label">{metric.label}</span>
        <h4>{metric.value}</h4>
      </div>
      {(metric.trendLabel || metric.trendValue) && (
        <span
          className="kpi-card__badge"
          style={
            badgeStyle
              ? { background: badgeStyle.background, color: badgeStyle.text }
              : undefined
          }
        >
          {metric.trendLabel && <strong>{metric.trendLabel}</strong>}
          {metric.trendValue && <span>{metric.trendValue}</span>}
        </span>
      )}
    </div>
  );
};

export default KpiCard;

