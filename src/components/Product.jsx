import { useParams } from "react-router-dom";
import { homeEssentialsImages, gamingImages, fashionImages, kitchenImages } from "../assets/ImageData";
import { useStateValue } from "./StateProvider";

export const Product = () => {
    const {name} = useParams();
    const [{ basket, user}, dispatch] = useStateValue();

    const addToBasket = (product) => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {...product}
        })
    }

    const allProducts = [
        ...homeEssentialsImages,
        ...gamingImages,
        ...fashionImages,
        ...kitchenImages
    ]

    const product = allProducts.find(product => product.name.toLowerCase() === name.toLowerCase());

    if(!product) {
        return <h2>Product not found!</h2>
    }

    return (
        <div className="m-5 max-w-xs bg-white p-2 flex flex-col gap-5 items-center border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <div>
                <h1 className="font-amazonEmberLight2">{product.description}</h1>
                <p className="mb-3">
                    {Array.from({ length: 5 }, (_, index) => 
                        index < product.rating ? "⭐" : "☆"
                    ).join("")}
                </p> 
                <p className="font-amazonEmberBold text-xl">
                    <strong>{product.price}</strong>
                </p>
            </div>
            <img className="w-64 object-cover" src={product.src} alt={product.alt}/>
            <button className="font-amazonEmberLight2 bg-yellow-300 rounded-lg px-2 py-1 hover:bg-yellow-500 transition duration-200" onClick={() => addToBasket(product)}>
                Add to Cart
            </button>
        </div>
    );
}