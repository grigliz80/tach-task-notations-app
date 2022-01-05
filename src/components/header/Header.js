import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/ui-slice'
import Button from '../UI/Button'
import cls from './Header.module.css'

const Header = (props) => {
    
    const dispatch = useDispatch()
    const addNotationMenuHandler = () => {
        dispatch(uiActions.setHeader({status: 'Create New Notation', btn_dis: true}))
    }

    return (
        <header className={cls.header}>
            <h1>{props.status}</h1>
            <nav>
                <Button
                    disabled={props.btn_dis} 
                    className={!props.btn_dis && 'menu'}
                    onClick={addNotationMenuHandler}
                >
                   Add New
                </Button>
            </nav>
        </header>
    )
}

export default Header