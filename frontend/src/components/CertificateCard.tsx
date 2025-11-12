import type { CertificateSummary } from "../mocks/dashboard";

type CertificateCardProps = {
  certificate: CertificateSummary;
};

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  return (
    <div className="certificate-card">
      <div className="certificate-card__header">
        <h4>{certificate.title}</h4>
        <span className="badge badge--soft">自动签发</span>
      </div>
      <div className="certificate-card__stats">
        <div>
          <label>已签发</label>
          <strong>{certificate.issued}</strong>
        </div>
        <div>
          <label>即将到期</label>
          <strong>{certificate.expiresSoon}</strong>
        </div>
      </div>
      <p className="certificate-card__rule">
        签发规则：{certificate.autoIssueRule}
      </p>
      <button className="certificate-card__button">查看证书列表</button>
    </div>
  );
};

export default CertificateCard;

