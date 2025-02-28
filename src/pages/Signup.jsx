import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const Signup = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if a session exists when the component mounts
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      console.log("Session:", data.session);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session); // Update session state when auth changes
      }
    );

    // Cleanup listener when component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/signup",
      },
    });

    if (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign-out error:", error);
    } else {
      setSession(null); // Clear session after sign-out
    }
  };

  return (
    <div className="page signup">
      {session ? (
        <div>
          <p style={{ textAlign: "center" }}>
            Welcome ✅ {session?.user?.email}
          </p>
          <button className="auth-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <button className="auth-btn" onClick={signIn}>
          GitHub Sign In
        </button>
      )}
    </div>
  );
};

export default Signup;
