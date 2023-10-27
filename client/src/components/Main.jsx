import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthProvider'

function Main() {
    const {user}=useContext(AuthContext)
  return (
    <div className="bg-[#1b1b1c] w-[100vw] min-h-[100vh] text-center">
      <h1 className='text-4xl text-green-400 font-bold p-5 mb-3'>Quiz Application</h1>
      <div className='text-start sm:w-10/12 md:w-8/12 xl:w-6/12 bg-[#222324] mx-auto overflow-auto outline-offset-1 scroll_bar rounded-3xl'>
        <li className='text-xl font-serif font-semibold m-4 text-slate-200'>You will be asked 10 questions one after another</li>
        <li className='text-xl font-serif font-semibold m-4 text-slate-200'>5 points is awarded for each correct answer</li>
        <li className='text-xl font-serif font-semibold m-4 text-slate-200'>More than one answer can be true</li>
        <li className='text-xl font-serif font-semibold m-4 text-slate-200'>You can review and change answers before the quiz finish</li>
        <li className='text-xl font-serif font-semibold m-4 text-slate-200'>The result will be declared at the end of the quiz</li>
      </div>

        {user ? <div className='m-8'>
            <div className="w-64 rounded-3xl bg-gray-500 p-3 text-teal-300 font-semibold shadow-2xl outline-none text-center mx-auto">
            {`welcome ${user.name}`}
            </div>
        </div> : <></>}

        <Link type="button" className="text-white mt-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" to="/quiz">Start Quiz</Link>
    </div>
  )
}

export default Main
