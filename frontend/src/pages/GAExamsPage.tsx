import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  GAExamLibrary,
  GAExamSourceOptions,
  GAExamStatusOptions,
  type GAExamItem
} from "../mocks/gaExams";

const GAExamsPage = () => {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedPublicExams, setSelectedPublicExams] = useState<string[]>([]);

  const exams = GAExamLibrary.tenantExams;

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        exam.name.includes(keyword.trim()) ||
        exam.template.includes(keyword.trim()) ||
        exam.relatedPlan?.includes(keyword.trim()) ||
        exam.roles.some((role) => role.includes(keyword.trim()));

      const matchStatus = statusFilter === "all" ? true : exam.status === statusFilter;
      const matchSource = sourceFilter === "all" ? true : exam.source === sourceFilter;

      return matchKeyword && matchStatus && matchSource;
    });
  }, [exams, keyword, sourceFilter, statusFilter]);

  const togglePublicExam = (examId: string) => {
    setSelectedPublicExams((prev) =>
      prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
    );
  };

  return (
    <div className="page">
      <PageSection
        title="考试列表"
        description="管理主管单位考试，支持从公共考试库引入或自定义创建。"
        action={
          <div className="section-actions">
            <button
              type="button"
              className="topbar__cta topbar__cta--subtle"
              onClick={() => setShowImportModal(true)}
            >
              从公共考试库引入
            </button>
            <button type="button" className="topbar__cta" onClick={() => setShowCreateModal(true)}>
              新建考试
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索考试名称 / 模板 / 关联计划 / 适用岗位"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {GAExamStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
              {GAExamSourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-bar__right">
            <button
              type="button"
              className="filter-bar__link"
              onClick={() => {
                setKeyword("");
                setStatusFilter("all");
                setSourceFilter("all");
              }}
            >
              重置
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>考试名称</th>
                <th>来源</th>
                <th>关联计划</th>
                <th>适用岗位</th>
                <th>考试时间</th>
                <th>时长</th>
                <th>通过分数</th>
                <th>状态</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => (
                <ExamRow key={exam.id} exam={exam} />
              ))}
              {filteredExams.length === 0 && (
                <tr>
                  <td colSpan={10}>
                    <div className="empty-state">
                      <h4>暂无符合条件的考试</h4>
                      <p>尝试调整筛选条件或从公共考试库引入。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageSection>

      {showCreateModal && (
        <div className="modal">
          <div className="modal__overlay" onClick={() => setShowCreateModal(false)} />
          <div className="modal__panel">
            <div className="modal__header">
              <h3>新建考试</h3>
              <button type="button" className="modal__close" onClick={() => setShowCreateModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__section">
                <label>考试名称</label>
                <input type="text" placeholder="请输入考试名称" />
              </div>
              <div className="modal__grid">
                <div>
                  <label>绑定模板</label>
                  <select>
                    <option value="">选择试卷模板</option>
                    {GAExamLibrary.publicExams.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>考试时长（分钟）</label>
                  <input type="number" min={30} max={240} defaultValue={90} />
                </div>
              </div>
              <div className="modal__grid">
                <div>
                  <label>通过分数</label>
                  <input type="number" min={0} max={100} defaultValue={80} />
                </div>
                <div>
                  <label>是否允许补考</label>
                  <select defaultValue="yes">
                    <option value="yes">允许</option>
                    <option value="no">不允许</option>
                  </select>
                </div>
              </div>
              <div className="modal__section">
                <label>关联培训计划</label>
                <input type="text" placeholder="例如：2025 桥梁维护专项培训" />
              </div>
              <div className="modal__section">
                <label>适用岗位</label>
                <div className="tag-list tag-list--wrap">
                  {["桥梁工程师", "巡检班组长", "安全管理员", "监测人员"].map((role) => (
                    <span key={role} className="tag tag--slate">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal__section">
                <label>计划考试时间</label>
                <input type="datetime-local" />
              </div>
            </div>
            <div className="modal__footer">
              <button type="button" className="topbar__cta topbar__cta--subtle" onClick={() => setShowCreateModal(false)}>
                保存草稿
              </button>
              <button type="button" className="topbar__cta" onClick={() => setShowCreateModal(false)}>
                创建并提交审批
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div className="modal">
          <div className="modal__overlay" onClick={() => setShowImportModal(false)} />
          <div className="modal__panel">
            <div className="modal__header">
              <h3>从公共考试库引入</h3>
              <button type="button" className="modal__close" onClick={() => setShowImportModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal__body">
              <p className="modal__hint">选择公共考试模板，引入后可编辑为主管单位专用版本。</p>
              <div className="modal__list">
                {GAExamLibrary.publicExams.map((exam) => (
                  <label key={exam.id} className="modal__list-item">
                    <input
                      type="checkbox"
                      checked={selectedPublicExams.includes(exam.id)}
                      onChange={() => togglePublicExam(exam.id)}
                    />
                    <div>
                      <strong>{exam.name}</strong>
                      <p>
                        适用岗位：{exam.roles.join("、")} · 时长 {exam.duration} 分钟 · 及格 {exam.passScore} 分
                      </p>
                      <p className="modal__hint">知识点：{exam.knowledgePoints.join("、")}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="modal__footer">
              <button
                type="button"
                className="topbar__cta topbar__cta--subtle"
                onClick={() => {
                  setSelectedPublicExams([]);
                  setShowImportModal(false);
                }}
              >
                取消
              </button>
              <button
                type="button"
                className="topbar__cta"
                onClick={() => {
                  setSelectedPublicExams([]);
                  setShowImportModal(false);
                }}
              >
                引入所选考试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExamRow = ({ exam }: { exam: GAExamItem }) => {
  return (
    <tr>
      <td>
        <div className="plan-cell">
          <strong>{exam.name}</strong>
          <span>模板：{exam.template}</span>
        </div>
      </td>
      <td>
        <span className={`badge ${exam.source === "platform" ? "badge--info" : "badge--purple"}`}>
          {exam.source === "platform" ? "公共考试库" : "主管单位自建"}
        </span>
      </td>
      <td>{exam.relatedPlan ?? "未关联"}</td>
      <td>
        <div className="tag-list tag-list--wrap tag-list--compact">
          {exam.roles.map((role) => (
            <span key={role} className="tag tag--slate">
              {role}
            </span>
          ))}
        </div>
      </td>
      <td>{exam.schedule}</td>
      <td>{exam.duration} 分</td>
      <td>{exam.passScore} 分</td>
      <td>
        <span className={`badge ${statusBadgeClass(exam.status)}`}>{statusLabel(exam.status)}</span>
        {exam.allowRetake && <div className="plan-meta">支持补考</div>}
      </td>
      <td>{new Date(exam.updatedAt).toLocaleString()}</td>
      <td>
        <div className="table-actions">
          <button type="button">查看详情</button>
          <button type="button">复制考试</button>
          <button type="button" className="table-actions__primary">
            编辑
          </button>
        </div>
      </td>
    </tr>
  );
};

const statusLabel = (status: GAExamItem["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审批";
    case "scheduled":
      return "已排期";
    case "completed":
      return "已完成";
    case "archived":
      return "已归档";
    default:
      return status;
  }
};

const statusBadgeClass = (status: GAExamItem["status"]) => {
  switch (status) {
    case "draft":
      return "badge--soft";
    case "pending":
      return "badge--warning";
    case "scheduled":
      return "badge--processing";
    case "completed":
      return "badge--success";
    case "archived":
      return "badge--neutral";
    default:
      return "badge--soft";
  }
};

export default GAExamsPage;
