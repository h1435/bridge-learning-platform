import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  GACertificateTemplatesMock,
  GACertificateRecordsMock,
  GACertificateFilters,
  GACertificateRecordFilters,
  GACertificateStats,
  type GACertificateTemplate,
  type GACertificateRecord
} from "../mocks/gaCertificates";

type TabKey = "templates" | "records";

const tabs: { key: TabKey; label: string }[] = [
  { key: "templates", label: "证书模板管理" },
  { key: "records", label: "证书发放记录" }
];

const GACertificatesPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("templates");
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [strategyFilter, setStrategyFilter] = useState("all");
  const [validityFilter, setValidityFilter] = useState("all");
  const [recordStatusFilter, setRecordStatusFilter] = useState("all");
  const [issueMethodFilter, setIssueMethodFilter] = useState("all");
  const [expiryRangeFilter, setExpiryRangeFilter] = useState("all");
  const [recordExpiryFilter, setRecordExpiryFilter] = useState("all");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<GACertificateTemplate | null>(null);
  const [historyTemplate, setHistoryTemplate] = useState<GACertificateTemplate | null>(null);
  const [detailRecord, setDetailRecord] = useState<GACertificateRecord | null>(null);
  const [renewRecord, setRenewRecord] = useState<GACertificateRecord | null>(null);

  const filteredTemplates = useMemo(() => {
    if (activeTab !== "templates") return [];
    return GACertificateTemplatesMock.filter((template) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        template.name.includes(keyword.trim()) ||
        template.code.includes(keyword.trim()) ||
        template.relatedPlans.some((plan) => plan.includes(keyword.trim())) ||
        template.relatedExams.some((exam) => exam.includes(keyword.trim()));

      const matchStatus = statusFilter === "all" ? true : template.status === statusFilter;
      const matchStrategy = strategyFilter === "all" ? true : template.issueStrategy === strategyFilter;
      const matchValidity = validityFilter === "all" ? true : template.validityType === validityFilter;
      const matchExpiry =
        expiryRangeFilter === "all"
          ? true
          : template.validityType === "duration" || template.validityType === "fixed";

      return matchKeyword && matchStatus && matchStrategy && matchValidity && matchExpiry;
    });
  }, [activeTab, keyword, statusFilter, strategyFilter, validityFilter, expiryRangeFilter]);

  const filteredRecords = useMemo(() => {
    if (activeTab !== "records") return [];
    return GACertificateRecordsMock.filter((record) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        record.personName.includes(keyword.trim()) ||
        record.certificateName.includes(keyword.trim()) ||
        record.unitName.includes(keyword.trim()) ||
        record.templateCode.includes(keyword.trim());

      const matchStatus = recordStatusFilter === "all" ? true : record.status === recordStatusFilter;
      const matchMethod = issueMethodFilter === "all" ? true : record.issueMethod === issueMethodFilter;
      const matchExpiry =
        recordExpiryFilter === "all"
          ? true
          : recordExpiryFilter === "expiring"
            ? record.status === "expiring"
            : record.status === "expired";

      return matchKeyword && matchStatus && matchMethod && matchExpiry;
    });
  }, [activeTab, keyword, recordStatusFilter, issueMethodFilter, recordExpiryFilter]);

  const resetFilters = () => {
    setKeyword("");
    setStatusFilter("all");
    setStrategyFilter("all");
    setValidityFilter("all");
    setRecordStatusFilter("all");
    setIssueMethodFilter("all");
    setExpiryRangeFilter("all");
    setRecordExpiryFilter("all");
  };

  const renderFilters = () => {
    if (activeTab === "templates") {
      return (
        <>
          <input
            type="search"
            placeholder="搜索证书名称 / 编号 / 关联计划 / 考试"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {GACertificateFilters.status.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select value={strategyFilter} onChange={(event) => setStrategyFilter(event.target.value)}>
            {GACertificateFilters.issueStrategy.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select value={validityFilter} onChange={(event) => setValidityFilter(event.target.value)}>
            {GACertificateFilters.validityType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select value={expiryRangeFilter} onChange={(event) => setExpiryRangeFilter(event.target.value)}>
            {GACertificateFilters.expiryRange.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      );
    }

    return (
      <>
        <input
          type="search"
          placeholder="搜索证书 / 学员 / 单位 / 编号"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <select value={recordStatusFilter} onChange={(event) => setRecordStatusFilter(event.target.value)}>
          {GACertificateRecordFilters.status.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select value={issueMethodFilter} onChange={(event) => setIssueMethodFilter(event.target.value)}>
          {GACertificateRecordFilters.issueMethod.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select value={recordExpiryFilter} onChange={(event) => setRecordExpiryFilter(event.target.value)}>
          {GACertificateRecordFilters.expiryRange.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderContent = () => {
    if (activeTab === "templates") {
      return (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>证书名称</th>
                <th>版本 / 审批</th>
                <th>适用岗位</th>
                <th>关联计划 / 考试</th>
                <th>发证策略</th>
                <th>有效期</th>
                <th>状态</th>
                <th>最近更新</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <TemplateRow
                  key={template.id}
                  template={template}
                  onPreview={setPreviewTemplate}
                  onHistory={setHistoryTemplate}
                />
              ))}
              {filteredTemplates.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <h4>暂无符合条件的证书模板</h4>
                      <p>可以调整筛选条件或新建证书模板。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>学员</th>
              <th>证书名称</th>
              <th>所属单位</th>
              <th>岗位</th>
              <th>发证日期</th>
              <th>到期日期</th>
              <th>状态</th>
              <th>发证方式</th>
              <th>审批人</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <RecordRow
                key={record.id}
                record={record}
                onDetail={setDetailRecord}
                onRenew={setRenewRecord}
              />
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={10}>
                  <div className="empty-state">
                    <h4>暂无证书发放记录</h4>
                    <p>尝试调整筛选条件或手动发证。</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="page">
      <PageSection
        title="证书管理"
        description="维护证书模板、审批发证，跟踪有效期并支撑续期与撤销操作。"
        action={
          <div className="section-actions">
            {activeTab === "templates" ? (
              <button type="button" className="topbar__cta" onClick={() => setShowTemplateModal(true)}>
                新建证书模板
              </button>
            ) : (
              <button type="button" className="topbar__cta" onClick={() => setShowIssueModal(true)}>
                手动发证申请
              </button>
            )}
          </div>
        }
      >
        <div className="summary-cards">
          {GACertificateStats.map((card) => (
            <div key={card.id} className={`summary-card summary-card--${card.status}`}>
              <div className="summary-card__label">{card.label}</div>
              <div className="summary-card__value">{card.value}</div>
              <div className="summary-card__hint">{card.hint}</div>
            </div>
          ))}
        </div>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tabs__item ${tab.key === activeTab ? "is-active" : ""}`}
              onClick={() => {
                setActiveTab(tab.key);
                setKeyword("");
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="filter-bar">
          <div className="filter-bar__left">{renderFilters()}</div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link" onClick={resetFilters}>
              重置
            </button>
            {activeTab === "templates" ? (
              <button type="button" className="filter-bar__link">
                导出模板清单
              </button>
            ) : (
              <button type="button" className="filter-bar__link">
                导出发放记录
              </button>
            )}
          </div>
        </div>

        {renderContent()}
      </PageSection>

      {showTemplateModal && <CreateTemplateModal onClose={() => setShowTemplateModal(false)} />}
      {showIssueModal && <ManualIssueModal onClose={() => setShowIssueModal(false)} />}
      {previewTemplate && <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />}
      {historyTemplate && <TemplateHistoryModal template={historyTemplate} onClose={() => setHistoryTemplate(null)} />}
      {detailRecord && <RecordDetailModal record={detailRecord} onClose={() => setDetailRecord(null)} />}
      {renewRecord && <RenewCertificateModal record={renewRecord} onClose={() => setRenewRecord(null)} />}
    </div>
  );
};

const TemplateRow = ({
  template,
  onPreview,
  onHistory
}: {
  template: GACertificateTemplate;
  onPreview: (template: GACertificateTemplate) => void;
  onHistory: (template: GACertificateTemplate) => void;
}) => {
  return (
    <tr>
      <td>
        <div className="plan-cell">
          <strong>{template.name}</strong>
          <span>编号：{template.code}</span>
        </div>
      </td>
      <td>
        <div className="plan-meta">
          <span>版本：{template.version}</span>
          <span>审批：{template.approvalSteps.map((step) => step.status).join(" / ")}</span>
        </div>
      </td>
      <td>
        <div className="tag-list tag-list--wrap tag-list--compact">
          {template.roles.map((role) => (
            <span key={role} className="tag tag--slate">
              {role}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="plan-meta">
          <span>计划：{template.relatedPlans.join("、") || "未关联"}</span>
          <span>考试：{template.relatedExams.join("、") || "未关联"}</span>
        </div>
      </td>
      <td>
        <div className="plan-meta">
          <span>{template.issueStrategy === "auto" ? "自动发证" : "人工发证"}</span>
          <span>审批：{template.approvalFlow}</span>
        </div>
      </td>
      <td>
        <div className="plan-meta">
          <span>
            {template.validityType === "permanent"
              ? "永久有效"
              : template.validityValue}
          </span>
          <span>{template.renewalPolicy}</span>
        </div>
      </td>
      <td>
        <span className={`badge ${templateStatusBadge(template.status)}`}>{templateStatusLabel(template.status)}</span>
      </td>
      <td>
        <div className="plan-meta">
          <span>{new Date(template.updatedAt).toLocaleString()}</span>
          <span>更新人：{template.updatedBy}</span>
        </div>
      </td>
      <td>
        <div className="table-actions">
          <button type="button" onClick={() => onPreview(template)}>
            预览证书
          </button>
          <button type="button" onClick={() => onHistory(template)}>
            版本历史
          </button>
          <button type="button">复制模板</button>
          <button type="button" className="table-actions__primary">
            编辑
          </button>
        </div>
      </td>
    </tr>
  );
};

const RecordRow = ({
  record,
  onDetail,
  onRenew
}: {
  record: GACertificateRecord;
  onDetail: (record: GACertificateRecord) => void;
  onRenew: (record: GACertificateRecord) => void;
}) => {
  return (
    <tr>
      <td>
        <div className="plan-cell">
          <strong>{record.personName}</strong>
          <span>证书编号：{record.templateCode}</span>
        </div>
      </td>
      <td>{record.certificateName}</td>
      <td>{record.unitName}</td>
      <td>{record.role}</td>
      <td>{record.issuedAt}</td>
      <td>{record.expireAt ?? "永久有效"}</td>
      <td>
        <span className={`badge ${recordStatusBadge(record.status)}`}>{recordStatusLabel(record.status)}</span>
        {record.remark && <div className="plan-meta plan-meta--reminder">{record.remark}</div>}
      </td>
      <td>{record.issueMethod === "auto" ? "自动发证" : "人工发证"}</td>
      <td>{record.approver ?? "—"}</td>
      <td>
        <div className="table-actions">
          <button type="button" onClick={() => onDetail(record)}>
            查看详情
          </button>
          {record.renewable ? (
            <button type="button" onClick={() => onRenew(record)}>
              发起续期
            </button>
          ) : (
            <button type="button" disabled>
              不可续期
            </button>
          )}
          <button type="button" className="table-actions__primary">
            撤销证书
          </button>
        </div>
      </td>
    </tr>
  );
};

const CreateTemplateModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">证书管理 · 新建模板</span>
            <h3>新建证书模板</h3>
            <p>配置证书基础信息、发证策略与有效期，提交审批后方可启用。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <h4>基础信息</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>证书名称 *</span>
                <input type="text" placeholder="例如：桥梁维护工程师专业证书" />
              </label>
              <label className="modal__field">
                <span>证书编号 *</span>
                <input type="text" placeholder="自动生成，可手动调整" />
              </label>
            </div>
            <label className="modal__field">
              <span>描述</span>
              <textarea placeholder="说明证书用途、适用范围、发证备注"></textarea>
            </label>
          </section>

          <section className="modal__section">
            <h4>适用对象</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>适用岗位 / 职称 *</span>
                <select>
                  <option value="">请选择</option>
                  <option value="桥梁工程师">桥梁工程师</option>
                  <option value="巡检班组长">巡检班组长</option>
                  <option value="安全管理员">安全管理员</option>
                  <option value="设备管理员">设备管理员</option>
                </select>
              </label>
              <label className="modal__field">
                <span>适用单位范围</span>
                <select>
                  <option value="all">全部管养单位</option>
                  <option value="custom">指定单位</option>
                </select>
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>关联计划与发证条件</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>关联培训计划 *</span>
                <select>
                  <option value="">请选择培训计划</option>
                  <option value="plan-bridge">2025 桥梁维护专项培训</option>
                  <option value="plan-inspection">巡检班组长能力提升计划</option>
                </select>
              </label>
              <label className="modal__field">
                <span>关联考试模板 *</span>
                <select>
                  <option value="">请选择考试模板</option>
                  <option value="exam-bridge">桥梁结构健康监测理论考核</option>
                  <option value="exam-case">巡检案例分析实作</option>
                </select>
              </label>
            </div>
            <div className="modal__grid">
              <label className="modal__field">
                <span>发证策略 *</span>
                <select>
                  <option value="auto">满足条件自动发证</option>
                  <option value="manual">需人工审核发证</option>
                </select>
              </label>
              <label className="modal__field">
                <span>审批流程 *</span>
                <select>
                  <option value="flow-a">主管单位审批流 A</option>
                  <option value="flow-b">主管单位审批流 B</option>
                  <option value="custom">自定义审批流程</option>
                </select>
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>有效期与续期</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>有效期类型 *</span>
                <select>
                  <option value="duration">固定时长</option>
                  <option value="fixed">固定日期</option>
                  <option value="permanent">永久有效</option>
                </select>
              </label>
              <label className="modal__field">
                <span>有效期设置 *</span>
                <input type="text" placeholder="例如：12 个月 / 2025-12-31" />
              </label>
            </div>
            <label className="modal__field">
              <span>续期策略</span>
              <textarea placeholder="描述续期条件，如复训、补考、资料提交等" />
            </label>
          </section>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            保存草稿
          </button>
          <button type="button" className="topbar__cta" onClick={onClose}>
            提交审批
          </button>
        </div>
      </div>
    </div>
  );
};

const ManualIssueModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">证书管理 · 手动发证</span>
            <h3>发起手动发证申请</h3>
            <p>选择证书与学员，完善发证原因和附件，提交后进入审批流程。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <div className="modal__grid">
              <label className="modal__field">
                <span>证书模板 *</span>
                <select>
                  <option value="">选择证书模板</option>
                  {GACertificateTemplatesMock.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>发证原因 *</span>
                <input type="text" placeholder="说明发证依据，例如补发、特殊审批等" />
              </label>
            </div>
          </section>
          <section className="modal__section">
            <h4>学员信息</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>学员姓名 *</span>
                <input type="text" placeholder="请输入学员姓名" />
              </label>
              <label className="modal__field">
                <span>所属单位 *</span>
                <input type="text" placeholder="请输入学员所属单位" />
              </label>
              <label className="modal__field">
                <span>岗位 / 职称 *</span>
                <input type="text" placeholder="请输入学员岗位" />
              </label>
            </div>
          </section>
          <section className="modal__section">
            <h4>审批与附件</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>审批流程 *</span>
                <select>
                  <option value="flow-a">主管单位审批流 A</option>
                  <option value="flow-b">主管单位审批流 B</option>
                  <option value="custom">自定义审批流程</option>
                </select>
              </label>
              <label className="modal__field">
                <span>生效日期 *</span>
                <input type="date" />
              </label>
              <label className="modal__field">
                <span>有效期至</span>
                <input type="date" />
              </label>
            </div>
            <label className="modal__field">
              <span>附件说明</span>
              <textarea placeholder="可上传审批材料、成绩单等辅助文件信息" />
            </label>
            <label className="modal__field">
              <span>附件上传</span>
              <input type="file" multiple />
            </label>
          </section>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            保存草稿
          </button>
          <button type="button" className="topbar__cta" onClick={onClose}>
            提交审批
          </button>
        </div>
      </div>
    </div>
  );
};

const TemplatePreviewModal = ({
  template,
  onClose
}: {
  template: GACertificateTemplate;
  onClose: () => void;
}) => {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel modal__panel--wide">
        <div className="modal__header">
          <div>
            <span className="modal__tag">证书模板 · 预览</span>
            <h3>{template.name}</h3>
            <p>查看证书样式、审批进度与发证条件。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal__body certificate-preview">
          <div className="certificate-preview__image">
            <span>证书预览</span>
            <div className="certificate-preview__placeholder">{template.previewImage ? "预览图示" : "暂无预览"}</div>
          </div>
          <div className="certificate-preview__info">
            <section>
              <h4>发证条件</h4>
              <ul>
                <li>课程完成度 ≥ {template.autoConditions.courseCompletion}%</li>
                <li>考试成绩 ≥ {template.autoConditions.examScore} 分</li>
                <li>{template.autoConditions.profileApproved ? "资料审核通过" : "无需资料审核"}</li>
                {template.autoConditions.onsiteAssessment && <li>需通过现场考核</li>}
              </ul>
            </section>
            <section>
              <h4>审批流程</h4>
              <ol className="certificate-preview__steps">
                {template.approvalSteps.map((step, index) => (
                  <li key={index} className={`step ${step.status}`}>
                    <span className="step__title">{step.step}</span>
                    <span className="step__owner">负责人：{step.owner}</span>
                    <span className="step__status">{step.status}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle">
            下载空白模板
          </button>
          <button type="button" className="topbar__cta">
            导出证书样式
          </button>
        </div>
      </div>
    </div>
  );
};

const TemplateHistoryModal = ({
  template,
  onClose
}: {
  template: GACertificateTemplate;
  onClose: () => void;
}) => (
  <div className="modal">
    <div className="modal__overlay" onClick={onClose} />
    <div className="modal__panel">
      <div className="modal__header">
        <div>
          <span className="modal__tag">版本历史</span>
          <h3>{template.name}</h3>
          <p>查看证书模板的变更记录与发布时间。</p>
        </div>
        <button type="button" className="modal__close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="modal__body">
        <ul className="history-list">
          {template.versionHistory.map((history) => (
            <li key={history.version}>
              <div>
                <strong>{history.version}</strong>
                <span>{history.date}</span>
              </div>
              <div>
                <span>操作人：{history.operator}</span>
                <p>{history.changeSummary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const RecordDetailModal = ({
  record,
  onClose
}: {
  record: GACertificateRecord;
  onClose: () => void;
}) => (
  <div className="modal">
    <div className="modal__overlay" onClick={onClose} />
    <div className="modal__panel">
      <div className="modal__header">
        <div>
          <span className="modal__tag">证书详情</span>
          <h3>{record.certificateName}</h3>
          <p>查看证书发放信息、审批记录与下载链接。</p>
        </div>
        <button type="button" className="modal__close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="modal__body">
        <section className="modal__section">
          <h4>学员信息</h4>
          <div className="modal__grid">
            <div className="modal__field">
              <span>学员姓名</span>
              <strong>{record.personName}</strong>
            </div>
            <div className="modal__field">
              <span>所属单位</span>
              <strong>{record.unitName}</strong>
            </div>
            <div className="modal__field">
              <span>岗位</span>
              <strong>{record.role}</strong>
            </div>
          </div>
        </section>
        <section className="modal__section">
          <h4>发证信息</h4>
          <div className="modal__grid">
            <div className="modal__field">
              <span>发证日期</span>
              <strong>{record.issuedAt}</strong>
            </div>
            <div className="modal__field">
              <span>到期日期</span>
              <strong>{record.expireAt ?? "永久有效"}</strong>
            </div>
            <div className="modal__field">
              <span>发证方式</span>
              <strong>{record.issueMethod === "auto" ? "自动发证" : "人工发证"}</strong>
            </div>
            <div className="modal__field">
              <span>审批人</span>
              <strong>{record.approver ?? "—"}</strong>
            </div>
          </div>
          {record.remark && <p className="modal__hint">备注：{record.remark}</p>}
        </section>
      </div>
      <div className="modal__footer">
        <button type="button" className="topbar__cta topbar__cta--subtle">
          下载证书
        </button>
        <button type="button" className="topbar__cta">
          发起续期
        </button>
      </div>
    </div>
  </div>
);

const RenewCertificateModal = ({
  record,
  onClose
}: {
  record: GACertificateRecord;
  onClose: () => void;
}) => (
  <div className="modal">
    <div className="modal__overlay" onClick={onClose} />
    <div className="modal__panel">
      <div className="modal__header">
        <div>
          <span className="modal__tag">证书续期</span>
          <h3>{record.certificateName}</h3>
          <p>提交续期申请，补充复训或补考证明材料。</p>
        </div>
        <button type="button" className="modal__close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="modal__body">
        <section className="modal__section">
          <div className="modal__grid">
            <label className="modal__field">
              <span>续期至 *</span>
              <input type="date" />
            </label>
            <label className="modal__field">
              <span>续期原因 *</span>
              <input type="text" placeholder="说明续期依据，如完成复训、补考通过等" />
            </label>
          </div>
          <label className="modal__field">
            <span>附件说明</span>
            <textarea placeholder="上传复训证明、考核结果等附件" />
          </label>
          <label className="modal__field">
            <span>附件上传</span>
            <input type="file" multiple />
          </label>
        </section>
      </div>
      <div className="modal__footer">
        <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
          保存草稿
        </button>
        <button type="button" className="topbar__cta" onClick={onClose}>
          提交续期审批
        </button>
      </div>
    </div>
  </div>
);

const templateStatusLabel = (status: GACertificateTemplate["status"]) => {
  switch (status) {
    case "draft":
      return "草稿";
    case "pending":
      return "待审批";
    case "active":
      return "已发布";
    case "disabled":
      return "已停用";
    default:
      return status;
  }
};

const templateStatusBadge = (status: GACertificateTemplate["status"]) => {
  switch (status) {
    case "draft":
      return "badge--soft";
    case "pending":
      return "badge--warning";
    case "active":
      return "badge--success";
    case "disabled":
      return "badge--neutral";
    default:
      return "badge--soft";
  }
};

const recordStatusLabel = (status: GACertificateRecord["status"]) => {
  switch (status) {
    case "valid":
      return "有效";
    case "expiring":
      return "即将到期";
    case "expired":
      return "已过期";
    case "revoked":
      return "已撤销";
    default:
      return status;
  }
};

const recordStatusBadge = (status: GACertificateRecord["status"]) => {
  switch (status) {
    case "valid":
      return "badge--success";
    case "expiring":
      return "badge--warning";
    case "expired":
      return "badge--neutral";
    case "revoked":
      return "badge--danger";
    default:
      return "badge--neutral";
  }
};

export default GACertificatesPage;
