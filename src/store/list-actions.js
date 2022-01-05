import { uiActions } from './ui-slice'
import { listActions } from './list-slice'

export const fetchListData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://tech-task-notations-app-default-rtdb.europe-west1.firebasedatabase.app/tech-task.json'
                )

                if(!response.ok) {
                    throw new Error('Could not fetch list data!')
                }

                const data = await response.json()

                return data
        }

        try {
            dispatch(uiActions.setHeader({status: 'Loading...', btn_dis: true}))
            const listData = await fetchData()
            dispatch(listActions.replaceList({
                items: listData.notations || [],
                total: listData.total
            }))
            dispatch(uiActions.setHeader({status: 'Notations', btn_dis: false}))
        } catch(error) {
          dispatch(
            uiActions.setHeader({
              status: 'Error! No success with fetching data',
              btn_dis: true
            })
          )
        }
    }
}

export const sendListData = (list) => {
  return async (dispatch) => {

    const sendRequest = async () => {
      const response = await fetch(
        'https://tech-task-notations-app-default-rtdb.europe-west1.firebasedatabase.app/tech-task.json',
        {
          method: 'PUT',
          body: JSON.stringify({
              notations: list.notations,
              total: list.total
            }),
        }
      )

      if (!response.ok) {
        throw new Error('Request Failed!!')
      }
    }

    try {
      await sendRequest()
    } catch (error) {
      dispatch(
        uiActions.setHeader({
          status: 'Error! No success with sending data',
          btn_dis: true
        })
      )
    }
  }
}
