import './Tricks.css'
import Card from '../Card/Card'
const Tricks = ({deleteTrick, tricks}) => {

const cards = tricks.map(trick => {
    return (
        <Card 
        stance={trick.stance}
        name={trick.name}
        obstacle={trick.obstacle}
        tutorial={trick.tutorial}
        deleteTrick={deleteTrick}
        id={trick.id}
        key={trick.id}
        
        />
    )
})

    return (
        <section className='tricks-section'>
            {cards}
        </section>
    )
}

export default Tricks