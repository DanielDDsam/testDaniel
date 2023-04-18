import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { sendQuestionsToFirestore } from './config';
import { getQuestions } from './config';
import { Link } from 'react-router-dom';
import '../App.css'



function OptionInput({ option, options, setOptions, index }) {
  const defaultQuestions = [  {    question: "¿Cuál es tu género musical favorito?",    options: ["Rock", "Pop", "Hip-hop", "Electrónica"]
  },
  {
    question: "¿Cuál es tu serie favorita?",
    options: ["Game of Thrones", "Friends", "Breaking Bad", "Stranger Things"]
  },
  {
    question: "¿Cuál es tu deporte favorito?",
    options: ["Fútbol", "Baloncesto", "Tenis", "Natación"]
  },
  {
    question: "¿Cuál es tu anime favorito?",
    options: ["Naruto", "Dragon Ball", "Death Note", "One Piece"]
  }
  ]
  const handleOptionChange = (event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleOptionDelete = () => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <div className="option-input">
        <div className="option">
      <input type="text" value={option}  onChange={handleOptionChange} />
      {options.length > 1 && (
        <button className='close' type="button" onClick={() => handleOptionDelete(index)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      )}
    </div>
    </div>
  );
}

function QuestionForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sendTest, setSendTest] = useState(false);
  
const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [answer, setAnswer] = useState('');
  const [testEnviado, setTestEnviado] = useState(false);
  const [testEnviado2, setTestEnviado2] =  useState(() => {
    const storedUser = localStorage.getItem("testEnviado2");
    return storedUser ? JSON.parse(storedUser) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : "";
  });
  const defaultQuestions = [ 
    {
      question: "Si " + user + " fuera un superhéroe, ¿cuál sería su nombre?",
      options: ["Capitán Fantástico", "Hombre Araña", "La Mujer Maravilla", "El Increíble Hulk"]
    },
    {
      question: "¿Qué comida le da energía a " + user + " para empezar el día?",
      options: ["Café y tostadas", "Batido de frutas y yogur", "Huevos revueltos con jamón", "Cereal con leche"]
    },
    {
      question: "Si " + user + " tuviera que elegir un solo objeto para llevar a una isla desierta, ¿cuál sería?",
      options: ["Un cuchillo multiuso", "Un libro interesante", "Un mapa detallado", "Un teléfono satelital"]
    },
    {
      question: "Si " + user + " pudiera aprender un nuevo idioma en un instante, ¿cuál elegiría?",
      options: ["Japonés", "Francés", "Alemán", "Mandarín"]
    },
    {
      question: "¿Cuál sería la mascota ideal para " + user + "?",
      options: ["Un perro", "Un gato ", "Un pez tranquilo y relajante", "Un conejillo de indias "]
    },
  
    {
      question: "¿Cuál sería el trabajo ideal para " + user + " si el dinero no fuera un problema?",
      options: ["Viajero profesional", "Chef de renombre mundial", "Director de cine de culto", "Escritor exitoso"]
    },
    {
      question: "¿En qué ciudad del mundo te gustaría vivir si fueras " + user + "?",
      options: ["Londres, la ciudad de la realeza y el té de las cinco", "Nueva York, la ciudad que nunca duerme", "Sídney, la joya de Australia", "Río de Janeiro, la ciudad del carnaval"]
    },
    {
      question: "¿Cuál sería el súper poder que " + user + " elegiría tener?",
      options: ["Invisibilidad", "Teletransportación", "Controlar el tiempo", "Leer la mente"]
    },
    {
      question: "¿Cuál sería la banda sonora de la vida de " + user + "?",
      options: ["Queen, con su energía y estilo inigualable", "The Beatles, con su música atemporal y letras profundas", "Radiohead, con su sonido experimental y emocional", "Coldplay, con su pop suave y pegajoso"]
    },
];


