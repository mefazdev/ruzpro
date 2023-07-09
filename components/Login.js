import React, { useState } from "react";

import fb from "../assets/images/fb.png";
import google from "../assets/images/google.png";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeLogin } from "../redux/loginSlice";
import { openSignup } from "../redux/signupSlice";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,  
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginOn, setLoginOn] = useState(false);
const [nullEmail,setNullEmail] = useState(false)
const [nullPassword,setNullPassword] = useState(false)
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const createControl = () => {
    dispatch(closeLogin());
    dispatch(openSignup());
  };


  const checkCredentials = ()=>{
    // if(email includes)
    let em = email.includes("@"); 
    if(em){
      if(password){
        login()
      }else{
        setNullPassword(true)
      }
    }else{
      setNullEmail(true)
    }
  }

  const login = async () => {
    setLoginOn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
        }
      );

      dispatch(closeLogin());
      setLoginOn(false);
    } catch (error) {
      setLoginOn(false)
      alert(error);
     
    }
  };
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        //  console.log(user.uid)
        router.push(`/account/dashboard/${user.uid}`);
        dispatch(closeLogin());
        setLoginOn(false);
      })
      .catch((error) => {
        setLoginOn(false)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
  
        // console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login">
      <div className="login__close" onClick={() => dispatch(closeLogin())}>
        <CloseRoundedIcon />
      </div>
      <div className="login__head">
        <h4>Sign in</h4>
      </div>
      <div className="flex login__sub">
        <hr />
        <h4>Login with</h4>
        <hr />
      </div>

      <div className="login__social">
        <div className="login__social__box" onClick={signInWithGoogle}>
          <div className="login__social__in">
            <div className="login__img__div">
              <Image src={google} />
            </div>

            <h6>Google</h6>
          </div>
        </div>
      </div>

      <div className="or__row flex">
        <hr />
        <h6> Or login with email and password</h6>

        <hr />
      </div>

      <div className="login__input__row">
        <div
        //  className="login__input__div"
        
        className= { !email.includes("@") && nullEmail ? "login__input__div border border-red-500":'login__input__div'}

        >
          <PersonSharpIcon />
          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div 
            className= {!password && nullPassword ? "login__input__div border border-red-500":'login__input__div'}

         id="login__input__two">
          <KeyRoundedIcon />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            error={true}
            
          />
          {passwordVisible ? (
            <VisibilityRoundedIcon onClick={() => setPasswordVisible(false)} />
          ) : (
            <VisibilityOffRoundedIcon
              onClick={() => setPasswordVisible(true)}
            />
          )}
        </div>
      </div>

      <button onClick={checkCredentials} id="login__btn" className="bg-green-800">
        {loginOn ? "Verifying..." : "LOGIN"}
      </button>

      <div className="login__create">
        <h4>Don&apos;t have an account?</h4>
        <h3 typeof="button" onClick={() => createControl()}>
          Create an account
        </h3>
      </div>
    </div>
  );
}
