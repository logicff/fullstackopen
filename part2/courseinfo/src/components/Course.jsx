const Header = (props) => {
    return (
        <h2>{props.courseid}. {props.name}</h2>
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
    return (
        <div>
            {props.parts.map((part) => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + (part.exercises || 0), 0)
    return (
        <p>
            <b>total of exercises {total}</b>
        </p>
    )
}

const Course = (props) => {
    const course = props.course
    return (
        <div>
            <Header courseid={course.id} name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course