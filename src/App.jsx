import { useEffect, useState } from 'react';
import { init } from '@twa-dev/sdk';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    tg: '',
    age: '',
    activity: '',
    income: '',
    goal: '',
    understand: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    init(); // ✅ Обновлено
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Обязательно';
    if (!formData.tg.startsWith('@')) newErrors.tg = 'Должно начинаться с @';
    if (!formData.age) newErrors.age = 'Выберите возраст';
    if (!formData.activity.trim()) newErrors.activity = 'Обязательно';
    if (!formData.income) newErrors.income = 'Выберите доход';
    if (!formData.goal.trim()) newErrors.goal = 'Обязательно';
    if (!formData.understand.trim()) newErrors.understand = 'Обязательно';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      // Замените на ваш бэкенд
      const response = await fetch('https://your-backend.com/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        triggerFirework();
      } else {
        alert('Ошибка отправки формы. Попробуйте позже.');
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка сети. Проверьте подключение.');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerFirework = () => {
    const container = document.body;
    for (let i = 0; i < 50; i++) {
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.width = '5px';
      dot.style.height = '5px';
      dot.style.backgroundColor = '#fff';
      dot.style.borderRadius = '50%';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animation = 'firework 1s ease-out forwards';
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes firework {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  };

  if (success) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial', background: '#121212', color: 'white' }}>
        <div style={{ fontSize: '48px', color: '#00FF00' }}>✅</div>
        <h1 style={{ fontSize: '28px', marginTop: '10px' }}>Поздравляю!</h1>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>Запись готова — переходи в канал по кнопке ниже</p>
        <a
          href="https://t.me/your_channel_link"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            margin: '20px auto',
            padding: '15px 30px',
            backgroundColor: '#007BFF',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >
          Перейти в канал с записью
        </a>
        <p style={{ fontSize: '12px', marginTop: '20px', color: '#aaa' }}>
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', background: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#00FFFF', textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
        ЗАБРАТЬ ЗАПИСЬ ЭФИРА
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '14px', color: '#ccc' }}>
        Заполни форму ниже для получения записи эфира
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Имя */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Как тебя зовут? *</label>
          <input
            type="text"
            placeholder="Введи свое имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              background: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px'
            }}
          />
          {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
        </div>

        {/* Telegram */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Твой Telegram *</label>
          <input
            type="text"
            placeholder="@username"
            value={formData.tg}
            onChange={(e) => setFormData({ ...formData, tg: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              background: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px'
            }}
          />
          <p style={{ fontSize: '12px', color: '#aaa', marginTop: '5px' }}>
            На этот аккаунт в личные сообщения будет отправлена запись эфира
          </p>
          {errors.tg && <span style={{ color: 'red', fontSize: '12px' }}>{errors.tg}</span>}
        </div>

        {/* Возраст */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Сколько тебе лет? *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {['До 18', '18-20', '20-22', '22-25', '25+'].map(age => (
              <button
                key={age}
                type="button"
                onClick={() => setFormData({ ...formData, age })}
                style={{
                  padding: '12px',
                  background: formData.age === age ? '#007BFF' : '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                {age}
              </button>
            ))}
          </div>
          {errors.age && <span style={{ color: 'red', fontSize: '12px' }}>{errors.age}</span>}
        </div>

        {/* Деятельность */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Чем ты занимаешься? *</label>
          <textarea
            placeholder="Расскажи о своей деятельности"
            value={formData.activity}
            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              background: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
          {errors.activity && <span style={{ color: 'red', fontSize: '12px' }}>{errors.activity}</span>}
        </div>

        {/* Доход */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Сколько ты зарабатываешь денег в месяц? *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {['Меньше 500$', '500-1000$', '1000-3000$', '3000-5000$', '5000-10000$', '10к+$'].map(income => (
              <button
                key={income}
                type="button"
                onClick={() => setFormData({ ...formData, income })}
                style={{
                  padding: '12px',
                  background: formData.income === income ? '#007BFF' : '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                {income}
              </button>
            ))}
          </div>
          {errors.income && <span style={{ color: 'red', fontSize: '12px' }}>{errors.income}</span>}
        </div>

        {/* Целевой доход */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Сколько хочешь зарабатывать? *</label>
          <input
            type="text"
            placeholder="Введи желаемую сумму"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              background: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px'
            }}
          />
          {errors.goal && <span style={{ color: 'red', fontSize: '12px' }}>{errors.goal}</span>}
        </div>

        {/* Что хочешь понять */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Что ты хочешь для себя понять, получив эфир? *</label>
          <textarea
            placeholder="Опиши что ты хочешь понять"
            value={formData.understand}
            onChange={(e) => setFormData({ ...formData, understand: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              background: '#222',
              border: '1px solid #444',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
          {errors.understand && <span style={{ color: 'red', fontSize: '12px' }}>{errors.understand}</span>}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '15px',
            background: submitting ? '#555' : '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: submitting ? 'not-allowed' : 'pointer',
            marginBottom: '15px'
          }}
        >
          {submitting ? 'Отправка...' : 'Получить запись эфира'}
        </button>

        <p style={{ fontSize: '12px', marginTop: '5px', color: '#aaa', textAlign: 'center' }}>
          Нажимая кнопку "Получить запись эфира", ты соглашаешься с обработкой персональных данных
        </p>
      </form>
    </div>
  );
}

export default App;
