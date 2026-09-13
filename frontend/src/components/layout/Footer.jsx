export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div>
        <h4>Portfolio</h4>
        <p>Building thoughtful digital products with cutting-edge technologies.</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact Us</a>
        <a href="/organization-projects">Projects</a>
      </div>
      <div>
        <h4>Follow Us</h4>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
      <div className="footer-bottom">
        © {year} Professional Portfolio. All rights reserved.
      </div>
    </footer>
  );
}
