const PhotoBox = (props) => {
    const {
        name,
        title,
        description,
        avatar,
        theme
    } = props;

    return (
        <>

            <img src={avatar} className={theme?.imageClass} alt='avatar'></img>
            <h1 className={theme?.nameClass}>{name}</h1>
            <h2 className={theme?.titleClass}>{title}</h2>
            <p className={theme?.descriptionClass}>{description}</p>

        </>
    )
}

export default PhotoBox;