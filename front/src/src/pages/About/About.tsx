import { Image, Typography } from "antd";
import "./About.css";

export default function About() {
  return (
    <div>
      <div className="title">
        <Typography.Title level={1} style={{ margin: 0 }}>
          Some info about creator
        </Typography.Title>
      </div>
      <div className="info-and-photo">
        <div className="info">
          <h1>Name:</h1>
          <p>Ruslan Gimranov</p>
          <h1>Age:</h1>
          <p>28</p>
          <h1>Email:</h1>
          <p>g1mran@bk.ru</p>
          <h1>Experience:</h1>
          <li>About 4 moths in bank consultant role(Sberbank)</li>
          <li>About 1,5 years in subway trains mechanic role(Moscow Metro)</li>
          <li>
            About 1,5 years in engineer of technical department of electric
            depot role(Moscow Metro)
          </li>
          <li>
            About 1 year in deputy chief engineer of electric depot role
            (Moscow Metro)
          </li>
          <h1>Main skills:</h1>
          <p>JS, HTML, CSS, ReactTS(18.2.0), Ant-Design(5.1.0), Python(3.11.1), Django(4.1.4)</p>
          <p>Django-rest, Djoser, Postgres, Webpack</p>
          <p>Docker</p>
          <h1>Setting:</h1>
          <p>VSCode</p>
        </div>
        <div className="photo">
          <Image width={300} src="my_photo.png" />
        </div>
      </div>
      <div className="about-project">
      <h1>About this project:</h1>
          <p>
            From November 2022 till now I am learning to become a
            JavaScript-developer and this is my practice project for
            presentation. In this project I tried to practice in JS React coding
            based on Django backend side with using some libraries and
            frameworks like Ant-Design for frontend and Django-rest-framework
            for backend. For this project I also have used cocktail database
            from <a href="https://www.thecocktaildb.com/"> https://www.thecocktaildb.com/ </a> 
            to realize this. Thanks for your attention and I hope see you later
            in the IT-world!
          </p>
      </div>
    </div>
  );
}
