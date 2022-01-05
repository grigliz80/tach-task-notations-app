import { useSelector } from 'react-redux'
import ListItem from './ListItem'
import cls from './List.module.css'

const List = (props) => {

  const listItems = useSelector((st) => st.list.notations)

  return (
    <>
      <ul className={cls['ul-list']}>
        {listItems.length ? listItems.map((item) => (
          <ListItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              description: item.description
            }}
            submit={props.submit}
            closeModal={props.closeModal}
          />
        )) : <div><h2>Please, add some new notation</h2></div>}
      </ul>
    </>
  )
}

export default List
