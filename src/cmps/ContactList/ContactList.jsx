
import { ContactPreview } from '../ContactPreview';

import './ContactList.scss'

export function ContactList(props) {
    return (
        <div className="contactList">
            <ul>
                {props.contacts.map(c => <ContactPreview key={c._id} onSelectContact={props.onSelectContact} contact={c} />)}
            </ul>
        </div>
    )
}
