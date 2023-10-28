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
    const [isRolesDialogOpen, setIsRolesDialogOpen] = useState(false);

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
            <div className="bg-gray-200 fixed top-0 right-0 w-full h-16 flex items-center pl-4 md:pl-96 px-4">
                <div className="flex justify-between w-full items-center">
                    <div className="ml-auto flex items-center"> {/* Utiliza flex para alinear los elementos a la derecha */}
                        <div className="cart-icon cursor-pointer p-2 md:p-4" onClick={openCartDialog}>
                            <FontAwesomeIcon icon={faShoppingCart} size="2x" className="text-gray-600" />
                            <span className="cart-count ml-2 text-sm text-gray-600">{cartCount}</span>
                        </div>
                        <div className="user-options relative group mr-4">
                            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                                <FontAwesomeIcon icon={faUser} size="2x" className="text-gray-600" />
                                <span className="md:ml-2">Mi perfil</span>
                                <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-gray-600" />
                            </div>
                            {isDropdownOpen && (
                                <ul className="absolute top-16 md:top-20 right-0 w-36 bg-white border rounded shadow mt-2 z-50">
                                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={openEditProfileDialog}>
                                        Editar perfil
                                    </li>
                                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={openRolesDialog}>
                                        Roles
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div>
                            <button onClick={handleLogout} className="logout-button bg-red-500 text-white py-2 px-4 rounded">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
            <Catalog handleCartUpdate={updateCartCount} />
            {isCartDialogOpen && <CartDialog cartItems={cartItems} onClose={() => setIsCartDialogOpen(false)} />}
            {isEditProfileDialogOpen && <ProfileEditDialog onClose={() => setIsEditProfileDialogOpen(false)} />}
            {isRolesDialogOpen && <RolesDialog onClose={() => setIsRolesDialogOpen(false)} />}
        </div>
    );
}

export default Dashboard;
