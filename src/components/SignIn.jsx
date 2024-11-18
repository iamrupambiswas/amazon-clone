import { useState } from 'react';
import amazonLogo from '../assets/amazon-logo-signIn.png'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useStateValue } from './StateProvider'; // Import useStateValue to access and dispatch global state

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [, dispatch] = useStateValue(); // Get dispatch function to update global state

    const handleSignIn = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const displayName = user.displayName;

            dispatch({
                type: 'SET_USER',
                user: {
                    displayName: displayName || 'Guest',
                    email: user.email,
                },
            });

            navigate('/'); // Redirect to homepage after successful login
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="bg-white min-h-screen w-full flex flex-col items-center">
            <Link to="/">
                <div className="m-2">
                    <img src={amazonLogo} alt="Amazon Logo" className="w-24" />
                </div>
            </Link>

            <div className="border border-gray-300 rounded p-4 w-[300px] flex flex-col gap-2">
                <p className="font-bold text-2xl mb-2">Sign-in</p>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <div className="flex flex-col gap-2">
                    <div>
                        <label className="font-amazonEmberMedium block text-sm">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="w-full border border-black p-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-amazonEmberMedium block text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-black p-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        className="w-full bg-[#f0c14b] hover:bg-[#d6aa3e] border border-black rounded-sm text-xs p-1"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                </div>
                <div className="my-1">
                    <p className="text-xs">
                        By continuing, you agree to Amazon's
                        <a className="text-[#0066c0] hover:underline hover:text-[#c45500]">
                            Conditions of Use
                        </a> 
                        and
                        <a className="text-[#0066c0] hover:underline hover:text-[#c45500]">
                            Privacy Notice
                        </a>.
                    </p>
                </div>
                <div>
                    <button
                        className="w-full bg-[#efefef] hover:bg-[#d6d6d6] border border-gray-400 rounded-sm text-xs p-1"
                        onClick={() => navigate('/signup')}
                    >
                        Create your Amazon Account
                    </button>
                </div>
            </div>
        </div>
    );
}
