import { useState } from "react"

type ListProps = {
  initialItems: string[]
}

function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(initialItems);

  function handleAddItem() {
    setList(state => [...state, newItem]);
  }

  function handleRemove(item: string) {
    setList(state => state.filter(i => i !== item));
  }

  function handleClearList() {
    setList(state => []);
  }

  return (
    <>
    <input data-testid="item-id" value={newItem} onChange={e => setNewItem(e.target.value)}/>
      <button onClick={() => handleAddItem()}>
        Add
      </button>
      <button onClick={() => handleClearList()}>
        Clear
      </button>
      <ul>
        {list.map(
          item => (
            <li key={item}>
              {item}
              <button onClick={() => handleRemove(item)}>Remove</button>
            </li>
          )
        )
        }
      </ul>
    </>
  )
}

export default List
