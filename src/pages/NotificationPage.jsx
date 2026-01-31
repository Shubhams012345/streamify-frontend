import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFriendRequest,
  acceptFriendRequest,
  markNotificationsAsRead,
} from "../lib/api";
import {
  BellIcon,
  UserCheckIcon,
  ClockIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
    
  });

  const { mutate: clearNotifications } = useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      // Sirf status update hoga, data delete nahi
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.pendingRequest || [];
  const acceptedNotifications = friendRequests?.acceptedRequest || [];

  // Check if there are any unread ones
  const hasUnread = [...incomingRequests, ...acceptedNotifications].some(
    (r) => !r.isRead,
  );

  useEffect(() => {
    if (hasUnread) {
      clearNotifications();
    }
  }, [hasUnread, clearNotifications]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {/* INCOMING REQUESTS */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  New Friend Requests
                </h2>
                <div className="grid gap-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className={`card border shadow-sm ${!request.isRead ? "bg-primary/5 border-primary/20" : "bg-base-200 border-base-300"}`}
                    >
                      <div className="card-body p-4 flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full">
                              <img
                                src={
                                  request.sender?.profilePic ||
                                  "/default-avatar.png"
                                }
                                alt="sender"
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold">
                              {request.sender?.fullName}
                            </h3>
                            <p className="text-xs opacity-70">
                              Wants to be your friend
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-sm px-6"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            "Accept"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}


            {/* ACCEPTED UPDATES (HISTORY) */}
            {acceptedNotifications.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  Recent Activity
                </h2>
                {/* ACCEPTED UPDATES (HISTORY) */}
<div className="grid gap-3">
  {acceptedNotifications.map((notification) => (
    <div 
      key={notification._id} 
      className={`card border transition-all duration-300 ${
        !notification.isRead 
          ? 'bg-success/5 border-success/20 shadow-sm shadow-success/10' 
          : 'bg-base-100 border-base-200 opacity-90'
      }`}
    >
      <div className="card-body p-4 flex-row items-center gap-4">
        {/* AVATAR SECTION */}
        <div className="avatar">
          <div className="w-12 h-12 rounded-full border border-base-300">
            <img 
              src={notification.recipient?.profilePic || "/default-avatar.png"} 
              alt="recipient" 
            />
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base leading-tight">
            <span className="font-bold text-base-content">
              {notification.recipient?.fullName}
            </span> 
            <span className="text-base-content/70 ml-1">
              accepted your request
            </span>
          </p>
          <div className="flex items-center gap-1 mt-1 text-[11px] font-medium text-success uppercase tracking-wider">
             <CheckCircle2Icon className="size-3" />
             <span>New Friend</span>
          </div>
        </div>

        {/* ACTION SECTION */}
        <div className="flex items-center gap-2">
          <Link to={`/chat/${notification.recipient?._id}`}>
            <button className="btn btn-primary btn-sm sm:btn-md h-9 min-h-0 px-4 normal-case font-semibold shadow-md hover:shadow-primary/20">
              <MessageSquareIcon className="size-4 mr-1.5 hidden sm:block" />
              Message
            </button>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
              </section>
            )}

            {incomingRequests.length === 0 &&
              acceptedNotifications.length === 0 && <NoNotificationsFound />}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
