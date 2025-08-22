"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";

export default function WelcomeAlert() {
  const { user } = useAuth();

  useEffect(() => {
    // Check if user just logged in (you might want to use sessionStorage or a more sophisticated state management)
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    
    if (user && !hasShownWelcome) {
      // Very small delay to ensure page is loaded
      const timer = setTimeout(() => {
        Swal.fire({
          title: 'Welcome!',
          text: `Hi ${user.displayName || 'there'}!`,
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#4F46E5',
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        
        // Mark that welcome has been shown
        sessionStorage.setItem('welcomeShown', 'true');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return null; // This component doesn't render anything
}