import React from "react";

const Signup = () => {
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return <div className="page signup">Signup</div>;
};

export default Signup;
