import { useState, useEffect } from "react"

function App() {
  const [newName, setNewName] = useState('');
  const [list, setList] = useState(['Fabiano', 'Vilela']);

  function handleAddName() {
    setList(state => [...state, newName]);
  }

  function handleClearList() {
    setList(state => []);
  }

  return (
    <>
    <input data-testid="name" value={newName} onChange={e => setNewName(e.target.value)}/>
      <button onClick={() => handleAddName()}>
        Add
      </button>
      <button onClick={() => handleClearList()}>
        Clear
      </button>
      <ul>{list.map(name => <li key={name}>{name}</li>)}</ul>
    </>
  )
}

export default App
