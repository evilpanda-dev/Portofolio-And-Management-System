const Box = (props) => {
    const {
        title,
        content,
        theme
    } = props
    return (
        <>
            <section id="aboutMe">
                <h1 className={theme?.titleClass}>{title}</h1>
                <p className={theme?.contentClass}>{content}</p>
            </section>
        </>
    )
}

export default Box