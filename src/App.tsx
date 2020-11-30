import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/Questions';
import { fetchQuestions, Difficulty, ALLQuestions } from './API';

import { Button } from '@material-ui/core';


export type AnswerObject = {
  answer: string, 
  correct: boolean, 
  question: string, 
  correct_answer: string
}
const TOTAL_QUESTIONS = 10;

function App() {
  const [ questions, setQuestions ] = useState<ALLQuestions[]>([]);
  const [ loading, setLoading ] = useState(false); 
  const [ number, setNumber ] = useState(0); 
  const [ answers, setAnswer ] = useState<AnswerObject[]>([]);
  const [ gameOver, setGameOver ] = useState(true)
  const [ start, setStart ] = useState(false)
  const [ score, setScore ] = useState(0)
  const startTrivia = async () => {

      console.log('kkk');
      setLoading(true);
      const quizQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setAnswer([])
      console.log(quizQuestions, 'quizQuestions');
      setQuestions(quizQuestions);
      setLoading(false);
      setGameOver(false);
      setNumber(0);
      setStart(true)
      setScore(0)

  };

  console.log(questions, 'questions');
  console.log(number, 'number');

  const checkAnswer = (e: React.MouseEvent) => {
    // console.log(e.target, 'e.target');
    // console.log(e.target, 'e.target');
    console.log(e.currentTarget.innerHTML, 'e.currentTarget.TEXT_NODE');
    const answer = e.currentTarget.innerHTML;
    const correct = questions[number].correct_answer === answer;
    const userAnswer = {
      answer,
      correct,
      question: questions[number].question, 
      correct_answer: questions[number].correct_answer
    }
    setAnswer(prev => [...prev, userAnswer])
    if(correct){
      setScore(prev => prev + 1)
    }
  };

  console.log(answers, 'answers');
  

  const moveToNext = () => {
    if (!gameOver) {
      const next = number + 1;
      if (number === TOTAL_QUESTIONS - 1) {
        setGameOver(true);
      }
      setNumber(next);
    }
  };

  // console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY), 'ddd');
  // console.log(questions[0]?.answers, 'questions.answers3333');
  const next =  number + 1
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 style={{ fontSize: '41px' }}>QUIZ APP</h1>
      </header>

      <Button
        style={{
          padding: '4px',
          marginTop: '42px',
          width: '130px',
          height: '40px',
          backgroundColor: '#1976d2',
          fontSize: '16px',
        }}
        variant='contained'
        color='primary'
        onClick={startTrivia}
      >
        {' '}
        Start
      </Button>
      {!loading && start && !gameOver? (<h6>Question Number: {number + 1}</h6>) : null}
      {!loading && start ? <h6>Score: {score}</h6> : null }
      {!loading && questions[number]?.answers.length > 0 ? (
        <QuestionCard
          answers={questions[number]?.answers}
          category={questions[number]?.category}
          correct_answer={questions[number]?.correct_answer}
          incorrect_answers={questions[number]?.incorrect_answers}
          question={questions[number]?.question}
          type={questions[number]?.type}
          difficulty={Difficulty.EASY}
          callback={checkAnswer}
          userAnswer={answers[number]}
        />
      ) : null}

      {!loading && answers.length === next ? (
        <Button
          style={{
            marginTop: '35px',
            padding: '4px',
            width: '130px',
            height: '40px',
            fontSize: '16px',
            color: '#fff',
          }}
          variant='contained'
          color='secondary'
        
        onClick={moveToNext}
        >
          Next
        </Button>
      ) : null}

    </div>
  );
}

export default App;
