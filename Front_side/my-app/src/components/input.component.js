import { useState } from "react";
import { TextInput } from "../Styles/input.style";

const InputComponent = function ({
  defultValue,
  onChange,
  textAlign,
  type = "text",
}) {
  return (
    <TextInput
      type={type}
      placeholder={defultValue}
      onChange={onChange}
      textAlign={textAlign ? textAlign : "right"}
    />
  );
};
export default InputComponent;
