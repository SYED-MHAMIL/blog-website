"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import { auth } from "@/firebase/firebaseAuth";

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState<string | null>(null);
  const [message, setmessage] = useState<string | null>(null);
  const router = useRouter();
  // const passchangeRouter=useRouter();

  const handlePasswordCahnge = async (e: React.FormEvent) => {
    e.preventDefault();

    seterror(null);
    setmessage(null);

    if (newPassword !== confirmPassword) {
      seterror("New password do not match ");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        setmessage("password Changed succesfully");
        setCurrentPassword("");
        setNewPassword("");
        setconfirmPassword("");

        router.push("/dashboard");
      } else {
        seterror("No user currently sign in.");
      }
    } catch (error) {
      if (error instanceof Error) {
        seterror(error.message);
      } else {
        seterror("An unknown error occurred");
      }
      //
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-gray-600 to-black flex justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Change Password
          </h2>
          <form onSubmit={handlePasswordCahnge} className="space-y-6 ">
            <div>
              <label
                htmlFor="currentPassword "
                className="text-sm font-medium block mb-2 text-gray-300 "
              >
                Current Password
                <input
                  type="password"
                  id="currentPassword "
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="NewPassword"
                className="text-sm font-medium block mb-2 text-gray-300 "
              >
                New Password
                <input
                  type="password"
                  id="NewPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium block mb-2 text-gray-300 "
              >
                Confirm New Password
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                  className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white"
                />
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <button className="w-full  flex justify-center py-2 px-4 border text-sm font-medium border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
