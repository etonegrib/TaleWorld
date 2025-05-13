export default function About() {
    return (
      <div
        style={{
          padding: "2rem",
          background: "url('/parchment-bg.jpg') repeat",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          fontFamily: "'Titillium Web', sans-serif",
          color: "#4b2e2e",
          maxWidth: "900px",
          margin: "2rem auto"
        }}
      >
        <h1
          style={{
            fontFamily: "'UnifrakturCook', cursive",
            fontSize: "2.8rem",
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#6b3e9c"
          }}
        >
           О нас
        </h1>
  
        <p
          style={{
            fontSize: "1.3rem",
            lineHeight: "1.8",
            backgroundColor: "rgba(255,255,255,0.75)",
            padding: "1.5rem",
            borderRadius: "12px"
          }}
        >
          Добро пожаловать на наш сказочный портал! ✨
          <br /><br />
          Этот сайт создан для любителей волшебных историй. Здесь вы найдете русские народные сказки и другие интересные истории, оформленные в волшебном стиле.
          <br /><br />
          🔍 <strong>Функции сайта:</strong><br />
          • Поиск сказок по названию<br />
          • Добавление сказок в избранное<br />
          • Адаптивный дизайн для всех устройств<br />
          • Кэширование избранного для быстрой загрузки
          <br /><br />
          👤 <strong>Разработчик:</strong><br />
          Мартынюк Владимир<br />
          📧 Почта: <a href="mailto:vantirait@gmail.com" style={{ color: "#4b2e83" }}>Нажмите сюда!</a><br />
          💼 GitHub: <a href="https://github.com/wollmad" target="_blank" rel="noreferrer" style={{ color: "#4b2e83" }}>wollmad</a>
          <br /><br />
          Спасибо, что заглянули. Пусть сказка всегда будет с вами! 📚✨
        </p>
      </div>
    );
  }
  