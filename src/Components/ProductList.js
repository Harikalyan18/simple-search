
export default function ProductGrid({ products }) {
    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <img
                        src={product.thumbnailImageUrl}
                        alt={product.name}
                        loading="lazy"
                    />
                    <h3>{product.name}</h3>
                    <div className="price-container">
                        <span className="price">${product.price}</span>
                        {product.msrp && product.msrp > product.price && (
                            <span className="msrp">${product.msrp}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
