import PageSection from "../components/PageSection";
import { StudentCertificates } from "../mocks/student";

const statusTag: Record<string, string> = {
  有效: "badge--success",
  即将到期: "badge--warning",
  已过期: "badge--danger"
};

const StudentCertificatesPage = () => {
  const stats = {
    total: StudentCertificates.length,
    valid: StudentCertificates.filter((cert) => cert.status === "有效").length,
    expiring: StudentCertificates.filter((cert) => cert.status === "即将到期").length,
    expired: StudentCertificates.filter((cert) => cert.status === "已过期").length
  };

  return (
    <div className="page">
      <PageSection
        title="我的证书"
        description="查看证书状态与续期需求，完成学习后自主申领新证书。"
        action={
          <button type="button" className="topbar__cta">
            申请续期 / 补考
          </button>
        }
      >
        <div className="student-grid student-grid--summary">
          <div className="student-summary-card">
            <span className="student-summary-card__label">证书总数</span>
            <strong>{stats.total}</strong>
            <span className="student-summary-card__hint">含有效、即将到期及历史证书</span>
          </div>
          <div className="student-summary-card">
            <span className="student-summary-card__label">有效证书</span>
            <strong>{stats.valid}</strong>
            <span className="student-summary-card__hint">继续投入学习保持优势</span>
          </div>
          <div className="student-summary-card">
            <span className="student-summary-card__label">即将到期</span>
            <strong>{stats.expiring}</strong>
            <span className="student-summary-card__hint">建议提前预约续期培训</span>
          </div>
          <div className="student-summary-card">
            <span className="student-summary-card__label">已过期证书</span>
            <strong>{stats.expired}</strong>
            <span className="student-summary-card__hint">可查看历史记录与复训安排</span>
          </div>
        </div>

        <div className="student-certificate-list">
          {StudentCertificates.map((cert) => (
            <article key={cert.id} className="student-certificate-card">
              <div className="student-certificate-card__header">
                <div>
                  <h4>{cert.name}</h4>
                  <span className={statusTag[cert.status]}>{cert.status}</span>
                </div>
                <button type="button" className="topbar__cta topbar__cta--subtle">
                  下载证书
                </button>
              </div>
              <div className="student-certificate-card__meta">
                <span>获取时间：{cert.obtainedAt}</span>
                <span>有效期至：{cert.expireAt}</span>
              </div>
              <div className="student-certificate-card__plan">
                <span>来源计划：{cert.plan}</span>
                {cert.status !== "有效" ? (
                  <button type="button" className="topbar__cta topbar__cta--link">
                    查看续期方案
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
};

export default StudentCertificatesPage;


