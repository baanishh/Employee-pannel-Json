import React from "react";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2 text-center">{employee.id}</td>
              <td className="border p-2">{employee.username}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.status}</td>
              <td className="border p-2 text-center">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
