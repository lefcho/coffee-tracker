import React from "react";
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils";

function StatCard(props) {
    const { isLg, title, children } = props

    return (
        <div className={'card stat-card ' + (isLg ? 'col-span-2' : '')}>
            <h4>{title}</h4>
            {children}
        </div>
    )
}

function Stats() {
    const stats = calculateCoffeeStats(coffeeConsumptionHistory);

    const caffeine_level = calculateCurrentCaffeineLevel(coffeeConsumptionHistory);
    const warningLevel = caffeine_level < statusLevels['low'].maxLevel ? 
        'low' : 
        caffeine_level < statusLevels['moderate'].maxLevel ?
        'moderate' :
        'high'


    return (
        <>
        <div className="section-header">
            <i className="fa-solid fa-chart-simple" />
            <h2>Stats</h2>
        </div>
        <div className="stats-grid">
            <StatCard isLg={true} title='Active Caffiene Level'>
                <div className="status">
                    <p><span className="stat-text">{caffeine_level}
                        </span>mg</p>
                    <h5 style={{color: statusLevels[warningLevel].color, 
                        background: statusLevels[warningLevel].background}}>{warningLevel}</h5>
                </div>
                <p>{statusLevels[warningLevel].description}</p>
            </StatCard>
            <StatCard title='Daily Caffeine'>
                <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
            </StatCard>
            <StatCard title='Average # of Coffees'>
                <p><span className="stat-text">{stats.average_coffees}</span></p>
            </StatCard>
            <StatCard title='Daily Cost ($)'>
                <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
            </StatCard>
            <StatCard title='Total Cost ($)'>
                <p>$ <span className="stat-text">{stats.total_cost}</span></p>
            </StatCard>
            <table className="stat-table">
                <thead>
                    <tr>
                        <th>Coffee Name</th>
                        <th>Number of Purchase</th>
                        <th>Percentage of Total</th>
                    </tr>
                </thead>
                <tbody>
                    {getTopThreeCoffees(coffeeConsumptionHistory)
                    .map((coffee, coffeeIndex) => {
                        return (<tr key={coffeeIndex}>
                            <td>{coffee.coffeeName}</td>
                            <td>{coffee.count}</td>
                            <td>{coffee.percentage}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Stats;
