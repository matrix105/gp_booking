import React from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import Input from "./mini Compnents/Input";
import Button from "./mini Compnents/Buttons";
import { registerInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { Container } from "@material-ui/core";

function Register() {
  function getInput(props) {
    return <Input id={props.id} label={props.label} type={props.type} />;
  }
  function getButton(props) {
    return <Button type={props.type} color={props.color} name={props.name} />;
  }
  function getImage(props) {
    return <Image className="img" src={props.src} alt={props.alt} />;
  }
  function getMessage(message) {
    return <Messages message={message} />;
  }

  return (
    <Container>
      <div className="containers" style={{ margin: "0px", padding: "0px" }}>
        <div className="imageContainer">
          {registerInput.image.map(getImage)}
          <div className="middle">
            <div className="text">{registerInput.messages.map(getMessage)}</div>
          </div>
        </div>

        <form
          autoComplete="off"
          className="form"
        //   onSubmit={}
          method="POST"
        >
          <Title title={registerInput.title} />
          {registerInput.inputs.map(getInput)}
          {registerInput.buttons.map(getButton)}
        </form>
      </div>
    </Container>
  );
}

export default Register;
