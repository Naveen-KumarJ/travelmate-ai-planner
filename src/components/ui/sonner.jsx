import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      {...props}
      position="top-right" 
      theme={theme}
      richColors
      className="toaster group"
    />
  );
};

export { Toaster };
