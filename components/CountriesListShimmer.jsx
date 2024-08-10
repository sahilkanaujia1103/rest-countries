import React from 'react'
import "./CountriesListShimmer.css"

const CountriesListShimmer = () => {
    // new Array(10).fill(1)
    const mapped=Array.from({length:10}).map((el,i)=>{
        return(<div key={i} className="country-card shimmer-card"></div>)
    })
  return (
    <div className='countries-container'>
        {mapped}
    </div>
  )
}

export default CountriesListShimmer