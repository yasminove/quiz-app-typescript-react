import React from 'react'; 
import { Card }  from '@material-ui/core';

export type Question = {
    answers: string[],
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[]
    question: string,
    type: string, 
    callback: (e: React.MouseEvent) => void,
    userAnswer: any
}


const QuestionCard:React.FC<Question> = ({
  answers,
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  question,
  type, 
  callback, 
  userAnswer
}) => {
    // console.log(answers, 'answers');
    // console.log(userAnswer, 'userAnswer');
    
    const correct = userAnswer?.correct; 
    const userClicked = userAnswer?.answer;
    
    return (
      <div>
        <Card
          className='card'
          style={{
            width: '70%',
            backgroundColor: '#eceaea',
            height: '302px',
            marginLeft: '218px',
            marginTop: '25px',
          }}
        >
          <p
            className='question'
            dangerouslySetInnerHTML={{ __html: question }}
          ></p>
          <ul className='answer-list'>
            {answers.map((answer) => (
              <div
                className='list-item-wrapper'
                key={answer}
                style={{ marginTop: '5px' }}
              >
                <li>
                  <button
                    disabled={userAnswer ? true : false}
                    className='answer-btn '
                    onClick={callback}
                    style = {{backgroundColor : correct && userClicked === answer ? 'green' : !correct && userClicked=== answer ? 'red' : ""}}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  ></button>
                </li>
              </div>
            ))}
          </ul>
        </Card>
      </div>
    );
}

export default QuestionCard;