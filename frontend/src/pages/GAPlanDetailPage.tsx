import { useNavigate } from "react-router-dom";
import PageSection from "../components/PageSection";
import { GAPlanDetailMock } from "../mocks/gaPlanDetail";

const planTypeLabel = (type: string) => {
  switch (type) {
    case "annual":
      return "年度周期";
    case "special":
      return "专项培训";
    case "regular":
      return "常规培训";
    default:
      return "培训计划";
  }
};

const planStatusLabel = (status: string) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审批";
    case "approving":
      return "审批中";
    case "active":
      return "进行中";
    case "completed":
      return "已完成";
    case "archived":
      return "已归档";
    default:
      return status;
  }
};

const planStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return "badge--warning";
    case "pending":
    case "approving":
      return "badge--processing";
    case "active":
      return "badge--success";
    case "completed":
      return "badge--primary";
    case "archived":
      return "badge--neutral";
    default:
      return "badge--neutral";
  }
};

const approvalStatusBadge = (status: string) => {
  switch (status) {
    case "通过":
      return "badge--success";
    case "驳回":
      return "badge--danger";
    case "待处理":
      return "badge--processing";
    default:
      return "badge--neutral";
  }
};

const GAPlanDetailPage = () => {
  const navigate = useNavigate();
  const plan = GAPlanDetailMock;

  return (
    <div className="page">
      <header className="plan-detail__header">
        <div>
          <h2>{plan.name}</h2>
          <p>
            计划编号 {plan.code} · {planTypeLabel(plan.type)} · {plan.period}
          </p>
          <div className="plan-detail__chips">
            <span className={`badge ${planStatusBadge(plan.status)}`}>{planStatusLabel(plan.status)}</span>
            <span className="plan-detail__chip">负责人：{plan.owner}</span>
            <span className="plan-detail__chip">覆盖单位 {plan.targetUnits} · 学员 {plan.targetPeople}</span>
          </div>
        </div>
        <div className="plan-detail__actions">
          <button type="button" className="topbar__cta topbar__cta--subtle">
            导出计划
          </button>
          <button
            type="button"
            className="topbar__cta"
            onClick={() => navigate("/ga/plan-editor?mode=edit")}
          >
            编辑计划
          </button>
        </div>
      </header>

      <section className="plan-detail__summary">
        <div className="plan-detail__summary-item">
          <span>完成率</span>
          <div className="plan-progress">
            <div className="plan-progress__bar">
              <div className="plan-progress__fill" style={{ width: `${Math.round(plan.progress * 100)}%` }} />
            </div>
            <strong>{Math.round(plan.progress * 100)}%</strong>
          </div>
        </div>
        <div className="plan-detail__summary-item">
          <span>阶段提醒</span>
          <strong>{plan.nextDeadline}</strong>
        </div>
        <div className="plan-detail__summary-item">
          <span>最新更新</span>
          <strong>{new Date(plan.updatedAt).toLocaleString()}</strong>
        </div>
      </section>

      <PageSection title="计划说明" description="了解计划目标、简介与附件。">
        <div className="plan-detail__grid">
          <div>
            <h4>计划简介</h4>
            <p>{plan.description}</p>
            <h4>计划目标</h4>
            <ul className="plan-detail__list">
              {plan.objectives.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>相关附件</h4>
            <ul className="plan-detail__attachments">
              {plan.attachments.map((attachment) => (
                <li key={attachment.id}>
                  <a href={attachment.url}>{attachment.name}</a>
                </li>
              ))}
              {plan.attachments.length === 0 && <li>暂无附件</li>}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection title="课程与学习要求" description="查看计划包含的课程及完成规则。">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>课程名称</th>
                <th>类型</th>
                <th>课时/页数</th>
                <th>适用岗位</th>
                <th>是否必修</th>
                <th>完成规则</th>
              </tr>
            </thead>
            <tbody>
              {plan.courses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="course-cell">
                      <strong>{course.title}</strong>
                      <span>{course.source === "platform" ? "公共课程库" : "自建课程"}</span>
                    </div>
                  </td>
                  <td>{course.type}</td>
                  <td>{course.duration}</td>
                  <td>
                    <div className="course-meta">
                      {course.roles.map((role) => (
                        <span key={role}>{role}</span>
                      ))}
                    </div>
                  </td>
                  <td>{course.required ? "必修" : "选修"}</td>
                  <td>{course.completionRule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection title="覆盖范围" description="管养单位与岗位覆盖情况。">
        <div className="plan-detail__grid">
          <div>
            <h4>管养单位执行情况</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>管养单位</th>
                  <th>负责人</th>
                  <th>完成率</th>
                  <th>状态</th>
                  <th>提醒</th>
                </tr>
              </thead>
              <tbody>
                {plan.units.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.name}</td>
                    <td>{unit.admin}</td>
                    <td>
                      <div className="plan-progress">
                        <div className="plan-progress__bar">
                          <div className="plan-progress__fill" style={{ width: `${Math.round(unit.progress * 100)}%` }} />
                        </div>
                        <span>{Math.round(unit.progress * 100)}%</span>
                      </div>
                    </td>
                    <td>{unit.status}</td>
                    <td>{unit.reminder ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4>覆盖岗位/职称</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>岗位/职称</th>
                  <th>要求人数</th>
                  <th>已覆盖人数</th>
                </tr>
              </thead>
              <tbody>
                {plan.roles.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.requiredCount}</td>
                    <td>{item.assignedCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>

      <PageSection title="考试配置" description="查看计划关联的考试与安排。">
        <table className="data-table">
          <thead>
            <tr>
              <th>考试名称</th>
              <th>类型</th>
              <th>计划时间</th>
              <th>状态</th>
              <th>监考安排</th>
            </tr>
          </thead>
          <tbody>
            {plan.exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.name}</td>
                <td>{exam.type}</td>
                <td>{exam.schedule}</td>
                <td>{exam.status}</td>
                <td>{exam.proctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageSection>

      <PageSection title="证书策略" description="计划完成后的证书签发规则。">
        <div className="plan-detail__grid plan-detail__grid--compact">
          <div>
            <h4>证书模板</h4>
            <p>{plan.certificate.template}</p>
          </div>
          <div>
            <h4>签发方式</h4>
            <p>{plan.certificate.autoIssue ? "符合规则自动签发" : "需人工审核签发"}</p>
          </div>
          <div>
            <h4>签发规则</h4>
            <p>{plan.certificate.rule}</p>
          </div>
          <div>
            <h4>证书有效期</h4>
            <p>{plan.certificate.validity}</p>
          </div>
        </div>
      </PageSection>

      <PageSection title="审批流程" description="查看计划审批过程及意见。">
        <ul className="plan-detail__timeline">
          {plan.approvals.map((approval, index) => (
            <li key={index}>
              <div className="plan-detail__timeline-node">
                <span className={`badge ${approvalStatusBadge(approval.status)}`}>{approval.status}</span>
                <div>
                  <strong>{approval.step}</strong>
                  <p>
                    审批人：{approval.approver}
                    {approval.time ? ` · ${approval.time}` : ""}
                  </p>
                  {approval.comment && <p>{approval.comment}</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="通知与催办" description="查看计划发布与提醒记录。">
        <div className="plan-detail__grid">
          <div>
            <h4>通知记录</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>通知标题</th>
                  <th>受众</th>
                  <th>渠道</th>
                  <th>发送时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {plan.notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td>{notification.title}</td>
                    <td>{notification.audience}</td>
                    <td>{notification.channel}</td>
                    <td>{notification.time}</td>
                    <td>{notification.status}</td>
                  </tr>
                ))}
                {plan.notifications.length === 0 && (
                  <tr>
                    <td colSpan={5}>暂无通知记录</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <h4>督办记录</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>时间</th>
                  <th>对象</th>
                  <th>动作</th>
                  <th>反馈</th>
                </tr>
              </thead>
              <tbody>
                {plan.escalations.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>{item.target}</td>
                    <td>{item.action}</td>
                    <td>{item.feedback ?? "—"}</td>
                  </tr>
                ))}
                {plan.escalations.length === 0 && (
                  <tr>
                    <td colSpan={4}>暂无督办记录</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default GAPlanDetailPage;
