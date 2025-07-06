import { useState } from 'react'
import './App.css'

const Anecdotes = (props) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdote}</p>
      <p>has {props.vote} votes</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const MaxAnecdote = (props) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdote}</p>
      <p>has {props.vote} votes</p>
    </div>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomSelect = () => { setSelected(Math.floor(Math.random() * anecdotes.length)) }
  const voteSelected = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const getTopAnecdote = () => {
    const maxVote = Math.max(...votes)
    const topIndex = votes.indexOf(maxVote)
    return {
      text: anecdotes[topIndex],
      vote: maxVote
    }
  }

  // 与状态变化相关的组件会被重新渲染
  // 由于 getTopAnecdote() 组件和 votes 状态相关，topAnecdote 在每次渲染都会调用 getTopAnecdote() 获取最新值
  const topAnecdote = getTopAnecdote()

  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={voteSelected} text="vote" />
      <Button onClick={randomSelect} text="next anecdote" />
      <MaxAnecdote anecdote={topAnecdote.text} vote={topAnecdote.vote} />
    </div>
  )
}

export default App
