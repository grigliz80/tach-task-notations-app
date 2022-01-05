import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/ui-slice'
import { listActions } from '../../store/list-slice'
import Block from '../UI/Block'
import Button from '../UI/Button'
import cls from './ListItem.module.css'

const ListItem = (props) => {
  
    const dispatch = useDispatch()
    
    const [showNav, setShowNav] = useState(false)

    const showNavHandler = () => {
        setShowNav(true)
    }

    const hideNavHandler = () => {
        setShowNav(false)
    }

    const editItemHandler = () => {
        dispatch(listActions.setEditingNotation({
            id: props.item.id,
            title: props.item.title,
            text: props.item.description
        }))
        dispatch(uiActions.setHeader({status: 'Edit Notation', btn_dis: true}))
    }

    const tryDeleteItemHandler = () => {
        const confirmlDeletingFunction = () => {
            props.closeModal()
            dispatch(listActions.removeItemFromList(props.item.id))
            dispatch(uiActions.setHeader({status: 'Notations', btn_dis: false}))
        }
        props.submit(
            'Sure?',
            'Really want to delete?',
            props.closeModal,
            confirmlDeletingFunction)
    }

    return (
        <Block onMouseOver={showNavHandler} onMouseLeave={hideNavHandler}>
            <li className={cls['list-item']}>
                <h2>{props.item.title}</h2>
                <p>{props.item.description}</p>
                <br/>
                <section className={showNav? cls['visible-nav']: cls['invisible-nav']}>
                    <Button className='item-options-edit' onClick={editItemHandler}>Edit</Button>
                    <Button className='item-options-delete' onClick={tryDeleteItemHandler}>Delete</Button>
                </section>
            </li>
        </Block>
    )
}

export default ListItem