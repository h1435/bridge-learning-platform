import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import { StudentTasks } from "../mocks/student";

type TabKey = "all" | "assigned" | "self" | "completed" | "overdue";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "all", label: "全部任务" },
  { key: "assigned", label: "被指派" },
  { key: "self", label: "自选任务" },
  { key: "completed", label: "已完成" },
  { key: "overdue", label: "已逾期" }
];

const statusBadge: Record<string, string> = {
  待开始: "badge--slate",
  进行中: "badge--info",
  已完成: "badge--success",
  逾期: "badge--danger"
};

const StudentTasksPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [keyword, setKeyword] = useState("");

  const filteredTasks = useMemo(() => {
    const keywordValue = keyword.trim().toLowerCase();
    return StudentTasks.filter((task) => {
      const matchKeyword =
        keywordValue.length === 0 ||
        task.title.toLowerCase().includes(keywordValue) ||
        task.type.toLowerCase().includes(keywordValue);

      const matchTab =
        activeTab === "all"
          ? true
          : activeTab === "assigned"
            ? task.source === "指派"
            : activeTab === "self"
              ? task.source === "自选"
              : activeTab === "completed"
                ? task.status === "已完成"
                : task.status === "逾期";

      return matchKeyword && matchTab;
    });
  }, [activeTab, keyword]);

  return (
    <div className="page">
      <PageSection
        title="我的学习任务"
        description="集中查看被指派和自选的学习任务，灵活安排学习节奏。"
        action={
          <button type="button" className="topbar__cta">
            新建自学计划
          </button>
        }
      >
        <div className="tabs tabs--pill">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tabs__item ${activeTab === tab.key ? "is-active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="student-task-toolbar">
          <input
            type="search"
            placeholder="搜索课程 / 考试 / 作业"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button type="button" className="filter-bar__link" onClick={() => setKeyword("")}>
            清空搜索
          </button>
        </div>

        <div className="student-task-list">
          {filteredTasks.map((task) => (
            <article key={task.id} className="student-task-card">
              <div className="student-task-card__head">
                <span className="tag tag--slate">{task.type}</span>
                <span className={`badge ${statusBadge[task.status]}`}>{task.status}</span>
              </div>
              <h4>{task.title}</h4>
              <div className="student-task-card__meta">
                <span>来源：{task.source}</span>
                <span>预计用时：{task.estimated}</span>
                <span>截止：{task.deadline}</span>
              </div>
              <div className="plan-progress">
                <div className="plan-progress__bar">
                  <div className="plan-progress__fill" style={{ width: `${task.progress * 100}%` }} />
                </div>
                <span>{Math.round(task.progress * 100)}%</span>
              </div>
              <div className="student-task-card__actions">
                <button type="button" className="topbar__cta topbar__cta--link">
                  开始 / 继续学习
                </button>
                <button type="button" className="topbar__cta topbar__cta--subtle">
                  添加提醒
                </button>
                {task.source === "自选" ? (
                  <button type="button" className="topbar__cta topbar__cta--ghost">
                    取消自学
                  </button>
                ) : null}
              </div>
            </article>
          ))}
          {filteredTasks.length === 0 && (
            <div className="empty-state">
              <h4>暂无任务</h4>
              <p>尝试切换标签或添加一些感兴趣的课程。</p>
            </div>
          )}
        </div>
      </PageSection>
    </div>
  );
};

export default StudentTasksPage;


