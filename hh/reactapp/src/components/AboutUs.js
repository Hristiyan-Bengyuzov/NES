import "../styles/About.css";

const AboutUs = () => {

  return (
    <div className="about-container">
      <div className="info-container">
        <img src="https://avatars.githubusercontent.com/u/114109528?v=4" className="info-img" />
        <p>Християн Бенгюзов</p>
        <p>xrisko06@abv.bg</p>
        <p>Back-end dev</p>
        <a href="https://github.com/Hristiyan-Bengyuzov"><img src="https://www.svgrepo.com/show/445786/github.svg" className="git-logo"/></a>
      </div>
      <div className="info-container">
        <img src="https://avatars.githubusercontent.com/u/96301516?v=4" className="info-img" />
        <p>Харалампи Славков</p>
        <p>haralampy@abv.bg</p>
        <p>Front-end dev</p>
        <a href="https://github.com/tmkayy"><img src="https://www.svgrepo.com/show/445786/github.svg" className="git-logo"/></a>
      </div>
    </div>
  );

}

export default AboutUs;