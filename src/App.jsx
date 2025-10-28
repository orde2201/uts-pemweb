import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import foodImage from "./assets/makanan.png";
import cardDetail from "./component/DetailCard.jsx";

function MainPage() {
  return <img src={foodImage} id="foodImage" />;
}

function App() {
  const [meals, setMeals] = useState([]); // sekarang array

  useEffect(() => {
    const urlMainMenuMeal = import.meta.env.VITE_API_URL;
    const urlRandomMeal = 0;

    // buat array 4 panggilan API
    const requests = [
      urlMainMenuMeal,
      urlMainMenuMeal,
      urlMainMenuMeal,
      urlMainMenuMeal,
    ].map((u) => axios.get(u));

    Promise.all(requests)
      .then((responses) => {
        const results = responses.map((res) => ({
          name: res.data.meals[0].strMeal,
          image: res.data.meals[0].strMealThumb,
        }));
        setMeals(results); // simpan semua data di array
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <MainPage />
      <article className="cardContainer">
        {meals.map((meal, index) => (
          <cardDetail key={index} data={meal.name} image={meal.image} />
        ))}
      </article>
    </section>
  );
}

export default App;
