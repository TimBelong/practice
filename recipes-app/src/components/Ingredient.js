import React from "react";

export default function Ingredient ({amount, mesurement, name}){
    return (
        <li>{amount} {mesurement} {name}</li>
    )
}