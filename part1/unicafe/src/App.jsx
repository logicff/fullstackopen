import { useState } from 'react'

const Header2 = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={good} /></tr>
        <tr><StatisticLine text="neutral" value={neutral} /></tr>
        <tr><StatisticLine text="bad" value={bad} /></tr>
        <tr><StatisticLine text="all" value={all} /></tr>
        <tr><StatisticLine text="average" value={average} /></tr>
        <tr><StatisticLine text="positive" value={positive + "%"} /></tr>
      </tbody>
    </table>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodAddOne = () => { setGood(good + 1) }
  const neutralAddOne = () => { setNeutral(neutral + 1) }
  const badAddOne = () => { setBad(bad + 1) }

  return (
    <div>
      <Header2 name="give feedback" />
      <Button onClick={goodAddOne} text='good' />
      <Button onClick={neutralAddOne} text='neutral' />
      <Button onClick={badAddOne} text='bad' />
      <Header2 name="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
