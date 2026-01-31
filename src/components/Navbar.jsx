import useAuthUser from '../hooks/useAuthUser'
import { useLocation, Link } from 'react-router-dom';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';
import { useQuery } from '@tanstack/react-query';
import { getFriendRequest } from '../lib/api';

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const { logoutMutation } = useLogout();

    const { data: friendRequests } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequest,
        enabled: !!authUser,
        refetchInterval: 10000,
    });

    const unreadPending = friendRequests?.pendingRequest?.filter(r => r.isRead === false).length || 0;
    const unreadAccepted = friendRequests?.acceptedRequest?.filter(r => r.isRead === false).length || 0;
const totalUnread = unreadPending + unreadAccepted;
    return (
        <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex items-center gap-2.5">
                        {isChatPage && (
                            <Link to="/" className="flex items-center gap-2.5">
                                <ShipWheelIcon className="size-9 text-primary" />
                                <span className="hidden sm:inline text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                    Streamify
                                </span>
                            </Link>
                        )}
                    </div>

                    <div className='flex items-center gap-2 sm:gap-4'>
                        <Link to={"/Notifications"} className="relative inline-flex items-center">
                            <button className='btn btn-ghost btn-circle'>
                                <BellIcon className='h-6 w-6 text-base-content opacity-70' />
                            </button>
                            {/* BADGE: Sirf tab dikhega jab unread notifications hongi */}
                            {totalUnread > 0 && (
                         <span className="absolute top-2 right-2 bg-error text-error-content text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-base-200">
                           {totalUnread}
                        </span>
                           )}
                        </Link>
                        <ThemeSelector />
                        <div className='avatar'>
                            <div className='w-9 rounded-full border border-base-300'>
                                <img src={authUser?.profilePic || "/default-avatar.png"} alt="User Avatar" />
                            </div>
                        </div>
                        <button className='btn btn-ghost btn-circle' onClick={() => logoutMutation()}>
                            <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;