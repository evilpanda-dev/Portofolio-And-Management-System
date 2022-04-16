import Address from "../../components/Address/Address"
import Box from "../../components/Box/Box"
import Expertise from "../../components/Expertise/Expertise"
import Panel from "../../components/Panel/Panel"
import Portofolio from "../../components/Portofolio/Portofolio"
import TimeLine from "../../components/TimeLine/TimeLine"
import Feedback from "../../components/Feedback/Feedback"
import '../Inner/Inner.css'
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchEducations } from "../../features/education/educationSlice"
import Skills from "../../components/Skills/Skill"


const Inner = () => {

  const boxStyle = {
    titleClass: 'aboutMeTitle',
    contentClass: 'aboutMeDescription'
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEducations());
  }, [dispatch])

  return (
    <>
      <BackToTopButton address="#aboutMe" />
      <Panel />
      <div className="Inner">
        <Box
          title="About me"
          content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, 
        sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. 
        In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. 
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, 
        porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. 
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. 
        Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, 
        sem quam semper libero, sit amet adipiscing sem neque"
          theme={boxStyle} />
        <TimeLine />
        <Expertise data={[
          {
            date: '2013-2014',
            info: {
              company: 'Google',
              job: 'Front-end developer / php programmer',
              description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor'
            }
          },
          {
            date: '2012',
            info: {
              company: 'Twitter',
              job: 'Web developer',
              description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor'
            }
          }
        ]} />
        <Skills />
        {/* <Portofolio data={ProjectData} /> */}
        <Address />
        <Feedback data={[{ feedback: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor', reporter: { photoUrl: 'https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg', name: 'John Doee', citeUrl: 'https://www.citeexample.com' } }, { feedback: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor', reporter: { photoUrl: 'https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg', name: 'John Doe', citeUrl: 'https://www.citeexample.com' } }]} />
      </div>
    </>
  )
}

export default Inner