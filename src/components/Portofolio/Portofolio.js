import PortofolioInfo from "./PortofolioInfo"
import FilterButton from "../Button/FilterButton"
import '../Portofolio/Portofolio.css'
import { useState } from "react"


const Portofolio = (props) => {
    const {
        data
    } = props;

    const allCategories = ['All', ...new Set(data.map((item) => item.category))]

    const [menuItems, setMenuItems] = useState(data)
    const [categories] = useState(allCategories)

    const filterItem = (category) => {
        if (category === 'All') {
            setMenuItems(data)
            return
        }
        const newItem = data.filter((item) => item.category === category)
        setMenuItems(newItem)
    }


    return (
        <>
            <section id="projects">
                <h1 className="portofolioSection">Portofolio</h1>
                <div id="myBtnContainer">
                    <FilterButton categories={categories} filterItem={filterItem} />
                </div>

                <div className='row'>
                    {menuItems.map((project) => (
                        <PortofolioInfo
                            title={project.title}
                            text={project.text}
                            url={project.url}
                            image={project.image}
                            key={project.title}
                        />
                    ))}

                </div>
            </section>
        </>
    )
}

export default Portofolio