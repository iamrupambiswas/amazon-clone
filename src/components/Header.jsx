import { IconButton, TextField } from "@mui/material";
import Amazon from "../assets/amazon.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
    return (
        <header className="bg-gray-800 p-4 flex items-center justify-between">
            <img src={Amazon} alt="Amazon Logo" className="h-9 mr-4"/>

            <div className="flex-grow mx-4">
                <TextField
                    variant="outlined"
                    placeholder="Search Amazon"
                    size="small"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <div className="h-full flex items-center bg-orange-500 rounded-r-md">
                                <IconButton className="p-0">
                                    <SearchIcon className="text-black" />
                                </IconButton>
                            </div>
                        ),
                        style: { backgroundColor: 'white', borderRadius: '4px', padding: '0px' },
                    }}
                />
            </div>

            <nav className="text-white flex space-x-6">
                <div>
                    <div className="text-sm">Hello, login</div>
                    <div className="font-bold">Accounts & Lists</div>
                </div>

                <div>
                    <div className="text-sm">return the goods</div>
                    <div className="font-bold">with order</div>
                </div>

                <IconButton>
                    <ShoppingCartIcon className="text-white" fontSize="large"/>
                </IconButton>
            </nav>
        </header>
    )
}

export default Header;