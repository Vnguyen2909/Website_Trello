import { useState } from "react";
import TextField from "@mui/material/TextField";

// Controlled Input trong MUI: https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled
function ToggleFocusInput({
  value,
  onChangedValue,
  inputFontSize = "16px",
  ...props
}) {
  const [inputValue, setInputValue] = useState(value);
  //Blur la khi khong con Focus vao phan tu => Trigger se hanh dong
  const triggerBlur = () => {
    //Suppoer Trim du lieu State inputValue sau khi blur ra
    setInputValue(inputValue.trim());

    //Neu gia tri 0 thay doi hoac User xoa noi dung => Set lai gia tri ban dau theo value tu props va return
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value);
      return;
    }
    //Khi gia tri thay doi => goi Func o Props cha
    onChangedValue(inputValue);
  };

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      onBlur={triggerBlur}
      {...props}
      // Magic here :D
      sx={{
        "& input": {
          fontSize: inputFontSize,
          fontWeight: "bold",
        },

        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",

          "& fieldset": {
            borderColor: "transparent",
            borderWidth: "1px",
          },

          "&:hover fieldset": {
            borderColor: "transparent",
          },

          "&.Mui-focused": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#33485D" : "#fff",

            "& fieldset": {
              borderColor: "primary.main",
              borderWidth: "1px",
            },
          },
        },

        "& .MuiOutlinedInput-input": {
          padding: "0 6px 0 6px",
          height: "35px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
    />
  );
}

export default ToggleFocusInput;
