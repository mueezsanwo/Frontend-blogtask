export default function Footer() {
    return (
      <div className="footer">
        <p>All rights dreserved</p>
  
        <style jsx>{`
          .footer {
            height: 80px; /* Adjust the height as needed */
            background: #383838;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: sticky;
            top: 100vh;
          }
        `}</style>
      </div>
    );
  }
  