import { useStateValue } from "./StateProvider";

function Cart() {
    const [{ basket, user }, dispatch] = useStateValue();

    const removeDollarSymbol = (price) => {
        if (typeof price !== "string") return parseFloat(price) || 0;
        return parseFloat(price.replace("$", "").trim()) || 0;
    };

    const getTotalPrice = () =>
        basket.reduce(
            (total, item) =>
                total +
                removeDollarSymbol(item.product_price || item.price || 0) *
                    (item.quantity || 1),
            0
        );

    const removeItemFromBasket = (id) => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id,
        });
    };

    return (
        <div className="p-5 overflow-y-auto bg-white flex justify-between">
            {/* Left Section */}
            <div className="flex-1">
                <h1 className="text-l font-bold mb-2">
                    Hello, {user?.displayName || "Guest"}!
                </h1>
                <h2 className="text-lg font-semibold mb-3">
                    Your Shopping Basket
                </h2>
                <hr className=" bg-gray-300 mb-4" />
                {basket.length === 0 ? (
                    <p className="text-gray-600">
                        Your basket is empty.{" "}
                        <a
                            href="/"
                            className="text-blue-500 underline"
                        >
                            Start shopping now!
                        </a>
                    </p>
                ) : (
                    <div>
                        {basket.map((item) => (
                            <div
                                key={item.product_id || item.id || item.name}
                                className="flex items-center justify-between p-4 border-b"
                            >
                                <img
                                    src={item.product_photo || item.src || "fallback-image.jpg"}
                                    alt={item.product_title || item.name || "Product"}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1 px-4">
                                    <h2 className="text-md font-amazonEmberMedium">
                                        {item.product_title || item.name || "No title available"}
                                    </h2>
                                    <p className="font-amazonEmberLight2 text-sm">
                                        {item.product_price || item.price || "N/A"}
                                    </p>
                                    <p>
                                        {Array.from({ length: 5 }, (_, index) =>
                                        index < (item.product_star_rating || item.rating || 0) ? "⭐" : "☆"
                                    ).join("")}
                                    </p>
                                    <button
                                        className="text-sm bg-[#f0c14b] text-white py-1 px-3 hover:bg-red-700"
                                        onClick={() => removeItemFromBasket(item.product_id || item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Right Section */}
            <div className="ml-8 bg-gray-100 p-4 rounded border border-gray w-60 h-40">
                <p className="mb-2">
                    Subtotal ({basket.length} items):{" "}
                    <strong>${getTotalPrice().toFixed(2)}</strong>
                </p>
                <div className="mb-4">
                    <label>
                        <input type="checkbox" className="mr-2" /> This order contains a gift
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="bg-[#ffd814] text-black px-5 py-2 rounded hover:bg-green-700">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
