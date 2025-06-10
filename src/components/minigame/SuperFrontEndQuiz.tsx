import React, { useState } from 'react';
import AnimatedParticles from '../AnimatedParticles';
import './SuperFrontEndQuiz.css';

const questions = [
  {
    question: 'O que faz a propriedade CSS flex-direction: column?',
    options: [
      'Organiza os itens em linha',
      'Organiza os itens em coluna',
      'Centraliza os itens',
      'Alinha os itens à direita',
    ],
    answer: 1,
    explanation: 'flex-direction: column organiza os itens do flex container em coluna (de cima para baixo).',
  },
  {
    question: 'Qual o resultado de typeof null em JavaScript?',
    options: [
      'null',
      'object',
      'undefined',
      'boolean',
    ],
    answer: 1,
    explanation: 'Por uma peculiaridade do JavaScript, typeof null retorna "object".',
  },
  {
    question: 'Como criar um componente funcional em React?',
    options: [
      'function MeuComp() { return <div /> }',
      'class MeuComp extends React.Component {}',
      '<MeuComp />',
      'React.createComponent()',
    ],
    answer: 0,
    explanation: 'O jeito mais simples é usando uma função: function MeuComp() { return <div /> }',
  },
  {
    question: 'O que significa SPA?',
    options: [
      'Single Page Application',
      'Simple Page Application',
      'Super Progressive App',
      'Server Page Application',
    ],
    answer: 0,
    explanation: 'SPA significa Single Page Application.',
  },
  {
    question: 'Qual tag HTML é usada para imagens?',
    options: [
      '<img>',
      '<image>',
      '<src>',
      '<pic>',
    ],
    answer: 0,
    explanation: 'A tag correta é <img>.',
  },
];

const SuperFrontEndQuiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].answer) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="minigame-hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedParticles />
      <div className="quiz-container z-10">
        <h2>Super Quiz Front-End 🚀</h2>
        {showResult ? (
          <div className="quiz-result">
            <p>
              Você acertou <b>{score}</b> de <b>{questions.length}</b> perguntas!
            </p>
            <button onClick={handleRestart} className="quiz-btn">Jogar novamente</button>
          </div>
        ) : (
          <div className="quiz-question-block">
            <div className="quiz-question">
              <span>Pergunta {current + 1}:</span> {questions[current].question}
            </div>
            <div className="quiz-options">
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`quiz-btn ${selected !== null ? (idx === questions[current].answer ? 'correct' : idx === selected ? 'wrong' : '') : ''}`}
                  onClick={() => handleOptionClick(idx)}
                  disabled={selected !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className="quiz-explanation">
                {selected === questions[current].answer ? 'Correto!' : 'Errado!'} {questions[current].explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperFrontEndQuiz; 