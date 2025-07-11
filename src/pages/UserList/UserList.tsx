import { useNavigate } from 'react-router';

const UserList = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/user/1');
    }
  return (
    <div>
        <h2>User List Page </h2>
        <button onClick={handleClick}>Go Detail</button>
        <input type="text" />
        <a href="dsdsd">deneme</a>
    </div>
  )
}

export default UserList