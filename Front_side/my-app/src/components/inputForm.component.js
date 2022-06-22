import { height, width } from "@mui/system";
import { Input, Label, MainDiv, TextArea } from "../Styles/inputForm.style";

export function InputFormComponent({ name, type = "text", setValue, formKey }) {
  return (
    <MainDiv>
      <Label>{name}</Label>
      {type === "textArea" ? (
        <TextArea />
      ) : (
        <Input
          type={type}
          onChange={(event) => {
            setValue((prevState) => {
              return {
                ...prevState,
                [formKey]: event.target.value,
              };
            });
          }}
        />
      )}
    </MainDiv>
  );
}

/// adding text area option for multi line insert
