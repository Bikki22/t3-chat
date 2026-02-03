import { Button } from "@/components/ui/button";
import { currentUsers } from "@/modules/authentication/actions";
import UserButton from "@/modules/authentication/components/user-button";
import React from "react";

const HomePage = async () => {
  const user = await currentUsers();

  return (
    <div className="flex justify-center items-center h-screen">
      <UserButton user={user} />
    </div>
  );
};

export default HomePage;
