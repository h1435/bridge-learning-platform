import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  AnnouncementMock,
  ExamReminderMock,
  HotCoursesMock,
  HotQuestionsMock,
  PlanReminderMock,
  PlanStatusSummaryMock,
  QuickActions,
  SystemHealthSnapshotMock,
  TenantActivityMock,
  TenantTypeFilters,
  UsageTrendMock
} from "../mocks/platformDashboard";

const PlatformDashboardPage = () => {
  const [tenantType, setTenantType] = useState<string>("all");
  const [trendView, setTrendView] = useState<"week" | "month">("week");

  const tenants = useMemo(() => {
    return tenantType === "all"
      ? TenantActivityMock
      : TenantActivityMock.filter((tenant) => tenant.tenantType === tenantType);
  }, [tenantType]);

  const trendData = useMemo(() => {
    if (trendView === "week") {
      return UsageTrendMock;
    }
    // 粗略按两周聚合为月度视图
    const chunkSize = 2;
    const chunks = [] as typeof UsageTrendMock;
    for (let index = 0; index < UsageTrendMock.length; index += chunkSize) {
      const slice = UsageTrendMock.slice(index, index + chunkSize);
      const periodLabel = `第 ${Math.floor(index / chunkSize) + 1} 月`;
      const aggregated = slice.reduce(
        (acc, item) => {
          acc.publishedCourses += item.publishedCourses;
          acc.learningSessions += item.learningSessions;
          acc.questionUsages += item.questionUsages;
          return acc;
        },
        { publishedCourses: 0, learningSessions: 0, questionUsages: 0 }
      );
      chunks.push({
        period: periodLabel,
        publishedCourses: aggregated.publishedCourses,
        learningSessions: aggregated.learningSessions,
        questionUsages: aggregated.questionUsages
      });
    }
    return chunks;
  }, [trendView]);

  const maxSessions = useMemo(
    () => Math.max(...trendData.map((item) => item.learningSessions), 1),
    [trendData]
  );
  const maxQuestions = useMemo(
    () => Math.max(...trendData.map((item) => item.questionUsages), 1),
    [trendData]
  );
  const maxCourses = useMemo(
    () => Math.max(...trendData.map((item) => item.publishedCourses), 1),
    [trendData]
  );

  return (
    <div className="page">
      <PageSection
        title="租户运营概览"
        description="对重点租户的活跃度、学习投入与健康度进行监控，便于及时跟进。"
      >
        <div className="dashboard-filter">
          <select value={tenantType} onChange={(event) => setTenantType(event.target.value)}>
            {TenantTypeFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>租户名称</th>
                <th>租户类型</th>
                <th>活跃用户数</th>
                <th>学习人次</th>
                <th>考试通过率</th>
                <th>健康状况</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td>{tenant.tenantName}</td>
                  <td>{tenant.tenantType}</td>
                  <td>{tenant.activeUsers.toLocaleString()}</td>
                  <td>{tenant.learningSessions.toLocaleString()}</td>
                  <td>{Math.round(tenant.examPassRate * 100)}%</td>
                  <td>
                    <span className={`badge ${healthBadge(tenant.healthTag)}`}>{tenant.healthTag}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        title="内容与学习使用"
        description="观察课程发布与学习、题库引用趋势，识别热门资源。"
        action={
          <div className="dashboard-filter">
            <label>
              <span>时间维度</span>
              <select
                value={trendView}
                onChange={(event) => setTrendView(event.target.value as typeof trendView)}
              >
                <option value="week">按周查看</option>
                <option value="month">按月查看</option>
              </select>
            </label>
          </div>
        }
      >
        <div className="dashboard-grid dashboard-grid--two">
          <div className="dashboard-panel">
            <header className="dashboard-panel__header">
              <div>
                <h4>课程 / 题库使用趋势</h4>
                <p>用于判断供给节奏与学习热度</p>
              </div>
            </header>
            <ul className="trend-list">
              {trendData.map((item) => (
                <li key={item.period}>
                  <div className="trend-list__label">
                    <strong>{item.period}</strong>
                    <span>{item.publishedCourses} 门新课程</span>
                  </div>
                  <div className="trend-bars">
                    <div className="trend-bars__item">
                      <span>学习</span>
                      <div className="trend-bars__bar">
                        <div
                          className="trend-bars__fill trend-bars__fill--learning"
                          style={{ width: `${Math.max((item.learningSessions / maxSessions) * 100, 6)}%` }}
                        />
                      </div>
                      <span className="trend-bars__value">{item.learningSessions.toLocaleString()}</span>
                    </div>
                    <div className="trend-bars__item">
                      <span>题库</span>
                      <div className="trend-bars__bar">
                        <div
                          className="trend-bars__fill trend-bars__fill--question"
                          style={{ width: `${Math.max((item.questionUsages / maxQuestions) * 100, 6)}%` }}
                        />
                      </div>
                      <span className="trend-bars__value">{item.questionUsages.toLocaleString()}</span>
                    </div>
                    <div className="trend-bars__item">
                      <span>新增课程</span>
                      <div className="trend-bars__bar">
                        <div
                          className="trend-bars__fill trend-bars__fill--course"
                          style={{ width: `${Math.max((item.publishedCourses / maxCourses) * 100, 6)}%` }}
                        />
                      </div>
                      <span className="trend-bars__value">{item.publishedCourses}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-panel">
            <header className="dashboard-panel__header">
              <div>
                <h4>热门资源榜单</h4>
                <p>结合课程与题库使用频率，辅助内容运营</p>
              </div>
            </header>
            <div className="hot-list">
              <section>
                <h5>热门课程</h5>
                <ul>
                  {HotCoursesMock.map((course, index) => (
                    <li key={course.id}>
                      <span className="hot-list__rank">{index + 1}</span>
                      <div className="hot-list__meta">
                        <strong>{course.name}</strong>
                        <span>{course.category}</span>
                      </div>
                      <span className="hot-list__value">{course.value.toLocaleString()} {course.metric}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h5>热门题库</h5>
                <ul>
                  {HotQuestionsMock.map((question, index) => (
                    <li key={question.id}>
                      <span className="hot-list__rank">{index + 1}</span>
                      <div className="hot-list__meta">
                        <strong>{question.name}</strong>
                        <span>{question.category}</span>
                      </div>
                      <span className="hot-list__value">{question.value} {question.metric}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="培训计划与考试快照"
        description="关注计划状态、考试准备情况，及时发现潜在风险。"
      >
        <div className="dashboard-grid dashboard-grid--two">
          <div className="dashboard-panel">
            <header className="dashboard-panel__header">
              <div>
                <h4>计划状态分布</h4>
                <p>按当前状态统计培训计划数量</p>
              </div>
            </header>
            <ul className="status-summary">
              {PlanStatusSummaryMock.map((item) => (
                <li key={item.status}>
                  <div className="status-summary__header">
                    <strong>{item.status}</strong>
                    <span>{item.count} 个</span>
                  </div>
                  <div className="status-summary__bar">
                    <div className={`status-summary__fill status-summary__fill--${statusClass(item.status)}`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="status-summary__percent">{item.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-panel">
            <header className="dashboard-panel__header">
              <div>
                <h4>提醒事项</h4>
                <p>即将到期的计划与待处理考试</p>
              </div>
            </header>
            <div className="reminder-grid">
              <section>
                <h5>即将到期的计划</h5>
                <ul className="reminder-list">
                  {PlanReminderMock.map((plan) => (
                    <li key={plan.id}>
                      <div className="reminder-list__title">
                        <strong>{plan.planName}</strong>
                        <span>{plan.deadline}</span>
                      </div>
                      <div className="reminder-list__meta">
                        <span>{plan.tenantName}</span>
                        <span>完成率 {Math.round(plan.completionRate * 100)}%</span>
                      </div>
                      <div className="reminder-list__progress">
                        <div className="reminder-list__progress-fill" style={{ width: `${plan.completionRate * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h5>待处理考试</h5>
                <ul className="reminder-list">
                  {ExamReminderMock.map((exam) => (
                    <li key={exam.id}>
                      <div className="reminder-list__title">
                        <strong>{exam.examName}</strong>
                        <span className={`badge ${exam.status === "待审核" ? "badge--warning" : "badge--info"}`}>{exam.status}</span>
                      </div>
                      <div className="reminder-list__meta">
                        <span>{exam.tenantName}</span>
                        <span>{exam.scheduledAt}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="系统运行健康"
        description="聚合运维模块信息，便于快速判断平台风险。"
      >
        <div className="dashboard-grid dashboard-grid--three">
          <div className="health-card">
            <h4>告警 & 问题</h4>
            <div className="health-card__stats">
              <div>
                <strong>{SystemHealthSnapshotMock.alertsToday}</strong>
                <span>今日告警</span>
              </div>
              <div>
                <strong>{SystemHealthSnapshotMock.highSeverityAlerts}</strong>
                <span>高优先级</span>
              </div>
              <div>
                <strong>{SystemHealthSnapshotMock.openIssues}</strong>
                <span>待处理问题</span>
              </div>
            </div>
          </div>
          <div className="health-card">
            <h4>最新版本状态</h4>
            <div className="health-card__release">
              <strong>{SystemHealthSnapshotMock.latestRelease.version}</strong>
              <span>阶段：{SystemHealthSnapshotMock.latestRelease.stage}</span>
              <div className="health-card__progress">
                <div className="health-card__progress-fill" style={{ width: `${SystemHealthSnapshotMock.latestRelease.progress}%` }} />
              </div>
              <span className="health-card__progress-label">完成 {SystemHealthSnapshotMock.latestRelease.progress}%</span>
            </div>
          </div>
          <div className="health-card">
            <h4>风险提醒</h4>
            <ul className="health-card__risk">
              {SystemHealthSnapshotMock.riskHighlights.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="快捷操作"
        description="聚合常用操作入口，提升平台运营效率。"
      >
        <div className="quick-action-grid">
          {QuickActions.map((action) => (
            <a key={action.id} className="quick-action-card" href={action.href}>
              <div className="quick-action-card__icon" aria-hidden="true">
                <span />
              </div>
              <div className="quick-action-card__meta">
                <strong>{action.label}</strong>
                <span>{action.description}</span>
              </div>
            </a>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="通知公告"
        description="最近发布的版本公告或运营通知。"
      >
        <ul className="announcement-list">
          {AnnouncementMock.map((announcement) => (
            <li key={announcement.id}>
              <div>
                <strong>{announcement.title}</strong>
                <span>{announcement.audience}</span>
              </div>
              <span>{announcement.publishedAt}</span>
            </li>
          ))}
        </ul>
      </PageSection>
    </div>
  );
};

const healthBadge = (tag: "稳定" | "观察" | "风险") => {
  switch (tag) {
    case "稳定":
      return "badge--success";
    case "观察":
      return "badge--warning";
    case "风险":
      return "badge--danger";
    default:
      return "badge--soft";
  }
};

const statusClass = (status: "进行中" | "待发布" | "已完成" | "逾期") => {
  switch (status) {
    case "进行中":
      return "ongoing";
    case "待发布":
      return "pending";
    case "已完成":
      return "completed";
    case "逾期":
      return "overdue";
    default:
      return "ongoing";
  }
};

export default PlatformDashboardPage;
