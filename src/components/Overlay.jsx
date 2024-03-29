import React from 'react'
import { VscHubot } from 'react-icons/vsc'

const Overlay = ({setShowOverlay}) => {
   return (
    <div className='absolute min-h-screen w-full flex items-center justify-center z-50 bg-slate-800/80 bg-blend-overlay'>
        <div className='p-5 lg:w-[40vw] w-[70vw] min-h-[30vh] bg-[#3a3f49] text-white rounded-md shadow-xl'>
            <div className="relative overflow-x-auto">
                <div className='flex items-center gap-4 mb-4'>
                    <span className='kbd' onClick={() => setShowOverlay(false)}>ESC</span>
                    <p className='text-slate-50 text-xl'>KeyBoard Shortcuts</p>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Command
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Key Bindings
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Toggle Explorer
                            </th>
                            <td className="px-6 py-4">
                                Ctrl + B
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Toggle Output Pane
                            </th>
                            <td className="px-6 py-4">
                                Ctrl + O
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span className='flex gap-1 items-center'>Toggle Chat <VscHubot size={20} /></span>
                            </th>
                            <td className="px-6 py-4">
                                Ctrl + E
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span className='flex gap-1 items-center'>Open Command Palette</span>
                            </th>
                            <td className="px-6 py-4">
                                Ctrl + P
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Save File
                            </th>
                            <td className="px-6 py-4">
                                Ctrl + S
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Close File
                            </th>
                            <td className="px-6 py-4">
                                Ctrl + Q
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
   )
}

export default Overlay