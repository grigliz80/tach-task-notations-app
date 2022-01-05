import cls from './Block.module.css'

const Block = (props) => {
  return (
    <section className={cls.block} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
        {props.children}
    </section>
  )
}

export default Block
