import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  GAUnitSummaryCards,
  GAUnitListMock,
  GAUnitFilters,
  GAUnitDetailMock,
  GAUnitPersonnelMock,
  type GAUnitItem
} from "../mocks/gaUnits";

type TabKey = "all" | "risk";

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "全部单位" },
  { key: "risk", label: "关注单位" }
];

const GAUnitsPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [keyword, setKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scopeFilter, setScopeFilter] = useState("all");
  const [detailUnit, setDetailUnit] = useState<GAUnitItem | null>(null);
  const [personnelUnit, setPersonnelUnit] = useState<GAUnitItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredUnits = useMemo(() => {
    return GAUnitListMock.filter((unit) => {
      const matchTab = activeTab === "risk" ? unit.status === "risk" || unit.status === "pending" : true;
      const matchKeyword =
        keyword.trim().length === 0 ||
        unit.name.includes(keyword.trim()) ||
        unit.code.includes(keyword.trim()) ||
        unit.admin.name.includes(keyword.trim());
      const matchType = typeFilter === "all" ? true : unit.type === typeFilter;
      const matchStatus = statusFilter === "all" ? true : unit.status === statusFilter;
      const matchScope =
        scopeFilter === "all" ? true : unit.serviceScope.some((scope) => mapScope(scope).includes(scopeFilter));

      return matchTab && matchKeyword && matchType && matchStatus && matchScope;
    });
  }, [activeTab, keyword, typeFilter, statusFilter, scopeFilter]);

  const resetFilters = () => {
    setKeyword("");
    setTypeFilter("all");
    setStatusFilter("all");
    setScopeFilter("all");
  };

  return (
    <div className="page">
      <PageSection
        title="管养单位列表"
        description="查看并维护下属管养单位档案，配置联系人和账号信息。"
        action={
          <div className="section-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导出单位资料
            </button>
            <button type="button" className="topbar__cta" onClick={() => setShowCreateModal(true)}>
              新建管养单位
            </button>
          </div>
        }
      >
        <div className="summary-cards">
          {GAUnitSummaryCards.map((card) => (
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
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索单位名称 / 编码 / 联系人"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              {GAUnitFilters.type.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {GAUnitFilters.status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select value={scopeFilter} onChange={(event) => setScopeFilter(event.target.value)}>
              <option value="all">全部服务范围</option>
              <option value="bridge">桥梁</option>
              <option value="tunnel">隧道</option>
              <option value="road">道路</option>
              <option value="inspection">检测</option>
            </select>
          </div>
          <div className="filter-bar__right">
            <button type="button" className="filter-bar__link" onClick={resetFilters}>
              重置
            </button>
            <button type="button" className="filter-bar__link">
              保存筛选视图
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>管养单位</th>
                <th>服务范围</th>
                <th>联系人</th>
                <th>人员情况</th>
                <th>执行状态</th>
                <th>最近更新</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr key={unit.id}>
                  <td>
                    <div className="plan-cell">
                      <strong>{unit.name}</strong>
                      <span>{unit.code}</span>
                      <span className="tag tag--slate">{unit.type}</span>
                      <span className="plan-meta">{unit.region}</span>
                    </div>
                  </td>
                  <td>
                    <div className="tag-list tag-list--wrap tag-list--compact">
                      {unit.serviceScope.map((scope) => (
                        <span key={scope} className="tag tag--blue">
                          {scope}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span>{unit.admin.name}</span>
                      <span>{unit.admin.phone}</span>
                      <span>{unit.admin.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="plan-meta">
                      <span>在册：{unit.staffCount}</span>
                      <span>待审核：{unit.pendingReview}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${statusBadge(unit.status)}`}>{statusLabel(unit.status)}</span>
                    {unit.remark && <div className="plan-meta plan-meta--reminder">{unit.remark}</div>}
                  </td>
                  <td>{unit.updatedAt}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" onClick={() => setDetailUnit(unit)}>
                        查看详情
                      </button>
                      <button type="button">编辑信息</button>
                      <button type="button" onClick={() => setPersonnelUnit(unit)}>
                        查看人员
                      </button>
                      <button type="button" className="table-actions__primary">
                        停用单位
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUnits.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <h4>暂无符合条件的管养单位</h4>
                      <p>请调整筛选条件或者稍后再试。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PageSection>

      {detailUnit && (
        <UnitDetailDrawer
          unit={detailUnit}
          onClose={() => setDetailUnit(null)}
          onViewPersonnel={() => setPersonnelUnit(detailUnit)}
        />
      )}
      {personnelUnit && (
        <UnitPersonnelDrawer
          unit={personnelUnit}
          onClose={() => setPersonnelUnit(null)}
        />
      )}
      {showCreateModal && <CreateUnitModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

const UnitDetailDrawer = ({
  unit,
  onClose,
  onViewPersonnel
}: {
  unit: GAUnitItem;
  onClose: () => void;
  onViewPersonnel: () => void;
}) => {
  const detail = GAUnitDetailMock;

  return (
    <div className="drawer">
      <div className="drawer__overlay" onClick={onClose} />
      <div className="drawer__panel">
        <div className="drawer__header">
          <div>
            <h3>{unit.name}</h3>
            <p>
              {unit.code} · {unit.type} · {unit.region}
            </p>
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
                <span>统一社会信用代码</span>
                <strong>{detail.basicInfo.creditCode}</strong>
              </div>
              <div className="drawer__field">
                <span>成立时间</span>
                <strong>{detail.basicInfo.establishDate}</strong>
              </div>
              <div className="drawer__field">
                <span>所属集团</span>
                <strong>{detail.basicInfo.parentGroup}</strong>
              </div>
              <div className="drawer__field">
                <span>公司地址</span>
                <strong>{detail.basicInfo.address}</strong>
              </div>
            </div>
            <div className="drawer__grid">
              <div className="drawer__field">
                <span>服务范围</span>
                <strong>{detail.basicInfo.serviceScope.join("、")}</strong>
              </div>
              <div className="drawer__field">
                <span>服务线路</span>
                <strong>{detail.basicInfo.serviceArea.join("、")}</strong>
              </div>
            </div>
          </section>

          <section className="drawer__section">
            <h4>联系人信息</h4>
            <div className="drawer__grid">
              {detail.contacts.map((contact) => (
                <div key={contact.name} className="drawer__field">
                  <span>{contact.role}</span>
                  <strong>{contact.name}</strong>
                  <span>{contact.phone} · {contact.email}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="drawer__section">
            <h4>账号与权限</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>账号</th>
                  <th>角色</th>
                  <th>状态</th>
                  <th>最近登录</th>
                </tr>
              </thead>
              <tbody>
                {detail.accounts.map((account) => (
                  <tr key={account.account}>
                    <td>{account.account}</td>
                    <td>{account.role}</td>
                    <td>{account.status}</td>
                    <td>{account.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="drawer__section">
            <h4>执行概览</h4>
            <div className="drawer__grid">
              <div className="drawer__field">
                <span>待审核人员</span>
                <strong>{detail.metrics.pendingReview}</strong>
              </div>
              <div className="drawer__field">
                <span>工程师人数</span>
                <strong>{detail.metrics.engineers}</strong>
              </div>
              <div className="drawer__field">
                <span>进行中计划</span>
                <strong>{detail.metrics.activePlans}</strong>
              </div>
              <div className="drawer__field">
                <span>逾期任务</span>
                <strong>{detail.metrics.overdueTasks}</strong>
              </div>
            </div>
          </section>

          <section className="drawer__section">
            <h4>附件资料</h4>
            <ul className="history-list">
              {detail.attachments.map((file) => (
                <li key={file.name}>
                  <div>
                    <strong>{file.name}</strong>
                    <span>{file.uploadTime} · {file.size}</span>
                  </div>
                  <button type="button" className="topbar__cta topbar__cta--link">
                    下载
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="drawer__section">
            <h4>操作历史</h4>
            <ul className="history-list">
              {detail.history.map((item) => (
                <li key={item.date}>
                  <div>
                    <strong>{item.date}</strong>
                    <span>{item.operator}</span>
                  </div>
                  <p>{item.action}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="drawer__footer">
          <div className="drawer__footer-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">发送提醒</button>
            <button type="button" className="topbar__cta" onClick={onViewPersonnel}>
              查看人员
            </button>
            <button type="button" className="topbar__cta topbar__cta--danger">停用单位</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UnitPersonnelDrawer = ({ unit, onClose }: { unit: GAUnitItem; onClose: () => void }) => {
  const personnel = GAUnitPersonnelMock[unit.id] ?? [];
  const total = personnel.length;
  const active = personnel.filter((p) => p.status === "在岗").length;
  const pending = personnel.filter((p) => p.status === "待审核").length;
  const disabled = personnel.filter((p) => p.status === "停用").length;

  return (
    <div className="drawer">
      <div className="drawer__overlay" onClick={onClose} />
      <div className="drawer__panel">
        <div className="drawer__header">
          <div>
            <h3>{unit.name} · 人员列表</h3>
            <p>共 {total} 人</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="drawer__body drawer__body--list">
          <div className="drawer__summary-line">
            <span>总人数：{total}</span>
            <span>在岗：{active}</span>
            <span>待审核：{pending}</span>
            <span>停用：{disabled}</span>
          </div>
          <div className="drawer__table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>岗位 / 职称</th>
                  <th>联系方式</th>
                  <th>状态</th>
                  <th>最近登录</th>
                </tr>
              </thead>
              <tbody>
                {personnel.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.role}</td>
                    <td>
                      <div className="plan-meta">
                        <span>{person.phone}</span>
                        <span>{person.email}</span>
                      </div>
                    </td>
                    <td>{person.status}</td>
                    <td>{person.lastLogin}</td>
                  </tr>
                ))}
                {personnel.length === 0 && (
                  <tr>
                    <td colSpan={5}>
                      <div className="empty-state">
                        <h4>暂无人员信息</h4>
                        <p>该单位还未导入人员或没有权限查看。</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="drawer__footer">
          <div className="drawer__footer-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导出人员清单
            </button>
            <button type="button" className="topbar__cta" onClick={onClose}>
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const statusLabel = (status: GAUnitItem["status"]) => {
  switch (status) {
    case "normal":
      return "正常";
    case "pending":
      return "资料待完善";
    case "risk":
      return "风险预警";
    case "suspended":
      return "已停用";
    default:
      return status;
  }
};

const statusBadge = (status: GAUnitItem["status"]) => {
  switch (status) {
    case "normal":
      return "badge--success";
    case "pending":
      return "badge--warning";
    case "risk":
      return "badge--danger";
    case "suspended":
      return "badge--neutral";
    default:
      return "badge--info";
  }
};

const mapScope = (scope: string) => {
  if (scope.includes("桥")) return "bridge";
  if (scope.includes("隧")) return "tunnel";
  if (scope.includes("路")) return "road";
  if (scope.includes("检")) return "inspection";
  return scope;
};

const CreateUnitModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel modal__panel--wide">
        <div className="modal__header">
          <div>
            <span className="modal__tag">管养单位 · 新建</span>
            <h3>新建管养单位</h3>
            <p>填写单位基础信息、服务范围、联系人及管理员账号。</p>
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
                <span>单位名称 *</span>
                <input type="text" placeholder="例如：杭州路桥养护公司" />
              </label>
              <label className="modal__field">
                <span>单位编码 *</span>
                <input type="text" placeholder="UNIT-XXXX-YYY" />
              </label>
              <label className="modal__field">
                <span>统一社会信用代码 *</span>
                <input type="text" placeholder="9133*************" />
              </label>
              <label className="modal__field">
                <span>单位类型 *</span>
                <select>
                  <option value="">请选择类型</option>
                  <option value="养护公司">养护公司</option>
                  <option value="检测中心">检测中心</option>
                  <option value="运营单位">运营单位</option>
                  <option value="监测单位">监测单位</option>
                </select>
              </label>
            </div>
            <label className="modal__field">
              <span>办公地址 *</span>
              <input type="text" placeholder="请输入详细地址" />
            </label>
          </section>

          <section className="modal__section">
            <h4>服务范围</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>服务线路</span>
                <div className="modal__chip-input">
                  <input type="text" placeholder="例如：沪杭甬高速" />
                  <button type="button">添加</button>
                </div>
                <div className="modal__chips">
                  {["沪杭甬高速", "杭金衢高速"].map((line) => (
                    <span key={line} className="modal__chip">
                      {line}
                      <button type="button" className="modal__chip-remove">✕</button>
                    </span>
                  ))}
                </div>
              </label>
              <label className="modal__field">
                <span>服务区域</span>
                <div className="modal__chip-input">
                  <input type="text" placeholder="例如：浙江 · 杭州" />
                  <button type="button">添加</button>
                </div>
                <div className="modal__chips">
                  {["浙江 · 杭州", "浙江 · 嘉兴"].map((area) => (
                    <span key={area} className="modal__chip">
                      {area}
                      <button type="button" className="modal__chip-remove">✕</button>
                    </span>
                  ))}
                </div>
              </label>
            </div>
            <label className="modal__field">
              <span>服务范围标签</span>
              <div className="modal__chip-input">
                <input type="text" placeholder="例如：危桥抢险" />
                <button type="button">添加</button>
              </div>
              <div className="modal__chips">
                {["桥梁维护", "危桥抢险", "结构监测"].map((scope) => (
                  <span key={scope} className="modal__chip">
                    {scope}
                    <button type="button" className="modal__chip-remove">✕</button>
                  </span>
                ))}
              </div>
            </label>
          </section>

          <section className="modal__section">
            <h4>联系人与管理员</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>主联系人 *</span>
                <input type="text" placeholder="例如：王敏" />
              </label>
              <label className="modal__field">
                <span>联系电话 *</span>
                <input type="text" placeholder="11 位手机号" />
              </label>
              <label className="modal__field">
                <span>电子邮箱</span>
                <input type="email" placeholder="例如：wangmin@hzbridge.com" />
              </label>
              <label className="modal__field">
                <span>备用联系人</span>
                <input type="text" placeholder="例如：张伟" />
              </label>
            </div>
            <div className="modal__grid">
              <label className="modal__field">
                <span>管理员账号 *</span>
                <input type="text" placeholder="系统登录账号" />
              </label>
              <label className="modal__field">
                <span>临时密码 *</span>
                <input type="text" placeholder="初始化密码" />
              </label>
              <label className="modal__field">
                <span>账号状态</span>
                <select>
                  <option value="active">启用</option>
                  <option value="disabled">停用</option>
                </select>
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>附件资料</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>入驻协议</span>
                <input type="file" />
              </label>
              <label className="modal__field">
                <span>资质证明</span>
                <input type="file" multiple />
              </label>
            </div>
            <label className="modal__field">
              <span>备注说明</span>
              <textarea placeholder="可填写单位介绍、合作限制等备注信息" />
            </label>
          </section>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            保存草稿
          </button>
          <button type="button" className="topbar__cta" onClick={onClose}>
            提交审核
          </button>
        </div>
      </div>
    </div>
  );
};

export default GAUnitsPage;
