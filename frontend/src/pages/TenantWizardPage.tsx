import { useMemo, useState } from "react";
import PageSection from "../components/PageSection";
import { TenantPackages } from "../mocks/tenants";

type WizardStep = {
  id: "basic" | "package" | "branding" | "admin" | "confirm";
  title: string;
  description: string;
};

const steps: WizardStep[] = [
  {
    id: "basic",
    title: "基础信息",
    description: "填写租户名称、行业、地区等基础资料。"
  },
  {
    id: "package",
    title: "套餐与功能",
    description: "选择套餐版本、并发、存储等配额配置。"
  },
  {
    id: "branding",
    title: "品牌与域名",
    description: "设置登录页品牌、主题色与独立域名。"
  },
  {
    id: "admin",
    title: "管理员账号",
    description: "为租户创建首位管理员账号，可后续增加。"
  },
  {
    id: "confirm",
    title: "确认信息",
    description: "核对配置信息并提交开通申请。"
  }
];

type BasicInfo = {
  name: string;
  industry: string;
  region: string;
  description: string;
};

type AdminInfo = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const TenantWizardPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: "",
    industry: "",
    region: "",
    description: ""
  });
  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    name: "",
    phone: "",
    email: "",
    password: "AutoGenerate"
  });

  const step = steps[currentStep];

  const stepPercent = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep]
  );

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (step.id === "basic") {
      if (!basicInfo.name.trim() || !basicInfo.industry.trim() || !basicInfo.region.trim()) {
        window.alert("请填写完整的租户名称、所属行业和所在地区后再继续。");
        return;
      }
    }

    if (step.id === "admin") {
      if (!adminInfo.name.trim() || !adminInfo.phone.trim() || !adminInfo.email.trim()) {
        window.alert("请完善管理员姓名、手机号和邮箱信息。");
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <div className="page tenant-wizard">
      <PageSection
        title="新建租户向导"
        description="按照向导依次完成基础信息、套餐配置、品牌与域名、管理员等配置，系统将自动初始化租户。"
      >
        <div className="wizard-header">
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
          <div className="wizard-progress">
            <span>{stepPercent}%</span>
            <div className="wizard-progress__bar">
              <div
                className="wizard-progress__fill"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
            <span>
              步骤 {currentStep + 1} / {steps.length}
            </span>
          </div>
        </div>

        <div className="wizard-grid">
          <aside className="wizard-steps">
            {steps.map((item, index) => {
              const isActive = index === currentStep;
              const isDone = index < currentStep;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`wizard-step ${isActive ? "wizard-step--active" : ""} ${isDone ? "wizard-step--done" : ""}`}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className="wizard-step__index">{index + 1}</span>
                  <div className="wizard-step__meta">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </div>
                </button>
              );
            })}
          </aside>

          <div className="wizard-form">
            <div>
              {step.id === "basic" && (
                <StepBasic value={basicInfo} onChange={setBasicInfo} />
              )}
              {step.id === "package" && <StepPackage />}
              {step.id === "branding" && <StepBranding />}
              {step.id === "admin" && (
                <StepAdmins value={adminInfo} onChange={setAdminInfo} />
              )}
              {step.id === "confirm" && <StepConfirm />}
            </div>

            <div className="wizard-actions">
              <button
                type="button"
                className="topbar__cta topbar__cta--subtle"
                disabled={currentStep === 0}
                onClick={handlePrev}
              >
                上一步
              </button>
              {currentStep < steps.length - 1 ? (
                <button type="button" className="topbar__cta" onClick={handleNext}>
                  下一步
                </button>
              ) : (
                <button type="button" className="topbar__cta">
                  完成创建
                </button>
              )}
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

type StepBasicProps = {
  value: BasicInfo;
  onChange: (value: BasicInfo) => void;
};

