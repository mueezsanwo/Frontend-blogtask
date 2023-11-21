import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {

    const router = useRouter();

    return (
       <>
       <nav className="nav">
       <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
         <h1>Blogger App</h1>
      </Link>
            
       </nav> 

       <style jsx>
        {`
          .nav{
            background: gray;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            font-size: 30px;
          }
        `}
    </style>

     </>

    )
}