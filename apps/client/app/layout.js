import "./globals.css";

export const metadata = {
  title: "Task Manager App",
  description: "Task Manager Web Application built with Next.js, Node.js, Express.js and MongoDB. It allows users to create, view, edit, and delete tasks. Users can also update the completion status of the tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
