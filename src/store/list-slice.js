import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
    name: 'list',
    initialState: {
        notations: [],
        editingNotation: {},
        changed: false,
        total: 0
    },
    reducers : {
        setEditingNotation(st, act) {
          const editing = act.payload
          st.editingNotation = {
            id: editing.id,
            title: editing.title,
            description: editing.text
          }
        },
        changeItemInlist(st, act) {
          const existing = st.notations.find(item => item.id === act.payload.id)
          const index = st.notations.indexOf(existing)
          st.changed = true
          st.notations.splice(index, 1, act.payload)
        },
        replaceList(st, act) {
          st.total = act.payload.total
          st.notations = act.payload.items
        },
        addItemTolist(st, act) {
          st.total++
          const newItem = act.payload
          st.changed = true
            st.notations.push({
              id: newItem.id,
              title: newItem.title,
              description: newItem.text
            })
        },
        removeItemFromList(st, act) {
          const id = act.payload
          const existing = st.notations.find(not => not.id === id)
          st.changed = true
          st.total--
          if (existing) {
            st.notations = st.notations.filter((item) => item.id !== id)
          } else return
        }
    }    
})

export const listActions = listSlice.actions

export default listSlice