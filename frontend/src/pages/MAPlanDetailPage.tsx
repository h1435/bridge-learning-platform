import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageSection from "../components/PageSection";
import { MAPlanDetailMock } from "../mocks/maPlans";

const useQuery = () => {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
};

const statusClassMap = {
  待确认: "badge--warning",
  执行中: "badge--info",
  滞后: "badge--danger",
  已完成: "badge--success",
  已终止: "badge--slate"
} as const;

const MAPlanDetailPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const planId = query.get("id") ?? "plan-bridge-2025";
  const plan = MAPlanDetailMock[planId] ?? MAPlanDetailMock["plan-bridge-2025"];

  return (
    <div className="page">
      <PageSection
        title={plan.name}
        description={plan.description}
        action={
          <div className="section-actions">
            <button type="button" className="topbar__cta topbar__cta--ghost" onClick={() => navigate("/ma/plans")}>
              返回列表
            </button>
            <button type="button" className="topbar__cta topbar__cta--subtle">
              下载计划资料
            </button>
            <button type="button" className="topbar__cta">
              标记完成
            </button>
          </div>
        }
      >
        <div className="ma-plan__summary">
          <div className="ma-plan__summary-main">
            <div>
              <div className="ma-plan__tags">
                <span className="tag tag--slate">{plan.source}</span>
                <span className={`badge ${statusClassMap[plan.status]}`}>{plan.status}</span>
                <span className="tag tag--red">优先级：{plan.priority}</span>
              </div>
              <div className="ma-plan__meta">
                <span>计划编号：{plan.code}</span>
                <span>
                  执行周期：{plan.startDate} - {plan.endDate}
                </span>
                <span>下发时间：{plan.pushDate}</span>
              </div>
              <div className="ma-plan__owner">
                <strong>下发单位</strong>
                <div>
                  <span>{plan.owner.organization}</span>
                  <span>{plan.owner.contact}</span>
                  <span>{plan.owner.phone}</span>
                </div>
              </div>
            </div>
            <div className="ma-plan__progress">
              <div>
                <span className="ma-plan__progress-label">整体进度</span>
                <div className="plan-progress">
                  <div className="plan-progress__bar">
                    <div className="plan-progress__fill" style={{ width: `${plan.summary.overallProgress * 100}%` }} />
                  </div>
                  <span>{Math.round(plan.summary.overallProgress * 100)}%</span>
                </div>
              </div>
              <div className="ma-plan__progress-grid">
                <div>
                  <span>学员完成率</span>
                  <strong>{Math.round(plan.summary.learnerCompletion * 100)}%</strong>
                </div>
                <div>
                  <span>考试完成率</span>
                  <strong>{Math.round(plan.summary.examCompletion * 100)}%</strong>
                </div>
                <div>
                  <span>证书统计进度</span>
                  <strong>{Math.round(plan.summary.certificateReady * 100)}%</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="ma-plan__actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              确认计划
            </button>
            <button type="button" className="topbar__cta topbar__cta--subtle">
              发起督办
            </button>
            <button type="button" className="topbar__cta topbar__cta--ghost">
              填写执行总结
            </button>
          </div>
        </div>

        <section className="ma-plan__section">
          <header>
            <h3>执行流程</h3>
            <p>查看计划执行节点的完成情况，及时跟进滞后环节。</p>
          </header>
          <div className="ma-plan__timeline">
            {plan.timeline.map((step) => (
              <div key={step.id} className={`ma-plan__timeline-item ma-plan__timeline-item--${step.status}`}>
                <div className="ma-plan__timeline-header">
                  <strong>{step.title}</strong>
                  <span>{step.status}</span>
                </div>
                <div className="ma-plan__timeline-meta">
                  <span>
                    {step.start} - {step.end}
                  </span>
                  <span>负责人：{step.owner}</span>
                </div>
                {step.remark ? <p>{step.remark}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="ma-plan__section">
          <header>
            <h3>覆盖班组进度</h3>
            <p>掌握各班组/项目的执行进度与滞后情况。</p>
          </header>
          <div className="ma-plan__table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>班组 / 项目</th>
                  <th>负责人</th>
                  <th>目标人数</th>
                  <th>完成情况</th>
                  <th>滞后学员</th>
                  <th>提醒</th>
                </tr>
              </thead>
              <tbody>
                {plan.coverageByGroup.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>{group.leader}</td>
                    <td>{group.target}</td>
                    <td>
                      <div className="plan-progress">
                        <div className="plan-progress__bar">
                          <div
                            className="plan-progress__fill"
                            style={{ width: `${group.completionRate * 100}%` }}
                          />
                        </div>
                        <span>
                          {group.finished}/{group.target}（{Math.round(group.completionRate * 100)}%）
                        </span>
                      </div>
                    </td>
                    <td>{group.laggingLearners} 人</td>
                    <td>{group.reminder ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="ma-plan__section">
          <header>
            <h3>课程执行情况</h3>
            <p>所有学习任务均为线上形式，需督促学员及时完成。</p>
          </header>
          <div className="ma-plan__table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>课程 / 任务</th>
                  <th>形式</th>
                  <th>学时</th>
                  <th>完成率</th>
                  <th>待完成</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                {plan.courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.type}</td>
                    <td>{course.duration}</td>
                    <td>
                      <div className="plan-progress">
                        <div className="plan-progress__bar">
                          <div
                            className="plan-progress__fill"
                            style={{ width: `${course.completionRate * 100}%` }}
                          />
                        </div>
                        <span>{Math.round(course.completionRate * 100)}%</span>
                      </div>
                    </td>
                    <td>{course.pendingLearners} 人</td>
                    <td>{course.nextAction ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="ma-plan__section">
          <header>
            <h3>在线考试安排</h3>
            <p>全部考试采用线上形式，无需布置场地与监考人员。</p>
          </header>
          <div className="ma-plan__table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>考试名称</th>
                  <th>考试时间</th>
                  <th>状态</th>
                  <th>报名人数</th>
                  <th>参考人数</th>
                  <th>通过率</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                {plan.exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.name}</td>
                    <td>{exam.schedule}</td>
                    <td>{exam.status}</td>
                    <td>{exam.participants}</td>
                    <td>{exam.attended}</td>
                    <td>{Math.round(exam.passRate * 100)}%</td>
                    <td>{exam.remark ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="ma-plan__section">
          <header>
            <h3>证书统计</h3>
            <p>显示证书模板与统计结果，证书发放由上级管理单位执行。</p>
          </header>
          <div className="ma-plan__certificate">
            <div>
              <span>证书模板</span>
              <strong>{plan.certificateStats.templateName}</strong>
            </div>
            <div>
              <span>发证策略</span>
              <p>{plan.certificateStats.strategy}</p>
            </div>
            <div className="ma-plan__certificate-stats">
              <div>
                <span>待审核发证</span>
                <strong>{plan.certificateStats.pending} 人</strong>
              </div>
              <div>
                <span>已计入发证名单</span>
                <strong>{plan.certificateStats.issued} 人</strong>
              </div>
              <div>
                <span>证书即将到期</span>
                <strong>{plan.certificateStats.expiringSoon} 人</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="ma-plan__section">
          <header>
            <h3>督办与提醒</h3>
            <p>记录来自主管单位或系统的督办信息，并跟踪处理状态。</p>
          </header>
          <div className="ma-plan__timeline ma-plan__timeline--vertical">
            {plan.reminders.map((reminder) => (
              <div key={reminder.id} className="ma-plan__reminder">
                <div className="ma-plan__reminder-time">{reminder.time}</div>
                <div className="ma-plan__reminder-body">
                  <div className="ma-plan__reminder-header">
                    <strong>{reminder.title}</strong>
                    <span>{reminder.status}</span>
                  </div>
                  <p>{reminder.content}</p>
                  <span>发起人：{reminder.owner}</span>
                </div>
              </div>
            ))}
            {plan.reminders.length === 0 && <div className="ma-org__list-empty">暂无督办记录</div>}
          </div>
        </section>

        <section className="ma-plan__section">
          <header>
            <h3>执行资料</h3>
            <p>查看计划相关文档与执行材料，支持下载与复查。</p>
          </header>
          <div className="ma-plan__attachments">
            {plan.attachments.map((file) => (
              <div key={file.id} className="ma-plan__attachment-item">
                <div>
                  <strong>{file.name}</strong>
                  <span>{file.type}</span>
                </div>
                <div>
                  <span>{file.updatedAt}</span>
                  <button type="button" className="filter-bar__link">
                    下载
                  </button>
                </div>
              </div>
            ))}
            {plan.attachments.length === 0 && <div className="ma-org__list-empty">暂无附件资料</div>}
          </div>
        </section>
      </PageSection>
    </div>
  );
};

export default MAPlanDetailPage;


