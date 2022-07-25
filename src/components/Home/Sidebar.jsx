import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/actions/action';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    const handleLogout = async () => {
        const userEmail = localStorage.getItem('taskez');
        const userdata = userData.filter(user => user.email === userEmail);
        dispatch(logoutUser(userdata[0]));
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className='sidebar-container'>
            <a className='logo' href="/">
                <p>.taskez</p>
            </a>
            <div className="link-container">
                <ul>
                    <li><a href="/"><i className="far fa-home-alt"></i> Dashboard</a></li>
                    <li><a href="/"><i className="fal fa-signal-alt-3"></i> Stats</a></li>
                    <li className='active'><a href="/"><i className="far fa-folder-open"></i> Projects</a></li>
                    <li><a href="/"><i className="far fa-comment-alt-dots"></i> Chat</a></li>
                    <li><a href="/"><i className="fal fa-calendar-alt"></i> Calendar</a></li>
                </ul>
                <ul>
                    <li><a href="/"><i className="fal fa-cog"></i> Setting</a></li>
                    <li style={{ cursor: 'pointer' }} onClick={handleLogout}><i className="far fa-sign-out"></i> Log Out</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar