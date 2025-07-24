# Course Info App

使用 React + Vite

```bash
# npm 7+, in directory "part2"
npm create vite@latest courseinfo -- --template react
cd courseinfo
npm install
npm run dev
```

Note: Only submitted the final results after 2.5

## 2.1: Course information step 6

Let's finish the code for rendering course contents from exercises 1.1 - 1.5. 

Let's change the App component like so:

```jsx
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
```

Define a component responsible for formatting a single course called Course.

The component structure of the application can be, for example, the following:

```text
App
  Course
    Header
    Content
      Part
      Part
      ...
```

Hence, the Course component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

## 2.2: Course information step 7

Show also the sum of the exercises of the course.

## 2.3: Course information step 8

If you haven't done so already, calculate the sum of exercises with the array method reduce.

**Pro tip**: when your code looks as follows:

```jsx
const total = 
  parts.reduce((s, p) => someMagicHere)
```

## 2.4: Course information step 9

Let's extend our application to allow for an arbitrary number of courses:

```jsx
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}
```

## 2.5: Separate module step 10

Declare the Course component as a separate module, which is imported by the App component. You can include all subcomponents of the course in the same module.
