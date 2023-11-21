import Navbar from "./navbar"
import Footer from "./footer"


export default function Layout({children}) {

    return (
        <div className="layoutContainer">
        <Navbar />    
        <div className="content">{children}</div>
        <Footer className="footer" />
        <style jsx>{`
          .layoutContainer {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .content {
            flex: 1; /* Fill remaining vertical space */
          }
          .footer {
            margin-top: auto; /* Push the footer to the bottom */
          }
        `}</style>
      </div>
            
    )
}