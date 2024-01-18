"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const deleteRecipe = async (id) => {
    const res = fetch(`http://localhost:3000/api/recipe/${id}`, {
        method: "DELETE",
        "Content-Type": "application/json",
    }, { cache: 'no-store' });
    return (await res).json();
};

async function fetchRecipe(id) {
    const res = await fetch(`http://localhost:3000/api/recipe/${id}`, { cache: 'no-store' });
    const data = await res.json();

    if (!res.ok) {
        toast.error("Failed to fetch data");
        throw new Error("Failed to fetch data");
    }

    return data;
}

const RecipeDetails = async ({ params }) => {
    const { recipe } = await fetchRecipe(params?.id);

    const handleDeleteRecipe = async () => {
        const res = await deleteRecipe(params.id);
        if (res.message === "Success") {
            toast.success("Recipe deleted successfully");
            window.location.href = "/";
        }
    }

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="container mx-auto mt-5">
                <div className="h-[560px] relative flex flex-col border-2 border-gray-200 border-opacity-60 rounded-lg">
                    <div className="h-full rounded-lg overflow-hidden">
                        <img className="lg:h-48 md:h-56 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="recipe image" />
                        <div className="p-6 flex-grow">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">RECIPE NAME</h2>
                            <h1 className="title-font text-lg font-medium text-white mb-3">{recipe?.name}</h1>
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">INGREDIENTS</h2>
                            <p className="space-x-2 space-y-2">
                                {recipe?.ingredients?.map((ingredient) => (
                                    <span key={ingredient} className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-sm font-semibold">
                                        #{ingredient}
                                    </span>
                                ))}
                            </p>
                            <h2 className="b-0 tracking-widest text-xs title-font font-medium text-gray-400 mb-1 mt-5">RECIPE DESCRIPTION</h2>
                            <p className="mb-3 text-white">{recipe?.description}</p>
                        </div>
                        <div className="flex justify-between">
                            <Link href={`/recipe/edit/${recipe?.id}`}>
                                <div className=" bg-yellow-400 hover:bg-yellow-500 p-3 rounded-bl-md rounded-tr-md text-white absolute cursor-pointer bottom-0">
                                    <p className="flex items-center">
                                        Edit Recipe
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </p>
                                </div>
                            </Link>
                            <div onClick={handleDeleteRecipe} className=" bg-red-500 hover:bg-red-600 p-3 rounded-br-md rounded-tl-md text-white absolute cursor-pointer bottom-0 right-0">
                                <p className="flex items-center">
                                    Delete Recipe
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default RecipeDetails;