import PageSection from "../components/PageSection";
import { StudentExamUpcoming, StudentExamHistory } from "../mocks/student";

const StudentExamCenterPage = () => {
  return (
    <div className="page">
      <PageSection
        title="考试中心"
        description="查看待参加的线上考试，复盘历史成绩并安排自助报考。"
        action={
          <button type="button" className="topbar__cta">
            自主报考新证书
          </button>
        }
      >
        <section className="student-section">
          <header>
            <h3>待参加考试</h3>
            <p>所有考试均在线上进行，请提前做好网络与设备检查。</p>
          </header>
          <div className="student-grid student-grid--exams">
            {StudentExamUpcoming.map((exam) => (
              <article key={exam.id} className="student-exam-card">
                <div className="student-exam-card__header">
                  <h4>{exam.name}</h4>
                  <span className="tag tag--blue">{exam.status}</span>
                </div>
                <div className="student-exam-card__meta">
                  <span>{exam.schedule}</span>
                  <span>考试时长：{exam.duration}</span>
                </div>
                {exam.note ? <p>{exam.note}</p> : null}
                <div className="student-exam-card__actions">
                  <button type="button" className="topbar__cta">
                    进入备考
                  </button>
                  <button type="button" className="topbar__cta topbar__cta--subtle">
                    设置提醒
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="student-section">
          <header>
            <h3>考试成绩记录</h3>
            <p>回顾历次成绩，制定下一步成长计划。</p>
          </header>
          <div className="ma-plan__table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>考试名称</th>
                  <th>成绩</th>
                  <th>是否通过</th>
                  <th>考试时间</th>
                  <th>关联证书</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {StudentExamHistory.map((history) => (
                  <tr key={history.id}>
                    <td>{history.name}</td>
                    <td>{history.score} 分</td>
                    <td>{history.passed ? "通过" : "未通过"}</td>
                    <td>{history.time}</td>
                    <td>{history.certificate ?? "—"}</td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="table-actions__primary">
                          查看试卷
                        </button>
                        <button type="button">复习错题</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </PageSection>
    </div>
  );
};

export default StudentExamCenterPage;


