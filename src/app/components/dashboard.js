'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import Catalog from './Catalog';
import CartDialog from './CartDialog';
import ProfileEditDialog from './ProfileEditDialog';
import RolesDialog from "@/app/components/RolesDialog";

function Dashboard({ handleLogout }) {
    const [cartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
    const [isRolesDialogOpen, setIsRolesDialogOpen] = useState(false); // State for the Roles dialog

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const updateCartCount = (newCount) => {
        setCartCount(newCount);
    };

    const openCartDialog = () => {
        setIsCartDialogOpen(true);
    };

    const openEditProfileDialog = () => {
        setIsEditProfileDialogOpen(true);
    };

    const openRolesDialog = () => {
        setIsRolesDialogOpen(true);
    };

    return (
        <div className="dashboard">
            <div className="bg-gray-200 fixed top-0 left-0 w-full h-16 flex items-center pl-96 px-4">
                <div className="flex pl-96">
                    <div className="cart-icon cursor-pointer mr-4" onClick={openCartDialog}>
                        <FontAwesomeIcon icon={faShoppingCart} size="2x" className="text-gray-600" />
                        <span className="cart-count ml-2 text-sm text-gray-600">{cartCount}</span>
                    </div>
                    <div className="user-options relative group pl-36 pr-8">
                        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faUser} size="2x" className="text-gray-600" />
                            <span>Mi perfil</span>
                            <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-gray-600" />
                        </div>
                        {isDropdownOpen && (
                            <ul className="absolute top-16 right-0 w-36 bg-white border rounded shadow mt-2" style={{ zIndex: 9999 }}>
                                <li className="py-2 px-4 cursor-pointer hover-bg-gray-100" onClick={openEditProfileDialog}>
                                    Editar perfil
                                </li>
                                <li className="py-2 px-4 cursor-pointer hover-bg-gray-100" onClick={openRolesDialog}>
                                    Roles
                                </li>
                            </ul>
                        )}
                    </div>
                    <button onClick={handleLogout} className="logout-button bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
                </div>
            </div>
            <Catalog handleCartUpdate={updateCartCount} />
            {isCartDialogOpen && <CartDialog cartItems={cartItems} onClose={() => setIsCartDialogOpen(false)} />}
            {isEditProfileDialogOpen && <ProfileEditDialog onClose={() => setIsEditProfileDialogOpen(false)} />}
            {isRolesDialogOpen && <RolesDialog onClose={() => setIsRolesDialogOpen(false)} />} {/* Render the Roles dialog */}
        </div>
    );
}

export default Dashboard;