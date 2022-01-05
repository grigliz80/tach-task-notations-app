import cls from './Button.module.css'

const Button = (props) => {

    let clsName

    if(props.disabled) {
        clsName = 'btn-dis'
    }

    if(props.className === 'menu') {
        clsName = 'btn-menu'
    }

    if(props.className === 'confirm') {
        clsName = 'btn-confirm'
    }

    if(props.className === 'cancel') {
        clsName = 'btn-cancel'
    }

    if(props.className === 'item-options-cancel') {
        clsName = 'btn-item-nav-cancel'
    }

    if(props.className === 'item-options-save') {
        clsName = 'btn-item-nav-save'
    }

    if(props.className === 'item-options-edit') {
        clsName = 'btn-item-nav-edit'
    }

    if(props.className === 'item-options-delete') {
        clsName = 'btn-item-nav-delete'
    }

    return <button 
                className={`${cls['btn']} ${cls[clsName]}`} 
                onClick={props.onClick}
                disabled={props.disabled}>{props.children}
            </button>
}
export default Button