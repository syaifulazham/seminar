import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';


import { FaHome } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";

import { TbLogout } from "react-icons/tb";
import { countries } from "@/lib/data";
import { getParticipantStats } from "@/lib/data";

import Link from "next/link";


export const ReturnHome = () => {
    return (
        <Link href="/admin">
            <div className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 bg-green-500 text-white text-sm">
                <FaHome /> 
                <span className="ml-2">Home</span>
            </div>
        </Link>
    );
};

export const GoStats = () => {
  return (
      <Link href="/admin/stats">
          <div className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 bg-blue-500 text-white text-sm">
              <IoIosStats /> 
              <span className="ml-2">Show Stats</span>
          </div>
      </Link>
  );
};

export const GoLogBook = () => {
  return (
      <Link href="/admin/logbook">
          <div className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 bg-purple-500 text-white text-sm">
              <IoPeopleSharp /> 
              <span className="ml-2">Visitors</span>
          </div>
      </Link>
  );
};

export const Logout = () => {
    const router = useRouter();
  
    const handleLogout = () => {
      // Clear the token from local storage or cookies
      localStorage.removeItem('token');
      
      // Redirect to the login page
      router.push('/admin/login');
    };
  
    return (
      <button
        onClick={handleLogout}
        className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 bg-red-500 text-white text-sm"
      >
        <TbLogout />
        <span className="ml-2">Logout</span>
      </button>
    );
  };


export type Country = {
  name: string;
  code: string;
};

type CountrySelectorProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectCountry?: (country: Country) => void;
};

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  onSelectCountry,
}) => {
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>([]);

  // Memoize the filtering logic for optimization
  const filtered = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
  }, [value]);

  // Update the filteredCountries whenever the input value changes
  useEffect(() => {
    setFilteredCountries(filtered);
  }, [filtered]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Handle country selection
  const handleSelectCountry = (country: Country) => {
    onChange(country.name); // Update the input value
    setFilteredCountries([]); // Close the dropdown
    if (onSelectCountry) {
      onSelectCountry(country); // Notify parent about the selected country
    }
  };

  return (
    <div className="country-selector">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Select a country"
        className="input"
      />

      {filteredCountries.length > 0 && (
        <ul className="dropdown">
          {filteredCountries.map((country) => (
            <li
              key={country.code}
              onClick={() => handleSelectCountry(country)}
              className="dropdown-item"
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



