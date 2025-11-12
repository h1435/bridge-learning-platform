import PageSection from "../components/PageSection";
import CertificateCard from "../components/CertificateCard";
import { CertificateSummaries } from "../mocks/dashboard";
import type { PageProps } from "../App";

const CertificatesPage = ({ personaKey }: PageProps) => {
  const certificates = CertificateSummaries[personaKey] ?? [];

  return (
    <div className="page">
      <PageSection
        title="证书中心"
        description="集中管理证书模板、签发与到期提醒，支持自动化配置。"
        action={
          <button className="topbar__cta topbar__cta--subtle">
            新建证书模板
          </button>
        }
      >
        {certificates.length > 0 ? (
          <div className="certificate-grid">
            {certificates.map((item) => (
              <CertificateCard key={item.id} certificate={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h4>暂无证书数据</h4>
            <p>可以在系统中创建证书模板或查看其他角色示例。</p>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default CertificatesPage;

