import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const {openDateModal} = useUiStore()
  const {setActiveEvent} = useCalendarStore()
  const handleClickNew = () => { 
    setActiveEvent({
        title: '',
        notes: '',
        start: new Date(2024, 9, 20, 10, 30),
        end: new Date(2024, 9, 20, 12, 0),
        bgColor: '#48e',
        user: {
          _id: '123',
          name: 'John Pepe',
        },
      })
    openDateModal()
  }


  return (
    <button
        className="btn btn-primary fab"
        onClick={handleClickNew}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}


