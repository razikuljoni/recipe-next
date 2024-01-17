import Link from "next/link";

async function fetchRecipes() {
  const res = await fetch("http://localhost:3000/api/recipe");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Home() {
  const recipes = await fetchRecipes();
  console.log(recipes?.recipes);

  return (
    <main className="container mx-auto mt-5">
      <div className=" w-full h-full">
        <div className="flex justify-between mb-5">
          <div className="p-4 rounded-lg bg-slate-800 drop-shadow-xl">
            <h1 className=" text-slate-200 text-center text-2xl font-bold font-[verdana]">
              Next Recipe App
            </h1>
          </div>
          <Link href="/recipe/add-recipe" className="p-4 rounded-lg bg-slate-800 drop-shadow-xl">
            <h1 className="text-slate-200 text-center text-2xl font-bold font-[verdana]">
              Add New Recipe
            </h1>
          </Link>
        </div>

        <div className="container grid grid-cols-3 gap-4">
          {recipes?.recipes?.map((recipe) => (
            <div key={recipe?.id} className="h-[560px] relative flex flex-col">
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="recipe image" />
                <div class="p-6 flex-grow">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">RECIPE NAME</h2>
                  <h1 class="title-font text-lg font-medium text-white mb-3">{recipe?.name}</h1>
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">INGREDIENTS</h2>
                  <p className="space-x-2 space-y-2">
                    {recipe?.ingredients?.slice(0, 6).map((ingredient) => (
                      <span key={ingredient} class="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-sm font-semibold">
                        #{ingredient}
                      </span>
                    ))}
                  </p>
                  <h2 class="b-0 tracking-widest text-xs title-font font-medium text-gray-400 mb-1 mt-5">RECIPE DESCRIPTION</h2>
                  <p class="mb-3 text-white">{recipe?.description.slice(0, 200)}...</p>
                </div>
                <Link href={`/api/recipe/${recipe?.id}`}>
                  <div class="flex items-end justify-center bg-blue-500 hover:bg-blue-600 p-3 rounded-b-md text-white absolute w-full bottom-0">
                    <p class="flex items-center">
                      SEE DETAILS
                      <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
