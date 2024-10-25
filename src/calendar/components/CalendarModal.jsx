import Modal from "react-modal"
import { useEffect, useMemo, useState } from 'react'
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Swal from "sweetalert2";
import { useUiStore, useCalendarStore } from "../../hooks";


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const {activeEvent, startSavingEvent} = useCalendarStore()
    const {closeDateModal, isDateModalOpen} = useUiStore()
    const [formSubmitted, setFormSubmitted] = useState(false)

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2), 
    })

    const onInputChange = ({target}) =>{
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onDateChange = (event, changing ) => {
        setFormValues({
            ...formValues,
            [changing] : event
        })
    }
    
    const onSubmit = async(event) => {
        event.preventDefault()
        setFormSubmitted(true)
        const difference = differenceInSeconds( formValues.end, formValues.start)
        
        if ( isNaN(difference) || difference < 0 ) {
            Swal.fire({
                icon: "error",
                title: "Invalid Dates",
                text: "Make sure you type a valid date",
            });
            return
        }
        
        if (formValues.title.length <= 0) return

        await startSavingEvent(formValues)
        closeDateModal()
        setFormSubmitted(false)
    }

    const titleClass = useMemo(() => {
        if ( !formSubmitted ) return ''

        return ( formValues.title.length > 0)
                ?  ''
                :  'is-invalid'

    }, [formValues.title, formSubmitted ])

    useEffect(() => {
        if (activeEvent != null) {
            setFormValues({...activeEvent})
        } 

    }, [activeEvent])
    

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
            <h1> New Event </h1>
    <hr />
    <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
            <label>Date and Start Hour</label>
            <DatePicker
                selected={formValues.start}
                onChange={(event) => onDateChange( event, 'start')}
                className='form-control'
                dateFormat="Pp"
                showTimeSelect
            />
        </div>

        <div className="form-group mb-2">
            <label>Date and End Hour</label>
            <DatePicker
                minDate={formValues.start}
                selected={formValues.end}
                onChange={(event) => onDateChange( event, 'end')}
                className='form-control'
                dateFormat="Pp"
                showTimeSelect
            />
        </div>

        <hr />
        <div className="form-group mb-2">
            <label>Title And Notes</label>
            <input 
                type="text" 
                className={`form-control ${ titleClass}`}
                placeholder="Event Title"
                name="title"
                autoComplete="off"
                value={formValues.title}
                onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">Brief Description</small>
        </div>

        <div className="form-group mb-2">
            <textarea 
                type="text" 
                className="form-control"
                placeholder="Notes"
                rows="5"
                name="notes"
                value={formValues.notes}
                onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Aditional Information</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Save </span>
        </button>

    </form>
    </Modal>
  )
}


