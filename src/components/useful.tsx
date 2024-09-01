import { useRouter } from 'next/navigation';
import { FaHome } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";

export const ReturnHome = () => {
    return (
        <Link href="/admin">
            <div className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 bg-green-500 text-white">
                <FaHome /> 
                <span className="ml-2">Home</span>
            </div>
        </Link>
    );
};

export const Logout = () => {
    const router = useRouter();
  
    const handleLogout = () => {
      // Clear the token from local storage or cookies
      localStorage.removeItem('token');
      
      // Redirect to the login page
      router.push('/admin/login');
    };
  
    return (
      <button
        onClick={handleLogout}
        className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 bg-red-500 text-white text-sm"
      >
        <TbLogout />
        <span className="ml-2">Logout</span>
      </button>
    );
  };