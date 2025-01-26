import React, { useState } from "react";
import { coffeeOptions, hoursSelection, minsSelection } from "../utils";

function CoffeeForm() {
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    function handleSubmitForm() {
        console.log(selectedCoffee, coffeeCost, hour, min);
        
    }

    return (
        <>
        <div className="section-header">
            <i className="fa-solid fa-pencil"></i>
            <h2>Start Tracking Today</h2>
        </div>
        <h4>Select Coffee Type</h4>
        <div className="coffee-grid">
            {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
            return (
                <button
                onClick={() => {
                    setSelectedCoffee(option.name)
                    setShowCoffeeTypes(false)
                }}
                className={
                    "button-card" + ((option.name === selectedCoffee) 
                    ? " coffee-button-selected"
                    : "")
                }
                key={optionIndex}
                >
                <h4>{option.name}</h4>
                <p>{option.caffeine} mg</p>
                </button>
            );
            })}
            <button
            onClick={() => {
                setShowCoffeeTypes(true)
                setSelectedCoffee(null)
            }}
            className={
                "button-card" + (showCoffeeTypes
                ? " coffee-button-selected"
                : "")
            }
            >
            <h4>Other</h4>
            </button>
        </div>
        {showCoffeeTypes && (
            <select onChange={(e) => {
                setSelectedCoffee(e.target.value)
                
            }} name="coffee-list" id="coffee-list">
            <option value="{null}">Select Type</option>
            {coffeeOptions.map((option, optionIndex) => {
                return (
                <option value={option.name} key={optionIndex}>
                    {option.name} ({option.caffeine}mg)
                </option>
                );
            })}
            </select>
        )}
        <h4>Add the cost ($)</h4>
        <input 
            onChange={(e) => {
                setCoffeeCost(e.target.value)
            }}
            value={coffeeCost}
            className="w-full" 
            type="number" 
            placeholder="Cost" />
        <h4>Time since consumption</h4>
        <div className="time-entry">
            <div>
            <h6>Hours</h6>
            <select 
                onChange={(e) => setHour(e.target.value)}
                name="hours-select" 
                id="hours-select">
                {hoursSelection.map((hour) => {
                return (
                    <option value={hour} key={hour}>
                    {hour}
                    </option>
                );
                })}
            </select>
            </div>
            <div>
            <h6>Minutes</h6>
            <select 
                onChange={(e) => setMin(e.target.value)}
                name="mins-select" 
                id="mins-select">
                {minsSelection.map((min) => {
                return (
                    <option value={min} key={min}>
                    {min}
                    </option>
                );
                })}
            </select>
            </div>
        </div>
        <button onClick={handleSubmitForm} >
            <p>Add Entry</p>
        </button>
        </>
    );
    }

export default CoffeeForm;
