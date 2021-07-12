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
  const positive = (good / all * 100).toFixed(2) + '%'
  const avg = ((bad * -1 + good) / all).toFixed(2)

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
  
    </div>
  )
}

export default App