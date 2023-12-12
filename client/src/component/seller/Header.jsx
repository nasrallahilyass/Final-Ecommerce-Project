import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../../utils/http';

import { logout } from '../../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sellerInfo, ...rst } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await http.post('/logout');
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <nav className="bg-white w-screen mb-0  text-white shadow-md shadow-bottom-custom">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="cursor-pointer">
              <span className="text-lg text-black font-semibold">Seller Dashboard</span>
            </div>
            <div className="flex text-black items-center space-x-4">
             <span title={sellerInfo.username} id="username">
                  {sellerInfo.username}
                </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;