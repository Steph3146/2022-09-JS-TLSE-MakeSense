import { useState, useContext, useEffect, useRef } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { Text, LanguageContext } from "../../../contexts/Language";
import api from "../../../services/api";
import Spinner from "../../Spinner";

function UsersManager() {
  const [IsLoaded, SetIsLoaded] = useState(false);
  const [AllUsers, setAllUsers] = useState();

  useEffect(() => {
    const getAllapi = async () => {
      const allusers = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users`
      );
      setAllUsers(allusers);
      SetIsLoaded(true);
    };
    getAllapi();
  }, [IsLoaded]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  return IsLoaded ? (
    <div className="user-admin-wrapper">
      <h1>Users Management</h1>
      <div className="SearchBarUsers">
        <input
          key="searchbarusers"
          id="searchbarusers"
          name="searchbarusers"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>
      {AllUsers.filter(
        (data) =>
          data.lastname
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLocaleLowerCase()
            .includes(
              searchTerm
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .toLocaleLowerCase()
            ) ||
          data.firstname
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLocaleLowerCase()
            .includes(
              searchTerm
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .toLocaleLowerCase()
            ) ||
          data.email
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLocaleLowerCase()
            .includes(
              searchTerm
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .toLocaleLowerCase()
            )
      ).map((data) => (
        <div key={data.id} className="rowUser">
          <div>
            <Text tid="lastname" /> : {data.lastname}
            <br />
            <Text tid="firstname" /> : {data.firstname}
            <br />
            <Text tid="email" /> : {data.email}
          </div>
          <HiPencilSquare />
        </div>
      ))}
    </div>
  ) : (
    <Spinner />
  );
}
export default UsersManager;
