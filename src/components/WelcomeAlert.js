"use client";
import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";

export default function WelcomeAlert() {
  const { user, loading } = useAuth();
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    // Only show welcome if:
    // 1. User is logged in
    // 2. Auth is not loading
    // 3. Haven't shown welcome yet in this component instance
    // 4. User has a valid email (indicating successful login)
    // 5. The login page cleared the welcomeShown flag (indicating fresh login)
    const welcomeShownInSession = sessionStorage.getItem('welcomeShown');
    
    if (user && !loading && !hasShownWelcome.current && user.email && !welcomeShownInSession) {
      // Very small delay to ensure page is loaded
      const timer = setTimeout(() => {
        Swal.fire({
          title: 'Welcome!',
          text: `Hi ${user.displayName || user.email}! Welcome to FlowerShop.`,
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#ed2353',
          timer: 2000,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        
        // Mark that welcome has been shown for this session
        hasShownWelcome.current = true;
        sessionStorage.setItem('welcomeShown', 'true');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  return null; // This component doesn't render anything
}