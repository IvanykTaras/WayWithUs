import React, { useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { USER_INFO } from "../assets/ApiKeys";
import { IdentityApi } from "../services/IdentityApi";
import { AsyncAction } from "../utils";
import { dataContext, DataEnum } from "../App";
import { IGoogleUser } from "../interfaces/IGoogleUser";
import { UserApi } from "../services/UserApi";

interface IProps {
  show: boolean;
  handleClose: () => void;
}

export const AuthModal: React.FC<IProps> = ({ show, handleClose }) => {
  const [createUser, setCreateUser] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [invalidPicture, setInvalidPicture] = useState(false);
  const data = useContext(dataContext);

  const auth = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse.access_token),
    onError: () => toast.error("Google sign-in failed"),
  });

  const authRegister =  useGoogleLogin({
    onSuccess: (tokenResponse) => createUserProfile(tokenResponse.access_token),
    onError: () => toast.error("Google sign-in failed"),
  });

  const getUserProfile = async (token: string) => {
    try {
      const response: IGoogleUser = (await axios.get(USER_INFO.replace("{token}", token))).data;
      console.dir(response)
      await handleLogin({
        email: response.email,
        password: response.id as string
      });
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  const createUserProfile = async (token: string) => {
    try {
      const response = await axios.get(USER_INFO.replace("{token}", token));
      console.dir(response)
      const newGoogleUser: IGoogleUser = {
        email: response.data.email,
        family_name: response.data.family_name,
        given_name: response.data.given_name,
        name: response.data.name,
        picture: response.data.picture,
        verified_email: response.data.verified_email,
        password: response.data.id
      }
      console.dir(newGoogleUser)

      await handleRegister(newGoogleUser);

    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  }

  const handleLogin = async (loginData?:{email:string, password: string}) => {
    if(!loginData){
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
    }else{
      if(!loginData.email || !loginData.password) {
        toast.error("User doesn't exist");
        return
      }
    }

    await AsyncAction(data[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {

            const checkLoginData = loginData ? loginData : {
              email: email,
              password: password,
            }

            const data = await IdentityApi.login(checkLoginData);
            localStorage.setItem("token", JSON.stringify(data.accessToken));
            localStorage.setItem("user", JSON.stringify(data.user));
            handleClose();
          },
          {
            pending: "logging in",
            success: "Login Successful 👌",
            error: "Email or password is wrong 🤯",
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error);
        toast.error(e.code);
        toast.error(e.message);
      }
    });

    
  };

  const handleRegister = async (googleUser?:IGoogleUser) => {
    if(!googleUser){
      if (!email || !password || !familyName || !givenName || !name || !picture) {
        toast.error("Please fill in all fields"); 
        return; 
      }
    }else{
      if (!googleUser.email || !googleUser.password || !googleUser.family_name || !googleUser.given_name || !googleUser.name || !googleUser.picture) {
        toast.error("Some error while Google Authenticate"); 
        return; 
      }
    }
  
    await AsyncAction(data[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {
            const user = googleUser ? googleUser : {
              email: email,
              password: password,
              family_name: familyName,
              given_name: givenName,
              name: name,
              picture: picture,
              verified_email: true
            } 

            console.log("Registering user", user);
            await UserApi.registerUser(user);
  
            setCreateUser(false);
          },
          {
            pending: "Registering",
            success: "Registration Successful 👌",
            error: "Registration failed 🤯",
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error);
        toast.error(e.code);
        toast.error(e.message);
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      {createUser ? (
        <>
          <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
            <h4 className="mb-4">Register user</h4>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formFamilyName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Family Name"
                  value={familyName}
                  onChange={(e) =>{ setFamilyName(e.target.value); setName(`${e.target.value} ${givenName}`)}}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formGivenName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Given Name"
                  value={givenName}
                  onChange={(e) => { setGivenName(e.target.value); setName(`${familyName} ${e.target.value}`)}}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formPicture" className="mb-4">
                <Form.Control
                type="text"
                placeholder="Picture URL"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  height: "50px",
                }}
                />
              </Form.Group>
              {picture ? (
                <div className="mb-4" style={{ textAlign: "center" }}>
                  <img
                    src={picture}
                    onError={(e) => { 
                      const imageUrl = "https://th.bing.com/th/id/R.74760693646c701efeded01334dee357?rik=pJk9zY2UtYFYcA&pid=ImgRaw&r=0"
                      e.currentTarget.src = imageUrl; 
                    }}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      border: "1px solid #ced4da",
                    }}
                  />
                </div>
              ) : (
                picture && (
                  <div className="mb-4" style={{ textAlign: "center", color: "red" }}>
                    Invalid picture URL is empty
                  </div>
                )
              )}
              <Button
                variant="primary"
                onClick={()=>handleRegister()}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  height: "50px",
                  marginBottom: "20px",
                }}
              >
                Register
              </Button>
            </Form>
            <p className="mb-2">
              Already have an account?{" "}
              <span
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setCreateUser(false)}
              >
                Sign in
              </span>
            </p>
            <div
              style={{ margin: "20px 0", display: "flex", alignItems: "center" }}
            >
              <hr style={{ flex: 1, borderColor: "#ced4da" }} />
              <span style={{ margin: "0 10px", color: "#6c757d" }}>or</span>
              <hr style={{ flex: 1, borderColor: "#ced4da" }} />
            </div>
            <Button
              variant="outline-dark"
              onClick={() => authRegister()}
              style={{
                width: "100%",
                borderRadius: "5px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FcGoogle style={{ marginRight: "10px", fontSize: "1.5rem" }} />
              Create account with Google
            </Button>
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
            <h4 className="mb-4">Welcome Back</h4>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    height: "50px",
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={()=>handleLogin()}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  height: "50px",
                  marginBottom: "20px",
                }}
              >
                Login
              </Button>
            </Form>
            <p className="mb-2">
              Don't have an account?{" "}
              <span
                style={{
                  color: "#0d6efd",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setCreateUser(true)}
              >
                Create Account
              </span>
            </p>
            <div
              style={{
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <hr style={{ flex: 1, borderColor: "#ced4da" }} />
              <span style={{ margin: "0 10px", color: "#6c757d" }}>or</span>
              <hr style={{ flex: 1, borderColor: "#ced4da" }} />
            </div>
            <Button
              variant="outline-dark"
              onClick={() => auth()}
              style={{
                width: "100%",
                borderRadius: "5px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FcGoogle style={{ marginRight: "10px", fontSize: "1.5rem" }} />
              Continue with Google
            </Button>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};
