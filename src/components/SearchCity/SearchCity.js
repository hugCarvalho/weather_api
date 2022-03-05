import React, { useState, useContext } from "react";
import { ErrorContext, UserQueryContext } from "../../App";
import styled from "styled-components"

const Form = styled.form`
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin: 15px 0 5px 0;
  text-align: center;
`

const Input = styled.input`
  height: 2.4rem;
  outline: none;
  width: 48%;
  height: 100%;
  border: none;
  border-radius: 0;
  padding: 1px 6px;
  border-right: none; //also removes firefox automatic border-radius
  border-radius: 3px 0 0 3px;
  -webkit-appearance: none;
  -webkit-border-radius: 3px 0 0 3px;
  -webkit-border-right: none;

  &:focus{
    outline: none;
  }

  @media (min-width: 576px){
    width: 30%;
  }
`

const Button = styled.button`
  display: inline;
  background: #0059c5;
  height: 100%;
  background-color: blue;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 0 10px;
  border: none;
  border-radius: 0 3px 3px 0;
  transition: background 350ms ease-out;
  //-webkit-appearance: none;
  //-moz-appearance: none;

  &:active {
    transform: scale(0.99);
  }
  &:hover,
  :focus {
    background-color: #045CC7;
    opacity: .8;
    font-weight: 600;
  }
`

export default function InputSearchCity() {
  const { setUserQuery } = useContext(UserQueryContext);
  const { dispatchError } = useContext(ErrorContext);
  const [text, setText] = useState("");

  const checkInputIsValid = e => {
    //don't use setIsLoading. Allows for rerender on city not found
    e.preventDefault();
    if (text) {
      setUserQuery(text);
    } else {
      dispatchError({ type: "TRUE", value: "Please type something" });
    }
  };

  return (
    <div>
      <Form onSubmit={checkInputIsValid}>
        <Input
          name="searchCity"
          type="search"
          placeholder="type a city name..."
          onChange={e => setText(e.target.value)}
          id="input-search-city"
        />
        <Button type="submit">Go</Button>
      </Form>
    </div>
  );
}
