// React 组件名称的第一个字母必须大写
const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  // JSX 表达式必须具有一个父元素
  // map() 函数将 props.parts 这个数组转换为 <Part /> 标签构成的 JSX 节点数组
  // 使用 {} 包裹 JSX 节点数组，展开并渲染数组中的所有元素
  return (
    <div>
      {props.parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = (props) => {
  // 计算所有练习的总数
  // 利用 reduce() 求 exercises 的总和，累加从 0 开始
  // sum 为累加器
  const total = props.parts.reduce((sum, part) => sum + (part.exercises || 0), 0)
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

function App() {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    </>
  )
}

export default App
