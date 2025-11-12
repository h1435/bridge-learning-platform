import type { PlanSummary } from "../mocks/dashboard";

type PlanCardProps = {
  plan: PlanSummary;
};

const statusColors: Record<PlanSummary["status"], string> = {
  未开始: "rgba(59,130,246,0.15)",
  进行中: "rgba(34,197,94,0.15)",
  已结束: "rgba(148,163,184,0.25)"
};

const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <div className="plan-card">
      <div className="plan-card__header">
        <span
          className="plan-card__status"
          style={{ background: statusColors[plan.status] }}
        >
          {plan.status}
        </span>
        <span className="plan-card__period">{plan.period}</span>
      </div>
      <h4>{plan.name}</h4>
      <div className="plan-card__roles">
        {plan.targetRoles.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
      <div className="plan-card__progress">
        <div className="plan-card__progress-bar">
          <div style={{ width: `${Math.round(plan.completionRate * 100)}%` }} />
        </div>
        <span>{Math.round(plan.completionRate * 100)}%</span>
      </div>
      {plan.highlight && <p className="plan-card__note">{plan.highlight}</p>}
    </div>
  );
};

export default PlanCard;

