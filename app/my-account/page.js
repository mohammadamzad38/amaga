"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { updateUser } from "../../lib/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

const Page = () => {
  const { user, setUser } = useAuth();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [countrys, setCountrys] = useState([]);
  const [phone, setPhone] = useState(user?.mobile || "");
  const [about, setAbout] = useState(user?.about_me || "");
  const [country, setCountry] = useState(user?.country || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [company, setCompany] = useState(user?.company_name || "");
  const [firstName, setFirstName] = useState(user?.first_name || "");

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/positions",
        );

        const data = await res.json();

        const formattedCountries = data.data.map((c) => ({
          name: c.name,
        }));

        setCountrys(formattedCountries);
      } catch (error) {
        console.log(error);
      }
    };

    loadCountries();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user?.id) return;

    const payload = {
      first_name: firstName,
      last_name: lastName,
      company_name: company,
      mobile: phone,
      about_me: about,
      country: country,
      profile_image: user.profile_image,
    };

    try {
      const result = await updateUser(user.id, payload);

      if (!result.error) {
        toast.success("Profile updated successfully");
        const updatedUser = {
          ...user,
          ...payload,
        };

        setUser(updatedUser);

        const stored = JSON.parse(localStorage.getItem("agama_it_auth")) || {};

        localStorage.setItem(
          "agama_it_auth",
          JSON.stringify({
            ...stored,
            user: updatedUser,
          }),
        );
      } else {
        toast.error("Profile update failed");
      }
    } catch (err) {
      console.error("API error:", err);
      toast.error("Something went wrong");
    }
  };

  const handleImageUpload = (e) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto ">
      <div className="border-2 border-gray-100 shadow-sm rounded-xl p-4 mt-10">
        <div className="flex items-center justify-center">
          <Image
            src="/icon/adminlogin-logo.png"
            alt="admin-logo"
            width={300}
            height={300}
            className="w-18 h-18 object-contain"
          />
        </div>
        <p className="font-semibold mb-2 mt-4">My Account</p>
        <p className="text-sm">Profile Picture</p>

        <form onSubmit={handleUpdate} className="mt-4 space-y-5">
          <div className="flex flex-col items-center gap-3">
            {preview && (
              <div className="w-28 h-28 rounded-full overflow-hidden border">
                <Image
                  src={preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
            )}
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm border w-full px-10 py-4 border-dashed cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none"
            />

            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none"
            />
          </div>

          <input
            name="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none"
          />

          <input
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none"
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none"
          >
            <option value="">Select Country</option>
            {countrys.map((item, idx) => (
              <option key={idx} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <textarea
            name="about"
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About Me"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 outline-none resize-none"
          />


          <button
            type="submit"
            className="bg-[#1DBF74] hover:bg-green-600 w-full cursor-pointer text-white hover:text-black font-semibold px-8 py-3 rounded-lg transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
