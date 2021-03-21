import React, { useContext, useState } from 'react';
import './Login.css';
import firebase from 'firebase/app';
import "firebase/auth";
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(true);
    const [validForm, setValidForm] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from:{pathname:"/"}};

    if (firebase.apps.length===0) {  
        firebase.initializeApp(firebaseConfig);        
    }

    const providerGL = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = (provider) => {
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const {displayName, email} = result.user;
            const signedInUser = {
                signed: true,
                name: displayName,
                email: email,
                message: 'Logged In Successfully!'
            }
            setUser(signedInUser);
            history.replace(from);
        })
        .catch(error => {
            const signedInUser = {};
            signedInUser.message = error.message;
            setUser(signedInUser);
        });
    }

    const handleBlur = (e) => {
        const signedInUser = {...user};
        signedInUser[e.target.name] = e.target.value;

        // Confirming same password
        if(e.target.name === 'confirm'){
            if(e.target.value !== user.password){
                signedInUser.message = "Password Didn't Match!";
                setValidForm(false);
            }
            else{
                signedInUser.message = '';
                setValidForm(true);
            }
        }
        setUser(signedInUser);
    }
    
    const subForm = (e) => {
       
        //Email Sign in
        if (newUser){
            if(validForm) {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    const signedInUser = {
                        signed: true,
                        name: user.name,
                        email: user.email,
                        message: 'Logged In Successfully!'
                    }
                    setUser(signedInUser);
                    updateName(user.name);
                    history.replace(from);
                })
                .catch(error => {
                    const signedInUser = {...user};
                    signedInUser.message = error.message;
                    setUser(signedInUser);
                });
            }
        }

      
        // Email login
        if (!newUser) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    const {displayName, email} = result.user;
                    const signedInUser = {
                        signed: true,
                        name: displayName,
                        email: email,
                        message: 'Logged In Successfully!'
                    }
                    setUser(signedInUser);
                    history.replace(from);
                })
                .catch(error => {
                    const signedInUser = {};
                    signedInUser.message = error.message;
                    setUser(signedInUser);
                });
        }
        e.preventDefault();
    }

    //Update Name
    const updateName = name => {
        const currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({displayName: name})
        .then()
        .catch(error => {
            console.log(error);
        });
    }

    // Forgot Password
    const forgotPassword = () => {
        const auth = firebase.auth();
        auth.sendPasswordResetEmail(user.email)
        .then(() => {
            const signedInUser = {...user};
            signedInUser.message = 'Password reset link sent to your email';
            setUser(signedInUser);
        })
        .catch(() => {
            const signedInUser = {...user};
            signedInUser.message = 'Your email address is invalid!';
            setUser(signedInUser);
        });
    }

    return (
    <Container className="text-center text-white">
    <div className="mx-auto bg-dark p-4 rounded" id="login">
        <Form onSubmit={subForm}>
            <h3 className="my-4">{newUser ? 'Create an account' : 'User Login'}</h3>
            {
                newUser && <FormControl onBlur={handleBlur} name="name" type="text" placeholder="Your Name" className="my-3 bg-light" required />
            }

            <FormControl onBlur={handleBlur} name="email" type="email" placeholder="Your Email" className="my-3 bg-light" required />

            <FormControl onBlur={handleBlur} name="password" type="password" placeholder="Your Password" className="my-3 bg-light" required />

            {
                newUser && <FormControl onBlur={handleBlur}  type="password" name="confirm" placeholder="Confirm Password" className="my-3 bg-light" required />
            }

            <button className="btn-primary my-2 rounded" type="submit">{newUser ? 'Sign Up' : 'Login'}</button>

            {
                !newUser && <span onClick={forgotPassword} className="btn text-danger">Forgot Password</span>
            }

            <span className="btn btn-secondary my-4 text-light btn-block w-50 mx-auto" onClick={()=>{
                setNewUser(!newUser);
                setUser({
                    signed: false,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    message: ''
                });
            }}>
                {
                    newUser ?
                    'I have an account' :
                    'I am new here'
                }
            </span>

            <h6 className="text-danger text-center mt-4">{user.message}</h6>
        </Form>
            <hr className="bg-white" />
            
            <Button variant="light" className="my-2 rounded" onClick={() => handleGoogleSignIn(providerGL)}>
                Sign in with Google
            </Button>
            
    </div>
    </Container>
    );
};

export default Login;