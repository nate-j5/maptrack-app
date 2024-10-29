import Navbar from "./Navbar";

const Layout = ({ children, linkText, linkHref }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar linkText={linkText} /> {/* Pass props to Navbar */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
