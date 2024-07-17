import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { ModeToggle } from "@/components/toggle";
import { ThemeProvider } from "@/components/theme"; // Import your ThemeProvider
import Logo from "./logo";


const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <ThemeProvider> {/* Ensure ThemeProvider wraps your components */}
      <div className="flex justify-between items-center p-4 shadow-sm">
        <Logo/>
        {/* <Link to={"/about"} className='hover:bg-black hover:text-white p-1 px-2 rounded-sm dark:hover:bg-gray-700 dark:text-white'>About</Link> */}
        {/* Conditional rendering based on user sign-in status */}
        {isSignedIn ? (
          <div className="flex gap-4 items-center">
            <Link to={'/dashboard'}>
            <Button variant="outline" className="dark:bg-white dark:text-black dark:hover:bg-gray-800 dark:hover:text-white">
              Dashboard
            </Button>
            </Link>
            <ModeToggle />
            <UserButton />
          </div>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Header;
