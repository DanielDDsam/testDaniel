import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Question from './Componentes/Question'
import QuestionForm from './Componentes/QuestionForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionForm />} />
          <Route exact path="/questions/:creator" element={<Question />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
