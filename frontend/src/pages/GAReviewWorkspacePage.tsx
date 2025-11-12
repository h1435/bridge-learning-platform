import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  GAReviewSummary,
  GAReviewPending,
  GAReviewHistory,
  GAReviewFilters,
  type ReviewItem
} from "../mocks/gaReview";

type TabKey = "pending" | "processed";

const tabs: { key: TabKey; label: string }[] = [
  { key: "pending", label: "待审核" },
  { key: "processed", label: "已审核" }
];

const GAReviewWorkspacePage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("pending");
  const [keyword, setKeyword] = useState("");
  const [applyTypeFilter, setApplyTypeFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [completenessFilter, setCompletenessFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [detailItem, setDetailItem] = useState<ReviewItem | null>(null);
  const [showDecisionModal, setShowDecisionModal] = useState<{
    type: "approve" | "reject" | "transfer";
    item: ReviewItem | null;
  }>({ type: "approve", item: null });

  const sourceData = activeTab === "pending" ? GAReviewPending : GAReviewHistory;

  const filteredItems = useMemo(() => {
    return sourceData.filter((item) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        item.name.includes(keyword.trim()) ||
        item.unit.includes(keyword.trim()) ||
        item.role.includes(keyword.trim()) ||
        item.id.includes(keyword.trim());

      const matchApplyType = applyTypeFilter === "all" ? true : item.applyType === applyTypeFilter;
      const matchUrgency = urgencyFilter === "all" ? true : item.urgency === urgencyFilter;
      const matchCompleteness =
        completenessFilter === "all"
          ? true
          : completenessFilter === "full"
            ? item.completeness >= 100
            : item.completeness < 100;

      return matchKeyword && matchApplyType && matchUrgency && matchCompleteness;
    });
  }, [sourceData, keyword, applyTypeFilter, urgencyFilter, completenessFilter]);

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const resetFilters = () => {
    setKeyword("");
    setApplyTypeFilter("all");
    setUrgencyFilter("all");
    setCompletenessFilter("all");
  };

  return (
    <div className="page">
      <PageSection
        title="资料审核工作台"
        description="集中审核管养单位工程师的资料提交与变更，确保资质合规。"
        action={
          activeTab === "pending" && (
            <div className="section-actions">
              <button type="button" className="topbar__cta topbar__cta--subtle">
                下载审核手册
              </button>
              <button type="button" className="topbar__cta">
                批量审核通过
              </button>
            </div>
          )
        }
      >
        <div className="summary-cards">
          {GAReviewSummary.map((card) => (
            <div key={card.id} className={`summary-card summary-card--${card.status}`}>
              <div className="summary-card__label">{card.label}</div>
              <div className="summary-card__value">{card.value}</div>
              <div className="summary-card__hint">{card.hint}</div>
            </div>
          ))}
        </div>

        <div className="tabs tabs--compact">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tabs__item ${tab.key === activeTab ? "is-active" : ""}`}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedItems([]);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索姓名 / 单位 / 岗位 / 申请编号"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={applyTypeFilter} onChange={(event) => setApplyTypeFilter(event.target.value)}>
              {GAReviewFilters.applyType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={urgencyFilter} onChange={(event) => setUrgencyFilter(event.target.value)}>
              {GAReviewFilters.urgency.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={completenessFilter} onChange={(event) => setCompletenessFilter(event.target.value)}>
              {GAReviewFilters.completeness.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link" onClick={resetFilters}>
              重置
            </button>
            <button type="button" className="filter-bar__link">
              导出列表
            </button>
          </div>
        </div>

        <div className="table-wrapper table-wrapper--selectable">
          <table className="data-table">
            <thead>
              <tr>
                {activeTab === "pending" && <th style={{ width: 48 }}></th>}
                <th>申请人</th>
                <th>所属单位</th>
                <th>岗位 / 职称</th>
                <th>申请类型</th>
                <th>提交时间</th>
                <th>资料完整度</th>
                <th>紧急程度</th>
                <th>状态</th>
                {activeTab === "processed" && <th>审核信息</th>}
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className={selectedItems.includes(item.id) ? "table-row--active" : ""}>
                  {activeTab === "pending" && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                  )}
                  <td>
                    <div className="plan-cell">
                      <strong>{item.name}</strong>
                      <span>申请编号：{item.id}</span>
                    </div>
                  </td>
                  <td>{item.unit}</td>
                  <td>{item.role}</td>
                  <td>{applyTypeLabel(item.applyType)}</td>
                  <td>{item.submitTime}</td>
                  <td>
                    <div className="plan-progress">
                      <div className="plan-progress__bar">
                        <div className="plan-progress__fill" style={{ width: `${item.completeness}%` }} />
                      </div>
                      <span>{item.completeness}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${item.urgency === "urgent" ? "badge--danger" : "badge--info"}`}>
                      {item.urgency === "urgent" ? "紧急" : "普通"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${statusBadge(item.status)}`}>{statusLabel(item.status)}</span>
                    {item.remark && <div className="plan-meta plan-meta--reminder">{item.remark}</div>}
                  </td>
                  {activeTab === "processed" && (
                    <td>
                      <div className="plan-meta">
                        <span>审核人：{item.reviewer ?? "—"}</span>
                        <span>时间：{item.reviewTime ?? "—"}</span>
                      </div>
                    </td>
                  )}
                  <td>
                    <div className="table-actions">
                      <button type="button" onClick={() => setDetailItem(item)}>
                        查看详情
                      </button>
                      {activeTab === "pending" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setShowDecisionModal({ type: "approve", item })}
                          >
                            审核通过
                          </button>
                          <button
                            type="button"
                            className="table-actions__danger"
                            onClick={() => setShowDecisionModal({ type: "reject", item })}
                          >
                            驳回
                          </button>
                          <button
                            type="button"
                            className="table-actions__primary"
                            onClick={() => setShowDecisionModal({ type: "transfer", item })}
                          >
                            转交
                          </button>
                        </>
                      ) : (
                        <button type="button" className="table-actions__danger">
                          撤销通过
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={activeTab === "pending" ? 10 : 9}>
                    <div className="empty-state">
                      <h4>暂无符合条件的记录</h4>
                      <p>尝试调整筛选条件或稍后再查看。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageSection>

      {detailItem && <ReviewDetailDrawer item={detailItem} onClose={() => setDetailItem(null)} />}
      {showDecisionModal.item && (
        <DecisionModal
          type={showDecisionModal.type}
          item={showDecisionModal.item}
          onClose={() => setShowDecisionModal({ type: "approve", item: null })}
        />
      )}
    </div>
  );
};

const ReviewDetailDrawer = ({ item, onClose }: { item: ReviewItem; onClose: () => void }) => {
  return (
    <div className="drawer">
      <div className="drawer__overlay" onClick={onClose} />
      <div className="drawer__panel">
        <div className="drawer__header">
          <div>
            <h3>{item.name}</h3>
            <p>{item.unit} · {item.role}</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="drawer__body">
          <section className="drawer__section">
            <h4>基础信息</h4>
            <div className="drawer__grid">
              <div className="drawer__field">
                <span>申请类型</span>
                <strong>{applyTypeLabel(item.applyType)}</strong>
              </div>
              <div className="drawer__field">
                <span>提交时间</span>
                <strong>{item.submitTime}</strong>
              </div>
              <div className="drawer__field">
                <span>资料完整度</span>
                <strong>{item.completeness}%</strong>
              </div>
              <div className="drawer__field">
                <span>紧急程度</span>
                <strong>{item.urgency === "urgent" ? "紧急" : "普通"}</strong>
              </div>
            </div>
          </section>

          <section className="drawer__section">
            <h4>人员信息</h4>
            <div className="drawer__grid">
              <div className="drawer__field">
                <span>身份证号</span>
                <strong>3302****4567</strong>
              </div>
              <div className="drawer__field">
                <span>联系方式</span>
                <strong>138 **** 5620</strong>
              </div>
              <div className="drawer__field">
                <span>上岗类别</span>
                <strong>桥梁维护 · 专业岗位</strong>
              </div>
              <div className="drawer__field">
                <span>上岗有效期</span>
                <strong>2025-04-01 至 2026-03-31</strong>
              </div>
            </div>
          </section>

          <section className="drawer__section">
            <h4>证件与资质</h4>
            <div className="certificate-list">
              <div className="certificate-card">
                <div className="certificate-card__header">
                  <strong>职业资格证书</strong>
                  <span>证书编号：BRG-2024-0321</span>
                </div>
                <div className="certificate-card__meta">
                  <span>有效期：2024-03-15 至 2027-03-15</span>
                  <span>上传时间：2025-04-06</span>
                </div>
                <div className="certificate-card__attachments">
                  <button type="button" className="certificate-card__attachment">
                    正面照片
                  </button>
                  <button type="button" className="certificate-card__attachment">
                    反面照片
                  </button>
                </div>
              </div>
              <div className="certificate-card">
                <div className="certificate-card__header">
                  <strong>身份证</strong>
                  <span>证件号：3302****4567</span>
                </div>
                <div className="certificate-card__meta">
                  <span>有效期：长期</span>
                  <span>上传时间：2025-04-06</span>
                </div>
                <div className="certificate-card__attachments">
                  <button type="button" className="certificate-card__attachment">
                    正面照片
                  </button>
                  <button type="button" className="certificate-card__attachment">
                    反面照片
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="drawer__section">
            <h4>历史记录</h4>
            <ul className="history-list">
              <li>
                <div>
                  <strong>2025-03-31</strong>
                  <span>王敏 复审</span>
                </div>
                <p>资料缺少现场考核证明，已驳回。</p>
              </li>
              <li>
                <div>
                  <strong>2025-04-02</strong>
                  <span>系统提示</span>
                </div>
                <p>资料补充齐全，等待审批。</p>
              </li>
            </ul>
          </section>
        </div>
        <div className="drawer__footer">
          <div className="drawer__footer-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
              暂存
            </button>
            <button type="button" className="topbar__cta" onClick={onClose}>
              通过
            </button>
            <button type="button" className="topbar__cta topbar__cta--danger" onClick={onClose}>
              驳回
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DecisionModal = ({
  type,
  item,
  onClose
}: {
  type: "approve" | "reject" | "transfer";
  item: ReviewItem;
  onClose: () => void;
}) => {
  const titleMap = {
    approve: "审核通过",
    reject: "驳回申请",
    transfer: "转交审核"
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">审批操作</span>
            <h3>{titleMap[type]}</h3>
            <p>
              申请人：{item.name} · {item.unit} · {item.role}
            </p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal__body">
          {type === "approve" && (
            <section className="modal__section">
              <h4>通过说明</h4>
              <textarea placeholder="可填写审核通过说明，供申请人查看" />
              <label className="modal__field">
                <span>是否通知申请人</span>
                <select>
                  <option value="yes">站内信 + 短信</option>
                  <option value="message">仅站内信</option>
                  <option value="none">不通知</option>
                </select>
              </label>
            </section>
          )}
          {type === "reject" && (
            <section className="modal__section">
              <h4>驳回原因 *</h4>
              <textarea placeholder="请填写驳回原因及需补充的材料" />
              <label className="modal__field">
                <span>审批意见模板</span>
                <select>
                  <option value="">请选择模板</option>
                  <option value="lack-proof">缺少现场考核证明</option>
                  <option value="invalid-cert">证件即将过期，请更新</option>
                </select>
              </label>
              <label className="modal__field">
                <span>是否允许继续提交</span>
                <select>
                  <option value="yes">允许再次提交</option>
                  <option value="no">禁止再次提交</option>
                </select>
              </label>
            </section>
          )}
          {type === "transfer" && (
            <section className="modal__section">
              <h4>转交对象 *</h4>
              <select>
                <option value="">选择审核人</option>
                <option value="reviewer-001">李娜（复审）</option>
                <option value="reviewer-002">王敏（专家）</option>
              </select>
              <label className="modal__field">
                <span>转交说明</span>
                <textarea placeholder="说明转交原因及需要关注的要点" />
              </label>
            </section>
          )}
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            取消
          </button>
          <button type="button" className="topbar__cta" onClick={onClose}>
            确认提交
          </button>
        </div>
      </div>
    </div>
  );
};

const applyTypeLabel = (type: ReviewItem["applyType"]) => {
  switch (type) {
    case "first":
      return "首次资料";
    case "update":
      return "资料更新";
    case "renewal":
      return "续期审核";
    default:
      return type;
  }
};

const statusLabel = (status: ReviewItem["status"]) => {
  switch (status) {
    case "pending":
      return "待审核";
    case "inProgress":
      return "审核中";
    case "approved":
      return "已通过";
    case "rejected":
      return "已驳回";
    case "returned":
      return "退回待补充";
    default:
      return status;
  }
};

const statusBadge = (status: ReviewItem["status"]) => {
  switch (status) {
    case "pending":
      return "badge--warning";
    case "inProgress":
      return "badge--processing";
    case "approved":
      return "badge--success";
    case "rejected":
      return "badge--danger";
    case "returned":
      return "badge--soft";
    default:
      return "badge--info";
  }
};

export default GAReviewWorkspacePage;
