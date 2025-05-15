import { useNavigate } from 'react-router-dom';


export default function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/usuarios/auth')
    }

    return (
        <div>
            <h1>Home page</h1>
            <button type="submit" onClick={handleButtonClick}>LOGIN</button>
        </div>
    )
}