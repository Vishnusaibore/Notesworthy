import React,{useEffect,useRef} from "react";

function Footer(){
    //Footer Component
    const footerRef = useRef(null);

  const setFooterPosition = () => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowHeight = window.innerHeight;

    if (height > windowHeight) {
      footerRef.current.style.position = 'relative';
    } else {
      footerRef.current.style.position = 'fixed';
      footerRef.current.style.bottom = '0';
      footerRef.current.style.width = '100%';
    }
  };

  useEffect(() => {
    setFooterPosition();
    window.addEventListener('resize', setFooterPosition);
    return () => window.removeEventListener('resize', setFooterPosition);
  }, []);

    //End of Logic
    let year = new Date().getFullYear()
    return(
        <footer ref={footerRef} className="footer">
        <h5>Notesworthy</h5>
        <p className="pfoot mt-2">© {year} Vishnusai Bore | All Rights Reserved</p>
        </footer>
    )
}
export default Footer