import { createTheme } from "@mui/material";

let palette = {
  background: {
    paper: "#ffffff",
    default: "#F8F9FB",
    light: "#F4F5F8",
    tabChip: "#132733",
    grey: "#42525C",
  },
};

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: "Prompt, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          background: theme.palette?.background?.default,
          ...(ownerState?.primary && {
            border: `1px solid ${theme.palette.secondary.main}40`,
            borderRadius: "10px !important",
          }),
          ...(ownerState?.secondary && {
            borderRadius: "10px !important",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          }),
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});
