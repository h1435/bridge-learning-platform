type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  tag?: string;
};

type NotificationFeedProps = {
  items: NotificationItem[];
};

const NotificationFeed = ({ items }: NotificationFeedProps) => {
  return (
    <div className="notification-feed">
      {items.map((item) => (
        <article key={item.id} className="notification-feed__item">
          <header>
            <h4>{item.title}</h4>
            <time>{item.time}</time>
          </header>
          <p>{item.description}</p>
          {item.tag && <span className="badge badge--soft">{item.tag}</span>}
        </article>
      ))}
    </div>
  );
};

export type { NotificationItem };
export default NotificationFeed;

