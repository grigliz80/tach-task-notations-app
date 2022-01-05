import cls from './Modal.module.css'

const Modal = (props) => {
    return(
        <div className={cls.modal}>
            {props.children}
        </div>
    )
}

export default Modal