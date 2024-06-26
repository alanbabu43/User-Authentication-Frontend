import React, { useState, useEffect } from "react";
import authAxios from "../../redux/features/api/authApi";
import { registeredUsers, userDelete } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { delete_user } from "../../redux/features/reducer/UsersUpdateSlice";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  console.log("admin auth token in ", authTokens);
  const access = authTokens?.access;
  console.log("access in ", authTokens?.access);

  const editedUser = useSelector((state) => state.updateUser?.editedUser);
  const deletedUser = useSelector((state) => state.updateUser?.deletedUser);
  console.log(editedUser, deletedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, [editedUser, deletedUser]);

  const getUsers = async () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    console.log("admin auth token in ", authTokens);
    const access = authTokens?.access;
    try {
      const response = await authAxios.get(registeredUsers, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${userDelete}${userId}`;
        authAxios
          .get(url, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          })
          .then((res) => {
            console.log("user deleted");
            dispatch(delete_user());
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleSearch = async () => {
   
    try {
      console.log(searchTerm,"search terms");
      if (searchTerm.trim() === '') { 
        console.log(searchTerm,"search terms");
        // If the search term is empty, show all users
        setFilteredUsers(users);
      } else {
      // const response = await axios.get(/api/authApi/?q=${searchTerm});
      const res = users.filter((user=> user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())))
       setFilteredUsers(res)

      // setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name"
        className="border rounded-md px-2 py-1"
       
        value={searchTerm}
      
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105"
     style={{width:'100px'}} onClick={handleSearch}>Search</button>
      {/* <ul>
        {searchResults.map((user, index) => (
          <li key={index}>
            Name: {user.name}, Email: {user.email}
          </li>
        ))}
      </ul> */}
    </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-r border-t border-gray-300">
              Name
            </th>
            <th className="py-2 px-4 border-r border-t border-gray-300">
              Email
            </th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-r border-t border-gray-300">
                {user.name}
              </td>
              <td className="py-2 px-4 border-r border-t border-gray-300">
                {user.email}
              </td>
              <td className="py-2 px-4 border-t">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditUser(user)}
                  >
                  Edit
                </button>

                <button
                  onClick={() => handleUserDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          {isModalOpen && (
            <Modal
              show={isModalOpen}
              handleClose={() => setIsModalOpen(false)}
              user={selectedUser}
            />
          )}
    </div>
  );
};
