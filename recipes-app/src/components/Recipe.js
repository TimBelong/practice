import React from "react";
import Instructions from "./Instructions";
import IngredientsList from "./IngredientsList";
import Stars from "./StarRating";

function Recipe ({name,ingredients,steps}){
    return (
        <section id={name.toLowerCase().replace(/ /g, "-")}>
            <h1>{name}</h1>
            <Stars/>
            <IngredientsList list={ingredients}/>
            <Instructions title="Cooking Instrictions" steps={steps}/>
        </section>

    )
}

export default Recipe;