import React from 'react'

const Dash = () => {
  return (
    <div>
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">SL NO</th>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Barand Name</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 text-center py-3">Option</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  <>
                    <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold"></p>
                            {/* <p className="text-xs text-gray-600 dark:text-gray-400">10x Developer</p> */}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div
                          className="relative hidde w-20 h-20
                                 mr-3 rounded-full md:block"
                        >
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src=""
                            alt
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight "></span>
                      </td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 flex h-28 flex-col md:flex-row justify-center items-center   md:flex gap-2 text-sm">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800">
                          Delete
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800">
                          View
                        </button>
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>

            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span className="flex items-center col-span-3"> Showing</span>
              <span className="col-span-2" />
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul className="inline-flex items-center">
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>

                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"></button>
                    </li>

                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dash