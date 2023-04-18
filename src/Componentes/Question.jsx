import React, { useState, useEffect } from 'react';
import { sendQuestionsToFirestore } from './config';
import { getQuestions } from './config';
import { useLocation } from 'react-router-dom';
import '../Cuestionario.css'

function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const creator = (location.pathname.split('/')[2]);
  

  const getTest = async () => {
    console.log(creator)
    const querySnapshot = await getQuestions(creator);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setQuestions(docs);
  };

  useEffect(() => {
    getTest();
  }, []);

  function handleOptionClick(option) {
    setSelectedOption(option);

    if (option === questions[currentQuestion].answer.slice(0, -1)) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 1000);
  }

  function renderQuestion() {
    const question = questions[currentQuestion];

    return (
      <div className='container-cuestionario'>
        <h2>{question.question}</h2>
        <div>
          {question.options.map((option) => {
            const isCorrect = option === question.answer.slice(0, -1);
            const isSelected = option === selectedOption;

            return (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                style={{
                  backgroundColor: isSelected
                    ? isCorrect
                      ? 'green'
                      : 'red'
                    : 'white',
                  color: isSelected ? 'white' : 'black',
                }}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderResult() {
    return (
      <div className='container-cuestionario'>
        <h2>¡Has terminado!</h2>
        <p>Tu puntuación es {score} de {questions.length}.</p>
      </div>
    );
  }

  return (
    <>
      {currentQuestion === questions.length ? renderResult() : renderQuestion()}
    </>
  );
}

export default Question;
