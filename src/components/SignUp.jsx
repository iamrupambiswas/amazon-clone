import { useState, useEffect } from 'react';
import amazonLogo from '../assets/amazon-logo-signIn.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useStateValue } from './StateProvider';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [, dispatch] = useStateValue();   
    const navigate = useNavigate();

    // Handle user signup
    const handleSignUp = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        try {
            // Create a new user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's displayName in Firebase Authentication
            await updateProfile(user, {
                displayName: name,
            });

            // Dispatch user data to global state after successful sign up
            dispatch({
                type: 'SET_USER',
                user: {
                    displayName: name,
                    email: user.email,
                },
            });

            navigate('/');  // Navigate to the home page after sign-up
        } catch (err) {
            setError('Failed to create your account. Please check your credentials.');
            console.error(err);
        }
    };

    // Check authentication state and update the global user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                dispatch({
                    type: 'SET_USER',
                    user: {
                        displayName: authUser.displayName || 'Guest',
                        email: authUser.email,
                    },
                });
            } else {
                dispatch({
                    type: 'SET_USER',
                    user: null,  // Set user to null if logged out
                });
            }
        });

        return () => unsubscribe();  // Cleanup on component unmount
    }, [dispatch]);

    return (
        <div className="bg-white min-h-screen w-full flex flex-col items-center">
            <Link to="/">
                <div className="m-2">
                    <img src={amazonLogo} alt="Amazon Logo" className="w-24" />
                </div>
            </Link>

            <div className="border border-gray-300 rounded p-4 w-[300px] flex flex-col gap-2">
                <p className="font-bold text-2xl mb-2">Create Account</p>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <div className="flex flex-col gap-2">
                    <div>
                        <label className="font-amazonEmberMedium block text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-black p-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        className="w-full bg-[#ffd814] hover:bg-[#e6c213] rounded-sm text-xs p-1"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>

                <hr />

                <div className="my-1 flex flex-col gap-4">
                    <p className="text-xs">
                        Already have an account? 
                        <a href="/signin" className="text-[#0066c0] hover:underline hover:text-[#c45500]"> Sign in</a>
                    </p>
                    <p className="text-xs">
                        By continuing, you agree to Amazon's 
                        <a className="text-[#0066c0] hover:underline hover:text-[#c45500]"> Conditions of Use </a> 
                        and 
                        <a className="text-[#0066c0] hover:underline hover:text-[#c45500]"> Privacy Notice</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
