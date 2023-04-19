import React, { useState, useEffect } from 'react';

import { sendParticipantToFirestore } from './config';
import {
  getQuestions,

  getParticipants,
} from "./config";
import { useLocation } from 'react-router-dom';
import '../Cuestionario.css'

function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [participante, setParticipante] = useState("");
  const [terminado, setTerminado] = useState(false);
  const location = useLocation();
  const creator = (location.pathname.split('/')[2]);
  const [participantsList, setParticipantsList] = useState([]);
  const [participanteCreador, setParticipanteCreador] = useState(false);
  
  const handleSendTest = () => {
    setParticipante(document.getElementById("participante").value);
    setParticipanteCreador(true);
    console.log(participante);
    
  
  }
  const handleTerminado = async () => {
    const questionObj = {
      creator,
      score,
      participante
    };
    
    await sendParticipantToFirestore(questionObj);
    await fetchParticipants();
  };

  const fetchParticipants = async () => {
    const result = await getParticipants(creator);
    setParticipantsList(result.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    fetchParticipants();
  }, [creator, score]);
  useEffect(() => {
    if (currentQuestion === questions.length && questions.length !== 0) {
      handleTerminado();
    } 

  }, [currentQuestion, questions.length]);
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
      {!participanteCreador &&(
      <div className='container-formUser'>
      <h1 className='heroUser'>Ingresa tu nombre de Usuario</h1>
      <div className="form">
      <input type="text" id="participante" class="form__input" autocomplete="off" placeholder=" " />
    <label for="email" class="form__label"> Nombre </label>
      </div>
      <button type="button" style={{margin:"5rem"}} onClick={handleSendTest}>Empezar TEST de {creator}</button >
    </div>
    )}
      {participanteCreador &&(
        <div>
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
        )}
      </div>
    );
  }

  function renderResult() {
    return (
      <div className="container-cuestionario">
        <h2>¡Has terminado!</h2>
        <p>Tu puntuación es {score} de {questions.length}.</p>
        <table>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {participantsList.map((participant) => (
              <tr key={participant.participante}>
                <td>{participant.participante}</td>
                <td>{participant.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
