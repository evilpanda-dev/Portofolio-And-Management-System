import { useState,useEffect,useContext } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import { checkIfEmailIsSubscribed, subscribeToNewsletter } from "../../features/newsletterThunks";
import { useAlert } from "../../hooks/useAlert";
import { UserContext } from "../../providers/UserProvider";

const NewsLetter = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext)
  const dispatch = useDispatch()
  const userId = user?.userId;
  const isVisible = useSelector((state) => state.newsLetterState.isNewsletter);
  const triggerAlert = useAlert()
//   const [showNewsletter,setNewsLetter] = useState(false)
//  const [formSubmitted,setFormSubmitted] = useState(false)

//   useEffect(()=>{
//     // const interval = setInterval(()=>{
//     //   setNewsLetter(true)
//     // },10000)
//     // setTimeout(()=>{
//     //     clearInterval(interval)
//     // },10000)
//      setTimeout(()=>{
//         setNewsLetter(true)
//     },1000)

//   },[showNewsletter])
const closeNewsletter = () => {
  // setNewsLetter(false)
  dispatch({ type: "HIDE_NEWSLETTER", payload: false });
}

// useEffect(()=>{
//     const isSubscribed = dispatch(checkIfEmailIsSubscribed({userId : userId}))
//     if(userId === isSubscribed.arg.userId){
//         closeNewsletter()
//     } else {
//         dispatch({ type: "SHOW_NEWSLETTER", payload: true });
//     }
// },[user])


  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault()
    if (input) {
   const data = await dispatch(subscribeToNewsletter({userId : userId,email : input}))
   triggerAlert(data,"You successefully subscribed to our newsletter")
      // add to firebase
    //   db.collection("emails").add({
    //     email: input,
    //     time: firebase.firestore.FieldValue.serverTimestamp(),
    //   });
      setInput("");
    //   setTimeout(() => {
 closeNewsletter();
    //   }, 3000);
    }
  };

  return (
      <Div>
        {isVisible &&
      <Container>
        <CloseButton
                type="button"
                className="close"
                aria-label="Close"
                onClick={closeNewsletter}
              >
                <span aria-hidden="true">&times;</span>
              </CloseButton>
        {/* <UiComponents /> */}
        <Form onSubmit={submitHandler}>
          <H2>Subscribe to our Newsletter</H2>
          <Input type="email" onChange={inputHandler} value={input} placeholder = "Your email here"/>
          <Button type="submit">Submit</Button>
        </Form>
        {/* {message && <Alert>{message}</Alert>} */}
      </Container>}
    </Div>
  );
}
const Div = styled.div`
position:fixed;
top: 50%;
left: 50%;
margin-top: -100px; /* Negative half of height. */
margin-left: -250px; /* Negative half of width. */
display: flex;
  z-index: 3;
`;
const Container = styled.div`

  position: relative;
`;
const Form = styled.form`
  position: relative;
  padding: 3rem;
  min-width: 500px;
  border-radius: 5px;
  box-shadow: 0 0 30px #333;
  background: rgba(255, 255, 255, 0.1);
  border: solid 1px rgba(255, 255, 255, 0.2);
  backgroud-clip: padding-box;
  backdrop-filter: blur(10px);

  z-index: 2;
`;
const H2 = styled.h2`
  color: #black;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 10px 0 0 10px;
  border: none;
  width: 80%;
  outline: none;
  color: #cf1d22;
  margin-bottom:10px
`;
const Button = styled.button`
  background-image: linear-gradient(
    to right,
    #eb3349 0%,
    #f45c43 51%,
    #eb3349 100%
  );
  width: 20%;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 0 10px 10px 0;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-position: right center;
  }
`;
const Alert = styled.p`
  position: relative;
  padding: 0.4rem;
  margin: 0.5rem;
  color: black;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 3;
`;
const CloseButton = styled.button`
color: #fff;
  background-color: #999;
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 15px;
  border-radius: 50%;
  border: 2px solid #333;
  z-index: 3;
  &:hover, &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    outline: none;
  }`
export default NewsLetter;