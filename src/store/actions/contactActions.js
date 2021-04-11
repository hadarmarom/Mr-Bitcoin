import contactService from '../../services/contactService'

// Thunk - Action Dispatcher
export function loadContacts(filterBy) {
  console.log('loaded!')
  return async dispatch => {
    const contacts = await contactService.getContacts(filterBy)
    const action = {
      type: 'SET_CONTACTS',
      contacts
    }
    dispatch(action)
  }
}
export function getContactById(contactId) {
  return async dispatch => {
    const contact = await contactService.getContactById(contactId)
    await dispatch({ type: 'SET_CONTACT', contact })
    return contact
  }
}
export function saveContact(contact) {
  return async dispatch => {
    const isAdd = !contact._id
    const updatedContact = await contactService.saveContact(contact)
    if (isAdd) return  dispatch({ type: 'ADD_CONTACT', contact: updatedContact })
    else return dispatch({ type: 'UPDATE_CONTACT', updatedContact })
  }
}
export function setCurrContact(contactId) {
  return async dispatch => {
    const contact = await contactService.getContactById(contactId)
    dispatch({ type: 'SET_CONTACT', contact })
  }
}
export function chargeContact(contactId, chargeAmount) {
  return async (dispatch, getState) => {
    const spendAmount = chargeAmount * 0.5

    const userBalance = getState().userReducer.user.balance
    if (userBalance < spendAmount) return alert('Not enough balance!')

    const updatedContact = await contactService.chargeContact(contactId, chargeAmount)
    dispatch({ type: 'SPEND_BALANCE', spendAmount })
    dispatch({ type: 'SET_CONTACT', contact: updatedContact })
  }
}
export function removeContact(contactId) {
  return async dispatch => {
    await contactService.remove(contactId)
    dispatch({ type: 'REMOVE_CONTACT', contactId })
  }
}