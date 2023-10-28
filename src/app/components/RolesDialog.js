import React, { useState } from 'react';

function RolesDialog({ onClose }) {
    const [selectedRoles, setSelectedRoles] = useState([]);

    const availableRoles = ["Usuario", "Administrador"];

    const handleRoleChange = (role) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((selectedRole) => selectedRole !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-screen-md shadow-lg overflow-y-auto">
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
                    {/* Close button icon */}
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-center">Roles</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-2">
                        {availableRoles.map((role) => (
                            <label key={role} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={role}
                                    checked={selectedRoles.includes(role)}
                                    onChange={() => handleRoleChange(role)}
                                    className="mr-2"
                                />
                                {role}
                            </label>
                        ))}
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover-bg-blue-600">Guardar</button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover-bg-gray-400">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RolesDialog;