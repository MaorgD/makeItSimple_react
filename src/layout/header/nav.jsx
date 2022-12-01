import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router-dom"
import { TOKEN_NAME, TOKEN_RES_ID } from '../../services/servise'
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { removeInfo } from '../../featchers/restaurantSlice';
const navigation = [
    { name: 'App Page', href: 'App' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]
const Nav = () => {
    const dispatch = useDispatch();

    // const userInfo = useSelector(state => state.restaurantSlice.user)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const nav = useNavigate();
    const onLogOut = () => {
        // מחיקת טוקן
        if (window.confirm("Are you sure you want to logout ?")) {
            localStorage.removeItem(TOKEN_NAME)

            localStorage.removeItem(TOKEN_RES_ID)
            // localStorage.removeItem(TOKEN_JOBS)
            // localStorage.removeItem(TOKEN_ID)
            dispatch(removeInfo());
            // console.log(userInfo)


            // להעביר לעמוד לוג אין
            nav("/");
        }
    }

    return (
        <div>
            <nav className="flex h-9 items-center justify-between" aria-label="Global">
                <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                    <Link to={'/'} className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="w-24 md:w-28 lg:w-38 p-2" src="https://res.cloudinary.com/dukiq0kql/image/upload/v1668959681/%D7%9E%D7%9E%D7%9E_efwhsl.png" alt="logo" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="font-semibold text-gray-900 hover:text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                    {localStorage.getItem(TOKEN_NAME) ?

                        <button className='inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20' onClick={onLogOut}>Log out</button>
                        :
                        <Link
                            to={'/login'}

                            className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                        >
                            Log in
                        </Link>
                    }
                </div>

            </nav>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                    <div className="flex h-9 items-center justify-between">
                        <div className="flex">
                            <Link to={'/'} className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-16"
                                    src="https://res.cloudinary.com/dukiq0kql/image/upload/v1668959681/%D7%9E%D7%9E%D7%9E_efwhsl.png"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {localStorage.getItem(TOKEN_NAME) ?
                                <div className="py-6">

                                    <button className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white hover:bg-red-600' onClick={onLogOut}>Log out</button>
                                </div>
                                :
                                <div className="py-6">
                                    <Link
                                        to={'/'}
                                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                    >
                                        Log in
                                    </Link>
                                </div>}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default Nav