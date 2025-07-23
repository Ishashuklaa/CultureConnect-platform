import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, BookOpen, ShoppingBag, Map, Users, Compass } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[url('https://png.pngtree.com/background/20211215/original/pngtree-abstract-ethnic-culture-pattern-background-picture-image_1451838.jpg')] backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className=" p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white  px-1 py-1 rounded">
  CultureConnect
</span>

            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/explore"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/explore')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-white hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>Explore</span>
            </Link>
            
            <Link
              to="/stories"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/stories')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-white hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span  className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>Stories</span>
            </Link>
            
            <Link
              to="/marketplace"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/marketplace')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-white hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span  className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>Marketplace</span>
            </Link>
            
            <Link
              to="/languages"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/languages')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-white hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <span  className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>Languages</span>
            </Link>

            {user && (
              <Link
                to="/itinerary"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/itinerary')
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-white hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Map className="h-4 w-4" />
                <span  className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>My Itinerary</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'seller' ? '/seller-dashboard' : '/dashboard'}
                  className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  <span  className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span  className='font-bold text-white  px-1 py-1 rounded hover:text-orange-600'>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="font-bold text-white  px-1 py-1 rounded hover:bg-pink-600 transition-all transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="font-bold text-white  px-1 py-1 rounded hover:bg-pink-600 transition-all transform hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <div className="flex flex-col space-y-2">
              <Link
                to="/explore"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Compass className="h-4 w-4" />
                <span>Explore</span>
              </Link>
              <Link
                to="/stories"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Stories</span>
              </Link>
              <Link
                to="/marketplace"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace</span>
              </Link>
              <Link
                to="/languages"
                className="px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Languages
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/itinerary"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Map className="h-4 w-4" />
                    <span>My Itinerary</span>
                  </Link>
                  <Link
                    to={user.role === 'seller' ? '/seller-dashboard' : '/dashboard'}
                    className="flex items-center space-x-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;