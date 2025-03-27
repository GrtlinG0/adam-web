import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TimelineItem from './components/TimelineItem.jsx';

function App() {
  const [timeline, setTimeline] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    description: '', 
    category: 'Přeprava', 
    categoryOther: '', 
    phone: '', 
    deadline: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/timeline')
      .then(response => setTimeline(response.data))
      .catch(error => console.error('Chyba:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        setShowScrollTop(true);
      } else {
        setIsScrolled(false);
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const firstItem = document.querySelector('.timeline-item');
        if (firstItem) {
          firstItem.classList.add('highlight');
          setTimeout(() => firstItem.classList.remove('highlight'), 2000);
        }
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Odesílaná data:', formData);
    axios.post('http://localhost:3000/api/jobs', formData)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', description: '', category: 'Přeprava', categoryOther: '', phone: '', deadline: '' });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch(error => {
        setError('Chyba při odeslání: ' + (error.response?.data?.message || 'Něco se pokazilo. Zkontrolujte údaje a zkuste znovu.'));
        console.error('Chyba při odeslání:', error);
      });
  };

  return (
    <div className="App">
      <header className={isScrolled ? 'scrolled' : ''}>
        <h1>Adam Dodávky</h1>
        <nav>
          <a href="#zakazky">Zakázky</a>
          <a href="#prestavba">Přestavba</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Vítejte na mém webu!</h2>
          <p>Jmenuji se Adam Kural a momentálně přestavuji svého Citroëna Jumpera L4H2 na obytný vůz, který mi umožní žít nomádský život. Pracuji jako DevOps konzultant, a tento projekt je můj způsob, jak skloubit vášeň pro technologie s touhou po svobodě a cestování. Zde sdílím své zakázky a postup přestavby – pojďte se podívat!</p>
          <button onClick={() => scrollToSection('prestavba')} className="btn">Zjistit více</button>
        </div>
        <div className="hero-image">
          <img src="/dodavka.jpg" alt="Citroën Jumper L4H2" />
        </div>
      </section>

      <section id="zakazky">
        <h2>Zakázky</h2>
        <div className="jobs-form">
          <h3>Poptat službu</h3>
          {submitted ? (
            <p className="success-message">Děkujeme, ozveme se vám!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Vaše jméno" required />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Váš email" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Telefonní číslo (volitelné)" />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Popis zakázky" required />
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="Přeprava">Přeprava</option>
                <option value="Přestavba">Přestavba</option>
                <option value="Jiné">Jiné</option>
              </select>
              {formData.category === 'Jiné' && (
                <input type="text" name="categoryOther" value={formData.categoryOther} onChange={handleInputChange} placeholder="Specifikujte kategorii" />
              )}
              <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} placeholder="Preferovaný termín" />
              <button type="submit" className="btn">Odeslat poptávku</button>
            </form>
          )}
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

      <button className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`} onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}

export default App;