const StepBasic = ({ value, onChange }: StepBasicProps) => (
  <div className="wizard-field-stack">
    <div className="wizard-field">
      <label>
        租户名称
        <span className="wizard-required">*</span>
      </label>
      <input
        placeholder="请输入单位全称，如：贵州省公路局"
        value={value.name}
        onChange={(event) => onChange({ ...value, name: event.target.value })}
      />
    </div>
    <div className="wizard-field-grid">
      <div className="wizard-field">
        <label>
          所属行业
          <span className="wizard-required">*</span>
        </label>
        <input
          placeholder="例如：交通运输"
          value={value.industry}
          onChange={(event) => onChange({ ...value, industry: event.target.value })}
        />
      </div>
      <div className="wizard-field">
        <label>
          地区
          <span className="wizard-required">*</span>
        </label>
        <input
          placeholder="请选择省/市"
          value={value.region}
          onChange={(event) => onChange({ ...value, region: event.target.value })}
        />
      </div>
    </div>
    <div className="wizard-field">
      <label>单位简介</label>
      <textarea
        rows={4}
        placeholder="补充单位简介，用于平台展示"
        value={value.description}
        onChange={(event) => onChange({ ...value, description: event.target.value })}
      />
    </div>
  </div>
);

const StepPackage = () => (
  <div className="wizard-field-stack">
    <div className="wizard-field">
      <label>套餐版本</label>
      <select defaultValue="旗舰版">
        {TenantPackages.map((pkg) => (
          <option key={pkg} value={pkg}>
            {pkg}
          </option>
        ))}
      </select>
    </div>
    <div className="wizard-field-grid">
      <div className="wizard-field">
        <label>最大用户数</label>
        <input type="number" defaultValue={2000} />
      </div>
      <div className="wizard-field">
        <label>存储配额 (GB)</label>
        <input type="number" defaultValue={500} />
      </div>
    </div>
    <div className="wizard-field">
      <label>功能模块</label>
      <div className="wizard-checkbox-grid">
        {["在线学习", "考试监考", "证书签发", "API 接口", "报表中心"].map((item) => (
          <label key={item}>
            <input type="checkbox" defaultChecked />
            {item}
          </label>
        ))}
      </div>
    </div>
  </div>
);

const StepBranding = () => (
  <div className="wizard-field-stack">
    <div className="wizard-field-grid">
      <div className="wizard-field">
        <label>默认登录域名</label>
        <input defaultValue="tenant.bridgecare.cn" />
      </div>
      <div className="wizard-field">
        <label>自定义域名</label>
        <input placeholder="可选，如 training.xxx.com" />
      </div>
    </div>
    <div className="wizard-field">
      <label>LOGO 上传</label>
      <div className="wizard-upload">
        <button type="button">上传 LOGO</button>
        <span>建议尺寸 240x240，PNG/SVG，2MB 内</span>
      </div>
    </div>
    <div className="wizard-field">
      <label>主题色</label>
      <input type="color" defaultValue="#0ea5e9" />
    </div>
  </div>
);

type StepAdminsProps = {
  value: AdminInfo;
  onChange: (value: AdminInfo) => void;
};

const StepAdmins = ({ value, onChange }: StepAdminsProps) => (
  <div className="wizard-field-stack">
    <div className="wizard-field-grid">
      <div className="wizard-field">
        <label>
          管理员姓名
          <span className="wizard-required">*</span>
        </label>
        <input
          placeholder="请输入账号负责人姓名"
          value={value.name}
          onChange={(event) => onChange({ ...value, name: event.target.value })}
        />
      </div>
      <div className="wizard-field">
        <label>
          手机号
          <span className="wizard-required">*</span>
        </label>
        <input
          placeholder="用于登录及短信提醒"
          value={value.phone}
          onChange={(event) => onChange({ ...value, phone: event.target.value })}
        />
      </div>
    </div>
    <div className="wizard-field-grid">
      <div className="wizard-field">
        <label>
          邮箱
          <span className="wizard-required">*</span>
        </label>
        <input
          placeholder="用于接收通知及重置密码"
          value={value.email}
          onChange={(event) => onChange({ ...value, email: event.target.value })}
        />
      </div>
      <div className="wizard-field">
        <label>初始密码</label>
        <input value={value.password} readOnly />
      </div>
    </div>
    <div className="wizard-hint">
      系统将自动向管理员发送开通邮件和短信，提示首次登录重置密码。
    </div>
  </div>
);

const StepConfirm = () => (
  <div className="wizard-confirm">
    <h3>确认信息</h3>
    <p>请在提交前确认上述信息，提交后系统将自动创建租户并通知管理员。</p>
    <ul>
      <li>租户开通预计耗时 1-3 分钟。</li>
      <li>如需导入历史数据，可在开通完成后使用导入工具。</li>
      <li>品牌信息及域名配置可在租户后台内继续修改。</li>
    </ul>
  </div>
);

export default TenantWizardPage;
