const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// Lasketaan kaikkien osien harjoitusten yhteismäärä reduce-funktiolla. 
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><b>total of {totalExercises} exercises</b></p>
}

// Komponentti, joka kokoaa kurssin nimen, osat ja harjoitusten yhteismäärän yhteen.
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course