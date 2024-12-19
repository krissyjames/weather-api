import React from "react"

function Products(props) {

    return(
        <div>
            <h2>{props.product.name}</h2>
            <p>{props.product.description}</p>
            <p>${props.product.price}</p>
            <p>{props.product.companyName}</p>
        </div>
    )
}



export default Products;