import Info from "../Info/Info";

const Feedback = (props) => {
    const {
        data
    } = props;
    return (
        <>
            <section id="feedBack">
                <h1 className="feedbackSection">Feedbacks</h1>
                {data.map((user) => (
                    <div className="feedbackWrapper" key={user.reporter.name}>
                        <Info text={user.feedback} />
                        <div className="userDetails">
                            <img src={user.reporter.photoUrl} className='feedbackAvatar' alt={user.reporter.name}></img>
                            <p className="feedbackName">{user.reporter.name},</p>
                            <a href={user.reporter.citeUrl} className='feedbackUrl'> {user.reporter.citeUrl}</a>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Feedback