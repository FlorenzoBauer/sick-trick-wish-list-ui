import './Card.css'

const Card = ({id, stance, name, obstacle, tutorial, deleteTrick}) => {

    return (
        <section className='card'>
            <article className='name'>{name}</article>
            <article className='stance'>{stance}</article>
            <article className='obstacle'>{obstacle}</article>
            <article className='tutorial'>{tutorial}</article>
            <button className='deletebtn' onClick={() => deleteTrick(id)}>🗑️</button>
        </section>
    )
}

export default Card;