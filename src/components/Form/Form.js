import { useState } from 'react'
import './Form.css'

const Form = ({addTrick}) => {
    const [stance, setStance] = useState('')
    const [name, setName] = useState('')
    const [obstacle, setObstacle] = useState('')
    const [tutorial,setTutorial] = useState('')
    const id = Date.now();

    function submitTrick(event){
        event.preventDefault()
        const newTrick = {
            id,
            name,
            stance,
            obstacle,
            tutorial
        }
            addTrick(newTrick)
            clearInput()
    }

    function clearInput() {
        setName('')
        setObstacle('')
        setStance('')
        setTutorial('')
    }


return (
    <form>
        <select name='stance' value={stance} onChange={event => setStance(event.target.value)} >
            <option value='regular'>regular</option>
            <option value='switch'>Switch</option>
        </select>
        <input 
        name='name'
        type='text' 
        placeholder='name of trick'
        value={name}
        onChange={event => setName(event.target.value)} 
        
        />
        <select name='obstacle' value={obstacle} onChange={event => setObstacle(event.target.value)}>
            <option value='flatground'>flatground</option>
            <option value='rails'>rails</option>
            <option value='pool'>pool</option>
            <option value='ledge'>ledge</option>
            <option value='stairs'>stairs</option>
        </select>
        <input 
        name='tutorial'
        type='text'
        placeholder='link to tutorial'
        value={tutorial}
        onChange={event => setTutorial(event.target.value)}
        />
        <button className='submitbtn' onClick={ (event) => submitTrick(event)}>Submit</button>
        

    </form>

)

}

export default Form