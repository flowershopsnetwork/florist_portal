import { Link } from 'react-router-dom';
import Notfound from '../assets/not-found.png';
import { Button } from './ui/button';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center space-y-6">
            <h1 className=" text-9xl font-bold text-pink-500">4 0 4</h1>
            <p className="text-2xl text-gray-700">Page Not Found</p>
            <Link to="/" className="text-lg text-blue-500 hover:underline">
                <Button className="mt-4">
                    Go Back Home
                </Button>
            </Link>
            <img src={Notfound} alt="Not Found" className="w-100 max-w-md mx-auto" />
        </div>
    );
};

export default NotFound;
