import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
          } = data.drinks[0];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cocktail:', error);
        setLoading(false);
      }
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">No cocktail to display</h2>;
  }

  const { name, image, category, info, glass, instructions } = cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name :</span> {name}
          </p>
          <p>
            <span className="drink-data">Category :</span> {category}
          </p>
          <p>
            <span className="drink-data">Info :</span> {info}
          </p>
          <p>
            <span className="drink-data">Glass :</span> {glass}
          </p>
          <p>
            <span className="drink-data">Instructions :</span> {instructions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
