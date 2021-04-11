
import { Link } from 'react-router-dom'
import './ContactPreview.scss'

export function ContactPreview(props) {

    const selectContact = (id) => {
        props.onSelectContact(id)
    }

    return (
        <Link className="link" to={'/contact/' + props.contact._id}>
            <li className="contact-preview-li" onClick={() => selectContact(props.contact._id)}>
                <p>{props.contact.name}</p>
                <img src={`https://robohash.org/${props.contact._id}`} />
            </li>
        </Link>
    )
}

