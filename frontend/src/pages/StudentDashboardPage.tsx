import PageSection from "../components/PageSection";
import {
  StudentSummaryCards,
  StudentNextActions,
  StudentActivePlans,
  StudentRecommendedCourses,
  StudentAchievements
} from "../mocks/student";

const StudentDashboardPage = () => {
  return (
    <div className="page">
      <PageSection
        title="学习仪表盘"
        description="快速了解今天需要学习的任务和近期进度，随时开启你的成长旅程。"
        action={
          <button type="button" className="topbar__cta">
            继续学习
          </button>
        }
      >
        <div className="student-grid student-grid--summary">
          {StudentSummaryCards.map((card) => (
            <div key={card.id} className="student-summary-card">
              <span className="student-summary-card__label">{card.label}</span>
              <strong>{card.value}</strong>
              <span className="student-summary-card__hint">{card.hint}</span>
            </div>
          ))}
        </div>

        <section className="student-section">
          <header className="student-section__header">
            <div>
              <h3>学习任务</h3>
              <p>优先完成这些任务，保持学习节奏。</p>
            </div>
            <div className="student-section__actions">
              <button type="button" className="topbar__cta topbar__cta--subtle">
                查看全部任务
              </button>
            </div>
          </header>
          <div className="student-carousel">
            {StudentNextActions.map((action) => (
              <div key={action.id} className="student-carousel__item">
                <article className={`student-card student-card--task student-card--${action.type}`}>
                  <div className="student-card__head">
                    <span className="student-chip">{action.status}</span>
                    <span>{action.due}</span>
                  </div>
                  <h4>{action.title}</h4>
                  <p>{action.duration ?? "即刻开始"}</p>
                  <div className="student-card__footer">
                    <button type="button" className="topbar__cta">
                      立即学习
                    </button>
                    <button type="button" className="topbar__cta topbar__cta--subtle">
                      加入日程
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="student-section">
          <header className="student-section__header">
            <div>
              <h3>我的培训计划</h3>
              <p>随时掌握每个计划的完成度与下一步动作。</p>
            </div>
            <div className="student-section__actions">
              <button type="button" className="topbar__cta topbar__cta--subtle">
                查看全部计划
              </button>
            </div>
          </header>
          <div className="student-carousel">
            {StudentActivePlans.map((plan) => (
              <div key={plan.id} className="student-carousel__item">
                <article className="student-card student-card--plan">
                  <div className="student-card__head">
                    <div className="plan-progress">
                      <div className="plan-progress__bar">
                        <div className="plan-progress__fill" style={{ width: `${plan.progress * 100}%` }} />
                      </div>
                    </div>
                    <span>{Math.round(plan.progress * 100)}%</span>
                    <span className="student-chip">剩余 {plan.remainDays} 天</span>
                  </div>
                  <h4>{plan.name}</h4>
                  <span className="student-card__subtext">{plan.stage}</span>
                  <p>{plan.nextStep}</p>
                  <button type="button" className="topbar__cta topbar__cta--link">
                    查看计划详情
                  </button>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="student-section">
          <header className="student-section__header">
            <div>
              <h3>推荐课程</h3>
              <p>根据当前岗位与兴趣自动推荐，也可以跨专业学习。</p>
            </div>
            <div className="student-section__actions">
              <button type="button" className="topbar__cta topbar__cta--subtle">
                查看全部课程
              </button>
            </div>
          </header>
          <div className="student-carousel">
            {StudentRecommendedCourses.map((course) => (
              <div key={course.id} className="student-carousel__item">
                <article className="student-card student-card--course">
                  <div className="student-card__head">
                    <span className="tag tag--slate">{course.category}</span>
                    <span className="tag tag--purple">{course.difficulty}</span>
                  </div>
                  <h4>{course.title}</h4>
                  <div className="student-card__meta">
                    <span>{course.duration}</span>
                    <span>评分 {course.rating.toFixed(1)}</span>
                    <span>{course.learners.toLocaleString()} 人学习</span>
                  </div>
                  <div className="student-card__footer">
                    <button type="button" className="topbar__cta topbar__cta--subtle">
                      收藏
                    </button>
                    <button type="button" className="topbar__cta">
                      加入学习计划
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="student-section">
          <header>
            <h3>成长成就</h3>
            <p>记录你的学习里程碑，持续积累专业能力。</p>
          </header>
          <div className="student-grid student-grid--achievements">
            {StudentAchievements.map((item) => (
              <article key={item.id} className="student-achievement-card">
                <span className="student-achievement-card__icon">{item.icon}</span>
                <div>
                  <h4>{item.label}</h4>
                  <strong>{item.value}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageSection>
    </div>
  );
};

export default StudentDashboardPage;


