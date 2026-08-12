const Person = ({ person }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      {person.name} {person.number}
    </div>
  )
}

export default Person