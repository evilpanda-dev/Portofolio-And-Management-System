import '../../assets/styles/css/PortofolioInfo.css'

const PortofolioInfo = (props) => {
    const {
        title,
        text,
        url,
        image
    } = props

    return (
        <>
            <div className='column'>
                <div className='container'>
                    <img src={image} className="image" alt={title} />
                    <div className='overlay'>
                        <div className='text'>
                            <h4 className='overlayTitle'>{title}</h4>
                            <p className='overlayDescription'>{text}</p>
                            <a href={url} className="sourceLink">View source</a>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PortofolioInfo