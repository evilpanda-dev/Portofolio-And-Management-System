const Info = (props) => {
    const {
        text
    } = props
    return (
        <>
            <p className="feedbackParagraph">{text}</p>
        </>
    )
}

export default Info