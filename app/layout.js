import "./globals.css";

export const metadata = {
  title: "Shopping List",
  description: "This is a shopping list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
