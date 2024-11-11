import { useState, useEffect } from 'react';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // This ensures the year updates when the component mounts
        const interval = setInterval(() => {
            setCurrentYear(new Date().getFullYear());
        }, 1000);

        return () => clearInterval(interval); // Cleanup the interval when component unmounts
    }, []);

    return (
        <div className="w-full bg-gray-900 text-white flex flex-col items-center p-6">
            <div className="w-full max-w-screen-lg flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-10">
                {/* Left Column */}
                <div className="flex flex-col items-start">
                    <h2 className="font-amazonEmberLight2 text-xl mb-2">Connect With Me</h2>
                    <div className="flex space-x-4">
                        <a href="https://www.linkedin.com/in/iamrupambiswas" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">LinkedIn</a>
                        <a href="https://twitter.com/iamrupambiswas" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a>
                        <a href="https://github.com/iamrupambiswas" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">GitHub</a>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-start">
                    <h2 className="font-amazonEmberLight2 text-xl mb-2">Quick Links</h2>
                    <div className="flex space-x-4">
                        <a href="/about" className="hover:text-gray-400">About</a>
                        <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
                        <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Bottom Section (Rights Reserved) */}
            <div className="w-full text-center mt-6">
                <p className="text-sm text-gray-400">&copy; {currentYear} {`Rupam Biswas`} | Made with ❤️</p>
            </div>
        </div>
    );
};

export default Footer;
