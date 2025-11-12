import { NavLink } from "react-router-dom";
import type { PersonaKey } from "../mocks/personas";
import type { NavModule } from "../mocks/navigation";

type SidebarProps = {
  personaKey: PersonaKey;
  persona: {
    name: string;
    description: string;
    highlights: string[];
  };
  modules: NavModule[];
};

const Sidebar = ({ personaKey, persona, modules }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">LP</div>
        <div>
          <h1>学习平台演示</h1>
          <span>角色切换试用版</span>
        </div>
      </div>

      <div className="sidebar__persona">
        <span className="sidebar__persona-tag">{personaKey}</span>
        <h2>{persona.name}</h2>
        <p>{persona.description}</p>
        <ul>
          {persona.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <nav className="sidebar__nav">
        {modules.map((module) => (
          <div key={module.label} className="sidebar__section">
            <div className="sidebar__section-title">{module.label}</div>
            <div className="sidebar__section-items">
              {module.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "sidebar__nav-item",
                      isActive ? "sidebar__nav-item--active" : "",
                      !item.implemented ? "sidebar__nav-item--pending" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  <span
                    className={`sidebar__priority sidebar__priority--${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                  <span className="sidebar__nav-text">
                    <strong>{item.code}</strong> {item.title}
                  </span>
                  {!item.implemented && (
                    <span className="sidebar__nav-tag">待实现</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

