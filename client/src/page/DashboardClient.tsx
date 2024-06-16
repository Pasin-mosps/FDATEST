import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserDataItem {
  username: string;
  passwordHash: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const config = {
          headers: {
            token: `${token}`
          }
        };

        const response = await axios.get<UserDataItem [][]>("http://localhost:1323/dashboard", config);

        if (response.data.length < 2) {
          throw new Error("Invalid response format");
        }

        const userDataArray: any[] = response.data.slice(0);

        const formattedUserData: UserDataItem[] = userDataArray.map((item) => ({
          username: item[0],
          passwordHash: item[1],
          role: item[2]
        }));

        setUserData(formattedUserData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
      
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border-b">Username</th>
              <th className="px-4 py-2 bg-gray-100 border-b">Password Hash</th>
              <th className="px-4 py-2 bg-gray-100 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2 border-b">{user.username}</td>
                <td className="px-4 py-2 border-b">{user.passwordHash}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
