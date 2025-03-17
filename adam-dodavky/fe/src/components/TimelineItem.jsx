import './TimelineItem.css';

function TimelineItem({ item }) {
  return (
    <div className={`timeline-item ${item._id % 2 === 0 ? 'even' : 'odd'}`}>
      <div className="timeline-date">{item.date}</div>
      <div className="timeline-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.image && <img src={item.image} alt={item.title} />}
      </div>
    </div>
  );
}

export default TimelineItem;

