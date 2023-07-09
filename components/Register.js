import React, { useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import "react-phone-number-input/style.css";
import google from "../assets/images/google.png";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { closeSignup } from "../redux/signupSlice";
import { openLogin } from "../redux/loginSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { GoogleAuthProvider } from "firebase/auth";
function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nullEmail,setNullEmail] = useState(false)
  const [nullPassword,setNullPassword] = useState(false)
  
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const loginControl = () => {
    dispatch(closeSignup());
    dispatch(openLogin());
  };

  
  const checkCredentials = (e)=>{
    // if(email includes)
    let em = email.includes("@"); 
    if(em){
      if(password.length >= 6){
      signupWithEmail(e)
      }else{
        setNullPassword(true)
      }
    }else{
      setNullEmail(true)
    }
  }
  const signupWithEmail = (e) => {
    e.preventDefault();
    setSaving(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        checkUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    // console.log(auth)
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log("hi",user)
        // handleSubmit()
        checkUser(user);
        // createUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        alert(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSubmit = async () => {
 
    onAuthStateChanged(auth, (currentUser) => {
      const user = currentUser;
      // console.log(currentUser.uid)

      checkUser(user);
      console.log(user)
    });
  };

  const checkUser = async (user) => {
    // alert('CHeck user')
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/user/${user?.uid}`,
        {}
      );
      const { data } = await res.json();
      if (data[0]?.uid === user.uid) {
        router.push(`/account/dashboard/${user.uid}`);
        dispatch(closeSignup());
      } else {
        createUser(user);

        // console.log(data[0].uid, user.uid)
      }
    } catch (error) {
      console.log(error);
    }
 
  };

  const createUser = async (user) => {
    console.log('creating user')
    const name = user.email.slice(0, 5);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: user.email,
        }),
      });
      setSaving(false);
      dispatch(closeSignup());
      router.push(`/account/dashboard/${user.uid}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="rgr" style={{ position: "relative" }}>
      {saving ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        ""
      )}

      <div className="login__close" onClick={() => dispatch(closeSignup())}>
        <CloseRoundedIcon />
      </div>

      <div className="rgr__head">
        <h4 onClick={handleSubmit}>Create an account</h4>
      </div>

      {/* <div className='rgr__input__first__row'>
     <div className='grid grid-cols-2 gap-2'>
         <input placeholder='Name'/>
         <input placeholder='Last Name'/>
     </div>
      </div> */}

      <div  
      
      className= { !email.includes("@") && nullEmail ? "rgr__email__div border border-red-500":'rgr__email__div'}

      >
        <EmailRoundedIcon />
        <input  
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* <div className='rgr__phone__div'> */}
      {/* <PhoneInput
     id='rgr__phone__input'
      placeholder="Phone number"
      value={value}
      onChange={setValue}
      defaultCountry='IN'
      /> */}

      {/* </div> */}
      {/* <p className='rgr__otp__p'>We will send an OTP to signup with phone number.</p> */}

      <div 
      className= {!password && nullPassword ? "rgr__password__div border border-red-500":'rgr__password__div'}

      >
        <KeyRoundedIcon />
        <input


          onChange={(e) => setPassword(e.target.value)}
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
        />
        {passwordVisible ? (
          <VisibilityRoundedIcon onClick={() => setPasswordVisible(false)} />
        ) : (
          <VisibilityOffRoundedIcon onClick={() => setPasswordVisible(true)} />
        )}
      </div>
     {nullPassword && password.length < 6 ?  <p className="text-red-400"
      style={{fontSize:'14px'}}
      > Password should be at least 6 characters!</p>
:''}
      <p className="rgr__policy__p mt-3">
        By clicking on &apos;Continue&apos;, you are agreeing to the terms and
        conditions and the privacy policy
      </p>
      <button id="rgr__btn" className="bg-green-800"
       onClick={(e)=>checkCredentials(e)}>
        CONTINUE
      </button>

      <div className="flex rgr__or">
        <hr />
        <h4 onClick={handleSubmit}>Or Signup with</h4>
        <hr />
      </div>
      <div className="login__social flex">
        <div className="login__social__box" onClick={signUpWithGoogle}>
          <div className="login__social__in">
            <div className="login__img__div">
              <Image src={google} />
            </div>
            <h6>Google</h6>
          </div>
        </div>
        {/* <div className="login__social__box">
          <div className="login__social__in">
          <div className='login__img__div'>
            <Image src={fb} /></div>
            <h6>Facebook</h6>
          </div>
        </div> */}
      </div>
      <div className="login__create">
        <h4>Already have an account?</h4>
        <h3 onClick={() => loginControl()}>Please Login</h3>
      </div>
    </div>
  );
}

export default Register;
