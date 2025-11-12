import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PersonaKey } from "../mocks/personas";
import { Personas } from "../mocks/personas";
import { NavigationByPersona } from "../mocks/navigation";
import { NotificationsMock } from "../mocks/notifications";

type TopBarProps = {
  persona: PersonaKey;
  roles: PersonaKey[];
  onPersonaChange: (key: PersonaKey) => void;
  onLogout: () => void;
};

const roleOptions: Record<PersonaKey, string> = {
  PA: "平台超级管理员",
  GA: "主管单位管理员",
  MA: "管养单位管理员",
  ST: "工程师学员"
};

const TopBar = ({ persona, roles, onPersonaChange, onLogout }: TopBarProps) => {
  const canSwitch = roles.length > 1;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!notificationRef.current) return;
      if (!notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const personaInfo = Personas[persona];
  const initials = personaInfo.name.slice(0, 1) ?? "P";

  const notifications = NotificationsMock[persona] ?? [];
  const unreadCount = notifications.filter((item) => item.unread).length;

  const notificationPath = useMemo(() => {
    const modules = NavigationByPersona[persona] ?? [];
    for (const module of modules) {
      for (const item of module.items) {
        if (item.component === "notifications" && item.implemented) {
          return item.path;
        }
      }
    }
    return "/notifications";
  }, [persona]);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  const handleProfileToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNotificationToggle = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleEnterNotificationCenter = () => {
    setNotificationOpen(false);
    navigate(notificationPath, { replace: false });
  };

  return (
    <header className="topbar">
      <div className="topbar__info">
        <h2>{Personas[persona].name}</h2>
        <p>{Personas[persona].tagline}</p>
      </div>
      <div className="topbar__actions">
        <label className="topbar__switcher">
          <span>当前角色</span>
          <select
            value={persona}
            disabled={!canSwitch}
            onChange={(event) =>
              onPersonaChange(event.target.value as PersonaKey)
            }
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {roleOptions[role]}
              </option>
            ))}
          </select>
        </label>
        <div className="topbar__notifications" ref={notificationRef}>
          <button
            className="topbar__icon-button"
            type="button"
            aria-label="通知中心"
            onClick={handleNotificationToggle}
          >
            <svg
              className="topbar__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 3C9.79086 3 8 4.79086 8 7V8.10557C8 8.62911 7.78929 9.13175 7.41421 9.50683L6.29289 10.6281C5.47929 11.4417 5 12.5212 5 13.6517V15C5 15.5523 5.44772 16 6 16H18C18.5523 16 19 15.5523 19 15V13.6517C19 12.5212 18.5207 11.4417 17.7071 10.6281L16.5858 9.50683C16.2107 9.13175 16 8.62911 16 8.10557V7C16 4.79086 14.2091 3 12 3Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 16L10.2099 17.6394C10.3707 18.877 11.4267 19.8333 12.6724 19.8333C13.918 19.8333 14.9741 18.877 15.1349 17.6394L15.3448 16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="topbar__icon-label">通知</span>
            {unreadCount > 0 ? <span className="topbar__dot" aria-hidden="true" /> : null}
          </button>
          {notificationOpen && (
            <div className="notification-drawer">
              <header className="notification-drawer__header">
                <strong>消息中心</strong>
                <div>
                  <button type="button" className="topbar__cta topbar__cta--link">
                    全部标记已读
                  </button>
                  <button type="button" className="topbar__cta topbar__cta--subtle" onClick={handleEnterNotificationCenter}>
                    进入消息中心
                  </button>
                </div>
              </header>
              <div className="notification-drawer__body">
                <div className="notification-feed">
                  {notifications.length === 0 ? (
                    <div className="notification-feed__empty">
                      <p>最近暂无新的通知</p>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <article
                        key={item.id}
                        className={`notification-feed__item ${item.unread ? "notification-feed__item--unread" : ""}`}
                      >
                        <header>
                          <h4>{item.title}</h4>
                          <time>{item.time}</time>
                        </header>
                        <p>{item.content}</p>
                        <footer>
                          <span className="tag tag--slate">{item.category}</span>
                          {item.link ? (
                            <button
                              type="button"
                              className="topbar__cta topbar__cta--link"
                              onClick={() => {
                                setNotificationOpen(false);
                                navigate(item.link!);
                              }}
                            >
                              前往查看
                            </button>
                          ) : null}
                        </footer>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="topbar__profile" ref={menuRef}>
          <button
            className="topbar__profile-trigger"
            type="button"
            onClick={handleProfileToggle}
          >
            <span className="topbar__avatar" aria-hidden="true">
              {initials}
            </span>
            <div className="topbar__profile-meta">
              <strong>{personaInfo.name}</strong>
              <span>{roleOptions[persona]}</span>
            </div>
          </button>
          {menuOpen && (
            <div className="topbar__dropdown" role="menu">
              <button type="button" role="menuitem">
                个人信息
              </button>
              <button type="button" role="menuitem" onClick={handleLogout}>
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;

