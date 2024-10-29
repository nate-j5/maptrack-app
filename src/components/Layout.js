import Navbar from "./Navbar";

const Layout = ({ children, linkText }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Pass props to Navbar */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
