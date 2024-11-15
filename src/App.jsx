import  { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import EmployeeTable from "./components/EmployeeTable";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    status: "inactive",
  });
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3001/employees/${editingId}`,
          formData
        );
        alert("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:3001/employees", formData);
        alert("Employee added successfully!");
      }
      setFormData({ username: "", email: "", status: "inactive" });
      setEditingId(null);
      setIsModalOpen(false);
      fetchEmployees(); 
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col items-center justify-center p-4">
     <div className="flex justify-between  gap-5">
     <h1 className="text-xl font-bold">Employee Management App in</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Employee
      </button>
     </div>

      {isModalOpen && (
        <Modal
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
