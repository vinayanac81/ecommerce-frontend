import React, { useEffect, useState } from 'react'
import LeftLayout from '../../Components/Admin/LeftLayout'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../../Constants'

const Coupen = () => {
    const navigate=useNavigate()
    const [coupens, setcoupens] = useState([])
    const handleNavigate=()=>{
        navigate("/admin/add-coupen")
    }
    const getCoupens=async()=>{
        try {
            const {data}=await AxiosInstance.get("/admin/get-coupens")
            if(data.success){
setcoupens(data?.coupens)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getCoupens()
    },[])
    console.log(coupens);
  return (
    <div>
    <div x-data="setup()" class="{ 'dark': isDark }">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
          <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
            <img
              className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
              src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
            />
            <span className="hidden md:block">ADMIN</span>
          </div>
          <div className="flex justify-between items-center h-14 bg-blue-800 dark:bg-gray-800 header-right">
            <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
              <button className="outline-none focus:outline-none">
                <svg
                  className="w-5 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                type="search"
                name
                id
                placeholder="Search"
                className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
              />
            </div>
            <ul className="flex items-center">
              <li>
                <button
                  aria-hidden="true"
                  click="toggleTheme"
                  className="group p-2 transition-colors duration-200 rounded-full shadow-md bg-blue-200 hover:bg-blue-200 dark:bg-gray-50 dark:hover:bg-gray-200 text-gray-900 focus:outline-none"
                >
                  <svg
                    x-show="isDark"
                    width={24}
                    height={24}
                    className="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <svg
                    x-show="!isDark"
                    width={24}
                    height={24}
                    className="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700" />
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center mr-4 hover:text-blue-100"
                >
                  <span className="inline-flex mr-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <LeftLayout active="coupon" />
        <div className="h-full  flex flex-col ml-14 mt-14 mb-10 md:ml-64">
            <div className="flex px-7 py-10">
                <button onClick={handleNavigate} className='bg-emerald-400 rounded hover:bg-emerald-700 px-5 py-2 '>Add coupen</button>

            </div>
            <div className="mt-4 mx-4">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">Coupon Name</th>
                        <th className="px-4 py-3">Coupon Code</th>
                        <th className="px-4 py-3">Discount percentage</th>
                        <th className="px-4 py-3">Minimum purchase amount</th>
                        <th className="px-4 py-3">Maximum discount</th>
                        <th className="px-4 py-3">Create date</th>  
                        <th className="px-4 py-3">Expiry date</th> 
                        <th className="px-4 py-3"></th> 
                        <th className="px-4 py-3"></th>                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {coupens.map((coupen) => {
                        return (
                          <>
                            <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                             
                              <td className="px-4 py-3 text-sm">{coupen?.name.toUpperCase()}</td>
                              <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                  {coupen?.code}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">{coupen?.discount}%</td>
                              <td className="px-4 py-3 text-sm">{coupen?.min_amount}</td>
                              <td className="px-4 py-3 text-sm">{coupen?.max_discount}</td>
                              <td className="px-4 py-3 text-sm">{coupen?.create_date.slice(0,10)}</td>
                              <td className="px-4 py-3 text-sm">{coupen?.expiry_date.slice(0,10)}</td>
                              <td className="px-4 py-3 text-sm">
                                <button className='px-4 py-2 bg-blue-800 rounded'>Edit</button>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button className='px-4 py-2 bg-emerald-800 rounded'>Delete</button>
                              </td>
                              
                            </tr>
                          </>
                        );
                      })}

                
                    
                  
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Coupen