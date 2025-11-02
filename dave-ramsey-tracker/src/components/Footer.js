import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Dave Ramsey's Baby Steps</h4>
          <p>Your journey to financial freedom, one step at a time.</p>
        </div>

        <div className="footer-section footer-section-remember">
          <h4>Remember</h4>
          <blockquote>
            "Live like no one else, so later you can live like no one else."
            <cite>- Dave Ramsey</cite>
          </blockquote>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a
                href="https://www.daveramsey.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dave Ramsey Official
              </a>
            </li>
            <li>
              <a
                href="https://www.daveramsey.com/baby-steps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn About Baby Steps
              </a>
            </li>
            <li>
              <a
                href="https://www.everydollar.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                EveryDollar Budget Tool
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Built for financial empowerment. Not a certified financial
          professional or affiliated with Dave Ramsey. Use at your own risk.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