const colors = ['#FFC40C', '#FFA500', '#FF69B4', '#800080', '#FF4500', '#00CED1','#FFC40C'];
useEffect(() => {
  localStorage.setItem('testEnviado2', testEnviado2);
}, [testEnviado2]);
useEffect(() =>{
  if(user !== ''){
    localStorage.setItem("user", JSON.stringify(user)); // Guardamos el valor de 'user' en el local storage
    setSendTest(true); // Cambiamos el valor de 'sendTest' a true
    setTestEnviado(true); // Cambiamos el valor de 'testEnviado' a true

  
  }
  
  localStorage.setItem("user", JSON.stringify(user));
},[user]);

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
const [randomColors, setRandomColors] = useState([]);
const handleColors = () => {
  
  const newColors = [];
  for (let i = 0; i <= questions.length; i++) {
    newColors.push(getRandomColor());
  }
  setRandomColors(newColors);
};
 
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };
  const handleCrearTest = () => {
    const link = `${window.location.origin}/questions/${user}`;
    console.log(link); // Aquí puedes mostrar el enlace en la pantalla
    setTestEnviado2(true);
  }
  const handleSendTest = () => {
    setUser(document.getElementById("user").value);
    setSendTest(true);
  
  }
  const handleOptionAdd = () => {
    const defaultQuestionIndex = document.getElementById("defaultQuestion").value;
  if (defaultQuestionIndex) {
    const defaultQuestion = defaultQuestions[defaultQuestionIndex];
    setQuestion(defaultQuestion.question);
    setOptions(defaultQuestion.options);
    setAnswer([defaultQuestion.options[0]]);
  } else {
    setOptions(options.concat(""));
    if (options.length === 1) {
      setAnswer(options[0]);
    }
  }

  };
  const updateQuestions = async () => {
    const querySnapshot = await getQuestions(user);
    const questionsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setQuestions(questionsArray);
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getQuestions(user);
      const questionsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsArray);
    };
    fetchQuestions();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const questionObj = {
      question,
      options,
      answer,
      user
    };
    
    // Validar cada campo antes de enviar a la base de datos
    const questionValid = validateField(question);
   
    
    if (questionValid === '' ) {
      setFormSubmitted(false)
      sendQuestionsToFirestore(questionObj);
      setQuestion('');
      setOptions(['', '']);
      setAnswer('');
      updateQuestions();
    } else {
      setFormSubmitted(true)
      // Mostrar un mensaje de error o advertencia al usuario
      console.log('Por favor, complete todos los campos.');
    }
  };
  const validateField = (value) => {
    if (value.trim() === '') {
      
      return 'error';
    } else {
      return '';
    }
  }
  
  return (
    <div class="container">
      {(testEnviado  && testEnviado2) &&(
        <div className='container-formTerminado'> 
          <h1>Test enviado</h1>
          <p>Gracias por participar en el test comparte este enlace con tus amigos!!!</p>
          <a href={`${window.location.origin}/questions/${user}`}>
      {`${window.location.origin}/questions/${user}`}
    </a>
        </div>
        
      )}
      {(!sendTest &&  !testEnviado) &&(
      <div className='container-formUser'>
      <h1 className='heroUser'>Ingresa tu nombre de Usuario</h1>
      <div className="form">
      <input type="text" id="user" class="form__input" autocomplete="off" placeholder=" " />
    <label for="email" class="form__label"> Nombre </label>
      </div>
      <button type="button"  onClick={handleSendTest} style={{margin:"5rem"}}>Crear Test</button >
    </div>
    )}
    {(sendTest && !testEnviado2)  &&(  
      <div className='form-container'>
    <form  onSubmit={handleSubmit}>
    <div class="form-container">
    <label  htmlFor="sugerencia">Sugerencias:</label>
    <select id="defaultQuestion" className='defaultQuestion' onChange={handleOptionAdd}>
    <option  value="">Selecciona una pregunta</option>
    {defaultQuestions.map((question, index) => (
      <option key={index } value={index}>{question.question}</option>
    ))}
  </select>

      <div>
        <label  htmlFor="question">Pregunta:</label>
        <input className={`questionsInput ${validateField(question)}`} type="text" id="question" placeholder={defaultQuestions[0].question} value={question} onChange={handleQuestionChange} />

      </div>
      <div>
  <label htmlFor="options">Opciones:</label>
  {options.map((option, index) => (
    <OptionInput
      key={index}
      option={option}
      options={options}
      setOptions={setOptions}
      index={index}
    />
  ))}
  
</div>
<div>
        <label htmlFor="answer">Respuesta:</label>
        <select id="answer" value={answer} onChange={handleAnswerChange}>
          <option value="">Selecciona una respuesta</option >
          {options.map((option, index) => (
            <option key={index + 1} value={option + 1}>{option}</option>
          ))}
        </select>
        <button onClick={handleColors} type="submit">Guardar pregunta</button>
      </div>
     
      {formSubmitted && question.trim() === '' && <p className="error-message">Debes ingresar una pregunta</p>}

      
      </div>
    </form>
    <button className='button-sendTest'  type='none' onClick={handleCrearTest}>CREAR TEST</button>
    </div>
    )}
    {sendTest &&(
    <div className="card-container">
  {questions.map((question, k) => (
    <div key={question.id} className="card" style={{ backgroundColor: randomColors[k] }}>
      <h2>{question.question}</h2>
      <p>Respuesta: {question.answer.slice(0, -1)}</p>
    </div>
  ))}
</div>
) }
  </div>
  );
}

export default QuestionForm;
