import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offers: true,
        regularPrice: 0,
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
        images: [],
    });

    const {
        type,
        name,
        bedrooms,
        bathrooms,
        furnished,
        parking,
        address,
        description,
        offers,
        regularPrice,
        discountedPrice,
        latitude,
        longitude,
        images,
    } = formData;

    function handleChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }));
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        if (discountedPrice >= regularPrice) {
            setLoading(false);
            toast.error("Discounted price needs to be less than regular price");
            return;
        }

        if (images.length > 6) {
            setLoading(false);
            toast.error("Maximum 6 images allowed");
            return;
        }

        let geolocation = {};
        let location;
        if (geolocationEnabled) {
        }
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Create a Listing
            </h1>
            <form onSubmit={handleSubmit}>
                <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                <div className='flex'>
                    <button
                        type='button'
                        id='type'
                        value='sale'
                        onClick={handleChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            type === "rent"
                                ? "bg-white"
                                : "bg-slate-600 text-white"
                        }`}>
                        sell
                    </button>
                    <button
                        type='button'
                        id='type'
                        value='rent'
                        onClick={handleChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            type === "sale"
                                ? "bg-white"
                                : "bg-slate-600 text-white"
                        }`}>
                        rent
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold '>Name</p>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='Property Name'
                    maxLength={32}
                    minLength={10}
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />
                <div className='flex space-x-6 mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Beds</p>
                        <input
                            type='number '
                            id='bedrooms'
                            value={bedrooms}
                            onChange={handleChange}
                            min={1}
                            max={50}
                            required
                            className='w-full text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                        />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Baths</p>
                        <input
                            type='number '
                            id='bathrooms'
                            value={bathrooms}
                            onChange={handleChange}
                            min={1}
                            max={50}
                            required
                            className='w-full text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                        />
                    </div>
                </div>
                <p className='text-lg mt-6 font-semibold'>Parking spot</p>
                <div className='flex'>
                    <button
                        type='button'
                        id='parking'
                        value={true}
                        onClick={handleChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            !parking ? "bg-white" : "bg-slate-600 text-white"
                        }`}>
                        yes
                    </button>
                    <button
                        type='button'
                        id='parking'
                        value={false}
                        onClick={handleChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            parking ? "bg-white" : "bg-slate-600 text-white"
                        }`}>
                        no
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Furnished</p>
                <div className='flex'>
                    <button
                        type='button'
                        id='furnished'
                        value={true}
                        onClick={handleChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            !furnished ? "bg-white" : "bg-slate-600 text-white"
                        }`}>
                        yes
                    </button>
                    <button
                        type='button'
                        id='furnished'
                        value={false}
                        onClick={handleChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            furnished ? "bg-white" : "bg-slate-600 text-white"
                        }`}>
                        no
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold '>Address</p>
                <textarea
                    type='text'
                    id='address'
                    value={address}
                    onChange={handleChange}
                    placeholder='Address'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />
                {!geolocationEnabled && (
                    <div className='flex space-x-6 justify-start mb-6'>
                        <div className=''>
                            <p className='text-lg font-semibold'>Latitude</p>
                            <input
                                type='number'
                                id='latitude'
                                value={latitude}
                                onChange={handleChange}
                                required
                                min={-90}
                                max={90}
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'
                            />
                        </div>
                        <div className=''>
                            <p className='text-lg font-semibold'>Longitude</p>
                            <input
                                type='number'
                                id='longitude'
                                value={longitude}
                                onChange={handleChange}
                                required
                                min={-180}
                                max={180}
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'
                            />
                        </div>
                    </div>
                )}
                <p className='text-lg font-semibold '>Description</p>
                <textarea
                    type='text'
                    id='description'
                    value={description}
                    onChange={handleChange}
                    placeholder='Description'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />
                <p className='text-lg font-semibold'>Offers</p>
                <div className='flex mb-6'>
                    <button
                        type='button'
                        id='offers'
                        value={true}
                        onClick={handleChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            !offers ? "bg-white" : "bg-slate-600 text-white"
                        }`}>
                        yes
                    </button>
                    <button
                        type='button'
                        id='offers'
                        value={false}
                        onClick={handleChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            offers ? "bg-white" : "bg-slate-600 text-white"
                        }`}>
                        no
                    </button>
                </div>
                <div className='flex items-center mb-6'>
                    <div className=''>
                        <p className='text-lg font-semibold'>Regular Price</p>
                        <div className='flex w-full justify-center items-center space-x-6'>
                            <input
                                type='number'
                                id='regularPrice'
                                value={regularPrice}
                                onChange={handleChange}
                                min={50}
                                max={400000000}
                                required
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded  transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                            />
                            {type === "rent" && (
                                <div className=''>
                                    <p className='text-md w-full whitespace-nowrap'>
                                        $ / Month
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {offers && (
                    <div className='flex items-center mb-6'>
                        <div className=''>
                            <p className='text-lg font-semibold'>
                                Discount Price
                            </p>
                            <div className='flex w-full justify-center items-center space-x-6'>
                                <input
                                    type='number'
                                    id='discountedPrice'
                                    value={discountedPrice}
                                    onChange={handleChange}
                                    min={50}
                                    max={400000000}
                                    required={offers}
                                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded  transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                                />
                                {type === "rent" && (
                                    <div className=''>
                                        <p className='text-md w-full whitespace-nowrap'>
                                            $ / Month
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className='mb-6'>
                    <p className='text-lg font-semibold'>Image</p>
                    <p className='text-gray-600'>
                        The first image will be the cover (max 6)
                    </p>
                    <input
                        type='file'
                        id='images'
                        onChange={handleChange}
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                        className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out'
                    />
                </div>
                <button
                    type='submit'
                    className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                    Create Listing
                </button>
            </form>
        </main>
    );
}

export default CreateListing;
