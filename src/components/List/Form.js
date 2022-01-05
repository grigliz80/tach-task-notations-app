import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listActions } from '../../store/list-slice'
import { uiActions } from '../../store/ui-slice'
import { v1 as uuidv1 } from 'uuid'
import Block from '../UI/Block'
import Button from '../UI/Button'
import cls from './Form.module.css'


const Form = (props) => {

    const status = useSelector(st => st.ui.header.status)

    const dispatch = useDispatch()

    const { id, title, text, closeModal, submit } = props.formItem

    const [ valid, setValid ] = useState(false)

    const titleRef = useRef()

    const textRef = useRef()

    const inputValidation = (e) => {

        if(titleRef.current.value.trim().length !== 0 &&  textRef.current.value.trim().length !== 0) {
             setValid(true)
        }

        if(titleRef.current.value.trim().length === 0 ||  textRef.current.value.trim().length === 0) {
             setValid(false)
        } 
    }

    const tryCancelEditingHandler = () => {
        const confirmCancelFunction = () => {
            closeModal()
            dispatch(uiActions.setHeader({status: 'Notations', btn_dis: false}))
        }
        submit(
            'Sure?', 
            'Want to cancel this action?',
            closeModal,
            confirmCancelFunction           
        )
    }

    const tryChangeNotationHandler = () => {
        const confirmChangingFunction = () => {
            closeModal()                                
            dispatch(listActions.changeItemInlist({
                id,
                title: titleRef.current.value,
                description: textRef.current.value
            }))
            dispatch(uiActions.setHeader({status: 'Notations', btn_dis: false}))                                
        }
        submit(
            'Sure?',
            'Want to save changes?',
            closeModal,
            confirmChangingFunction
        )
    }

    const tryCancelAddingHandler = () => {
        const confirmCancelingAddingFunction = () => {
            closeModal()
            dispatch(uiActions.setHeader({status: 'Notations', btn_dis: false}))
        }
        submit(
            'Sure?',
            'Want to cancel new Notation?',
            closeModal,
            confirmCancelingAddingFunction
        )
    }

    const tryToaddNotationHandler = () => {
        const confirmAddingFunction = () => {
            closeModal()
            dispatch(listActions.addItemTolist({
                id: uuidv1(),
                title: titleRef.current.value,
                text: textRef.current.value
            }))
            dispatch(uiActions.setHeader({status: 'Notations', btn_dis: false}))
        }
        submit(
            'Sure?',
            'Save new notation?',
            closeModal,
            confirmAddingFunction
        )
    }

    return(
        <div className={cls['bck']}>
            <Block>
                <div className={cls['form']}>
                    <label>
                        Enter Title  <span className={cls.restrictions}> (max 45 characters)</span>
                        <br/><br/>
                        <input 
                            type='text' 
                            maxLength='45'
                            onChange={inputValidation}
                            ref={titleRef}
                            defaultValue={status === 'Edit Notation' ? title : ''}
                        ></input>
                    </label>
                    <label>
                        Enter Description  <span className={cls.restrictions}> (max 300 characters)</span>
                        <br/><br/>
                        <textarea 
                            rows='4' 
                            cols='50'
                            maxLength='300'
                            onChange={inputValidation}
                            ref={textRef}
                            defaultValue={status === 'Edit Notation' ? text : ''}
                        />
                    </label>
                    <br/>
                    <section className={cls['nav']}>
                        <Button
                            className='item-options-cancel'
                            onClick={status === 'Edit Notation' ? tryCancelEditingHandler : tryCancelAddingHandler}
                        >Cancel
                        </Button>
                        <Button
                            className={valid ? 'item-options-save' : null}
                            disabled={!valid}
                            onClick={status === 'Edit Notation' ? tryChangeNotationHandler : tryToaddNotationHandler}
                        >Save
                        </Button>
                    </section>
                </div>
            </Block>
        </div>
    )
}

export default Form