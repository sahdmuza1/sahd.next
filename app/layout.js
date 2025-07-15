import DragBall from "./components/DragBall";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
        <DragBall />
      </body>
    </html>
  );
}