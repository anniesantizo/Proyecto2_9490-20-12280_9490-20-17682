import React, { useState } from 'react';

function AddProduct({ onCreateProduct, onCancel }) {
    const [productData, setProductData] = useState({
        name: '',
        brand: '',
        stockAvailable: '',
        discount: '',
        discountPrice: '',
        picture: '',
        description: '',
        category: ['Palin'], // Puedes cambiar la categoría según tus necesidades
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateProduct(productData);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Añadir Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium text-gray-600">Nombre del Producto</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* Agrega campos adicionales para otros detalles del producto */}
                <button type="submit" className="bg-blue-500 text-white rounded-full px-4 py-2">
                    Crear Producto
                </button>
                <button type="button" className="ml-2 text-gray-600" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
