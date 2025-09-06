import React, { useEffect, useState } from "react";
import { getRecentActivities } from "../services/adminService";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getRecentActivities();
        setActivities(data.success ? data.activities : []);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) return <p>Loading recent activities...</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Recent Activities</h2>
      {activities.length > 0 ? (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="p-2 border-b last:border-0 text-gray-700"
            >
              {activity.message}
              <span className="text-sm text-gray-500 block">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recent activity found.</p>
      )}
    </div>
  );
};

export default RecentActivities;
