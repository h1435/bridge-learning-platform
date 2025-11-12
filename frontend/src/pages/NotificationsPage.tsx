import PageSection from "../components/PageSection";
import NotificationFeed from "../components/NotificationFeed";
import { NotificationMocks } from "../mocks/notifications";
import type { PageProps } from "../App";

const NotificationsPage = ({ personaKey }: PageProps) => {
  const items = NotificationMocks[personaKey] ?? [];

  return (
    <div className="page">
      <PageSection
        title="通知与提醒"
        description="根据任务类型分类查看系统通知，支持快速标记与追踪。"
        action={
          <button className="topbar__cta topbar__cta--subtle">
            配置提醒策略
          </button>
        }
      >
        {items.length > 0 ? (
          <NotificationFeed items={items} />
        ) : (
          <div className="empty-state">
            <h4>暂无通知</h4>
            <p>当前没有新的提醒，可切换角色查看示例。</p>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default NotificationsPage;

