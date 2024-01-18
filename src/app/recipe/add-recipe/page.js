"use client";

import { useState } from 'react';
import ingredientsList from '../../../../ingredients.json';
import Footer from '../../../components/Footer.jsx';
import Navbar from '../../../components/Navbar.jsx';

function RecipeForm() {
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeDescription, setRecipeDescription] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!recipeName.trim()) {
            newErrors.recipeName = "Recipe Name is required";
            valid = false;
        }

        if (recipeIngredients.length === 0) {
            newErrors.ingredients = "At least one ingredient is required";
            valid = false;
        }

        if (!recipeDescription.trim()) {
            newErrors.description = "Description is required";
            valid = false;
        }

        if (images.length === 0) {
            newErrors.images = "Image is required";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    };

    const handleIngredientChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setRecipeIngredients([...recipeIngredients, ...selectedOptions]);
    };

    const handleRemoveIngredient = (ingredient) => {
        const newIngredients = recipeIngredients.filter((item) => item !== ingredient);
        setRecipeIngredients(newIngredients);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (!recipeIngredients.includes(inputValue.trim())) {
                setRecipeIngredients([...recipeIngredients, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
            preview: ['jpg', 'jpeg', 'png', 'webp'].includes(file.name.split('.').pop().toLowerCase()),
            size: file.size > 1024 ? file.size > 1048576 ? Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb' : file.size + 'b'
        }));
        setImages(files);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleCreateRecipe = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const newRecipe = {
                name: recipeName,
                ingredients: recipeIngredients,
                description: recipeDescription,
                images,
            }
            console.log("Recipe submitted!", {
                name: recipeName,
                ingredients: recipeIngredients,
                description: recipeDescription,
                images,
            });

            const response = await fetch('/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });

            if (response.ok) {
                console.log('Recipe submitted successfully');
                // Reset or redirect as needed
            } else {
                console.error('Failed to submit recipe');
            }
        } else {
            console.log("Form validation failed");
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-slate-900 shadow p-4 py-8" data-images={images}>
                <div className="heading text-center font-bold text-3xl m-5 bg-slate-900 text-white">Create a New Recipe</div>
                <form onSubmit={handleCreateRecipe} className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="recipeName" className="text-white font-bold mb-2">Recipe Name</label>
                        <input
                            id="recipeName"
                            className={`title bg-slate-800 rounded-md text-white border border-gray-300 p-2 outline-none ${errors.recipeName && 'border-red-500'}`}
                            spellCheck="false"
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                        />
                        {errors.recipeName && <p className="text-red-500 text-xs mt-1">{errors.recipeName}</p>}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="ingredients" className="text-white font-bold mb-2">Add Ingredients</label>
                        <select
                            id="ingredients"
                            multiple
                            className={`ingredients bg-slate-800 rounded-md text-white border border-gray-300 p-2 outline-none ${errors.ingredients && 'border-red-500'}`}
                            onChange={handleIngredientChange}
                            value={recipeIngredients}
                        >
                            {ingredientsList.map((ingredient) => (
                                <option key={ingredient.id} value={ingredient.label}>
                                    {ingredient.label}
                                </option>
                            ))}
                        </select>
                        {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
                        {recipeIngredients.length > 0 && (
                            <div className="selected-ingredients mb-4 flex flex-wrap">
                                <label className="text-white font-bold mb-2 w-full mt-3">Selected Ingredients</label>
                                {recipeIngredients.map((ingredient, index) => (
                                    <div key={index} className="selected-ingredient bg-gray-200 m-1 p-2 flex items-center">
                                        <span className="mr-2">{ingredient}</span>
                                        <button onClick={() => handleRemoveIngredient(ingredient)} className="text-red-500 font-bold">
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="description" className="text-white font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            className={`description text-white bg-slate-800 rounded-md sec p-3 h-60 border border-gray-300 outline-none ${errors.description && 'border-red-500'}`}
                            spellCheck="false"
                            value={recipeDescription}
                            onChange={(e) => setRecipeDescription(e.target.value)}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="imageUpload" className="text-white font-bold mb-2">Upload Image</label>
                        <input
                            id="imageUpload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className={`outline-none text-white ${errors.images && 'border-red-500'}`}
                            required
                        />
                        {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                    </div>

                    <div id="preview" className="my-4 flex">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-32 h-32 object-cover rounded">
                                {image.preview ? (
                                    <div>
                                        <img src={image.url} alt={image.name} className="w-32 h-32 object-cover rounded" />
                                        <button onClick={() => removeImage(index)} className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                                        <div>{image.size}</div>
                                    </div>
                                ) : (
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-32 h-32 ml-auto pt-1" viewBox="0 0 24 24">
                                            <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                        </svg>
                                        <button onClick={() => removeImage(index)} className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                                        <div>{image.size}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="buttons flex justify-end">
                        <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Recipe</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default RecipeForm;
