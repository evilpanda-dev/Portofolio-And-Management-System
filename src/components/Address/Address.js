import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faFacebook, faTwitter, faSkype } from '@fortawesome/free-brands-svg-icons'

const Address = () => {

        return (
                <>
                        <section id="contacts">
                                <h1 className='contactsSection'>Contacts</h1>

                                <div className='contactMethod'>
                                        <FontAwesomeIcon icon={solid('phone')} className='contactIcon' />
                                        <div className='contactWrapper'>
                                                <a href="tel:500-342-242" className='contactData'>500 342 242</a>
                                        </div>
                                </div>

                                <div className='contactMethod'>
                                        <FontAwesomeIcon icon={solid('envelope')} className='contactIcon' />
                                        <div className='contactWrapper'>
                                                <a href="mailto:office@kamsolutions.pl" className='contactData'>office@kamsolutions.pl</a>
                                        </div>
                                </div>

                                <div className='contactMethod'>
                                        <div>
                                                <FontAwesomeIcon icon={faTwitter} className='contactIcon' />
                                        </div>
                                        <div className='contactWrapper'>
                                                <p className='contactData'>Twitter</p>
                                                <a href="https://twitter.com/wordpress" className='contactLinks'> https://twitter.com/wordpress</a>
                                        </div>
                                </div>

                                <div className='contactMethod'>
                                        <div>
                                                <FontAwesomeIcon icon={faFacebook} className='contactIcon' />
                                        </div>
                                        <div className='contactWrapper'>
                                                <p className='contactData'>Facebook</p>
                                                <a href="https://www.facebook.com/facebook" className='contactLinks'>https://www.facebook.com/facebook</a>
                                        </div>
                                </div>

                                <div className='contactMethod'>
                                        <div>
                                                <FontAwesomeIcon icon={faSkype} className='contactIcon' />
                                        </div>
                                        <div className='contactWrapper'>
                                                <p className='contactData'>Skype</p>
                                                <a href="skype:kamsolutions.pl" className='contactLinks'>kamsolutions.pl</a>
                                        </div>
                                </div>
                        </section>
                </>
        )
}

export default Address