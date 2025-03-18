import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TimelineItem from './components/TimelineItem.jsx';

function App() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/timeline')
      .then(response => setTimeline(response.data))
      .catch(error => console.error('Chyba:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Adam Dodávky</h1>
        <nav>
          <a href="#zakazky">Zakázky</a>
          <a href="#prestavba">Přestavba</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Vítejte na mém projektu</h2>
          <p>Sdílím zde své zakázky s dodávkou a postupnou přestavbu na obytný vůz.</p>
          <a href="#prestavba" className="btn">Zjistit více</a>
        </div>
        <div className="hero-image">
          <img src="/dodavka.jpg" alt="Moje dodávka" />
        </div>
      </section>

      <section id="prestavba">
        <h2>Přestavba dodávky</h2>
        <div className="timeline">
          {timeline.map(item => (
            <TimelineItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;

