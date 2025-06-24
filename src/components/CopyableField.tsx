import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface CopyableFieldProps {
  label: string;
  value: string;
  rows?: number;
  multiline?: boolean;
}

const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  rows = 1,
  multiline = false,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <TextField
      label={label}
      value={value}
      multiline={multiline}
      rows={rows}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <IconButton
            onClick={handleCopy}
            edge="end"
            aria-label={`Copy ${label}`}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        ),
      }}
      variant="outlined"
      fullWidth
      margin="normal"
    />
  );
};

export default CopyableField;
