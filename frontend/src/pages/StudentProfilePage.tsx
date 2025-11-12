import PageSection from "../components/PageSection";
import {
  StudentProfile,
  StudentQualifications,
  StudentCareerTimeline,
  StudentAttachments
} from "../mocks/student";

const statusBadge: Record<string, string> = {
  有效: "badge--success",
  即将到期: "badge--warning",
  已过期: "badge--danger",
  待审核: "badge--info",
  已驳回: "badge--slate"
};

const StudentProfilePage = () => {
  const { name, avatar, employeeId, role, level, department, team, skills, contact, reminders } =
    StudentProfile;

  return (
    <div className="page">
      <PageSection
        title="个人资料"
        description="管理个人信息与学习偏好，保持联系方式最新，便于接收提醒。"
        action={
          <button type="button" className="topbar__cta">
            编辑资料
          </button>
        }
      >
        <div className="student-profile">
          <aside className="student-profile__aside">
            <img src={avatar} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
            <div className="tag-list">
              <span className="tag tag--slate">级别：{level}</span>
              <span className="tag tag--blue">工号：{employeeId}</span>
            </div>
            <div className="student-profile__stat">
              <span>所在部门</span>
              <strong>{department}</strong>
            </div>
            <div className="student-profile__stat">
              <span>所属班组</span>
              <strong>{team}</strong>
            </div>
          </aside>

          <section className="student-profile__content">
            <article className="student-profile__card">
              <h4>技能标签</h4>
              <div className="tag-list tag-list--wrap">
                {skills.map((item) => (
                  <span key={item} className="tag tag--green">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="student-profile__card">
              <h4>联系方式</h4>
              <div className="student-profile__info-grid">
                <div>
                  <span>手机号</span>
                  <strong>{contact.phone}</strong>
                </div>
                <div>
                  <span>邮箱</span>
                  <strong>{contact.email}</strong>
                </div>
                <div>
                  <span>微信</span>
                  <strong>{contact.wechat}</strong>
                </div>
              </div>
            </article>

            <article className="student-profile__card">
              <h4>提醒偏好</h4>
              <div className="student-profile__info-grid">
                <div>
                  <span>邮件提醒</span>
                  <strong>{reminders.email ? "开启" : "关闭"}</strong>
                </div>
                <div>
                  <span>短信提醒</span>
                  <strong>{reminders.sms ? "开启" : "关闭"}</strong>
                </div>
                <div>
                  <span>APP 推送</span>
                  <strong>{reminders.app ? "开启" : "关闭"}</strong>
                </div>
                <div>
                  <span>每日提醒时间</span>
                  <strong>{reminders.dailyTime}</strong>
                </div>
              </div>
              <button type="button" className="topbar__cta topbar__cta--link">
                修改提醒设置
              </button>
            </article>

            <article className="student-profile__card">
              <div className="student-profile__card-head">
                <h4>从业资质与证书</h4>
                <button type="button" className="topbar__cta topbar__cta--subtle">
                  新增资质
                </button>
              </div>
              <div className="student-qualifications">
                {StudentQualifications.map((qual) => (
                  <div key={qual.id} className="student-qualification-card">
                    <div className="student-qualification-card__header">
                      <div>
                        <h5>{qual.name}</h5>
                        <span className="student-qualification-card__sub">{qual.level}</span>
                      </div>
                      <span className={`badge ${statusBadge[qual.status]}`}>{qual.status}</span>
                    </div>
                    <div className="student-qualification-card__meta">
                      <span>证书编号：{qual.licenseNo}</span>
                      <span>发证单位：{qual.issuer}</span>
                      <span>
                        获取时间：{qual.obtainedAt === "-" ? "待审核" : qual.obtainedAt} · 有效期至：{qual.expireAt}
                      </span>
                    </div>
                    {qual.remark ? <p className="student-qualification-card__remark">{qual.remark}</p> : null}
                    <div className="student-qualification-card__attachments">
                      {qual.attachments.length === 0 ? (
                        <span className="student-profile__empty">暂未上传附件</span>
                      ) : (
                        qual.attachments.map((file) => (
                          <button key={file.id} type="button" className="topbar__cta topbar__cta--link">
                            {file.name}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="student-profile__card">
              <div className="student-profile__card-head">
                <h4>工作年限与履历</h4>
                <button type="button" className="topbar__cta topbar__cta--subtle">
                  更新履历
                </button>
              </div>
              <div className="student-career">
                {StudentCareerTimeline.map((record) => (
                  <div key={record.id} className="student-career__item">
                    <div className="student-career__time">{record.period}</div>
                    <div className="student-career__body">
                      <strong>{record.organization}</strong>
                      <span>{record.role}</span>
                      {record.description ? <p>{record.description}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="student-profile__card">
              <div className="student-profile__card-head">
                <h4>文件与附件库</h4>
                <button type="button" className="topbar__cta topbar__cta--subtle">
                  上传附件
                </button>
              </div>
              <div className="student-attachments">
                {StudentAttachments.map((file) => (
                  <div key={file.id} className="student-attachment-card">
                    <div>
                      <strong>{file.name}</strong>
                      <span>{file.type}</span>
                    </div>
                    <div>
                      <span>{file.updatedAt}</span>
                      <button type="button" className="topbar__cta topbar__cta--link">
                        下载
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="student-profile__card">
              <div className="student-profile__card-head">
                <h4>安全与账号</h4>
                <button type="button" className="topbar__cta topbar__cta--subtle">
                  修改密码
                </button>
              </div>
              <div className="student-profile__info-grid">
                <div>
                  <span>最近登录</span>
                  <strong>2025-04-10 08:32 · iOS App</strong>
                </div>
                <div>
                  <span>设备信任</span>
                  <strong>已开启</strong>
                </div>
                <div>
                  <span>二次验证</span>
                  <strong>已开启（短信）</strong>
                </div>
                <div>
                  <span>隐私设置</span>
                  <strong>允许在学习榜展示成绩</strong>
                </div>
              </div>
              <div className="student-profile__info-grid">
                <button type="button" className="topbar__cta topbar__cta--ghost">
                  查看登录记录
                </button>
                <button type="button" className="topbar__cta topbar__cta--ghost">
                  管理隐私选项
                </button>
              </div>
            </article>
          </section>
        </div>
      </PageSection>
    </div>
  );
};

export default StudentProfilePage;


