import { useState, useEffect } from 'react'

const quotes = [
  { content: "Code is poetry.", author: "Someone Smart" },
  { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { content: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { content: "Fix the cause, not the symptom.", author: "Steve Maguire" },
]

function useQuote() {
  const [quote, setQuote] = useState(null)
  const [liked, setLiked] = useState(false)

  const getRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(random)
    setLiked(false)
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

 const handleLike = () => {
  const saved = JSON.parse(localStorage.getItem('likedQuotes') || '[]')

  if (!liked) {
    // Like karna hai → array mein add karo
    saved.push(quote)
    localStorage.setItem('likedQuotes', JSON.stringify(saved))
    setLiked(true)
  } else {
    // Dislike karna hai → array se nikalo
    const filtered = saved.filter(q => q.content !== quote.content)
    localStorage.setItem('likedQuotes', JSON.stringify(filtered))
    setLiked(false)
  }
}

  return { quote, liked, getRandomQuote, handleLike }
}

export default useQuote