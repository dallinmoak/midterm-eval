import "./globals.css";

export const metadata = {
  title: "Dallin Midterm Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
