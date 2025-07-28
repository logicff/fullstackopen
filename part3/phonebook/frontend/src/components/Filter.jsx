const Filter = (props) => {
    const filtername = props.filtername
    const setFiltername = props.setFiltername
    const handleFilterChange = (event) => {
        setFiltername(event.target.value)
    }
    return (
        <div>
            filter shown with <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter