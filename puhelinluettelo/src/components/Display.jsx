import Person from './Person'

const Display = ({ persons }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  )
}

export default Display