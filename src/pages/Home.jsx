import BossOf from '../components/BossOf'
import { ways } from '../data'

export default function Home() {
  return (
    <section>
      
      <h3 style={{
  fontFamily: "'Dancing Script', cursive",
  fontSize: '1.8rem',
  color: '#4a3b4e',
  letterSpacing: '1px',
  margin: 0
}}>
  Добро пожаловать в Мир сказок!
</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {ways.map((item, index) => (
          <BossOf key={index} title={item.title} description={item.description} />
        ))}
      </ul>
    </section>
  )
}
