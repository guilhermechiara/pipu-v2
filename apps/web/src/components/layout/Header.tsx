"use client";

import { Search } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import Link from "next/link";
import HeaderLogo from '../../../public/images/pipu-header-logo-orange.png';
import Image from "next/image";
import { Input } from "@pipu/ui/components";

type HeaderItemProps = {
    to: string;
};

const HeaderDesktopLogo = () => {
    return (
        <Link
            href='/'
            className="flex items-center text-lg font-semibold md:text-base"
        >
            <Image
                src={HeaderLogo}
                width={131}
                height={38}
                alt="Pipu logo"
            />
        </Link>
    );
};

const HeaderSearchInput = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const showPlaceholder = !isFocused && !inputValue;

    return (
        <div className="relative w-full text-gray-900">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex justify-center items-center w-full">
                {showPlaceholder && (
                    <>
                        <Search className="h-5 w-5 text-orange-500 mr-2"/>
                        <span>Pesquise pelo nome, descrição ou responsável</span>
                    </>
                )}
            </div>
            <Input
                className="rounded-xl h-[40px] w-full bg-background border-0 focus-visible:ring-0"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputValue(e.target.value)}
                value={inputValue}
            />
        </div>
    );
};

const Header = () => {
    const isSignedIn = true;

    // const {isSignedIn} = useAuth();
    // const {logout} = useLogout();
    // const router = useRouter();

    // const handleLogout = () => {
    //     logout();
    //     router.navigate({to: '/login'});
    // };

    return (
        <header
            className={`sticky top-0 z-50 flex items-center gap-6 h-(--header-height) shadow-header px-4 ${isSignedIn ? 'bg-primary' : 'bg-background'}`}>
            <HeaderDesktopLogo/>
            {isSignedIn && (
                <>
                    <HeaderSearchInput/>
                </>
            )}
        </header>
    );
};

export { Header };
