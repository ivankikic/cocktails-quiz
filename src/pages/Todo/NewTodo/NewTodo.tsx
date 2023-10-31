import {useState} from 'react'
import db from '../../../server/firebase'
import { collection, addDoc } from "firebase/firestore";

const NewTodo = () => {
    const [title, setTitle] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submit')
        e.preventDefault()
        if (title !== '') {
            await addDoc(collection(db, "todos"), {
                title: title,
                completed: false
            });
            setTitle('')
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder='Add new todo'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        <button>Submit</button>
        </form>
    </>
  )
}

export default NewTodo