import React from 'react'

const Header = (props) => {
    console.log("Course name")
    console.log(props)
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log("Parts 1-3")
    console.log(props)
    //map metodilla taulukon läpikäynti
    return (
      <div>
          {props.parts.map(part =>
            <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    console.log('part id: ', part.id)
    return(
        <p>{part.name} {part.exercises}</p>
      )
  }
  
  const Total = ({ parts }) => {
    console.log("Total")
    console.log(parts)
    
    // laske summa reduce metodilla
    const result = parts.reduce((sum, { exercises } ) => 
      sum + exercises, 0)
    console.log('total sum', result)
    const totalText = 'Number of exercises: '+ result
    return (
      <div>
        <h4>
          {totalText}
        </h4>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course