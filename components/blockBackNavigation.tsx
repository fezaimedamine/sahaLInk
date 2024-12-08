"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client"; 

// Component to block the browser's back navigation and handle logout
const BlockBackNavigation = () => {
  // Hook to navigate programmatically within Next.js
  const router = useRouter();
  // State to manage visibility of the logout confirmation modal
  const [showModal, setShowModal] = useState(false);

   /**
   * Handles the back button event by preventing the default behavior,
   * maintaining the current URL, and displaying a modal.
   * @param {PopStateEvent} e - The popstate event triggered by back navigation.
   */
  const handlePopState = (e: PopStateEvent) => {
    e.preventDefault(); 
    window.history.pushState(null, "", window.location.href);
    // Display the logout confirmation modal
    setShowModal(true); 
  };

  /**
   * Logs out the user by signing out from Supabase and redirecting to the home page.
   */
  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    // Redirect to home page and Refresh the router to reset state
    router.push("/"); 
    router.refresh(); 
  };

  /**
   * Effect to set up and clean up the back navigation event listener.
   */
  useEffect(() => {
    // Push the current state to prevent back navigation when the component mounts
    window.history.pushState(null, "", window.location.href);

    // Add event listener for the back navigation event
    window.addEventListener("popstate", handlePopState);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
       {/* Modal displayed when the user attempts to navigate back */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-center mb-4">Do you want to log out?</h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
                onClick={() => setShowModal(false)}
              >
                No 
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockBackNavigation;
