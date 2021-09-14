import React, { useState, useEffect } from "react";

const Header = () => {
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    fetch(`https://randomuser.me/api/`)
      .then((res) => res.json())
      .then((data) => setProfileUrl(data.results[0].picture.thumbnail));
  }, []);
  return (
    <div className="tasksboard-header">
      <div className="tasksboard-header-logo">
        <img src="logo.jpg" alt="" width="70" />
        <h2 className="logo-text">Tasksboard</h2>
      </div>
      <div className="tasksboard-header-profile">
        <img src={profileUrl} alt="" />
      </div>
    </div>
  );
};

export default Header;
