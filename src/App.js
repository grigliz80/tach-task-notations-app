import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListData, sendListData } from './store/list-actions'
import Header from './components/header/Header'
import Modal from './components/UI/Modal'
import Issue from './components/UI/Issue'
import List from './components/List/List'
import Form from './components/List/Form'
import './App.css'

let initial = true

function App() {

  const dispatch = useDispatch();

  const [ modal, setModal ] = useState(null)

  const { status, btn_dis } = useSelector((st) => st.ui.header)

  const list = useSelector(st => st.list)

  const formItem = useSelector(st => st.list.editingNotation)

  useEffect(() => {
    dispatch(fetchListData())
  }, [dispatch])

  useEffect(() => {
     if(initial){
       initial = false
       return
     }

     if(list.changed){
       dispatch(sendListData(list))
     }

  }, [list, dispatch])

  const onCloseModal = () => {
    setModal(null)
  }

  const onShowModal = (tit, txt, canc, subm) => {
    setModal({
      title: tit,
      message: txt,
      cancel: canc,
      submit: subm   
    })
  }

  return (
    <div className='App'>
      {modal && (
        <Modal>
          <Issue 
            title={modal.title}
            message={modal.message}
            onCancel={modal.cancel}
            onSubmit={modal.submit}
            closeModal={onCloseModal}
          />
        </Modal>
      )}
      <Header status={status} btn_dis={btn_dis}/>
      {status === 'Create New Notation' ? 
        <Form formItem={{
              id: '',
              title: '',
              text: '',
              submit: onShowModal,
              closeModal: onCloseModal
            }}/> :
      status === 'Edit Notation' ? 
        <Form formItem={{
              id: formItem.id,
              title: formItem.title,
              text: formItem.description,
              submit: onShowModal,
              closeModal: onCloseModal
            }}/> : 
      status === 'Notations' ? 
        <List submit={onShowModal} closeModal={onCloseModal}/> : null}
    </div>
  )
}

export default App
