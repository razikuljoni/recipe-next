import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Recipes from "@/components/Recipes";

async function getData() {
  const res = await fetch("http://localhost:3000/api/recipe");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <Navbar />
      <Recipes />
      {/* <CreateRecipe /> */}
      {/* <ContactUs/> */}
      <Footer />
    </div>
  )
}
