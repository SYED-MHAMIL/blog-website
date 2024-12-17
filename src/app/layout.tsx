
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/header/footer";


export const metadata: Metadata = {
  title: "Blog.ai",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body data-theme="light">

              <Header/>
              <ToastContainer />
               {children}
             <Footer />
      
        
        </body>
    </html>
  );
}
