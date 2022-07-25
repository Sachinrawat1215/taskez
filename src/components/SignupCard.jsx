import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../Redux/actions/action';
import { useDispatch, useSelector } from 'react-redux';

const SignupCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData);
    const [backgroundColor, setbackgroundColor] = useState('white');
    const [passwordStatus, setpasswordStatus] = useState('password');

    const navigateLogin = () => {
        navigate("/login");
    }

    const showPassword = () => {
        backgroundColor === 'white' ? setbackgroundColor('rgba(108, 115, 120, 0.14)') : setbackgroundColor('white');
        passwordStatus === 'password' ? setpasswordStatus('text') : setpasswordStatus('password');
    }

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('');

    const hitRegister = async (e) => {
        e.preventDefault();

        let myObj = {
            name, email: email.toLocaleLowerCase(), password, image: `./Images/photo${Math.floor(Math.random() * (7 - 1) + 1)}.png`,
            loggedIn: false
        }

        if (name === '') {
            seterrorMessage('Enter your name');
        } else if (email === '') {
            seterrorMessage('Enter your email');
        } else if (password === '') {
            seterrorMessage('Enter your password');
        } else {
            const result = userData.filter(user => user.email === myObj.email);
            console.log(result);
            if (result.length === 0) {
                dispatch(registerUser(myObj));
                navigate('/home');
            }else{
                seterrorMessage('Email already exists!');
            }
        };
    }

    return (
        <div className='card-container'>
            <nav>
                <h3 onClick={navigateLogin} style={{ color: 'rgb(184, 184, 184)', fontWeight: '400' }}>Log In</h3>
                <h3 className='active'>Sign up</h3>
            </nav>
            <div className="form-container">
                <hr height="5" />

                <form onSubmit={hitRegister}>

                    <input type="text" name="name" placeholder='Full Name' onChange={(e) => setname(e.target.value)} />

                    <input type="email" name="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} />
                    <div className="password_container">
                        <input type={passwordStatus} name="password" placeholder='Password' autoComplete='true' onChange={(e) => setpassword(e.target.value)} />
                        <i onClick={showPassword} style={{ backgroundColor: backgroundColor }} className="fas fa-eye"></i>
                    </div>
                    <p className="error" style={{ fontSize: "13px", color: "red", marginTop: '5px', visibility: errorMessage === '' ? 'hidden' : 'visible' }}>{errorMessage}</p>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    )
}

export default SignupCard;