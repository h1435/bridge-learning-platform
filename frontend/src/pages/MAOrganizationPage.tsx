import { useEffect, useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import {
  MAOrganizationSummary,
  MAOrganizationTree,
  MAOrganizationMembers,
  MAProjectTags,
  MAJobRoles,
  MACertificateStatusOptions,
  type OrganizationNode,
  type MemberProfile,
  type ProjectTag
} from "../mocks/maOrganization";

type ViewMode = "team" | "project";

const statusBadgeClass: Record<MemberProfile["certificateStatus"], string> = {
  正常: "badge--success",
  即将到期: "badge--warning",
  已过期: "badge--danger"
};

const formatPercent = (value: number) => `${Math.round(value)}%`;

const MAOrganizationPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("team");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [certificateFilter, setCertificateFilter] = useState<"all" | MemberProfile["certificateStatus"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberProfile["status"]>("all");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(() => MAOrganizationTree.map((node) => node.id));

  const nodeMap = useMemo(() => {
    const map = new Map<string, OrganizationNode>();

    const traverse = (nodes: OrganizationNode[]) => {
      nodes.forEach((node) => {
        map.set(node.id, node);
        if (node.children) {
          traverse(node.children);
        }
      });
    };

    traverse(MAOrganizationTree);
    return map;
  }, []);

  const parentMap = useMemo(() => {
    const map = new Map<string, string>();

    const traverse = (nodes: OrganizationNode[], parentId?: string) => {
      nodes.forEach((node) => {
        if (parentId) {
          map.set(node.id, parentId);
        }
        if (node.children) {
          traverse(node.children, node.id);
        }
      });
    };

    traverse(MAOrganizationTree);
    return map;
  }, []);

  const collectDescendantIds = useMemo(() => {
    const cache = new Map<string, Set<string>>();

    const helper = (nodeId: string): Set<string> => {
      if (cache.has(nodeId)) {
        return cache.get(nodeId)!;
      }
      const node = nodeMap.get(nodeId);
      const set = new Set<string>();
      if (!node) {
        cache.set(nodeId, set);
        return set;
      }
      set.add(node.id);
      node.children?.forEach((child) => {
        helper(child.id).forEach((childId) => set.add(childId));
      });
      cache.set(nodeId, set);
      return set;
    };

    return helper;
  }, [nodeMap]);

  useEffect(() => {
    if (viewMode === "project" && projectFilter === "all" && MAProjectTags.length > 0) {
      setProjectFilter(MAProjectTags[0].id);
    }
  }, [viewMode, projectFilter]);

  const selectedMember = useMemo(
    () => MAOrganizationMembers.find((member) => member.id === selectedMemberId) ?? null,
    [selectedMemberId]
  );

  const activeNode = useMemo(() => {
    if (selectedNodeId === "all") {
      return null;
    }
    return nodeMap.get(selectedNodeId) ?? null;
  }, [nodeMap, selectedNodeId]);

  const selectedProject: ProjectTag | null = useMemo(() => {
    if (projectFilter === "all") return null;
    return MAProjectTags.find((project) => project.id === projectFilter) ?? null;
  }, [projectFilter]);

  const filteredMembers = useMemo(() => {
    const keywordValue = keyword.trim();
    const normalizedKeyword = keywordValue.toLowerCase();
    const teamScope =
      viewMode === "team" && selectedNodeId !== "all" ? collectDescendantIds(selectedNodeId) : null;

    return MAOrganizationMembers.filter((member) => {
      const matchKeyword =
        normalizedKeyword.length === 0 ||
        member.name.toLowerCase().includes(normalizedKeyword) ||
        member.employeeId.toLowerCase().includes(normalizedKeyword) ||
        member.phone.includes(keywordValue);

      const matchRole = roleFilter === "all" ? true : member.jobTitle === roleFilter;

      const matchCertificate = certificateFilter === "all" ? true : member.certificateStatus === certificateFilter;

      const matchStatus = statusFilter === "all" ? true : member.status === statusFilter;

      const matchProject =
        projectFilter === "all" ? true : member.projects.includes(projectFilter);

      const matchTeam =
        viewMode === "team" && teamScope
          ? teamScope.has(member.teamId) || teamScope.has(member.departmentId)
          : true;

      const matchProjectView =
        viewMode === "project"
          ? projectFilter === "all" ? true : member.projects.includes(projectFilter)
          : true;

      return (
        matchKeyword &&
        matchRole &&
        matchCertificate &&
        matchStatus &&
        matchProject &&
        matchTeam &&
        matchProjectView
      );
    });
  }, [
    keyword,
    roleFilter,
    certificateFilter,
    statusFilter,
    projectFilter,
    viewMode,
    collectDescendantIds,
    selectedNodeId
  ]);

  const totalFiltered = filteredMembers.length;

  const jobDistribution = useMemo(() => {
    const map = new Map<string, number>();
    filteredMembers.forEach((member) => {
      const key = member.jobTitle || "其他岗位";
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [filteredMembers]);

  const certificateDistribution = useMemo(() => {
    const map = new Map<MemberProfile["certificateStatus"], number>();
    filteredMembers.forEach((member) => {
      map.set(member.certificateStatus, (map.get(member.certificateStatus) ?? 0) + 1);
    });
    return (["正常", "即将到期", "已过期"] as MemberProfile["certificateStatus"][]).map((status) => ({
      status,
      count: map.get(status) ?? 0
    }));
  }, [filteredMembers]);

  const formatRatio = (count: number) => {
    if (totalFiltered === 0) return "0%";
    return `${Math.round((count / totalFiltered) * 100)}%`;
  };

  const summaryCards = [
    {
      id: "staff",
      label: "在册人员",
      value: MAOrganizationSummary.totalStaff.toString(),
      hint: `在岗 ${MAOrganizationSummary.activeStaff} · 停用 ${MAOrganizationSummary.inactiveStaff}`
    },
    {
      id: "groups",
      label: "班组数量",
      value: MAOrganizationSummary.groupCount.toString(),
      hint: "含应急与专项小组"
    },
    {
      id: "projects",
      label: "项目标签",
      value: MAOrganizationSummary.projectCount.toString(),
      hint: "按项目维度管理"
    },
    {
      id: "joiners",
      label: "近 30 天入职",
      value: MAOrganizationSummary.newJoiners30d.toString(),
      hint: "需完成资料初审"
    }
  ];

  const handleOpenMember = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const closeDrawer = () => {
    setSelectedMemberId(null);
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]));
  };

  const expandToNode = (nodeId: string) => {
    if (nodeId === "all") {
      return;
    }
    const newSet = new Set(expandedNodes);
    let current: string | undefined = nodeId;
    while (current) {
      newSet.add(current);
      current = parentMap.get(current);
    }
    setExpandedNodes(Array.from(newSet));
  };

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    expandToNode(nodeId);
  };

  const renderTree = (nodes: OrganizationNode[], depth = 0) => (
    <ul className={`ma-org__tree-list ma-org__tree-list--depth${depth}`}>
      {nodes.map((node) => {
        const isActive = node.id === selectedNodeId;
        const isExpanded = expandedNodes.includes(node.id);
        const hasChildren = Boolean(node.children && node.children.length > 0);
        return (
          <li key={node.id}>
            <button
              type="button"
              className={`ma-org__tree-node ${isActive ? "is-active" : ""}`}
              onClick={() => handleSelectNode(node.id)}
            >
              <div className="ma-org__tree-node-head">
                {hasChildren ? (
                  <span
                    className={`ma-org__tree-toggle ${isExpanded ? "is-expanded" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleNode(node.id);
                    }}
                    aria-label={isExpanded ? "折叠节点" : "展开节点"}
                  />
                ) : (
                  <span className="ma-org__tree-toggle ma-org__tree-toggle--placeholder" />
                )}
                <div className="ma-org__tree-node-content">
                  <div className="ma-org__tree-node-title">
                    <strong>{node.name}</strong>
                    {node.leader ? (
                      <span>
                        {node.leaderTitle ? `${node.leaderTitle}：` : ""}
                        {node.leader}
                      </span>
                    ) : null}
                  </div>
                  <div className="ma-org__tree-node-meta">
                    <span>{node.memberCount} 人</span>
                    <span>{formatPercent(node.completionRate * 100)} 完成</span>
                    {node.pendingDocs > 0 && (
                      <span className="ma-org__tree-node-warning">待审核 {node.pendingDocs}</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
            {hasChildren && isExpanded ? renderTree(node.children!, depth + 1) : null}
          </li>
        );
      })}
    </ul>
  );

  const statusDotClass = (status: MemberProfile["status"]) =>
    status === "在岗" ? "status-dot--success" : "status-dot--danger";

  const projectNameMap = useMemo(() => {
    const map = new Map<string, string>();
    MAProjectTags.forEach((project) => map.set(project.id, project.name));
    return map;
  }, []);

  return (
    <div className="page">
      <PageSection
        title="单位组织管理"
        description="维护单位的班组架构与项目成员关系，掌握人员培训与证书状态。"
        action={
          <div className="section-actions">
            <button type="button" className="topbar__cta topbar__cta--subtle">
              导出组织数据
            </button>
            <button type="button" className="topbar__cta">
              新增班组
            </button>
            <button type="button" className="topbar__cta">
              批量导入人员
            </button>
          </div>
        }
      >
        <div className="summary-cards">
          {summaryCards.map((card) => (
            <div key={card.id} className="summary-card">
              <div className="summary-card__label">{card.label}</div>
              <div className="summary-card__value">{card.value}</div>
              <div className="summary-card__hint">{card.hint}</div>
            </div>
          ))}
        </div>

        <div className="ma-org__header">
          <div className="ma-org__view-switch">
            <button
              type="button"
              className={`ma-org__view-btn ${viewMode === "team" ? "is-active" : ""}`}
              onClick={() => setViewMode("team")}
            >
              班组视图
            </button>
            <button
              type="button"
              className={`ma-org__view-btn ${viewMode === "project" ? "is-active" : ""}`}
              onClick={() => setViewMode("project")}
            >
              项目视图
            </button>
          </div>
          <div className="ma-org__scope">
            {viewMode === "team"
              ? (
                <span>
                  当前：{selectedNodeId === "all" ? "全部班组" : activeNode?.name ?? "全部班组"}
                </span>
              ) : (
                <span>当前项目：{selectedProject?.name ?? "全部项目"}</span>
              )}
          </div>
        </div>

        <div className="ma-org__layout">
          <aside className="ma-org__sidebar">
            {viewMode === "team" ? (
              <div className="ma-org__tree">
                <button
                  type="button"
                  className={`ma-org__tree-node ma-org__tree-node--root ${selectedNodeId === "all" ? "is-active" : ""}`}
                  onClick={() => setSelectedNodeId("all")}
                >
                  <div className="ma-org__tree-node-content">
                    <div className="ma-org__tree-node-title">
                      <strong>全部班组</strong>
                    </div>
                    <div className="ma-org__tree-node-meta">
                      <span>{MAOrganizationSummary.totalStaff} 人</span>
                      <span>项目标签 {MAOrganizationSummary.projectCount}</span>
                    </div>
                  </div>
                </button>
                {renderTree(MAOrganizationTree)}
              </div>
            ) : (
              <div className="ma-org__projects">
                <button
                  type="button"
                  className={`ma-org__project-card ${projectFilter === "all" ? "is-active" : ""}`}
                  onClick={() => setProjectFilter("all")}
                >
                  <div>
                    <strong>全部项目</strong>
                    <p>查看所有项目成员及标签。</p>
                  </div>
                  <div className="ma-org__project-meta">
                    <span>{MAOrganizationSummary.projectCount} 个标签</span>
                    <span>{MAOrganizationSummary.totalStaff} 人参与</span>
                  </div>
                </button>
                {MAProjectTags.map((project) => {
                  const isActive = projectFilter === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      className={`ma-org__project-card ${isActive ? "is-active" : ""}`}
                      onClick={() => setProjectFilter(project.id)}
                    >
                      <div className="ma-org__project-header">
                        <strong>{project.name}</strong>
                        <span className="tag tag--blue">{project.code}</span>
                      </div>
                      <p>{project.ownerTitle ? `${project.ownerTitle}：` : ""}{project.owner}</p>
                      <div className="ma-org__project-meta">
                        <span>{project.members} 人</span>
                        <span>{project.status}</span>
                        <span>进度 {project.progress}%</span>
                      </div>
                      {project.focus ? (
                        <div className="ma-org__project-focus">{project.focus}</div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </aside>

          <section className="ma-org__content">
            <div className="ma-org__filters">
              <div className="ma-org__filters-left">
                <input
                  type="search"
                  placeholder="搜索姓名 / 工号 / 手机号"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
                <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                  <option value="all">全部岗位</option>
                  {MAJobRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <select
                  value={certificateFilter}
                  onChange={(event) => setCertificateFilter(event.target.value as typeof certificateFilter)}
                >
                  <option value="all">证书状态（全部）</option>
                  {MACertificateStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
                >
                  <option value="all">在岗状态（全部）</option>
                  <option value="在岗">在岗</option>
                  <option value="停用">停用</option>
                </select>
                <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)}>
                  <option value="all">项目标签（全部）</option>
                  {MAProjectTags.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ma-org__filters-right">
                <button
                  type="button"
                  className="filter-bar__link"
                  onClick={() => {
                    setKeyword("");
                    setRoleFilter("all");
                    setCertificateFilter("all");
                    setStatusFilter("all");
                    setProjectFilter(viewMode === "project" && MAProjectTags.length > 0 ? MAProjectTags[0].id : "all");
                  }}
                >
                  重置
                </button>
                <button type="button" className="filter-bar__link">
                  保存筛选视图
                </button>
              </div>
            </div>

            <div className="ma-org__table-wrapper">
              <div className="ma-org__insights">
                <div className="ma-org__insight-card">
                  <header className="ma-org__insight-header">
                    <h5>岗位分布</h5>
                    <span>{totalFiltered} 人</span>
                  </header>
                  <ul className="ma-org__insight-list">
                    {jobDistribution.slice(0, 4).map(([job, count]) => (
                      <li key={job}>
                        <span>{job}</span>
                        <span className="ma-org__insight-value">
                          {count} 人 · {formatRatio(count)}
                        </span>
                      </li>
                    ))}
                    {jobDistribution.length === 0 && <li className="ma-org__insight-empty">暂无数据</li>}
                  </ul>
                </div>
                <div className="ma-org__insight-card">
                  <header className="ma-org__insight-header">
                    <h5>证书状态</h5>
                    <span>{totalFiltered} 人</span>
                  </header>
                  <ul className="ma-org__insight-list">
                    {certificateDistribution.map(({ status, count }) => (
                      <li key={status}>
                        <span>{status}</span>
                        <span className="ma-org__insight-value">
                          {count} 人 · {formatRatio(count)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>人员</th>
                    <th>组织归属</th>
                    <th>项目标签</th>
                    <th>学习进度</th>
                    <th>证书状态</th>
                    <th>登录 / 状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <div className="ma-org__person">
                          <img src={member.avatar} alt={member.name} />
                          <div>
                            <strong>{member.name}</strong>
                            <span>
                              {member.jobTitle} · {member.level}
                            </span>
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="plan-meta">
                          <span>{member.departmentName}</span>
                          <span>{member.teamName}</span>
                          {member.roleInTeam ? <span className="tag tag--slate">{member.roleInTeam}</span> : null}
                        </div>
                      </td>
                      <td>
                        <div className="tag-list tag-list--wrap tag-list--compact">
                          {member.projects.map((projectId) => (
                            <span key={projectId} className="tag tag--blue">
                              {projectNameMap.get(projectId) ?? projectId}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="plan-progress">
                          <div className="plan-progress__bar">
                            <div
                              className="plan-progress__fill"
                              style={{ width: `${Math.min(member.completionRate, 100)}%` }}
                            />
                          </div>
                          <span>{formatPercent(member.completionRate)}</span>
                        </div>
                        <div className="plan-meta">待办计划 {member.pendingPlans}</div>
                      </td>
                      <td>
                        <span className={`badge ${statusBadgeClass[member.certificateStatus]}`}>
                          {member.certificateStatus}
                        </span>
                        <div className="plan-meta">证书 {member.certificates.length} 张</div>
                      </td>
                      <td>
                        <div className="plan-meta">
                          <span>{member.lastLogin}</span>
                          <span>
                            <span className={`status-dot ${statusDotClass(member.status)}`} />
                            {member.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button type="button" onClick={() => handleOpenMember(member.id)}>
                            查看资料
                          </button>
                          <button type="button">发送提醒</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={7}>
                        <div className="empty-state">
                          <h4>暂无符合条件的人员</h4>
                          <p>尝试调整筛选条件或切换视图查看其他组织成员。</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </PageSection>

      {selectedMember ? (
        <div className="drawer is-open">
          <div className="drawer__overlay" onClick={closeDrawer} />
          <div className="drawer__panel">
            <header className="drawer__header">
              <div className="ma-org__drawer-header">
                <img src={selectedMember.avatar} alt={selectedMember.name} />
                <div>
                  <h3>{selectedMember.name}</h3>
                  <p>
                    {selectedMember.jobTitle} · {selectedMember.level}
                  </p>
                  <div className="tag-list">
                    {selectedMember.tags.map((tag) => (
                      <span key={tag} className="tag tag--slate">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button type="button" className="modal__close" onClick={closeDrawer} aria-label="关闭">
                ×
              </button>
            </header>
            <div className="drawer__body drawer__body--list">
              <section className="ma-org__section">
                <h4>基本信息</h4>
                <div className="ma-org__info-grid">
                  <div>
                    <span className="ma-org__info-label">工号</span>
                    <span>{selectedMember.employeeId}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">性别 / 年龄</span>
                    <span>
                      {selectedMember.gender} · {selectedMember.age} 岁
                    </span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">联系方式</span>
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">邮箱</span>
                    <span>{selectedMember.email}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">入职时间</span>
                    <span>{selectedMember.joinDate}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">最近登录</span>
                    <span>{selectedMember.lastLogin}</span>
                  </div>
                </div>
              </section>

              <section className="ma-org__section">
                <h4>组织归属与项目</h4>
                <div className="ma-org__info-grid">
                  <div>
                    <span className="ma-org__info-label">所属部门</span>
                    <span>{selectedMember.departmentName}</span>
                  </div>
                  <div>
                    <span className="ma-org__info-label">所属班组</span>
                    <span>{selectedMember.teamName}</span>
                  </div>
                  {selectedMember.roleInTeam ? (
                    <div>
                      <span className="ma-org__info-label">班组角色</span>
                      <span>{selectedMember.roleInTeam}</span>
                    </div>
                  ) : null}
                </div>
                <div className="tag-list tag-list--wrap">
                  {selectedMember.projects.map((projectId) => (
                    <span key={projectId} className="tag tag--blue">
                      {projectNameMap.get(projectId) ?? projectId}
                    </span>
                  ))}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>培训计划执行</h4>
                <div className="ma-org__list">
                  {selectedMember.plans.map((plan) => (
                    <div key={plan.id} className="ma-org__list-item">
                      <div>
                        <strong>{plan.name}</strong>
                        <span>{plan.status}</span>
                      </div>
                      <div className="plan-progress">
                        <div className="plan-progress__bar">
                          <div className="plan-progress__fill" style={{ width: `${plan.progress}%` }} />
                        </div>
                        <span>{plan.progress}%</span>
                      </div>
                      {plan.nextAction ? <p className="ma-org__list-hint">下一步：{plan.nextAction}</p> : null}
                    </div>
                  ))}
                  {selectedMember.plans.length === 0 && <div className="ma-org__list-empty">暂无培训计划</div>}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>证书情况</h4>
                <div className="ma-org__list">
                  {selectedMember.certificates.map((cert) => (
                    <div key={cert.id} className="ma-org__list-item ma-org__list-item--inline">
                      <div>
                        <strong>{cert.name}</strong>
                        <span>{cert.status}</span>
                      </div>
                      <span className="ma-org__list-hint">有效期至 {cert.expireAt}</span>
                    </div>
                  ))}
                  {selectedMember.certificates.length === 0 && <div className="ma-org__list-empty">暂无证书记录</div>}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>资料与审批</h4>
                <div className="ma-org__timeline">
                  {selectedMember.approvals.map((approval) => (
                    <div key={approval.id} className="ma-org__timeline-item">
                      <div className="ma-org__timeline-time">{approval.time}</div>
                      <div className="ma-org__timeline-body">
                        <strong>{approval.type}</strong>
                        <span>{approval.result}</span>
                        {approval.remark ? <p>{approval.remark}</p> : null}
                      </div>
                    </div>
                  ))}
                  {selectedMember.approvals.length === 0 && (
                    <div className="ma-org__list-empty">暂无资料审批记录</div>
                  )}
                </div>
              </section>

              <section className="ma-org__section">
                <h4>附件资料</h4>
                <ul className="ma-org__attachments">
                  {selectedMember.attachments.map((attachment) => (
                    <li key={attachment.id}>
                      <div>
                        <strong>{attachment.name}</strong>
                        <span>{attachment.type}</span>
                      </div>
                      <span>{attachment.updatedAt}</span>
                      <button type="button" className="filter-bar__link">
                        下载
                      </button>
                    </li>
                  ))}
                  {selectedMember.attachments.length === 0 && (
                    <li className="ma-org__list-empty">暂无附件资料</li>
                  )}
                </ul>
              </section>
            </div>
            <footer className="drawer__footer-actions">
              <button type="button" className="topbar__cta topbar__cta--subtle">
                标记为重点跟进
              </button>
              <button type="button" className="topbar__cta">
                发起资料复审
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MAOrganizationPage;


