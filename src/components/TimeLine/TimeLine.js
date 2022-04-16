import '../TimeLine/TimeLine_styles/base.css'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const TimeLine = () => {

    const educations = useSelector(state => state.educationState.educationList.educations)

    const { status, error } = useSelector(state => state.educationState)

    return (
        <section id='timeLine'>
            <h1 className='educationSection'>Education</h1>
            {status === 'loading' && <div className='loadingContainer'><FontAwesomeIcon icon={solid('rotate')} className="loading" /></div>}
            {error && <h3 className='error'>Something went wrong, please review your server connection!</h3>}
            {status === 'resolved' &&
                <div className="timelineContainer">
                    <div id="timeline" className='timelineWrapper'>
                        {educations.map(({ id, date, title, text }) => (
                            <div className="timeline-item" key={id}>
                                <span className="timeline-icon">
                                    <span>&nbsp;&nbsp;</span>
                                    <span className="year">{date}</span>
                                </span>
                                <div className='timeline-content'>
                                    <h2>{title}</h2>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}

export default TimeLine