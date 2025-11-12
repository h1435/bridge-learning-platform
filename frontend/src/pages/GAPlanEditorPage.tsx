import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageSection from "../components/PageSection";
import { GAPlanDetailMock } from "../mocks/gaPlanDetail";
import { CourseLibraryMock } from "../mocks/courseLibrary";
import { GACourseLibraryMock } from "../mocks/gaCourseLibrary";
import { GAPlansMock } from "../mocks/gaPlans";

type StepKey = "basic" | "courses" | "coverage" | "assessment" | "notification";

type EditorStep = {
  key: StepKey;
  title: string;
  description: string;
};

const steps: EditorStep[] = [
  {
    key: "basic",
    title: "基础信息",
    description: "定义计划的名称、类型、周期与负责人。"
  },
  {
    key: "courses",
    title: "课程与学习要求",
    description: "选择计划课程、设置必修选修与学习规则。"
  },
  {
    key: "coverage",
    title: "覆盖范围与学员",
    description: "指定管养单位、岗位人群以及名单策略。"
  },
  {
    key: "assessment",
    title: "考核与证书",
    description: "配置考试、补考与证书签发策略。"
  },
  {
    key: "notification",
    title: "通知与审批",
    description: "设置计划发布通知、催办节奏与审批流程。"
  }
];

type PlanCycleType = "once" | "annual" | "quarterly" | "custom";

type FormState = {
  basic: {
    name: string;
    code: string;
    type: string;
    description: string;
    cycleType: PlanCycleType;
    startDate: string;
    endDate: string;
    cycleAuto: boolean;
    cycleTimes: number;
    owner: string;
    tags: string[];
    attachments: Array<{ id: string; name: string }>;
  };
  courses: {
    selected: string[];
    requiredCourses: string[];
    optionalRules: {
      enabled: boolean;
      minCount: number;
    };
    sequential: boolean;
    allowLegacy: boolean;
    timeLimitDays: number;
    minProgress: number;
    minScore: number;
  };
  coverage: {
    units: string[];
    customUnitSettings: Record<
      string,
      {
        owner: string;
        reminderCycle: string;
      }
    >;
    roles: string[];
    requireRosterApproval: boolean;
    freezeRoster: boolean;
    requireProfileApproval: boolean;
  };
  assessment: {
    enableExam: boolean;
    exams: Array<{
      id: string;
      name: string;
      template: string;
      schedule: string;
      duration: number;
      passScore: number;
      retakePolicy: string;
    }>;
    enableAppeal: boolean;
    appealOwner: string;
    certificateAuto: boolean;
    certificateTemplate: string;
    certificateRule: string;
    certificateValidity: string;
  };
  notification: {
    publishChannels: string[];
    remindBeforeDays: number;
    remindLagThreshold: number;
    escalationEnabled: boolean;
    approvalFlow: string;
    publishStrategy: "immediate" | "scheduled";
    publishDate: string;
    remark: string;
  };
};

const defaultFormState: FormState = {
  basic: {
    name: "",
    code: "",
    type: "",
    description: "",
    cycleType: "once",
    startDate: "",
    endDate: "",
    cycleAuto: false,
    cycleTimes: 1,
    owner: "",
    tags: [],
    attachments: []
  },
  courses: {
    selected: [],
    requiredCourses: [],
    optionalRules: {
      enabled: false,
      minCount: 1
    },
    sequential: false,
    allowLegacy: true,
    timeLimitDays: 30,
    minProgress: 80,
    minScore: 60
  },
  coverage: {
    units: [],
    customUnitSettings: {},
    roles: [],
    requireRosterApproval: true,
    freezeRoster: false,
    requireProfileApproval: true
  },
  assessment: {
    enableExam: true,
    exams: [],
    enableAppeal: true,
    appealOwner: "平台教研组",
    certificateAuto: true,
    certificateTemplate: "桥梁维护工程师年度培训证书",
    certificateRule: "课程完成≥90% 且考试≥80 分自动发证",
    certificateValidity: "12 个月"
  },
  notification: {
    publishChannels: ["站内信", "短信"],
    remindBeforeDays: 3,
    remindLagThreshold: 70,
    escalationEnabled: true,
    approvalFlow: "主管单位审批流 A",
    publishStrategy: "immediate",
    publishDate: "",
    remark: ""
  }
};

