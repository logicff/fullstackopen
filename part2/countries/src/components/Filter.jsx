const Filter = (props) => {
    const setFiltername = props.setFiltername
    const setShowCountry = props.setShowCountry
    const handleFilterChange = (event) => {
        setShowCountry(null)
        setFiltername(event.target.value)
    }
    return (
        <div>
            find countries <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter