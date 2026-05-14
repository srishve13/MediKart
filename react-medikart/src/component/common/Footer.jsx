import React from "react";
import "../../style/footer.css"; // Ensure the path is correct
import { Link as MuiLink } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <ul>
          <li><MuiLink href="/" underline="none">About Us</MuiLink></li>
          <li><MuiLink href="/" underline="none">Contact Us</MuiLink></li>
          <li><MuiLink href="/" underline="none">Terms & Conditions</MuiLink></li>
          <li><MuiLink href="/" underline="none">Privacy Policy</MuiLink></li>
          <li><MuiLink href="/" underline="none">FAQs</MuiLink></li>
        </ul>
      </div>
      <div className="footer-info">
        <p>&copy; {new Date().getFullYear()} MediKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
