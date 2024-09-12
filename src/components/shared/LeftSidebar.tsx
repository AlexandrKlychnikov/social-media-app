import React from 'react';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queries';
import { INITIAL_USER, useUserContext } from '@/context/AuthContext';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: signOut } = useSignOutAccount();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate('/sign-in');
  };

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <div className='flex justify-center items-center'>
            <img
              src='/assets/images/logo.svg'
              alt='logo'
              width={40}
              height={40}
            />
            <p className='font-bold text-[22px] text-indigo-500'>Someda</p>
          </div>
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
      </div>

      <ul className='flex flex-col gap-6'>
        {sidebarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`leftsidebar-link group ${
                isActive && 'bg-primary-500'
              }`}
            >
              <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${
                    isActive && 'invert-white'
                  }`}
                />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <Button
        variant='ghost'
        className='shad-button_ghost group'
        onClick={(e) => handleSignOut(e)}
      >
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium group-hover:text-primary-500'>
          Выйти
        </p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
