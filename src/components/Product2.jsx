import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { homeEssentialsImages, gamingImages, fashionImages, kitchenImages } from "../assets/ImageData";

const API_URL = "https://real-time-amazon-data.p.rapidapi.com/search";

export const Product = () => {
    const { name } = useParams();
    const [{ basket, user }, dispatch] = useStateValue();

    // State to manage product data and loading/error states
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFallback, setIsFallback] = useState(false);

    const addToBasket = (product) => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: { ...product },
        });
    };

    const allProducts = [
        ...homeEssentialsImages,
        ...gamingImages,
        ...fashionImages,
        ...kitchenImages,
    ];

    // Fetch product data when component mounts
    useEffect(() => {
        const fetchProductData = async () => {
            if (!API_URL) {
                // If API_URL is not defined, skip the API call and show fallback data
                console.log("API URL not defined, using fallback data.");
                const fallbackProduct = allProducts.find(
                    (product) => product.name.toLowerCase() === name.toLowerCase()
                );
                setProducts(fallbackProduct ? [fallbackProduct] : []); // Store fallback product or empty array
                setIsFallback(true);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null); // Reset any previous errors
                setIsFallback(false);

                const headers = {
                    'x-rapidapi-key': "b9166633cdmshceba72a0b61f461p1500c6jsndd599ae6b431",
                    'x-rapidapi-host': "real-time-amazon-data.p.rapidapi.com"
                };

                // Make the API call with headers
                const response = await fetch(`${API_URL}?query=${name}`, { method: "GET", headers });
                if (!response.ok) {
                    throw new Error("Product not found or API error");
                }
                const data = await response.json();
                console.log("API response: ", data);

                // Check if products exist and set the products list to state
                if (data && Array.isArray(data.data.products)) {
                    setProducts(data.data.products); // Store the list of products in state
                } else {
                    setError("No products found for this search query");
                }
            } catch (err) {
                setError(err.message); // Store the error message
                console.log("Error fetching API:", err.message);

                // Fallback to local image data if API fails
                const fallbackProduct = allProducts.find(
                    (product) => product.name.toLowerCase() === name.toLowerCase()
                );
                setProducts(fallbackProduct ? [fallbackProduct] : []); // Store fallback product or empty array
                setIsFallback(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [name]); // Re-fetch data if product name changes

    // If the products are loading, show a loading message
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <div className="flex-grow flex justify-center items-center">
                    <h2 className="text-xl text-gray-700">Loading...</h2>
                </div>
            </div>
        );
    }

    // If products are found, display them
    return (
        <div className="flex flex-wrap gap-5 justify-center">
            {products.length > 0 ? (
                products.map((product) => (
                    <div
                        key={product.product_id || product.name}
                        className="m-4 max-w-xs bg-white p-3 flex flex-col justify-between items-center border border-gray-300 hover:shadow-xl transition-shadow duration-300 rounded-lg"
                    >
                        <div className="flex flex-col items-center mb-3">
                            <h1 className="font-amazonEmberLight2 text-sm text-center mb-1">
                                {product.product_title || product.name || "No description available"}
                            </h1>
                            <p className="mb-2 text-center">
                                {Array.from({ length: 5 }, (_, index) =>
                                    index < (product.product_star_rating || product.rating || 0) ? "⭐" : "☆"
                                ).join("")}
                            </p>
                            <p className="font-amazonEmberBold text-base text-center">
                                <strong>
                                    {product.product_price || product.price || "Price not available"}
                                </strong>
                            </p>
                        </div>

                        <img
                            className="w-48 h-48 object-cover mb-3 rounded-lg"  // Further reduced image size
                            src={product.product_photo || product.src || "fallback-image.jpg"}
                            alt={product.product_title || product.name || "Product Image"}
                        />

                        <button
                            className="font-amazonEmberLight2 bg-yellow-300 rounded-lg px-3 py-1.5 w-full hover:bg-yellow-500 transition duration-200 mt-auto"
                            onClick={() => addToBasket(product)}
                        >
                            Add to Cart
                        </button>
                        {isFallback && (
                            <div className="text-xs mt-2 text-red-600">
                                Due to API error, the product list is not visible!
                            </div>
                        )}
                    </div>

                ))
            ) : 
            (
                <div className="flex-grow flex justify-center items-center">
                    <h2 className="text-xl text-gray-700">No products available</h2>
                </div>
            )}
        </div>
    );
};
