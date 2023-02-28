"use client";
import { useState, useEffect } from "react";
import "./globals.css";

interface UserInterface {
  username: string;
  email: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserInterface | null | number>(1);
  function handleLogin() {
    setUser(1);
  }
  // if (user == null) {
  //   return (
  //     <html lang="en">
  //       <head />
  //       <body>
  //         <main className="flex min-h-screen items-center justify-center">
  //           <button
  //             className="bg-purple-800 text-white px-6 py-3 font-semibold cursor-pointer uppercase rounded"
  //             onClick={() => handleLogin()}
  //           >
  //             Log in
  //           </button>
  //         </main>
  //       </body>
  //     </html>
  //   );
  // }

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
