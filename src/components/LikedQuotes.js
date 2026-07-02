function LikedQuotes({ onClose }) {
  const saved = JSON.parse(localStorage.getItem('likedQuotes') || '[]')

  return (
    <div className="liked-overlay">
      <div className="liked-box">
        <div className="liked-header">
          <h2>❤️ Liked Quotes</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {saved.length === 0 ? (
          <p className="no-quotes">Abhi koi liked quote nahi hai!</p>
        ) : (
          saved.map((q, i) => (
            <div key={i} className="liked-card">
              <p className="liked-text">"{q.text}"</p>
              <span className="liked-author">— {q.author}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default LikedQuotes