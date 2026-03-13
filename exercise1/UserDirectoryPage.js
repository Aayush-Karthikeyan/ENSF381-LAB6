import Controls from './Controls';
import UserList from './UserList';
import React, { useState, useEffect } from 'react';

function UserDirectoryPage() {

  // State variables
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [viewMode, setViewMode] = useState("grid");

  // Fetch users when component mounts
  useEffect(() => {
    fetch('https://69a1e0f32e82ee536fa27417.mockapi.io/user_api')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function handleDeleteClick(userId) {
    fetch(`https://69a1e0f32e82ee536fa27417.mockapi.io/user_api/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => console.error("Delete error:", error));
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort((a, b) => a.id - b.id);
    setUsers(sortedUsers);
    setSortBy("id");
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort(
      (a, b) => a.user_group - b.user_group
    );

    setUsers(sortedUsers);
    setSortBy("group");
  }

  function handleViewToggleClick() {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
          onDeleteClick={handleDeleteClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;