import { useState, useEffect } from 'react'
import useSound from './hooks/useSound'
import useMoodCompile from './hooks/useMoodCompile'
import MoodSelector from './components/MoodSelector'
import QuoteCard from './components/QuoteCard'
import Timer from './components/Timer'
import LikedQuotes from './components/LikedQuotes'
import './App.css'

function App() {
  const {
    mood,
    currentMood,
    currentQuote,
    liked,
    secs,
    newQuote,
    changeMood,
    toggleLike
  } = useMoodCompile()

  const {
    playWhoosh,
    playDing,
    playTick,
    playMotivated,
    playStuck,
    playGrinding,
    playBurnout
  } = useSound()

  const moodSounds = {
    motivated: playMotivated,
    stuck: playStuck,
    grinding: playGrinding,
    burnout: playBurnout
  }

  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [showLiked, setShowLiked] = useState(false)

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      setDate(`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`)
    }
    updateClock()
    const iv = setInterval(updateClock, 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (secs === 15) {
      playDing()
    }
    if (secs <= 5 && secs > 0) {
      playTick()
    }
  }, [secs])

  if (!currentQuote) return null

  return (
    <div className="app">
      <div className="top-row">
        <span className="title">Mood<span className="highlight">Compile</span></span>
        <div className="datetime">
          <div className="time">{time}</div>
          <div className="date">{date}</div>
        </div>
      </div>

      <button className="liked-btn" onClick={() => setShowLiked(true)}>
        ❤️ Liked Quotes
      </button>

      <MoodSelector
        currentMood={mood}
        onMoodChange={(m) => {
          moodSounds[m]()
          changeMood(m)
        }}
      />

      <QuoteCard
        currentMood={currentMood}
        currentQuote={currentQuote}
        liked={liked}
        onNewQuote={() => { playWhoosh(); newQuote() }}
        onLike={() => { playMotivated(); toggleLike() }}
      />

      <Timer secs={secs} />

      {showLiked && <LikedQuotes onClose={() => setShowLiked(false)} />}
    </div>
  )
}

export default App