const courseOptions = [
  ...CourseLibraryMock.map((course) => ({
    id: course.id,
    title: course.title,
    type: course.type === "video" ? "视频课程" : course.type === "document" ? "文档课件" : course.type === "live" ? "直播课件" : "测验课件",
    duration: course.duration,
    roles: course.roles
  })),
  ...GACourseLibraryMock.map((course) => ({
    id: course.id,
    title: course.title,
    type: course.type,
    duration: course.duration,
    roles: course.roles
  }))
];

const unitOptions = Array.from(
  new Set([
    ...GAPlanDetailMock.units.map((unit) => unit.name),
    "浙江高速集团",
    "贵州省交通运输厅",
    "宁波公路管理中心",
    "沪苏通运营公司",
    "江苏省交通控股集团",
    "重庆市公路局"
  ])
);

const roleOptions = ["桥梁工程师", "巡检班组长", "安全管理员", "运营调度员"];

const publishChannels = ["站内信", "短信", "邮件"];

const GAPlanEditorPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formState, setFormState] = useState<FormState>(() => defaultFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveHint, setSaveHint] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode") ?? "create";

  useEffect(() => {
    if (mode === "edit") {
      const demo = GAPlanDetailMock;
      setFormState({
        basic: {
          name: demo.name,
          code: demo.code,
          type: "special",
          description: demo.description,
          cycleType: "once",
          startDate: demo.period.split("~")[0]?.trim() ?? "",
          endDate: demo.period.split("~")[1]?.trim() ?? "",
          cycleAuto: false,
          cycleTimes: 1,
          owner: demo.owner,
          tags: ["桥梁维护", "年度计划"],
          attachments: demo.attachments.map((item) => ({ id: item.id, name: item.name }))
        },
        courses: {
          selected: demo.courses.map((course) => course.id),
          requiredCourses: demo.courses.filter((course) => course.required).map((course) => course.id),
          optionalRules: {
            enabled: demo.courses.some((course) => !course.required),
            minCount: 1
          },
          sequential: true,
          allowLegacy: true,
          timeLimitDays: 45,
          minProgress: 80,
          minScore: 70
        },
        coverage: {
          units: demo.units.map((unit) => unit.name),
          customUnitSettings: Object.fromEntries(demo.units.map((unit) => [unit.name, { owner: unit.admin, reminderCycle: "每周" }])),
          roles: demo.roles.map((role) => role.name),
          requireRosterApproval: true,
          freezeRoster: false,
          requireProfileApproval: true
        },
        assessment: {
          enableExam: demo.exams.length > 0,
          exams: demo.exams.map((exam) => ({
            id: exam.id,
            name: exam.name,
            template: exam.name,
            schedule: exam.schedule,
            duration: 90,
            passScore: exam.name.includes("理论") ? 80 : 70,
            retakePolicy: "未通过允许 1 次补考"
          })),
          enableAppeal: true,
          appealOwner: "平台教研组",
          certificateAuto: demo.certificate.autoIssue,
          certificateTemplate: demo.certificate.template,
          certificateRule: demo.certificate.rule,
          certificateValidity: demo.certificate.validity
        },
        notification: {
          publishChannels: ["站内信", "短信"],
          remindBeforeDays: 5,
          remindLagThreshold: 70,
          escalationEnabled: true,
          approvalFlow: "主管单位审批流 A",
          publishStrategy: "immediate",
          publishDate: "",
          remark: "监控滞后单位，重点督办宁波中心"
        }
      });
    }
  }, [mode]);

  const currentStep = steps[currentStepIndex];

  const handleFieldChange = <K extends StepKey, T extends keyof FormState[K]>(
    step: K,
    key: T,
    value: FormState[K][T]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [key]: value
      }
    }));
  };

  const handleArrayToggle = (step: StepKey, key: string, value: string) => {
    setFormState((prev) => {
      const segment = prev[step as keyof FormState] as Record<string, unknown>;
      const current = (segment[key] as string[]) ?? [];
      const exist = current.includes(value);
      const next = exist ? current.filter((item) => item !== value) : [...current, value];
      return {
        ...prev,
        [step]: {
          ...segment,
          [key]: next
        }
      } as FormState;
    });
  };

  const validateStep = (stepKey: StepKey) => {
    const stepErrors: Record<string, string> = {};
    if (stepKey === "basic") {
      if (!formState.basic.name.trim()) {
        stepErrors.name = "请输入计划名称";
      }
      if (!formState.basic.code.trim()) {
        stepErrors.code = "请输入计划编码";
      }
      if (!formState.basic.type) {
        stepErrors.type = "请选择计划类型";
      }
      if (!formState.basic.startDate || !formState.basic.endDate) {
        stepErrors.period = "请完整填写计划周期";
      }
    }
    if (stepKey === "courses") {
      if (formState.courses.selected.length === 0) {
        stepErrors.courses = "至少选择一门课程";
      }
      if (formState.courses.requiredCourses.length === 0) {
        stepErrors.required = "至少设定一门必修课程";
      }
      if (
        formState.courses.optionalRules.enabled &&
        formState.courses.optionalRules.minCount >
          formState.courses.selected.filter((id) => !formState.courses.requiredCourses.includes(id)).length
      ) {
        stepErrors.optional = "选修课程数量不足以满足门槛";
      }
    }
    if (stepKey === "coverage") {
      if (formState.coverage.units.length === 0) {
        stepErrors.units = "请选择至少一个管养单位";
      }
      if (formState.coverage.roles.length === 0) {
        stepErrors.roles = "请选择至少一个岗位/职称";
      }
    }
    if (stepKey === "assessment") {
      if (formState.assessment.enableExam && formState.assessment.exams.length === 0) {
        stepErrors.exams = "请至少配置一场考试";
      }
      if (formState.assessment.certificateAuto && !formState.assessment.certificateTemplate) {
        stepErrors.certificate = "请选择证书模板";
      }
    }
    if (stepKey === "notification") {
      if (formState.notification.publishChannels.length === 0) {
        stepErrors.channels = "至少选择一个通知渠道";
      }
      if (
        formState.notification.publishStrategy === "scheduled" &&
        !formState.notification.publishDate
      ) {
        stepErrors.publishDate = "请选择计划发布时间";
      }
    }
    return stepErrors;
  };

  const handleNext = () => {
    setErrors({});
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSaveDraft = () => {
    setSaveHint("草稿已保存，您可以稍后继续编辑。");
    setTimeout(() => setSaveHint(null), 3000);
  };

  const handleSubmit = () => {
    let firstErrorStepIndex: number | null = null;
    const finalErrors = steps.reduce<Record<string, string>>((acc, step, index) => {
      const stepErr = validateStep(step.key);
      if (Object.keys(stepErr).length > 0 && firstErrorStepIndex === null) {
        firstErrorStepIndex = index;
      }
      return { ...acc, ...stepErr };
    }, {});

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      if (firstErrorStepIndex !== null) {
        setCurrentStepIndex(firstErrorStepIndex);
      }
      return;
    }

    setErrors({});
    setSaveHint("计划已提交，进入审批流程。");
    setTimeout(() => {
      navigate("/ga/plans");
    }, 1500);
  };

  const renderCurrentStep = () => {
    switch (currentStep.key) {
      case "basic":
        return renderBasicStep(formState, handleFieldChange, errors, mode);
      case "courses":
        return renderCoursesStep(formState, handleFieldChange, handleArrayToggle, errors);
      case "coverage":
        return renderCoverageStep(formState, handleFieldChange, handleArrayToggle, errors);
      case "assessment":
        return renderAssessmentStep(formState, handleFieldChange, handleArrayToggle, errors);
      case "notification":
        return renderNotificationStep(formState, handleFieldChange, handleArrayToggle, errors);
      default:
        return null;
    }
  };

  return (
    <div className="page plan-editor">
      <header className="plan-editor__header">
        <div>
          <h2>{mode === "edit" ? "编辑培训计划" : "新建培训计划"}</h2>
          <p>{mode === "edit" ? "根据当前计划调整配置并提交变更审批" : "按照向导完成计划配置后提交审批"}</p>
          {saveHint && <div className="toast toast--success">{saveHint}</div>}
        </div>
        <button type="button" className="link" onClick={() => navigate(-1)}>
          取消返回
        </button>
      </header>

      <div className="plan-editor__layout">
        <aside className="plan-editor__steps">
          <ol>
            {steps.map((step, index) => (
              <li
                key={step.key}
                className={index === currentStepIndex ? "is-active" : index < currentStepIndex ? "is-complete" : ""}
              >
                <span className="plan-editor__step-index">{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>

        <main className="plan-editor__content">
          <PageSection title={currentStep.title} description={currentStep.description}>
            {renderCurrentStep()}
          </PageSection>

          <footer className="plan-editor__footer">
            <button type="button" className="topbar__cta topbar__cta--ghost" onClick={handleSaveDraft}>
              保存草稿
            </button>
            <div className="plan-editor__footer-actions">
              {currentStepIndex > 0 && (
                <button type="button" className="topbar__cta topbar__cta--subtle" onClick={handlePrev}>
                  上一步
                </button>
              )}
              {currentStepIndex < steps.length - 1 ? (
                <button type="button" className="topbar__cta" onClick={handleNext}>
                  下一步
                </button>
              ) : (
                <button type="button" className="topbar__cta" onClick={handleSubmit}>
                  提交审批
                </button>
              )}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

const renderBasicStep = (
  formState: FormState,
  handleFieldChange: <K extends StepKey, T extends keyof FormState[K]>(step: K, key: T, value: FormState[K][T]) => void,
  errors: Record<string, string>,
  mode: string
) => {
  const existingCodes = GAPlansMock.map((plan) => plan.code);
  const codeExists = formState.basic.code && existingCodes.includes(formState.basic.code) && mode !== "edit";

  return (
    <div className="form-grid">
      <div className="form-field form-field--full">
        <label>计划名称 *</label>
        <input
          type="text"
          value={formState.basic.name}
          placeholder="例如：2025 年桥梁维护专项培训"
          onChange={(event) => handleFieldChange("basic", "name", event.target.value)}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label>计划编码 *</label>
        <input
          type="text"
          value={formState.basic.code}
          placeholder="PLAN-BRG-2025-002"
          onChange={(event) => handleFieldChange("basic", "code", event.target.value.toUpperCase())}
        />
        {codeExists && <span className="form-error">该编码已存在，请更换</span>}
        {errors.code && <span className="form-error">{errors.code}</span>}
      </div>
      <div className="form-field">
        <label>计划类型 *</label>
        <select
          value={formState.basic.type}
          onChange={(event) => handleFieldChange("basic", "type", event.target.value)}
        >
          <option value="">请选择</option>
          <option value="onboard">岗前培训</option>
          <option value="promotion">晋升培训</option>
          <option value="annual">年度复训</option>
          <option value="special">专项培训</option>
          <option value="other">其他</option>
        </select>
        {errors.type && <span className="form-error">{errors.type}</span>}
      </div>
      <div className="form-field form-field--full">
        <label>计划简介 *</label>
        <textarea
          value={formState.basic.description}
          placeholder="说明计划目标、覆盖范围、执行策略等。建议不少于 50 字。"
          rows={4}
          onChange={(event) => handleFieldChange("basic", "description", event.target.value)}
        />
      </div>
      <div className="form-field">
        <label>执行周期类型 *</label>
        <select
          value={formState.basic.cycleType}
          onChange={(event) => handleFieldChange("basic", "cycleType", event.target.value as PlanCycleType)}
        >
          <option value="once">一次性计划</option>
          <option value="annual">年度周期</option>
          <option value="quarterly">季度周期</option>
          <option value="custom">自定义周期</option>
        </select>
      </div>
      <div className="form-field">
        <label>计划开始 *</label>
        <input
          type="date"
          value={formState.basic.startDate}
          onChange={(event) => handleFieldChange("basic", "startDate", event.target.value)}
        />
      </div>
      <div className="form-field">
        <label>计划结束 *</label>
        <input
          type="date"
          value={formState.basic.endDate}
          onChange={(event) => handleFieldChange("basic", "endDate", event.target.value)}
        />
        {errors.period && <span className="form-error">{errors.period}</span>}
      </div>
      {formState.basic.cycleType !== "once" && (
        <>
          <div className="form-field">
            <label>是否自动循环</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.basic.cycleAuto}
                onChange={(event) => handleFieldChange("basic", "cycleAuto", event.target.checked)}
              />
              <span>{formState.basic.cycleAuto ? "已启用自动循环" : "未启用自动循环"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>循环次数</label>
            <input
              type="number"
              min={1}
              value={formState.basic.cycleTimes}
              onChange={(event) => handleFieldChange("basic", "cycleTimes", Number(event.target.value))}
            />
          </div>
        </>
      )}
      <div className="form-field">
        <label>计划负责人 *</label>
        <input
          type="text"
          value={formState.basic.owner}
          placeholder="选择或输入负责人"
          onChange={(event) => handleFieldChange("basic", "owner", event.target.value)}
        />
      </div>
      <div className="form-field form-field--full">
        <label>标签</label>
        <div className="tag-list tag-list--wrap">
          {(["年度计划", "桥梁维护", "重点专项", "复训"] as const).map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag ${formState.basic.tags.includes(tag) ? "tag--active" : ""}`}
              onClick={() => handleFieldChange("basic", "tags", formState.basic.tags.includes(tag)
                ? formState.basic.tags.filter((item) => item !== tag)
                : [...formState.basic.tags, tag])}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderCoursesStep = (
  formState: FormState,
  handleFieldChange: <K extends StepKey, T extends keyof FormState[K]>(step: K, key: T, value: FormState[K][T]) => void,
  handleArrayToggle: (step: StepKey, key: string, value: string) => void,
  errors: Record<string, string>
) => {
  return (
    <div className="form-stack">
      <div className="course-selector">
        <div className="course-selector__list">
          {courseOptions.map((course) => {
            const selected = formState.courses.selected.includes(course.id);
            const required = formState.courses.requiredCourses.includes(course.id);
            return (
              <div key={course.id} className={`course-selector__item ${selected ? "is-selected" : ""}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleArrayToggle("courses", "selected", course.id)}
                  />
                  <div>
                    <strong>{course.title}</strong>
                    <span>{course.type} · {course.duration}</span>
                    <span className="course-selector__meta">{course.roles?.join("、") ?? "适用全部岗位"}</span>
                  </div>
                </label>
                {selected && (
                  <div className="course-selector__actions">
                    <label>
                      <input
                        type="checkbox"
                        checked={required}
                        onChange={() => handleArrayToggle("courses", "requiredCourses", course.id)}
                      />
                      必修
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {errors.courses && <div className="form-error">{errors.courses}</div>}
        {errors.required && <div className="form-error">{errors.required}</div>}
      </div>

      <div className="plan-editor__panel">
        <h4>学习规则</h4>
        <div className="form-grid">
          <div className="form-field">
            <label>选修课程门槛</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.courses.optionalRules.enabled}
                onChange={(event) =>
                  handleFieldChange("courses", "optionalRules", {
                    ...formState.courses.optionalRules,
                    enabled: event.target.checked
                  })
                }
              />
              <span>{formState.courses.optionalRules.enabled ? "要求完成部分选修" : "无需选修课程"}</span>
            </div>
            {formState.courses.optionalRules.enabled && (
              <input
                type="number"
                min={1}
                value={formState.courses.optionalRules.minCount}
                onChange={(event) =>
                  handleFieldChange("courses", "optionalRules", {
                    ...formState.courses.optionalRules,
                    minCount: Number(event.target.value)
                  })
                }
              />
            )}
            {errors.optional && <span className="form-error">{errors.optional}</span>}
          </div>
          <div className="form-field">
            <label>是否要求按照课程顺序学习</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.courses.sequential}
                onChange={(event) => handleFieldChange("courses", "sequential", event.target.checked)}
              />
              <span>{formState.courses.sequential ? "必须按顺序学习" : "允许任意顺序"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>允许沿用历史完成记录</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.courses.allowLegacy}
                onChange={(event) => handleFieldChange("courses", "allowLegacy", event.target.checked)}
              />
              <span>{formState.courses.allowLegacy ? "允许抵扣历史完成课程" : "不允许抵扣"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>课程完成期限（天）</label>
            <input
              type="number"
              min={7}
              value={formState.courses.timeLimitDays}
              onChange={(event) => handleFieldChange("courses", "timeLimitDays", Number(event.target.value))}
            />
          </div>
          <div className="form-field">
            <label>最低观看完成度（%）</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formState.courses.minProgress}
              onChange={(event) => handleFieldChange("courses", "minProgress", Number(event.target.value))}
            />
          </div>
          <div className="form-field">
            <label>章节测验最低分（%）</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formState.courses.minScore}
              onChange={(event) => handleFieldChange("courses", "minScore", Number(event.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const renderCoverageStep = (
  formState: FormState,
  handleFieldChange: <K extends StepKey, T extends keyof FormState[K]>(step: K, key: T, value: FormState[K][T]) => void,
  handleArrayToggle: (step: StepKey, key: string, value: string) => void,
  errors: Record<string, string>
) => {
  return (
    <div className="form-stack">
      <div className="plan-editor__panel">
        <h4>管养单位选择</h4>
        <div className="tag-list tag-list--wrap">
          {Array.from(new Set(unitOptions)).map((unit) => (
            <button
              key={unit}
              type="button"
              className={`tag ${formState.coverage.units.includes(unit) ? "tag--active" : ""}`}
              onClick={() => handleArrayToggle("coverage", "units", unit)}
            >
              {unit}
            </button>
          ))}
        </div>
        {errors.units && <div className="form-error">{errors.units}</div>}
      </div>

      <div className="plan-editor__panel">
        <h4>覆盖岗位/职称</h4>
        <div className="tag-list tag-list--wrap">
          {roleOptions.map((role) => (
            <button
              key={role}
              type="button"
              className={`tag ${formState.coverage.roles.includes(role) ? "tag--active" : ""}`}
              onClick={() => handleArrayToggle("coverage", "roles", role)}
            >
              {role}
            </button>
          ))}
        </div>
        {errors.roles && <div className="form-error">{errors.roles}</div>}
      </div>

      <div className="plan-editor__panel">
        <h4>名单与审核策略</h4>
        <div className="form-grid">
          <div className="form-field">
            <label>是否要求下属单位提交名单审批</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.coverage.requireRosterApproval}
                onChange={(event) => handleFieldChange("coverage", "requireRosterApproval", event.target.checked)}
              />
              <span>{formState.coverage.requireRosterApproval ? "须提交名单并审批" : "无需名单审批"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>是否冻结名单</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.coverage.freezeRoster}
                onChange={(event) => handleFieldChange("coverage", "freezeRoster", event.target.checked)}
              />
              <span>{formState.coverage.freezeRoster ? "名单锁定不可新增" : "允许后续追加"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>学员资料审核后方可开始学习</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.coverage.requireProfileApproval}
                onChange={(event) => handleFieldChange("coverage", "requireProfileApproval", event.target.checked)}
              />
              <span>{formState.coverage.requireProfileApproval ? "需审核通过后开始" : "资料待审也可学习"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderAssessmentStep = (
  formState: FormState,
  handleFieldChange: <K extends StepKey, T extends keyof FormState[K]>(step: K, key: T, value: FormState[K][T]) => void,
  handleArrayToggle: (step: StepKey, key: string, value: string) => void,
  errors: Record<string, string>
) => {
  const examTemplates = GAPlanDetailMock.exams.map((exam) => ({ id: exam.id, name: exam.name }));

  const updateExamField = (index: number, key: keyof FormState["assessment"]["exams"][number], value: unknown) => {
    const next = [...formState.assessment.exams];
    next[index] = {
      ...next[index],
      [key]: value
    } as FormState["assessment"]["exams"][number];
    handleFieldChange("assessment", "exams", next);
  };

  return (
    <div className="form-stack">
      <div className="plan-editor__panel">
        <h4>考试配置</h4>
        <div className="form-field">
          <label>是否需要考试</label>
          <div className="form-toggle">
            <input
              type="checkbox"
              checked={formState.assessment.enableExam}
              onChange={(event) => handleFieldChange("assessment", "enableExam", event.target.checked)}
            />
            <span>{formState.assessment.enableExam ? "需设置考试" : "无需考试"}</span>
          </div>
        </div>
        {formState.assessment.enableExam && (
          <div className="exam-list">
            {formState.assessment.exams.map((exam, index) => (
              <div key={exam.id || index} className="exam-card">
                <div className="form-grid">
                  <div className="form-field">
                    <label>考试名称</label>
                    <input
                      type="text"
                      value={exam.name}
                      onChange={(event) => updateExamField(index, "name", event.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>考试模板</label>
                    <select
                      value={exam.template}
                      onChange={(event) => updateExamField(index, "template", event.target.value)}
                    >
                      <option value="">请选择</option>
                      {examTemplates.map((template) => (
                        <option key={template.id} value={template.name}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>计划时间</label>
                    <input
                      type="datetime-local"
                      value={exam.schedule}
                      onChange={(event) => updateExamField(index, "schedule", event.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>考试时长（分钟）</label>
                    <input
                      type="number"
                      min={30}
                      value={exam.duration}
                      onChange={(event) => updateExamField(index, "duration", Number(event.target.value))}
                    />
                  </div>
                  <div className="form-field">
                    <label>通过分数线</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={exam.passScore}
                      onChange={(event) => updateExamField(index, "passScore", Number(event.target.value))}
                    />
                  </div>
                  <div className="form-field form-field--full">
                    <label>补考策略</label>
                    <input
                      type="text"
                      value={exam.retakePolicy}
                      onChange={(event) => updateExamField(index, "retakePolicy", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="topbar__cta topbar__cta--subtle"
              onClick={() =>
                handleFieldChange("assessment", "exams", [
                  ...formState.assessment.exams,
                  {
                    id: `exam-${Date.now()}`,
                    name: "新建考试",
                    template: "",
                    schedule: "",
                    duration: 90,
                    passScore: 80,
                    retakePolicy: "未通过允许 1 次补考"
                  }
                ])
              }
            >
              + 添加考试
            </button>
            {errors.exams && <div className="form-error">{errors.exams}</div>}
          </div>
        )}
      </div>

      <div className="plan-editor__panel">
        <h4>成绩复核与证书</h4>
        <div className="form-grid">
          <div className="form-field">
            <label>允许成绩复核</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.assessment.enableAppeal}
                onChange={(event) => handleFieldChange("assessment", "enableAppeal", event.target.checked)}
              />
              <span>{formState.assessment.enableAppeal ? "允许提交复核" : "不允许复核"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>复核责任人</label>
            <input
              type="text"
              value={formState.assessment.appealOwner}
              onChange={(event) => handleFieldChange("assessment", "appealOwner", event.target.value)}
            />
          </div>
          <div className="form-field">
            <label>自动发证</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.assessment.certificateAuto}
                onChange={(event) => handleFieldChange("assessment", "certificateAuto", event.target.checked)}
              />
              <span>{formState.assessment.certificateAuto ? "满足条件自动发放" : "需要人工签发"}</span>
            </div>
          </div>
          <div className="form-field">
            <label>证书模板 *</label>
            <input
              type="text"
              value={formState.assessment.certificateTemplate}
              onChange={(event) => handleFieldChange("assessment", "certificateTemplate", event.target.value)}
            />
            {errors.certificate && <span className="form-error">{errors.certificate}</span>}
          </div>
          <div className="form-field form-field--full">
            <label>签发规则</label>
            <textarea
              rows={3}
              value={formState.assessment.certificateRule}
              onChange={(event) => handleFieldChange("assessment", "certificateRule", event.target.value)}
            />
          </div>
          <div className="form-field">
            <label>证书有效期</label>
            <input
              type="text"
              value={formState.assessment.certificateValidity}
              onChange={(event) => handleFieldChange("assessment", "certificateValidity", event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const renderNotificationStep = (
  formState: FormState,
  handleFieldChange: <K extends StepKey, T extends keyof FormState[K]>(step: K, key: T, value: FormState[K][T]) => void,
  handleArrayToggle: (step: StepKey, key: string, value: string) => void,
  errors: Record<string, string>
) => {
  return (
    <div className="form-stack">
      <div className="plan-editor__panel">
        <h4>通知与提醒</h4>
        <div className="tag-list tag-list--wrap">
          {publishChannels.map((channel) => (
            <button
              key={channel}
              type="button"
              className={`tag ${formState.notification.publishChannels.includes(channel) ? "tag--active" : ""}`}
              onClick={() => handleArrayToggle("notification", "publishChannels", channel)}
            >
              {channel}
            </button>
          ))}
        </div>
        {errors.channels && <div className="form-error">{errors.channels}</div>}

        <div className="form-grid">
          <div className="form-field">
            <label>开班前提醒（天）</label>
            <input
              type="number"
              min={0}
              value={formState.notification.remindBeforeDays}
              onChange={(event) => handleFieldChange("notification", "remindBeforeDays", Number(event.target.value))}
            />
          </div>
          <div className="form-field">
            <label>进度滞后阈值（%）</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formState.notification.remindLagThreshold}
              onChange={(event) => handleFieldChange("notification", "remindLagThreshold", Number(event.target.value))}
            />
          </div>
          <div className="form-field">
            <label>启用督办机制</label>
            <div className="form-toggle">
              <input
                type="checkbox"
                checked={formState.notification.escalationEnabled}
                onChange={(event) => handleFieldChange("notification", "escalationEnabled", event.target.checked)}
              />
              <span>{formState.notification.escalationEnabled ? "滞后将自动督办" : "不启用督办"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="plan-editor__panel">
        <h4>审批与发布策略</h4>
        <div className="form-grid">
          <div className="form-field">
            <label>审批流程模板</label>
            <select
              value={formState.notification.approvalFlow}
              onChange={(event) => handleFieldChange("notification", "approvalFlow", event.target.value)}
            >
              <option value="主管单位审批流 A">主管单位审批流 A</option>
              <option value="主管单位审批流 B">主管单位审批流 B</option>
              <option value="自定义审批流">自定义审批流</option>
            </select>
          </div>
          <div className="form-field">
            <label>发布策略</label>
            <select
              value={formState.notification.publishStrategy}
              onChange={(event) => handleFieldChange("notification", "publishStrategy", event.target.value as "immediate" | "scheduled")}
            >
              <option value="immediate">审批通过后立即发布</option>
              <option value="scheduled">到达指定时间发布</option>
            </select>
          </div>
          {formState.notification.publishStrategy === "scheduled" && (
            <div className="form-field">
              <label>计划发布时间 *</label>
              <input
                type="datetime-local"
                value={formState.notification.publishDate}
                onChange={(event) => handleFieldChange("notification", "publishDate", event.target.value)}
              />
              {errors.publishDate && <span className="form-error">{errors.publishDate}</span>}
            </div>
          )}
          <div className="form-field form-field--full">
            <label>提交审批备注</label>
            <textarea
              rows={3}
              value={formState.notification.remark}
              placeholder="说明计划关键亮点、风险点或提交审批的补充信息"
              onChange={(event) => handleFieldChange("notification", "remark", event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="plan-editor__panel">
        <h4>配置摘要</h4>
        <div className="plan-editor__summary">
          <section>
            <strong>基础信息</strong>
            <p>{formState.basic.name || "未命名计划"}</p>
            <p>负责人：{formState.basic.owner || "待指定"}</p>
            <p>
              周期：
              {formState.basic.startDate && formState.basic.endDate
                ? `${formState.basic.startDate} ~ ${formState.basic.endDate}`
                : "未设置"}
            </p>
          </section>
          <section>
            <strong>课程总览</strong>
            <p>共 {formState.courses.selected.length} 门课程，其中必修 {formState.courses.requiredCourses.length} 门。</p>
          </section>
          <section>
            <strong>覆盖范围</strong>
            <p>单位：{formState.coverage.units.length} 个</p>
            <p>岗位：{formState.coverage.roles.join("、") || "待选择"}</p>
          </section>
          <section>
            <strong>考核配置</strong>
            <p>
              {formState.assessment.enableExam
                ? `考试 ${formState.assessment.exams.length} 场，自动发证 ${formState.assessment.certificateAuto ? "是" : "否"}`
                : "无考试"}
            </p>
          </section>
          <section>
            <strong>通知与审批</strong>
            <p>渠道：{formState.notification.publishChannels.join("、") || "待选择"}</p>
            <p>审批流：{formState.notification.approvalFlow}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GAPlanEditorPage;
