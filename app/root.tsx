import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json, 
  MetaFunction
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { db, serverTimestamp } from './firebase.js'
import { addDoc, collection } from 'firebase/firestore';

import './css/style.css'
import './css/mobile/style.css'

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Reciprokel" },
    { name: "description", content: "Welcome to the Reciprokel app!" },
  ];
};
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}



export const action = async ({ request }: any) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get('email');

  if (!email) {
    return json({ error: 'Email is required!' }, { status: 400 });
  }

  try {
    // Save email to Firestore
    await addDoc(collection(db, 'emails'), {
      email: email,
      timestamp: serverTimestamp(),
    });

    return json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return json({ error: 'Error saving email to database' }, { status: 500 });
  }
};

export default function App() {
  return(
    <div className="container" >

      <section className="navbar">

        <div className="navbar-left">
          <p>Reciprockel</p>
        </div>

        <div className="navbar-center">
          <ul>
            <li><Link to='/' >Home</Link></li>
            <li><Link to='/' >About us</Link></li>
            <li><Link to='/' >Roadmap</Link></li>
            <li><Link to='/' >Contact Us</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <p>For Investors</p>
          <img src="./Hamburgericon.png" alt="" />
        </div>

      </section>

      <section className="hero" >
        <p className="hero-head">Revolutionizing Learning <br /> & Professional Growth</p>
        <p className="hero-sub-head">Unlock the Future of Education with a Platform Designed for Impactful Engagement and Real-World Success.</p>

        <form method="post">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
            />
            <button type="submit">Join the waitlist</button>
        </form>

      </section>

      <section className="about" >
        <p className="about-head" >ABOUT US</p>
        <p className="about-content" >Our mission is to <span style={{color:'#4d61f4'}} >transform education</span> and empower growth through technology. We’re dedicated to providing institutions, students, and educators with tools to achieve, engage, and <span style={{color:'#4d61f4'}} >succeed</span> in a dynamic world.</p>
        <button className="about-learn-more" >Learn More <img src="/Arrow1.png" alt="" /> </button>
      </section>

      <section className="fet">
        <div className="fet-left">
          <div className="fet-left-top">
            <p className="fet-head">AI Insights to Drive Success</p>
            <p className="fet-cot">Harness the power of AI to personalize learning, optimize course recommendations, and enhance student outcomes. Uncover how data-driven insights and adaptive assessments can elevate education at every level.</p>
          </div>
          <div className="fet-left-center">
            <div className="fet-left-center-left">
              <p className="fet-head">Effortless Attendance, Made Smart</p>
              <p className="fet-cot">Forget roll calls and tedious logs. Our platform redefines attendance management with seamless tracking, analytics, and advanced options. Explore how we make every check-in count.</p>
            </div>
            <div className="fet-left-center-right">
              <p className="fet-head">Assignments, Feedback, and More – All in One Place</p>
              <p className="fet-cot">Say goodbye to paper trails and missed deadlines. From assignment creation to real-time grading and personalized feedback, discover a streamlined way for students and teachers to connect on what matters most.</p>
            </div>
          </div>
          <div className="fet-left-bottom">
            <p className="fet-head">Instant Notifications, Maximum Impact</p>
            <p className="fet-cot">Never miss a beat with real-time alerts for deadlines, grades, events, and more. Our platform keeps everyone informed with customizable push notifications across devices. Discover how we keep communication flowing.</p>
          </div>
        </div>
        <div className="fet-right">
          <div className="fet-right-top">
            <p className="fet-head">Student Progress, Visualized Like Never Before</p>
            <p className="fet-cot">Track academic growth with intuitive dashboards, personalized reports, and in-depth analytics. Dive deeper into performance trends, skill gaps, and strengths, all presented visually for easier insights. See how we turn data into growth.</p>
          </div>
          <div className="fet-right-bottom">
            <p className="fet-head">Your Campus Community, Digitally Connected</p>
            <p className="fet-cot">Whether it’s group projects, club meetings, or discussion boards, create vibrant communities and collaborative spaces for every need. Dive into an ecosystem that supports both learning and growth beyond the classroom.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
