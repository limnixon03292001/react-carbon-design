import React, { useEffect, useRef } from 'react'
import loginBg from '../../assets/login-bg.jpg'
import NetflixLogo from '../../components/NetflixLogo/NetflixLogo'
// import { Button } from '@carbon/react'
// import jwt_decode from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'
import checkToken from '../../utils/checkToken'



export default function Login() {

    const btnRef = useRef(null)
    const navigate = useNavigate()

    function handleCallbackResponse(response) {
        // console.log("Encode JWT ID TOKEN", response.credential)
        // var userObject = jwt_decode(response?.credential);
        localStorage.setItem('token', response?.credential);
        navigate("/", { replace: true });
    }

    useEffect(() => {
        const google = window.google;
        //global google check for index.html for cdn script in order for this line of code to work.
        google?.accounts?.id?.initialize({
            client_id: "1015270902890-brri1amfqkv3i7004a2r75omngtijvoe.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google?.accounts?.id?.renderButton(
            document?.getElementById("signin"),
            { theme: "outline", size: "xl" }
        )
    },[])


    // const checkToken = () => {
    //     if(checkToken()) (
          
    //     )
    // }

  return (

    !checkToken() ? 
    <div className='wrapper_login'>
            <div className='login_bg'>
                <img src={loginBg} alt="loginBackground" className='bg_img'/>
            </div>
            <NetflixLogo/>
            <div className='wrapper_form'>
                <div className='form'>
                    <h2>Sign in</h2>
                    
                    <button id="signin" className='btn_login' ref={btnRef}>
                        {/* <Button kind="danger" itemRef={btnRef}>
                            Sign in with Google
                        </Button> */}
                    </button>
                </div>
            </div>
        </div>
        :
        <Navigate to="/" replace={true}/>
    
  
  )
}
