import React, { useState } from 'react'

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const StatLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  const positive = good / all * 100 + '%'
  const avg = (bad * -1 + good) / all

  if(all < 1){
    return (
      <tbody>
      <StatLine text='No feedback given' />
      </tbody>
    )
  }
  return (
        <tbody>
          <StatLine text='good' value={good}/>
          <StatLine text='neutral' value={neutral}/>
          <StatLine text='bad' value={bad}/>
          <StatLine text='all' value={all}/>
          <StatLine text='average' value={avg}/>
          <StatLine text='positive' value={positive}/>
        </tbody>
  )
}

const Anecdote = (props) => {
  const num = props.selected
  return (
    <div>
      <p>{props.anecdotes[num]}</p>
    </div>
  )
}

const MostPopular = (props) => {
    const copy = props.points
    
  
    let greatest = 0;
    let indexOfGreatest = 0;
    for (var i = 0; i < copy.length; i++){
      if (!greatest || copy[i] > greatest){
        greatest = copy[i]
        indexOfGreatest = i;
      }
    }
    console.log('index of biggest number in array', indexOfGreatest)
  return (
    <p>{props.anecdotes[indexOfGreatest]}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // FEEDBACK
  const goodButton = () => {
    setGood(good + 1)
    console.log('good clicked', good)
  }
  
  const neutralButton = () => {
    setNeutral(neutral + 1)
    console.log('neutral clicked', neutral)
  }
  
  const badButton = () => {
    setBad(bad + 1)
    console.log('bad clicked', bad)
  }
//--------------------------------------------------
// ANECDOTE
  const randomAnecdote = () => {
    const num = Math.floor(Math.random() * anecdotes.length)
    console.log('random number', num)
    setSelected(num)
  }

  const handleVote = () => {
    const copy = [ ...points ]
    copy[selected] += 1
    setPoints(copy)
    console.log('votes', copy[selected])
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(7).fill(0))
  console.log(points)
//------------------------------------------------

  return (
    <div>
      <div>
        <Header text='Give feedback' />
        <Button 
          handleClick={goodButton} 
          text='good' />
        <Button 
          handleClick={neutralButton} 
          text='neutral' />
        <Button 
          handleClick={badButton} 
          text='bad' />
      </div>
      <Header text='Statistics' />
    <table>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} />
    </table>
  
    <br/>
    <Button handleClick={randomAnecdote} text='Anecdote'/>
    <Button handleClick={handleVote} text='Vote' />
    <br/>
    <Header text='Anecdotes' />
    <Anecdote anecdotes={anecdotes} selected={selected} />
    <Header text='Most popular anecdote' />
    <MostPopular anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App