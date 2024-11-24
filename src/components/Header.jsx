import React from "react";
import { IconButton, TextField } from "@mui/material";
import Amazon from "../assets/amazon.png";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue(); // Get user info from the global state
    const basketCount = basket.length;
    console.log(user);

    return (
        <div>
            <header className="bg-header-color py-2 px-4 flex items-center justify-between">
                <Link to="/">
                    <img src={Amazon} alt="Amazon Logo" className="h-7 mr-4" />
                </Link>

                <nav className="text-white flex items-end">
                    <div className="flex flex-col justify-between">
                        <div className="pb-1">
                            <LocationOnIcon className="text-white" fontSize="small" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs">Deliver to You</div>
                        <div className="font-bold text-sm">Bangalore, India</div>
                    </div>
                </nav>

                <div className="flex-grow mx-4">
                    <TextField
                        variant="outlined"
                        placeholder="Search Amazon"
                        size="small"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <div className="h-full flex items-center bg-orange-400 rounded-r-md">
                                    <IconButton className="p-0">
                                        <SearchIcon className="text-black" />
                                    </IconButton>
                                </div>
                            ),
                            style: { backgroundColor: 'white', borderRadius: '4px', padding: '0px' },
                        }}
                    />
                </div>

                <nav className="text-white flex space-x-6 items-center">
                    {user ? (
                        // Display user name if logged in
                        <div>
                            <div className="text-xs">Hello, {user.displayName}</div>
                            <div className="font-bold text-sm">Accounts & Lists</div>
                        </div>
                    ) : (
                        // Display login prompt if not logged in
                        <Link to="/signin">
                            <div>
                                <div className="text-xs">Hello, login</div>
                                <div className="font-bold text-sm">Accounts & Lists</div>
                            </div>
                        </Link>
                    )}

                    <div>
                        <div className="text-xs">return the goods</div>
                        <div className="font-bold text-sm">with order</div>
                    </div>

                    <Link to="/cart">
                        <div className="relative">
                            <IconButton>
                                <ShoppingCartIcon className="text-white" fontSize="large" />
                            </IconButton>
                            {basketCount > 0 && (
                                <span className="absolute top-0 right-0 bg-orange-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {basketCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </nav>
            </header>
        </div>
    );
}

export default Header;
