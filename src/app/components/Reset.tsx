import React from 'react'

function Reset() {
    const resetStats = () => {
        if (window.confirm("Are you sure you want to reset your stats?")) {
            console.log("Stats reset!");
            // Perform reset logic here
        }
    };
    return <button onClick={resetStats}>Reset Stats</button>;

}

export default Reset
