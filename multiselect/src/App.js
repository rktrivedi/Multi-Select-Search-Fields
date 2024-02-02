import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  //fetch('https://dummyjson.com/users/search?q=John')
  //.then(res => res.json())
  //.then(console.log);

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };
    fetchUsers();
  }, [searchTerm]);

  return (
    <div className="user-search-container">
      <div className="user-input">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search For User"
          ></input>
          <ul className="suggestion-list">
            {suggestion?.users?.map((user, index) => (
              <li key={user.email}>
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <span>
                  {user.firstName} {user.lastName}{" "}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
