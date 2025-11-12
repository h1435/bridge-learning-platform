import type { TimelineEvent } from "../mocks/dashboard";

type TimelineProps = {
  events: TimelineEvent[];
};

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div key={event.id} className="timeline__item">
          <div className="timeline__dot" aria-hidden />
          {index !== events.length - 1 && <div className="timeline__line" />}
          <div className="timeline__content">
            <time>{event.time}</time>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <div className="timeline__persona">
              {event.persona.map((key) => (
                <span key={key}>{key}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;

