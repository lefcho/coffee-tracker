import React from "react";

function StatCard(props) {
    const { isLg, title, children } = props

    return (
        <div className={'card stat-card ' + (isLg ? 'col-span-2' : '')}>

        </div>
    )
}

function Stats() {
    return (
        <>
        <div className="section-header">
            <i className="fa-solid fa-chart-simple" />
            <h2>Stats</h2>
        </div>
        <div className="stats-grid">
            <StatCard isLg={true}></StatCard>
            <StatCard></StatCard>
            <StatCard></StatCard>
            <StatCard></StatCard>
            <StatCard></StatCard>
        </div>
        </>
    );
}

export default Stats;
