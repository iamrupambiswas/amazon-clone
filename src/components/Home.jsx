import { homeEssentialsImages, gamingImages, fashionImages, kitchenImages } from '../assets/ImageData';
import ProductCard from './ProductCard';
import Banner from '../assets/Banner.jpg';
import './Home.css';

function Home() {
    return (
        <div className="home pb-5">
            <div className="home__container">
                <img className="home__image" src={Banner} alt="Banner" />

                <div className="px-4 w-full">
                    <div className="w-full flex">
                        <div className="bg-white z-10 p-2 h-8 w-full text-center flex flex-center justify-center text-xs font-bold">
                            <p>You are on amazon.com. You can also shop on Amazon India for millions of products with fast local delivery. <a href='/' className='text-blue-400'>Click here to go to amazon.in</a></p>
                        </div>
                    </div>

                    <div className="flex w-full gap-4 mt-5">
                        <div className="flex flex-1 z-10 mx-auto max-w-3xl">
                            <ProductCard title="Gaming accessories" images={gamingImages} />
                        </div>

                        <div className="flex flex-1 z-10 mx-auto max-w-3xl">
                            <ProductCard title="Shop deals in Fashion" images={fashionImages} />
                        </div>

                        <div className="flex flex-1 z-10 mx-auto max-w-3xl">
                            <ProductCard title="Shop for your home essentials" images={homeEssentialsImages} />
                        </div>

                        <div className="flex flex-1 z-10 mx-auto max-w-3xl">
                            <ProductCard title="Top categories in Kitchen appliances" images={kitchenImages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
