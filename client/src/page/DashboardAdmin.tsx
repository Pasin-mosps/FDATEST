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
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
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

        const response = await axios.get<any[][]>("http://localhost:1323/dashboard", config);

        if (response.data.length < 2) {
          throw new Error("Invalid response format");
        }

        // Extracting messages from the first array
        const messagesArray: string[] = response.data[0];

        // Extracting user data from the second array ([username, passwordHash, role])
        const userDataArray: any[] = response.data.slice(1);

        // Mapping the extracted user data to UserDataItem interface
        const formattedUserData: UserDataItem[] = userDataArray.map((item) => ({
          username: item[0],
          passwordHash: item[1],
          role: item[2]
        }));

        setMessages(messagesArray);
        setUserData(formattedUserData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setError("Failed to fetch dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Messages:</h3>
        <ul className="list-disc pl-6">
          {messages.map((message, index) => (
            <li key={index} className="mb-2">{message}</li>
          ))}
        </ul>
      </div>

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
