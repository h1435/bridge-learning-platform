import { useEffect, useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  KnowledgePoints,
  QuestionBankMock,
  QuestionDifficulties,
  QuestionMetrics,
  QuestionSources,
  QuestionStatusBadge,
  QuestionTypes,
  type QuestionItem
} from "../mocks/questionBank";

const QuestionBankPage = () => {
  const [keyword, setKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [kpFilter, setKpFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    QuestionBankMock[0]?.id ?? null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    return QuestionBankMock.filter((question) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        question.stem.includes(keyword.trim()) ||
        question.code.toLowerCase().includes(keyword.trim().toLowerCase());
      const matchType =
        typeFilter === "all" ? true : question.type === typeFilter;
      const matchDifficulty =
        difficultyFilter === "all" ? true : question.difficulty === difficultyFilter;
      const matchSource =
        sourceFilter === "all" ? true : question.source === sourceFilter;
      const matchKP =
        kpFilter === "all" ? true : question.knowledgePoints.includes(kpFilter);
      return matchKeyword && matchType && matchDifficulty && matchSource && matchKP;
    });
  }, [difficultyFilter, keyword, kpFilter, sourceFilter, typeFilter]);

  const selectedQuestion = useMemo(
    () => filteredQuestions.find((question) => question.id === selectedId) ?? null,
    [filteredQuestions, selectedId]
  );

  return (
    <div className="page">
      <PageSection
        title="公共题库概览"
        description="统一维护共享题库，掌握题目审核进度与异常情况。"
      >
        <div className="kpi-grid">
          {QuestionMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="题库管理"
        description="筛选题目、执行审核、标记异常并导入导出题库。"
        action={
          <div className="action-group">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              批量审核
            </button>
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导入题库
            </button>
            <button
              type="button"
              className="topbar__cta"
              onClick={() => setModalOpen(true)}
            >
              新建题目
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索题干关键字 / 题目编号"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              {QuestionTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value)}
            >
              {QuestionDifficulties.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
              {QuestionSources.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={kpFilter} onChange={(event) => setKpFilter(event.target.value)}>
              <option value="all">全部知识点</option>
              {KnowledgePoints.map((kp) => (
                <option key={kp} value={kp}>
                  {kp}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link">
              保存视图
            </button>
            <button
              type="button"
              className="filter-bar__link"
              onClick={() => {
                setKeyword("");
                setTypeFilter("all");
                setDifficultyFilter("all");
                setSourceFilter("all");
                setKpFilter("all");
              }}
            >
              重置
            </button>
          </div>
        </div>

        <div className="table-wrapper table-wrapper--selectable">
          <table className="data-table">
            <thead>
              <tr>
                <th>题干预览</th>
                <th>题型</th>
                <th>难度</th>
                <th>知识点</th>
                <th>标签</th>
                <th>适用岗位</th>
                <th>引用次数</th>
                <th>状态</th>
                <th>审核状态</th>
                <th>来源</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question) => (
                <QuestionRow
                  key={question.id}
                  question={question}
                  active={question.id === selectedId}
                  onSelect={() => setSelectedId(question.id)}
                />
              ))}
              {filteredQuestions.length === 0 && (
                <tr>
                  <td colSpan={11}>
                    <div className="empty-state">
                      <h4>暂无符合条件的试题</h4>
                      <p>调整筛选条件，或通过导入功能补充题目。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedQuestion && <QuestionPreview question={selectedQuestion} />}
      </PageSection>
      {modalOpen && (
        <QuestionModal
          onClose={() => setModalOpen(false)}
          onSubmit={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

const QuestionRow = ({
  question,
  active,
  onSelect
}: {
  question: QuestionItem;
  active: boolean;
  onSelect: () => void;
}) => (
  <tr
    className={active ? "table-row--active" : undefined}
    onClick={onSelect}
    role="button"
  >
    <td>
      <div className="question-cell">
        <strong>{question.stem.slice(0, 50)}{question.stem.length > 50 ? "..." : ""}</strong>
        <span>{question.code}</span>
      </div>
    </td>
    <td>{questionTypeLabel(question.type)}</td>
    <td>
      <span className={`badge ${difficultyBadge(question.difficulty)}`}>
        {difficultyLabel(question.difficulty)}
      </span>
    </td>
    <td>
      <div className="tag-list">
        {question.knowledgePoints.map((kp) => (
          <span key={kp} className="tag tag--slate">
            {kp}
          </span>
        ))}
      </div>
    </td>
    <td>
      <div className="tag-list">
        {question.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </td>
    <td>
      <div className="question-meta">
        {question.roles.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
    </td>
    <td>{question.usageCount}</td>
    <td>
      <span className={`badge ${QuestionStatusBadge[question.status]}`}>
        {questionStatusLabel(question.status)}
      </span>
    </td>
    <td>
      <span className={`badge ${question.reviewStatus === "approved" ? "badge--success" : question.reviewStatus === "pending" ? "badge--warning" : "badge--danger"}`}>
        {reviewStatusLabel(question.reviewStatus)}
      </span>
    </td>
    <td>{questionSourceLabel(question.source)}</td>
    <td>
      <div className="table-actions">
        <button type="button">审核</button>
        <button type="button">标记异常</button>
      </div>
    </td>
  </tr>
);

const QuestionPreview = ({ question }: { question: QuestionItem }) => (
  <div className="panel">
    <div className="panel__header">
      <div>
        <span className={`badge ${QuestionStatusBadge[question.status]}`}>
          {questionStatusLabel(question.status)}
        </span>
        <h3>{question.stem}</h3>
        <p className="panel__sub">
          题目编号 {question.code} · 最近更新 {new Date(question.updatedAt).toLocaleDateString()} · 引用 {question.usageCount} 次
        </p>
      </div>
      <div className="panel__meta">
        <div>
          <span>题型</span>
          <strong>{questionTypeLabel(question.type)}</strong>
        </div>
        <div>
          <span>难度</span>
          <strong>{difficultyLabel(question.difficulty)}</strong>
        </div>
        <div>
          <span>来源</span>
          <strong>{questionSourceLabel(question.source)}</strong>
        </div>
      </div>
    </div>
    <div className="panel__body">
      <div className="panel__grid">
        <div>
          <h4>知识点与标签</h4>
          <div className="tag-list">
            {question.knowledgePoints.map((kp) => (
              <span key={kp} className="tag tag--blue">
                {kp}
              </span>
            ))}
          </div>
          <div className="tag-list">
            {question.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <h4>选项 / 答案</h4>
          {question.options ? (
            <ul className="panel__list">
              {question.options.map((option) => (
                <li key={option.key}>
                  <span>{option.key}</span>
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="panel__text">{question.answer}</p>
          )}
          <p className="panel__answer">
            正确答案：<strong>{question.answer}</strong>
          </p>
        </div>
        <div>
          <h4>解析与历史</h4>
          <p className="panel__text">{question.analysis}</p>
          <h4>引用与操作记录</h4>
          <ul className="panel__list">
            {question.history.map((record, index) => (
              <li key={`${record.date}-${index}`}>
                <span>{record.date}</span>
                <span>{record.action}</span>
                <span>{record.operator}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const QuestionRoleOptions = [
  "桥梁工程师",
  "隧道值守",
  "养护班组长",
  "安全管理员",
  "监测人员"
];

const QuestionModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const [form, setForm] = useState({
    stem: "",
    type: "single" as QuestionItem["type"],
    difficulty: "medium" as QuestionItem["difficulty"],
    knowledgePoint: KnowledgePoints[0] ?? "",
    options: ["", "", "", ""],
    answers: ["A"],
    analysis: "",
    roles: [] as string[],
    roleInput: QuestionRoleOptions[0]
  });

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleTypeChange = (nextType: QuestionItem["type"]) => {
    setForm((prev) => {
      if (nextType === "judge") {
        return {
          ...prev,
          type: nextType,
          options: ["正确", "错误"],
          answers: ["正确"]
        };
      }
      const baseOptions =
        prev.options.length >= 4 ? prev.options : ["", "", "", ""];
      return {
        ...prev,
        type: nextType,
        options: baseOptions,
        answers: nextType === "single" ? ["A"] : []
      };
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    setForm((prev) => {
      const next = [...prev.options];
      next[index] = value;
      return { ...prev, options: next };
    });
  };

  const handleAddOption = () => {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, ""]
    }));
  };

  const handleRemoveOption = (index: number) => {
    setForm((prev) => {
      if (prev.options.length <= 2) return prev;
      const nextOptions = prev.options.filter((_, idx) => idx !== index);
      const labelsToKeep = nextOptions.map((_, idx) => optionLabel(idx));
      let nextAnswers: string[];
      if (prev.type === "multiple") {
        nextAnswers = prev.answers.filter((ans) => labelsToKeep.includes(ans));
      } else if (prev.type === "single") {
        const fallback = labelsToKeep[0] ?? "";
        nextAnswers = fallback ? [fallback] : [];
      } else {
        nextAnswers = prev.answers;
      }
      return {
        ...prev,
        options: nextOptions,
        answers: nextAnswers.length > 0 ? nextAnswers : ["A"]
      };
    });
  };

  const handleSelectSingleAnswer = (value: string) => {
    setForm((prev) => ({ ...prev, answers: [value] }));
  };

  const handleToggleMultipleAnswer = (value: string) => {
    setForm((prev) => {
      const exists = prev.answers.includes(value);
      const nextAnswers = exists
        ? prev.answers.filter((item) => item !== value)
        : [...prev.answers, value];
      return { ...prev, answers: nextAnswers };
    });
  };

  const handleJudgeAnswer = (value: string) => {
    setForm((prev) => ({ ...prev, answers: [value] }));
  };

  const handleAddRole = () => {
    setForm((prev) => {
      if (!prev.roleInput || prev.roles.includes(prev.roleInput)) {
        return prev;
      }
      return { ...prev, roles: [...prev.roles, prev.roleInput] };
    });
  };

  const handleRemoveRole = (role: string) => {
    setForm((prev) => ({ ...prev, roles: prev.roles.filter((item) => item !== role) }));
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">公共题库 · 单题创建</span>
            <h3>新建题目</h3>
            <p>录入题目基础信息，后续可组合试卷或培训计划中的考试。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <h4>题干与基础信息</h4>
            <label className="modal__field">
              <span>题干</span>
              <textarea
                rows={4}
                value={form.stem}
                placeholder="请填写完整的题干内容"
                onChange={(event) => setForm((prev) => ({ ...prev, stem: event.target.value }))}
              />
            </label>
            <div className="modal__grid">
              <label className="modal__field">
                <span>题型</span>
                <select
                  value={form.type}
                  onChange={(event) => handleTypeChange(event.target.value as QuestionItem["type"])}
                >
                  {QuestionTypes.filter((option) => option.value !== "all").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>难度</span>
                <select
                  value={form.difficulty}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      difficulty: event.target.value as QuestionItem["difficulty"]
                    }))
                  }
                >
                  {QuestionDifficulties.filter((option) => option.value !== "all").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>知识点</span>
                <select
                  value={form.knowledgePoint}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, knowledgePoint: event.target.value }))
                  }
                >
                  {KnowledgePoints.map((kp) => (
                    <option key={kp} value={kp}>
                      {kp}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="modal__roles">
              <label className="modal__field modal__roles-select">
                <span>适用岗位</span>
                <div className="modal__roles-input">
                  <select
                    value={form.roleInput}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, roleInput: event.target.value }))
                    }
                  >
                    {QuestionRoleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={handleAddRole}>
                    添加
                  </button>
                </div>
              </label>
              <div className="modal__roles-tags">
                {form.roles.map((role) => (
                  <span key={role} className="tag">
                    {role}
                    <button type="button" onClick={() => handleRemoveRole(role)}>
                      ×
                    </button>
                  </span>
                ))}
                {form.roles.length === 0 && <span className="modal__roles-placeholder">暂未选择岗位</span>}
              </div>
            </div>
          </section>

          {(form.type === "single" || form.type === "multiple") && (
            <section className="modal__section">
              <h4>选项设置</h4>
              <div className="modal__options">
                {form.options.map((option, index) => (
                  <div key={index} className="modal__option-row">
                    <span className="modal__option-label">{optionLabel(index)}</span>
                    <input
                      value={option}
                      placeholder={`请输入选项 ${optionLabel(index)} 的内容`}
                      onChange={(event) => handleOptionChange(index, event.target.value)}
                    />
                    {form.options.length > 2 && (
                      <button
                        type="button"
                        className="modal__option-remove"
                        onClick={() => handleRemoveOption(index)}
                      >
                        删除
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="modal__option-add" onClick={handleAddOption}>
                  + 新增选项
                </button>
              </div>
            </section>
          )}

          <section className="modal__section">
            <h4>正确答案</h4>
            {form.type === "single" && (
              <div className="modal__choices">
                {form.options.map((_, index) => {
                  const label = optionLabel(index);
                  return (
                    <label key={label}>
                      <input
                        type="radio"
                        name="single-answer"
                        value={label}
                        checked={form.answers[0] === label}
                        onChange={() => handleSelectSingleAnswer(label)}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            )}
            {form.type === "multiple" && (
              <div className="modal__choices">
                {form.options.map((_, index) => {
                  const label = optionLabel(index);
                  return (
                    <label key={label}>
                      <input
                        type="checkbox"
                        value={label}
                        checked={form.answers.includes(label)}
                        onChange={() => handleToggleMultipleAnswer(label)}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            )}
            {form.type === "judge" && (
              <div className="modal__choices">
                {['正确', '错误'].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="judge-answer"
                      value={value}
                      checked={form.answers[0] === value}
                      onChange={() => handleJudgeAnswer(value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            )}
          </section>

          <section className="modal__section">
            <h4>答案解析</h4>
            <label className="modal__field">
              <span>解析内容</span>
              <textarea
                rows={3}
                value={form.analysis}
                placeholder="说明解题思路、判分标准、注意事项等"
                onChange={(event) => setForm((prev) => ({ ...prev, analysis: event.target.value }))}
              />
            </label>
          </section>

          <p className="modal__hint">
            保存为草稿后，可在题目详情页补充更多信息、上传附件或提交审核。
          </p>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            取消
          </button>
          <button type="button" className="topbar__cta" onClick={onSubmit}>
            保存为草稿
          </button>
        </div>
      </div>
    </div>
  );
};

const optionLabel = (index: number) => String.fromCharCode(65 + index);

const questionTypeLabel = (type: QuestionItem["type"]) => {
  switch (type) {
    case "single":
      return "单选题";
    case "multiple":
      return "多选题";
    case "judge":
      return "判断题";
    case "fill":
      return "填空题";
    case "essay":
      return "简答题";
    case "case":
      return "案例题";
    default:
      return type;
  }
};

const difficultyLabel = (difficulty: QuestionItem["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "简单";
    case "medium":
      return "中等";
    case "hard":
      return "困难";
    default:
      return difficulty;
  }
};

const difficultyBadge = (difficulty: QuestionItem["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "badge--success";
    case "medium":
      return "badge--info";
    case "hard":
      return "badge--danger";
    default:
      return "badge--soft";
  }
};

const questionStatusLabel = (status: QuestionItem["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "审核中";
    case "published":
      return "已发布";
    case "disabled":
      return "已停用";
    default:
      return status;
  }
};

const questionSourceLabel = (source: QuestionItem["source"]) => {
  switch (source) {
    case "platform":
      return "平台自建";
    case "tenant":
      return "租户贡献";
    case "external":
      return "第三方导入";
    default:
      return source;
  }
};

const reviewStatusLabel = (status: QuestionItem["reviewStatus"]) => {
  switch (status) {
    case "approved":
      return "已审核";
    case "pending":
      return "审核中";
    case "rejected":
      return "已驳回";
    default:
      return status;
  }
};

export default QuestionBankPage;

