import { useEffect, useState } from "react";
import { CommonButton, CommonLinkbutton } from "../common/Button";
import {
  CommonBox,
  CommonContainer,
  CommonRepeted,
  UserCardDetails,
  UserContainer,
} from "../common/Container.styled";
import { CommonEmail, CommonName, CommonTitle } from "../common/Title";
import axios from "axios";
import toast from "react-hot-toast";

export default function GetUser() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/get");
      setUser(res.data);
    };
    fetchData();
  }, []);

  const deleteuser = async (userId) => {
    await axios
      .delete(`http://localhost:8800/api/delete/${userId}`)
      .then((res) => {
        // console.log(res);
        setUser((prvUser) => prvUser.filter((user) => user._id !== userId));
        toast.success(res.data.msg, { position: "top-right" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CommonContainer>
        <CommonBox>
          <CommonRepeted>
            <CommonTitle>Stored Password & Email</CommonTitle>
            <CommonLinkbutton to={"/add"}>ADD🔑</CommonLinkbutton>
          </CommonRepeted>
          {user.map((users) => {
            return (
              <>
                <UserContainer key={users._id}>
                  <UserCardDetails>
                    <div>
                      <CommonEmail>{users.email}</CommonEmail>
                      <div>
                        <CommonName>{users.name}</CommonName>
                        <CommonName>{users.password}</CommonName>
                      </div>
                    </div>
                    <div>
                      <CommonButton onClick={() => deleteuser(users._id)}>
                        ☠️
                      </CommonButton>
                      <CommonLinkbutton to={`/edit/` + users._id}>
                        🛃
                      </CommonLinkbutton>
                    </div>
                  </UserCardDetails>
                </UserContainer>
              </>
            );
          })}
        </CommonBox>
      </CommonContainer>
    </>
  );
}
