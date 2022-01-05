import Block from './Block'
import Button from './Button'
import cls from './Issue.module.css'

const Issue = (props) => {

    const { title, message, onCancel, onSubmit } = props

    return(
        <Block>
            <section>
                <h2>{title}</h2>
                <p>{message}</p>
            </section>
            <div className={cls['mini-nav']}>                                
                                <Button 
                                    className='cancel'
                                    onClick={onCancel}
                                >
                                    NO
                                </Button>               
                                <Button 
                                    className='confirm'
                                    onClick={onSubmit}
                                >
                                    YES
                                </Button>               
            </div>
        </Block>
    )
}

export default Issue


