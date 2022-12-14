import Image from "next/image"
import {SearchIcon, GlobeAltIcon, UserCircleIcon, UsersIcon, MenuIcon } from '@heroicons/react/solid'
import { useState } from "react"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from 'react-date-range';
import {useRouter} from "next/dist/client/router";

const Header = ({placeholder}) => {
  const [searchInput, setsearchInput]=useState("");
  const[startDate, setstartDate]=useState(new Date());
  const[endDate, setendDate]=useState(new Date());
  const[noOfGuests, setnoOfGuests]=useState(1);
  const router= useRouter();

  const handleSelect=(ranges)=>{
    setstartDate(ranges.selection.startDate);
    setendDate(ranges.selection.endDate);
  }

  const resetInput=()=>{
    setsearchInput("")
  }

  const search=()=>{
    router.push({
      pathname:"/search",
      query:{
        location:searchInput,
        startDate:startDate.toString(),
        endDate: endDate.toString(),
        noOfGuests,
      },
    });
  };

  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection'
  };



  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10 my-auto">
        <div onClick={()=> router.push("/")} className="relative flex mt-1 items-center h-10 cursor-pointer"> 
        <Image src='https://links.papareact.com/qd3' layout="fill" objectFit="contain" objectPosition="left"/> 
        </div>
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
          <input value={searchInput} onChange={(e)=>setsearchInput(e.target.value)} className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400" type="text" placeholder={placeholder || "Start your Search"}/>
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
        </div>
        <div className="flex items-center space-x-4 justify-end text-gray-500 ">
            <p className="hidden md:inline">
                Become a Host
            </p>
            <GlobeAltIcon className="h-6 cursor-pointer "/>
            <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                <MenuIcon className="h-6"/>
                <UserCircleIcon className="h-6"/>
            </div>
        </div>
        {searchInput &&(
          <div className="flex flex-col col-span-3 mx-auto ">
              <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
              />
            <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5"/>
              <input 
              value={noOfGuests}
              onChange={(e)=>setnoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400 bg-gray-100"/>
            </div>
            <div className="flex">
              <button onClick= {resetInput} className=" flex-grow text-gray-500 hover:text-white hover:bg-red-400 rounded-[4px] hover:scale-110 transform transition duration-100 ease-out">Cancel</button>
              <button onClick={search} className=" flex-grow text-red-400 hover:text-white hover:bg-red-400 rounded-[4px] hover:scale-110 transform transition duration-100 ease-out">Search</button>
            </div>
          </div>
        )}
    </header>
  )
}

export default Header