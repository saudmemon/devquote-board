import useQuote from './useQuote'
import './App.css'

function App() {
  const { quote, liked, getRandomQuote, handleLike } = useQuote()

  const initials = quote
    ? quote.author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : ''

  return (
    <div className="app">
      <p className="tagline">DevQuote Board</p>
      <h1>Aaj ka motivation</h1>

      {quote && (
        <div className="quote-card">
          <p className="quote-text"key={quote.content}>"{quote.content}"</p>

          <div className="author-row">
            <div className="avatar">{initials}</div>
            <span className="quote-author">{quote.author}</span>
          </div>

          <div className="buttons">
            <button className="btn-new" onClick={getRandomQuote}>
              🔄 New Quote
            </button>
            <button
              className={`btn-like ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {liked ? '❤️' : '🤍'} Like
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App