import { User, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Navigation Component
const Navigation = ({ user }: { user: User | null }) => (
    <nav className="flex items-center justify-between gap-4">
        <Link href={route('home')} className="inline-block rounded-sm px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
            <h1 className="text-2xl font-bold">FocusForge</h1>
        </Link>
        {user ? (
            <Link
                href={route('dashboard')}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
                Dashboard
            </Link>
        ) : (
            <div className="flex items-center gap-4">
                <Link
                    href={route('login')}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Log in
                </Link>
                <Link
                    href={route('register')}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Register
                </Link>
            </div>
        )}
    </nav>
);

// Feature Item Component
interface FeatureItemProps {
    icon: React.ReactNode;
    text: string;
    bgColor: string;
    textColor: string;
    darkBgColor: string;
    darkTextColor: string;
}

const FeatureItem = ({ icon, text, bgColor, textColor, darkBgColor, darkTextColor }: FeatureItemProps) => (
    <li className="flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor} ${darkBgColor}`}>
            <span className={`h-4 w-4 ${textColor} ${darkTextColor}`}>
                {icon}
            </span>
        </span>
        <span>{text}</span>
    </li>
);

// Features List Component
const FeaturesList = () => (
    <div className="mb-8">
        <h2 className="mb-4 font-medium">Key Features:</h2>
        <ul className="space-y-4">
            <FeatureItem 
                icon={
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                }
                text="Create and organize tasks with ease"
                bgColor="bg-blue-100"
                textColor="text-blue-600"
                darkBgColor="dark:bg-blue-900"
                darkTextColor="dark:text-blue-300"
            />
            <FeatureItem 
                icon={
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                text="Set due dates and reminders"
                bgColor="bg-green-100"
                textColor="text-green-600"
                darkBgColor="dark:bg-green-900"
                darkTextColor="dark:text-green-300"
            />
            <FeatureItem 
                icon={
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                }
                text="Collaborate with team members"
                bgColor="bg-purple-100"
                textColor="text-purple-600"
                darkBgColor="dark:bg-purple-900"
                darkTextColor="dark:text-purple-300"
            />
        </ul>
    </div>
);

// Call To Action Component
const CallToAction = () => (
    <div className="flex gap-4">
        <Link
            href={route('register')}
            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
            Get Started Free
        </Link>
        <a
            href="#features"
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
        >
            Learn More
        </a>
    </div>
);

// Hero Image Component
const HeroImage = () => (
    <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-500 to-purple-600 lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
        <div className="absolute inset-0 flex items-center justify-center">
            <img
                src="/image/task-manager-preview.png"
                alt="Task Manager Preview"
                className="w-4/5 rounded-lg shadow-xl"
            />
        </div>
        <div className="absolute inset-0 dark:bg-black/20"></div>
    </div>
);

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <Navigation user={auth.user} />
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-4 text-2xl font-bold">Manage Tasks Better</h1>
                            <p className="mb-6 text-[#706f6c] dark:text-[#A1A09A]">
                                A simple and powerful task management app to help you stay organized and get more done.
                            </p>
                            <FeaturesList />
                            <CallToAction />
                        </div>
                        <HeroImage />
                    </main>
                </div>
            </div>
        </>
    );
}
