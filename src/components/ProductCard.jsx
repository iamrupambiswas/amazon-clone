import PropTypes from "prop-types"
import { Link } from "react-router-dom";

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,   
            rating: PropTypes.number.isRequired, 
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default function ProductCard({ title, images }) {
    return (
        
        <div className="bg-white p-6 shadow-lg">
            <h2 className="font-amazonEmberBold text-xl font-black mb-4">{title}</h2>
            <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <Link 
                        key={index} 
                        to={`/product/${image.name}`}
                        state={{ // Pass data as state to the Product page
                            productId: image.name,  // Using image name as identifier
                            price: image.price,
                            rating: image.rating,
                            image: image.src,
                            description: image.description,
                        }}
                    >
                        <div key={index} className="text-center">
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-24 object-contain rounded-md" 
                        />
                        <p className="mt-2 text-xs font-semibold">{image.name}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}