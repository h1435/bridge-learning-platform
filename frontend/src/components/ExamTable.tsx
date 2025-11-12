import type { ExamSummary } from "../mocks/dashboard";

type ExamTableProps = {
  exams: ExamSummary[];
};

const ExamTable = ({ exams }: ExamTableProps) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>考试名称</th>
            <th>时间安排</th>
            <th>报名人数</th>
            <th>通过率</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{exam.schedule}</td>
              <td>{exam.participants}</td>
              <td>
                {exam.passRate > 0
                  ? `${Math.round(exam.passRate * 100)}%`
                  : "—"}
              </td>
              <td>
                <span className="badge badge--soft">{exam.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;

