import type { PersonaKey } from "../mocks/personas";
import { Personas } from "../mocks/personas";

type RoleSelectPageProps = {
  roles: PersonaKey[];
  onSelect: (role: PersonaKey) => void;
  onBack: () => void;
};

const roleDescriptions: Record<PersonaKey, string> = {
  PA: "配置租户、管理平台资源与运维状态，支撑各地上线与运营。",
  GA: "制定培训计划、审核资料、监管进度与证书合规性。",
  MA: "执行主管单位计划，督促学员学习与考试，并反馈执行情况。",
  ST: "完成岗位学习任务、参加考试并管理个人证书。"
};

const RoleSelectPage = ({ roles, onSelect, onBack }: RoleSelectPageProps) => {
  return (
    <div className="role-select">
      <div className="role-select__overlay" />
      <div className="role-select__panel">
        <header className="role-select__header">
          <span>选择角色</span>
          <h2>请选择要进入的角色空间</h2>
          <p>一个账号可以对应多个角色，切换角色后系统会呈现对应的功能和数据。</p>
        </header>

        <div className="role-select__grid">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              className="role-select__card"
              onClick={() => onSelect(role)}
            >
              <span className="role-select__code">{role}</span>
              <h3>{Personas[role].name}</h3>
              <p>{roleDescriptions[role]}</p>
            </button>
          ))}
        </div>

        <div className="role-select__footer">
          <button type="button" onClick={onBack} className="role-select__logout">
            退出登录
          </button>
          <p>
            也可以登录后在右上角使用「当前角色」下拉随时切换。
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectPage;

