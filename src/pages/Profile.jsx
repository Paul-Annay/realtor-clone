import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetails, setChangeDetails] = useState(false);

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    function handleLogout() {
        auth.signOut();
        navigate("/");
    }

    function handleChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit() {
        try {
            if (auth.currentUser.displayName !== name) {
                // Update the displayName in firebase auth
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });
                // Update the displayName in the firestore database
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    name,
                });
            }
            toast.success("Profile details updated successfully");
        } catch (error) {
            toast.error("Could not update the profile details");
        }
    }

    return (
        <>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    My Profile
                </h1>
                <div className='w-full md:w-[50%] mt-6 px-3'>
                    <form action=''>
                        <input
                            type='text'
                            id='name'
                            value={name}
                            disabled={!changeDetails}
                            onChange={handleChange}
                            name='name'
                            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out ${
                                changeDetails
                                    ? "bg-read-200 focus:bg-red-200"
                                    : "bg-white"
                            }`}
                        />

                        <input
                            type='email'
                            id='email'
                            value={email}
                            disabled
                            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'
                        />
                        <div className='flex justify-between whitespace-nowrap text-sm lg:text-lg mb-6'>
                            <p className='flex items-center'>
                                Do you want to change your name?{" "}
                                <span
                                    onClick={() => {
                                        changeDetails && handleSubmit();
                                        setChangeDetails(
                                            (prevState) => !prevState
                                        );
                                    }}
                                    className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1'>
                                    {changeDetails ? "Apply Changes" : "Edit"}
                                </span>
                            </p>
                            <p
                                onClick={handleLogout}
                                className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>
                                Sign Out
                            </p>
                        </div>
                    </form>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
                        on>
                        <Link
                            to='/create-listing'
                            className='flex justify-center items-center'>
                            <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
                            Sell or rent your home
                        </Link>
                    </button>
                </div>
            </section>
        </>
    );
}
