import { useState } from "react";
import { CommonButton, CommonLinkbutton } from "../common/Button";
import {
  CommonBox,
  CommonContainer,
  CommonRepeted,
  UserContainer,
} from "../common/Container.styled";
import { CommomForm, CommonInput, CommonLabel } from "../common/Form";
import { CommonTitle } from "../common/Title";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AddUser() {
  const navigate = useNavigate();
  const users = {
    name: "",
    lastName: "",
    password: "",
    email: "",
  };

  const [user, SetUser] = useState(users);

  const inputhandler = (e) => {
    const { name, value } = e.target;
    SetUser({ ...user, [name]: value });
    // console.log(user);
  };

  const submitUser = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8800/api/create", user)
      .then((res) => {
        toast.success(res.data.email, { position: "top-right" });
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
            <CommonTitle>Add Your Cred 💻</CommonTitle>
          </CommonRepeted>
          <CommonTitle>Insert your data</CommonTitle>
          <CommomForm onSubmit={submitUser}>
            <UserContainer>
              <CommonLabel>Name</CommonLabel>
              <CommonInput
                type="text"
                onChange={inputhandler}
                placeholder="enter your name"
                autoComplete="off"
                name="name"
              />
            </UserContainer>
            <UserContainer>
              <CommonLabel>Last Name</CommonLabel>
              <CommonInput
                name="lastName"
                type="text"
                onChange={inputhandler}
                placeholder="enter your Last name"
                autoComplete="off"
              />
            </UserContainer>
            <UserContainer>
              <CommonLabel>email</CommonLabel>
              <CommonInput
                type="email"
                onChange={inputhandler}
                placeholder="enter your email"
                autoComplete="off"
                name="email"
              />
            </UserContainer>
            <UserContainer>
              <CommonLabel>Password</CommonLabel>
              <CommonInput
                type="password"
                onChange={inputhandler}
                placeholder="enter your password"
                autoComplete="off"
                name="password"
              />
            </UserContainer>
            <CommonButton type="submit">add+</CommonButton>
          </CommomForm>
        </CommonBox>
      </CommonContainer>
    </>
  );
}
