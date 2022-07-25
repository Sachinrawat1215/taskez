import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../Redux/actions/action';

const LoginCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    const [backgroundColor, setbackgroundColor] = useState('white');
    const [passwordStatus, setpasswordStatus] = useState('password');

    const navigateSignup = () => {
        navigate("/signup");
    }

    const showPassword = () => {
        backgroundColor === 'white' ? setbackgroundColor('rgba(108, 115, 120, 0.14)') : setbackgroundColor('white');
        passwordStatus === 'password' ? setpasswordStatus('text') : setpasswordStatus('password');
    }

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('');

    const showHome = async (e) => {
        e.preventDefault();

        const myObj = {
            email: email.toLocaleLowerCase(), password
        }

        if (email === '') {
            seterrorMessage('Enter email address');
        } else if (password === '') {
            seterrorMessage('Enter your password');
        } else {
            const result = userData.filter(user => user.email === myObj.email && user.password === myObj.password);

            if ( result.length !== 0 && result[0].email === email.toLocaleLowerCase() && result[0].password === password) {
                dispatch(loginUser({ ...result[0], loggedIn: true }));
                localStorage.setItem('taskez', email.toLocaleLowerCase());
                navigate('/home');
            } else if(result.length === 0) {
                seterrorMessage('No account found!');
            }
        }
    }

    // Handle remember me
    const [rememberValue, setrememberValue] = useState(true);

    const handleRemember = () => {
        setrememberValue(!rememberValue);
        localStorage.setItem('taskremember', !rememberValue);
    }

    useEffect(() => {
        localStorage.setItem('taskremember', rememberValue);
        const gmail = localStorage.getItem('taskez');
        if (gmail) {
            navigate('/home');
        }
    }, []);

    return (
        <div className='card-container'>
            <nav>
                <h3 className='active'>Log In</h3>
                <h3 onClick={navigateSignup} style={{ color: 'rgb(184, 184, 184)', fontWeight: '400' }}>Sign up</h3>
            </nav>
            <div className="form-container">
                <hr height="5" />
                <h3>To Continue</h3>
                <p className="small">We need your Name and Email</p>

                <form onSubmit={showHome}>
                    <input type="email" name="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} />

                    <div className="password_container">
                        <input type={passwordStatus} name="password" placeholder='Password' autoComplete='true' onChange={(e) => setpassword(e.target.value)} />
                        <i onClick={showPassword} style={{ backgroundColor: backgroundColor }} className="fas fa-eye"></i>
                    </div>
                    <p className="error" style={{ fontSize: "13px", color: "red", marginTop: '5px', visibility: errorMessage === '' ? 'hidden' : 'visible' }}>{errorMessage}</p>
                    <input type="submit" value="Log In" />
                </form>

                <input type="checkbox" name="remember_me" id="remember_me" checked={rememberValue} onChange={handleRemember} />
                <label htmlFor='remember_me'>Remember Me</label>
            </div>
        </div>
    )
}

export default LoginCard;