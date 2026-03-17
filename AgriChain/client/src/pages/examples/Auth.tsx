import Auth from '../Auth';
import { ThemeProvider } from "@/components/ThemeProvider";

export default function AuthExample() {
  return (
    <ThemeProvider>
      <Auth />
    </ThemeProvider>
  );
}