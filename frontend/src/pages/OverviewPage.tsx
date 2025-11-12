import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import PlanCard from "../components/PlanCard";
import Timeline from "../components/Timeline";
import {
  ApprovalTasksGA,
  DashboardMetrics,
  ExamRemindersGA,
  MADashboardData,
  PlanSummaries,
  TimelineEvents,
  UnitHighlightsGA
} from "../mocks/dashboard";
import type { PageProps } from "../App";

const OverviewPage = ({ personaKey }: PageProps) => {
  if (personaKey === "GA") {
    return <GADashboard />;
  }
  if (personaKey === "MA") {
    return <MADashboard />;
  }

  const metrics = DashboardMetrics[personaKey];
  const plans = PlanSummaries[personaKey] ?? [];

  const events = TimelineEvents.filter((event) => event.persona.includes(personaKey));

  return (
    <div className="page">
      <PageSection
        title="关键指标"
        description="实时概览本角色关注的核心指标，辅助判断培训执行健康度。"
      >
        <div className="kpi-grid">
          {metrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="重点计划 / 任务"
        description="当前角色重点关注的培训计划、执行进度与提醒事项。"
      >
        <div className="plan-grid">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="今日动态"
        description="系统自动汇总与本角色相关的最新事件和提醒。"
      >
        <Timeline events={events} />
      </PageSection>
    </div>
  );
};

const GADashboard = () => {
  const plans = PlanSummaries.GA ?? [];
  const events = TimelineEvents.filter((event) => event.persona.includes("GA"));

  return (
    <div className="page">
      <PageSection
        title="培训计划执行概览"
        description="关注关键培训计划的完成情况与提醒。"
      >
        <div className="plan-grid">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="下属管养单位动态"
        description="查看重点管养单位的活跃度、学习人次与风险提示。"
      >
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>管养单位</th>
                <th>活跃用户</th>
                <th>学习人次</th>
                <th>风险提示</th>
                <th>提醒</th>
              </tr>
            </thead>
            <tbody>
              {UnitHighlightsGA.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.name}</td>
                  <td>{unit.activeUsers.toLocaleString()}</td>
                  <td>{unit.learningSessions.toLocaleString()}</td>
                  <td>{unit.risk}</td>
                  <td>{unit.reminder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        title="待处理事项"
        description="快速处理资料审核、计划审批、考试安排等待办。"
      >
        <div className="dashboard-grid dashboard-grid--two">
          <div className="dashboard-panel">
            <header className="dashboard-panel__header">
              <div>
                <h4>资料 / 计划待办</h4>
                <p>优先处理紧急审批任务</p>
              </div>
            </header>
            <ul className="reminder-list">
              {ApprovalTasksGA.map((task) => (
                <li key={task.id}>
                  <div className="reminder-list__title">
                    <strong>{task.title}</strong>
                    <span>{task.deadline}</span>
                  </div>
                  <div className="reminder-list__meta">
                    <span>{task.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-panel">
            <header className="dashboard-panel__header">
              <div>
                <h4>考试 / 证书提醒</h4>
                <p>关注待发布考试与证书发放进度</p>
              </div>
            </header>
            <ul className="reminder-list">
              {ExamRemindersGA.map((reminder) => (
                <li key={reminder.id}>
                  <div className="reminder-list__title">
                    <strong>{reminder.title}</strong>
                  </div>
                  <div className="reminder-list__meta">
                    <span>{reminder.time}</span>
                    <span>{reminder.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="今日动态"
        description="系统自动汇总最新的审批、发布与考试安排事件。"
      >
        <Timeline events={events} />
      </PageSection>
    </div>
  );
};

const MADashboard = () => {
  const data = MADashboardData;
  return (
    <div className="ma-dashboard">
      <section className="ma-dashboard__section">
        <h4>学习计划 / 任务</h4>
        <div className="ma-dashboard__summary">
          {data.planSummary.map((item) => (
            <div key={item.id} className="ma-dashboard__summary-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.trend}</p>
            </div>
          ))}
        </div>
        <div className="ma-dashboard__plans">
          {data.learningPlans.map((plan) => (
            <div key={plan.id} className="ma-dashboard__plan-card">
              <div className="ma-dashboard__plan-header">
                <div className="ma-dashboard__plan-title">
                  <strong>{plan.name}</strong>
                  <span>{plan.audience}</span>
                </div>
                <button type="button" className="ma-dashboard__plan-link">
                  查看执行详情
                </button>
              </div>
              <div className="ma-dashboard__plan-meta">
                <div className="ma-dashboard__plan-row">
                  <span className="ma-dashboard__plan-label">计划时间</span>
                  <span className="ma-dashboard__plan-value">{plan.period}</span>
                </div>
                <div className="ma-dashboard__plan-row">
                  <span className="ma-dashboard__plan-label">当前状态</span>
                  <span className="ma-dashboard__plan-value">{plan.status}</span>
                </div>
                {plan.nextMilestone ? (
                  <div className="ma-dashboard__plan-row">
                    <span className="ma-dashboard__plan-label">下一节点</span>
                    <span className="ma-dashboard__plan-value">{plan.nextMilestone}</span>
                  </div>
                ) : null}
              </div>
              <div className="ma-dashboard__plan-progress">
                <div className="plan-progress__bar">
                  <div className="plan-progress__fill" style={{ width: `${plan.progress}%` }} />
                </div>
                <span>{plan.progress}%</span>
              </div>
              {plan.warning ? (
                <div className="ma-dashboard__plan-alert">
                  <strong>异常预警：</strong>
                  <span>{plan.warning}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="ma-dashboard__section">
        <h4>待处理事项</h4>
        <div className="ma-dashboard__followups">
          <div className="ma-dashboard__followup-group">
            <h5>待确认计划</h5>
            {data.followUps.pendingConfirm.map((item) => (
              <div key={item.id} className="ma-dashboard__followup-item">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.impact}</span>
                </div>
                <div className="ma-dashboard__followup-meta">
                  <span>{item.deadline}</span>
                  <button type="button" className="topbar__cta topbar__cta--link">
                    去确认
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="ma-dashboard__followup-group">
            <h5>待审核资料</h5>
            {data.followUps.pendingReview.map((item) => (
              <div key={item.id} className="ma-dashboard__followup-item">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.count} 人待审核</span>
                </div>
                <div className="ma-dashboard__followup-meta">
                  <span>{item.note}</span>
                  <button type="button" className="topbar__cta topbar__cta--link">
                    去审核
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ma-dashboard__section">
        <h4>学习跟进</h4>
        <div className="ma-dashboard__learning">
          <div className="ma-dashboard__learning-overview">
            <span>总体完成率</span>
            <strong>{data.learning.completionRate}%</strong>
            <div className="plan-progress__bar">
              <div className="plan-progress__fill" style={{ width: `${data.learning.completionRate}%` }} />
            </div>
          </div>
          <div className="ma-dashboard__learning-lag">
            {data.learning.laggingGroups.map((group) => (
              <div key={group.id} className="ma-dashboard__learning-item">
                <div>
                  <strong>{group.name}</strong>
                  <span>{group.issue}</span>
                </div>
                <span>负责人：{group.responsible}</span>
                <button type="button" className="topbar__cta topbar__cta--link">
                  查看详情
                </button>
              </div>
            ))}
          </div>
          <div className="ma-dashboard__learning-actions">
            {data.learning.actions.map((action) => (
              <button key={action.id} type="button" className="topbar__cta topbar__cta--subtle">
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ma-dashboard__section">
        <h4>考核与证书提醒</h4>
        <div className="ma-dashboard__assessments">
          <div className="ma-dashboard__list-block">
            <h5>近期考试</h5>
            {data.assessments.upcomingExams.map((exam) => (
              <div key={exam.id} className="ma-dashboard__list-item">
                <div>
                  <strong>{exam.name}</strong>
                  <span>{exam.time}</span>
                </div>
                <span>{exam.status}</span>
                <button type="button" className="topbar__cta topbar__cta--link">
                  查看安排
                </button>
              </div>
            ))}
          </div>
          <div className="ma-dashboard__list-block">
            <h5>证书续期</h5>
            {data.assessments.expiringCertificates.map((cert) => (
              <div key={cert.id} className="ma-dashboard__list-item">
                <div>
                  <strong>{cert.name}</strong>
                  <span>{cert.count} 人到期</span>
                </div>
                <span>{cert.deadline}</span>
                <button type="button" className="topbar__cta topbar__cta--link">
                  发起续期
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewPage;

