import PageSection from "../components/PageSection";
import ExamTable from "../components/ExamTable";
import { ExamSummaries } from "../mocks/dashboard";
import type { PageProps } from "../App";

const ExamsPage = ({ personaKey }: PageProps) => {
  const exams = ExamSummaries[personaKey] ?? [];

  return (
    <div className="page">
      <PageSection
        title="考试与监考安排"
        description="查看考试计划与监考安排，支持提前排班和监控考试状态。"
        action={
          <button className="topbar__cta topbar__cta--subtle">
            创建考试
          </button>
        }
      >
        {exams.length > 0 ? (
          <ExamTable exams={exams} />
        ) : (
          <div className="empty-state">
            <h4>暂无考试计划</h4>
            <p>可以创建新的考试或查看其他角色的示例数据。</p>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default ExamsPage;

