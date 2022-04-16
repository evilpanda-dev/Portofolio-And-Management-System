const FilterButton = ({ categories, filterItem }) => {

    return (
        <>
            <div>
                {
                    categories.map((category, index) => {
                        return (
                            <button type="button"
                                className='filter-btn'
                                key={index}
                                onClick={() => filterItem(category)}
                                id="filterButton"><span>{category + " "}</span></button>
                        )
                    })
                }
            </div>
        </>)
}

export default FilterButton