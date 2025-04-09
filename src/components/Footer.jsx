import { FaLinkedin, FaRegCopyright, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#062639] mt-0 text-light p-5 pb-4" style={{ backgroundColor: '#062639' }}>
      <div className="d-flex flex-column">
        <div className="mx-auto text-center">
          <a className="mx-2 text-light" href="/alumini-network">Search</a>
          <a className="mx-2 text-light" href="/alumini-network#chapters">Chapters</a>
          <a className="mx-2 text-light" href="/alumini-network#alumini-making-waves">Alumini Making Waves</a>
          <a className="mx-2 text-light" href="/alumini-network#alumini-of-the-week">Alumini Spotlight</a>
          <a className="mx-2 text-light" href="/alumini-network#impacts">Alumini works</a>
          <a className="mx-2 text-light" href="/get-involved">Join</a>
          <a className="mx-2 text-light" href="/contact">Contact Us</a>
          <a className="mx-2 text-light" href="/newsletter">Subscribe to our newsletter</a>
        </div>
        <div className="mx-auto mt-5 p-0 text-center d-flex">
          <a className="mx-auto p-2" target="_blank" href="https://www.facebook.com/share/164KR6zX8F/"><img src="/fb.png" alt="" /></a>
          <a className="mx-auto p-2" target="_blank" href="https://www.instagram.com/usgeaanigeria?igsh=b2ViZjFxc3FlbGpq"><img src="/ig.png" alt="" /></a>
          <a className="mx-auto p-2" target="_blank" href="https://x.com/USGEAA_Nigeria?t=rZvuVTZ96Kan0g_GeZ676g&s=09"><img src="/x.png" alt="" /></a>
          <a className="mx-auto p-2 text-danger" target="_blank" href="http://www.youtube.com/@USGEAA-Nigeria"><FaYoutube /></a>
          <a className="mx-auto p-2 text-primary" target="_blank" href="https://www.linkedin.com/company/usgeaa-nigeria/"><FaLinkedin /></a>
        </div>
        <div className="d-flex mx-auto p-0 py-4 fs-6 pb-0 text-xs font-medium">
          <FaRegCopyright className="mt-1 icon me-2" /> USGEAAN {(new Date()).getFullYear()}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
