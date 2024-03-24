import { useNavigate, useParams } from "react-router-dom";
import { CommonButton, CommonLinkbutton } from "../common/Button";
import {
  CommonBox,
  CommonContainer,
  CommonRepeted,
  UserContainer,
} from "../common/Container.styled";
import { CommomForm, CommonInput, CommonLabel } from "../common/Form";
import { CommonTitle } from "../common/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const users = {
    name: "",
    lastName: "",
    password: "",
    email: "",
  };

  const [user, setUser] = useState(users);
  const inputChanehandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/getone/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const UpdateUseronsubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8800/api/update/${id}`, user)
      .then((res) => {
        toast.success(res.data.msg, { position: "top-right" });
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CommonContainer>
        <CommonBox>
          <CommonRepeted>
            <CommonLinkbutton to={"/"}>🔙</CommonLinkbutton>
            <CommonTitle>edit your data</CommonTitle>
          </CommonRepeted>
          <CommomForm key={user._id} onSubmit={UpdateUseronsubmit}>
            <UserContainer>
              <CommonLabel>Name</CommonLabel>
              <CommonInput
                onChange={inputChanehandler}
                type="text"
                placeholder="enter your name"
                autoComplete="off"
                name="name"
                value={user.name}
              />
            </UserContainer>
            <UserContainer>
              <CommonLabel>Last Name</CommonLabel>
              <CommonInput
                onChange={inputChanehandler}
                type="text"
                placeholder="enter your Last name"
                autoComplete="off"
                name="lastName"
                value={user.lastName}
              />
            </UserContainer>
            <UserContainer>
              <CommonLabel>email</CommonLabel>
              <CommonInput
                onChange={inputChanehandler}
                type="email"
                placeholder="enter your email"
                autoComplete="off"
                name="email"
                value={user.email}
              />
            </UserContainer>
            <UserContainer>
              <CommonLabel>Password</CommonLabel>
              <CommonInput
                onChange={inputChanehandler}
                type="password"
                placeholder="enter your password"
                autoComplete="off"
                name="password"
                value={user.password}
              />
            </UserContainer>
            <CommonButton type="submit">edit+</CommonButton>
          </CommomForm>
        </CommonBox>
      </CommonContainer>
    </>
  );
}
