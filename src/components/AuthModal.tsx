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

interface IProps {
  show: boolean;
  handleClose: () => void;
}

export const AuthModal: React.FC<IProps> = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = useContext(dataContext);

  const auth = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse.access_token),
    onError: () => toast.error("Google sign-in failed"),
  });

  const getUserProfile = async (token: string) => {
    try {
      // Replace with your actual Google profile API
      
      const response = await axios.get(USER_INFO.replace("{token}", token));
      console.dir(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      handleClose();
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  const handleLogin = async ()=>{
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    
    await AsyncAction(data[DataEnum.Loadding].set, async ()=>{
      try {
        
        await toast.promise( async ()=>{
          const data = await IdentityApi.login({
            email: email,
            password: password
          })

          sessionStorage.setItem("token", JSON.stringify(data.accessToken));
          
          const user: IGoogleUser = {
            id: "000000000000000000000",
            email: email,
            verified_email: true,
            name: "User name",
            given_name: "User",
            family_name: "name",
            picture: require("../assets/img/car.png")
          };

          console.log(user);
          sessionStorage.setItem("user", JSON.stringify(user));
          
          handleClose();
        },{
          pending: 'logging in',
          success: 'Login Successful 👌',
          error: 'Email or password is wrong 🤯'
        })
      
      } catch (error) {
        const e = error as AxiosError;
        console.error(error)
        toast.error(e.code);
        toast.error(e.message);
      }
    
    });
  }

  

  return (
    <Modal show={show} onHide={handleClose} centered>
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
            onClick={handleLogin}
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
          >
            Create Account
          </span>
        </p>
        <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
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
    </Modal>
  );
};
