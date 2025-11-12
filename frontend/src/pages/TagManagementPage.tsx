import { useEffect, useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import KpiCard from "../components/KpiCard";
import {
  TagManagementMock,
  TagMetrics,
  TagCategories,
  TagScopes,
  TagStatuses,
  TagColors,
  categoryLabel,
  statusLabel,
  type TagCategory,
  type TagItem,
  type TagStatus
} from "../mocks/tags";

const TagManagementPage = () => {
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [scopeFilter, setScopeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(TagManagementMock[0]?.id ?? null);
  const [modalOpen, setModalOpen] = useState(false);

  const roleOptions = useMemo(
    () => Array.from(new Set(TagManagementMock.flatMap((item) => item.roles))),
    []
  );

  const ownerOptions = useMemo(
    () => Array.from(new Set(TagManagementMock.map((item) => item.owner))),
    []
  );

  const filteredTags = useMemo(() => {
    return TagManagementMock.filter((tag) => {
      const matchKeyword =
        keyword.trim().length === 0 ||
        tag.name.includes(keyword.trim()) ||
        tag.code.toLowerCase().includes(keyword.trim().toLowerCase());
      const matchCategory =
        categoryFilter === "all" ? true : tag.category === categoryFilter;
      const matchScope =
        scopeFilter === "all" ? true : tag.scopes.includes(scopeFilter);
      const matchStatus = statusFilter === "all" ? true : tag.status === statusFilter;
      const matchRole = roleFilter === "all" ? true : tag.roles.includes(roleFilter);
      const matchOwner = ownerFilter === "all" ? true : tag.owner === ownerFilter;
      return matchKeyword && matchCategory && matchScope && matchStatus && matchRole && matchOwner;
    });
  }, [categoryFilter, keyword, ownerFilter, roleFilter, scopeFilter, statusFilter]);

  const selectedTag = useMemo(
    () => filteredTags.find((tag) => tag.id === selectedId) ?? null,
    [filteredTags, selectedId]
  );

  useEffect(() => {
    if (!selectedTag && filteredTags.length > 0) {
      setSelectedId(filteredTags[0].id);
    }
  }, [filteredTags, selectedTag]);

  return (
    <div className="page">
      <PageSection
        title="标签体系概览"
        description="统一维护课程、题库、试卷等模块的标签，确保标签规范与可追溯。"
      >
        <div className="kpi-grid">
          {TagMetrics.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="标签列表"
        description="创建、分类、启停与查看标签使用情况，支撑内容运营与检索。"
        action={
          <div className="action-group">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              批量导出
            </button>
            <button type="button" className="topbar__cta" onClick={() => setModalOpen(true)}>
              新建标签
            </button>
          </div>
        }
      >
        <div className="filter-bar">
          <div className="filter-bar__left">
            <input
              type="search"
              placeholder="搜索标签名称 / 编码"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="all">全部分类</option>
              {TagCategories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select value={scopeFilter} onChange={(event) => setScopeFilter(event.target.value)}>
              <option value="all">全部适用模块</option>
              {TagScopes.map((scope) => (
                <option key={scope} value={scope}>
                  {scope}
                </option>
              ))}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">全部状态</option>
              {TagStatuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <option value="all">全部适用岗位</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
              <option value="all">全部维护人</option>
              {ownerOptions.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
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
                setCategoryFilter("all");
                setScopeFilter("all");
                setStatusFilter("all");
                setRoleFilter("all");
                setOwnerFilter("all");
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
                <th>标签名称</th>
                <th>分类</th>
                <th>适用模块</th>
                <th>适用岗位</th>
                <th>使用次数</th>
                <th>维护人</th>
                <th>状态</th>
                <th>最近更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTags.map((tag) => (
                <TagRow
                  key={tag.id}
                  tag={tag}
                  active={tag.id === selectedId}
                  onSelect={() => setSelectedId(tag.id)}
                />
              ))}
              {filteredTags.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <h4>暂无符合条件的标签</h4>
                      <p>调整筛选条件或者新建标签。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedTag && <TagPreview tag={selectedTag} />}
      </PageSection>
      {modalOpen && <TagModal onClose={() => setModalOpen(false)} onSubmit={() => setModalOpen(false)} />}
    </div>
  );
};

const TagRow = ({
  tag,
  active,
  onSelect
}: {
  tag: TagItem;
  active: boolean;
  onSelect: () => void;
}) => {
  return (
    <tr className={active ? "table-row--active" : undefined} onClick={onSelect} role="button">
      <td>
        <div className="tag-management-cell">
          <strong>{tag.name}</strong>
          <span>{tag.code}</span>
        </div>
      </td>
      <td>{categoryLabel(tag.category)}</td>
      <td>
        <div className="tag-management-meta">
          {tag.scopes.map((scope) => (
            <span key={scope} className="tag tag--blue">
              {scope}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="tag-management-meta">
          {tag.roles.map((role) => (
            <span key={role} className="tag tag--slate">
              {role}
            </span>
          ))}
        </div>
      </td>
      <td>{tag.usageCount.toLocaleString()}</td>
      <td>{tag.owner}</td>
      <td>
        <span className={`badge ${statusBadge(tag.status)}`}>{statusLabel(tag.status)}</span>
      </td>
      <td>{new Date(tag.updatedAt).toLocaleDateString()}</td>
      <td>
        <div className="table-actions">
          <button type="button">编辑</button>
          <button type="button">停用</button>
        </div>
      </td>
    </tr>
  );
};

const TagPreview = ({ tag }: { tag: TagItem }) => {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <span className={`badge ${statusBadge(tag.status)}`}>{statusLabel(tag.status)}</span>
          <h3>{tag.name}</h3>
          <p className="panel__sub">
            标签编码 {tag.code} · 分类 {categoryLabel(tag.category)}
          </p>
          <p>{tag.description}</p>
        </div>
        <div className="panel__meta">
          <div>
            <span>累计引用</span>
            <strong>{tag.usageCount.toLocaleString()} 次</strong>
          </div>
          <div>
            <span>维护人</span>
            <strong>{tag.owner}</strong>
          </div>
          <div>
            <span>最近使用</span>
            <strong>{new Date(tag.lastUsedAt).toLocaleString()}</strong>
          </div>
          <div>
            <span>创建时间</span>
            <strong>{new Date(tag.createdAt).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>
      <div className="panel__body">
        <div className="panel__grid">
          <div>
            <h4>适用模块</h4>
            <div className="tag-list">
              {tag.scopes.map((scope) => (
                <span key={scope} className="tag tag--blue">
                  {scope}
                </span>
              ))}
            </div>
            <h4>适用岗位</h4>
            <div className="tag-list">
              {tag.roles.map((role) => (
                <span key={role} className="tag tag--slate">
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4>关联资源</h4>
            <ul className="panel__list">
              <li>
                <span>课程</span>
                <span>{tag.associatedCourses.length}</span>
              </li>
              <li>
                <span>题目</span>
                <span>{tag.associatedQuestions.length}</span>
              </li>
              <li>
                <span>培训计划</span>
                <span>{tag.associatedPlans.length}</span>
              </li>
            </ul>
            <h4>最近引用</h4>
            <ul className="panel__list">
              {tag.associatedCourses.slice(0, 3).map((course) => (
                <li key={course}>
                  <span>课程</span>
                  <span>{course}</span>
                </li>
              ))}
              {tag.associatedQuestions.slice(0, 3).map((question) => (
                <li key={question}>
                  <span>题目</span>
                  <span>{question}</span>
                </li>
              ))}
              {tag.associatedPlans.slice(0, 3).map((plan) => (
                <li key={plan}>
                  <span>培训计划</span>
                  <span>{plan}</span>
                </li>
              ))}
              {tag.associatedCourses.length === 0 &&
                tag.associatedQuestions.length === 0 &&
                tag.associatedPlans.length === 0 && <li>暂无引用记录</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TagModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const allRoles = useMemo(
    () => Array.from(new Set(TagManagementMock.flatMap((item) => item.roles))),
    []
  );

  const [form, setForm] = useState({
    name: "",
    code: "",
    category: TagCategories[0].value,
    color: TagColors[0].value,
    scopes: new Set<string>([TagScopes[0]]),
    roles: [] as string[],
    roleInput: allRoles[0] ?? "",
    description: "",
    status: "active" as TagStatus
  });

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const toggleScope = (scope: string) => {
    setForm((prev) => {
      const next = new Set(prev.scopes);
      if (next.has(scope)) {
        next.delete(scope);
      } else {
        next.add(scope);
      }
      return { ...prev, scopes: next };
    });
  };

  const addRole = () => {
    setForm((prev) => {
      if (!prev.roleInput || prev.roles.includes(prev.roleInput)) {
        return prev;
      }
      return { ...prev, roles: [...prev.roles, prev.roleInput] };
    });
  };

  const removeRole = (role: string) => {
    setForm((prev) => ({ ...prev, roles: prev.roles.filter((item) => item !== role) }));
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <div>
            <span className="modal__tag">标签管理 · 新建</span>
            <h3>新建标签</h3>
            <p>配置标签基础信息、适用范围与岗位，确保在各模块统一引用。</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <section className="modal__section">
            <h4>基础信息</h4>
            <div className="modal__grid">
              <label className="modal__field">
                <span>标签名称</span>
                <input
                  value={form.name}
                  placeholder="请输入标签名称"
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>标签编码</span>
                <input
                  value={form.code}
                  placeholder="例如：BRG-SAFETY"
                  onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
                />
              </label>
              <label className="modal__field">
                <span>所属分类</span>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, category: event.target.value as TagCategory }))
                  }
                >
                  {TagCategories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>标签颜色</span>
                <select
                  value={form.color}
                  onChange={(event) => setForm((prev) => ({ ...prev, color: event.target.value }))}
                >
                  {TagColors.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal__field">
                <span>显示状态</span>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, status: event.target.value as TagStatus }))
                  }
                >
                  {TagStatuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="modal__section">
            <h4>适用范围</h4>
            <div className="modal__choices">
              {TagScopes.map((scope) => (
                <label key={scope}>
                  <input
                    type="checkbox"
                    checked={form.scopes.has(scope)}
                    onChange={() => toggleScope(scope)}
                  />
                  {scope}
                </label>
              ))}
            </div>
          </section>

          <section className="modal__section">
            <h4>适用岗位</h4>
            <div className="modal__chips">
              <div className="modal__chips-control">
                <select
                  value={form.roleInput}
                  onChange={(event) => setForm((prev) => ({ ...prev, roleInput: event.target.value }))}
                >
                  {allRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={addRole}>
                  添加岗位
                </button>
              </div>
              <div className="modal__chips-tags">
                {form.roles.map((role) => (
                  <span key={role} className="tag">
                    {role}
                    <button type="button" onClick={() => removeRole(role)}>
                      ×
                    </button>
                  </span>
                ))}
                {form.roles.length === 0 && <span className="modal__chips-placeholder">暂未选择岗位</span>}
              </div>
            </div>
          </section>

          <section className="modal__section">
            <h4>描述说明</h4>
            <label className="modal__field">
              <span>详细描述</span>
              <textarea
                rows={3}
                value={form.description}
                placeholder="填写标签使用说明、适用场景或维护建议"
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>
          </section>

          <p className="modal__hint">
            保存后标签将进入“启用”状态，可在课程、题库、试卷等模块中选择使用，后续可在列表中调整范围与状态。
          </p>
        </div>
        <div className="modal__footer">
          <button type="button" className="topbar__cta topbar__cta--subtle" onClick={onClose}>
            取消
          </button>
          <button type="button" className="topbar__cta" onClick={handleSubmit}>
            保存标签
          </button>
        </div>
      </div>
    </div>
  );
};

const statusBadge = (status: TagStatus) => {
  switch (status) {
    case "active":
      return "badge--success";
    case "inactive":
      return "badge--info";
    case "archived":
      return "badge--warning";
    default:
      return "badge--soft";
  }
};

export default TagManagementPage;
