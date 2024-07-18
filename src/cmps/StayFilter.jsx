import { useState, useEffect } from 'react'

export function StayFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterBy)
    }, [])


    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            // case 'radio':
            //     value = field === 'sortDir' ? +ev.target.value : ev.target.value
            //     if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
            //     break
            // case 'number':
            //     value = +ev.target.value || ''
            //     break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    return <section className='stay-filter'>
        <h3> Filter</h3>
        <input
            type="text"
            name="txt"
            value={filterToEdit.txt}
            placeholder="Free text"
            onChange={handleChange}
            required
        />

    </section>

}
