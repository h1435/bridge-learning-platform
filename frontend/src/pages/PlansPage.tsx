import PageSection from "../components/PageSection";
import PlanCard from "../components/PlanCard";
import { PlanSummaries } from "../mocks/dashboard";
import type { PageProps } from "../App";

const PlansPage = ({ personaKey }: PageProps) => {
  const plans = PlanSummaries[personaKey] ?? [];

  return (
    <div className="page">
      <PageSection
        title="培训计划总览"
        description="查看计划基本信息、目标岗位、执行进度，支持快速筛选和催办。"
        action={
          <button className="topbar__cta topbar__cta--subtle">创建计划</button>
        }
      >
        {plans.length > 0 ? (
          <div className="plan-grid">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h4>暂无培训计划</h4>
            <p>可以尝试创建新的计划，或切换其他角色查看示例数据。</p>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default PlansPage;

