import { useState } from "react";
import type { FormEvent } from "react";
type LoginPageProps = {
  onLogin: (username: string, password: string) => void;
  errorMessage?: string;
};

const LoginPage = ({ onLogin, errorMessage }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("请输入用户名和密码");
      return;
    }
    setError("");
    // 记住我仅作为演示，后续接入真实逻辑
    if (!rememberMe) {
      // eslint-disable-next-line no-console
      console.info("未勾选记住我，将仅保留当前会话。");
    }
    onLogin(username, password);
  };

  const handleSsoLogin = () => {
    setError("");
    // eslint-disable-next-line no-alert
    alert("单点登录示意：将跳转桥梁管理系统进行认证。");
  };

  return (
    <div className="login-page">
      <div className="login-page__aside">
        <div className="login-page__brand">
          <span className="login-page__badge">BridgeCare LMS</span>
          <h1>桥梁养护工程师在线教育平台</h1>
          <p>
            面向主管单位与管养单位，为工程师提供集课程学习、考试监考、证书发放、监管报送为一体的在线学习解决方案。
          </p>
          <div className="login-page__feature-grid">
            <div>
              <h3>课程计划闭环</h3>
              <p>按岗位能力模型自动匹配课程与考试，实时掌握培训进度。</p>
            </div>
            <div>
              <h3>远程考试监管</h3>
              <p>在线考试与远程监考联动，异常自动记录，支持复审。</p>
            </div>
            <div>
              <h3>证书自动签发</h3>
              <p>证书发放、到期提醒、政府报送一体化，轻松应对审计。</p>
            </div>
          </div>
        </div>
      </div>
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-card__header">
          <span>欢迎回来</span>
          <h2>登录系统</h2>
          <p>使用单位发放的账号或桥梁管理系统账号进入平台。</p>
        </div>

        <label className="login-card__field">
          <span>用户名</span>
          <input
            autoFocus
            type="text"
            placeholder="手机号 / 邮箱 / 账号"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

        <label className="login-card__field">
          <span>密码</span>
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <div className="login-card__options">
          <label className="login-card__checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>记住我</span>
          </label>
          <button
            className="login-card__link"
            type="button"
            onClick={() => alert("请联系平台管理员重置密码。")}
          >
            忘记密码？
          </button>
        </div>

        {error && <div className="login-card__error">{error}</div>}
        {!error && errorMessage && (
          <div className="login-card__error">{errorMessage}</div>
        )}

        <button className="login-card__submit" type="submit">
          登录
        </button>

        <div className="login-card__divider">
          <span>或</span>
        </div>

        <button className="login-card__sso" type="button" onClick={handleSsoLogin}>
          使用桥梁管理系统账号登录
        </button>

        <div className="login-card__tips">
          <strong>演示账号示例</strong>
          <ul>
            <li><code>admin</code>：平台超级管理员</li>
            <li><code>bureau</code>：主管单位管理员</li>
            <li><code>operator</code>：管养单位管理员</li>
            <li><code>engineer</code>：工程师学员</li>
            <li><code>multi</code>：主管 + 管养双角色</li>
          </ul>
        </div>
        <p className="login-card__footnote">
          遇到问题？请联系平台管理员或拨打 400-123-4567 获取支持。
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

