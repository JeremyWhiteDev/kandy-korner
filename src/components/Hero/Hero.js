import "./Hero.css";

export const Hero = () => {
  return (
    <>
      <div className="hero-section">
        <img
          className="hero-img"
          src={require("../../images/kandy-korner-hero.png")}
        />
      </div>
    </>
  );
};
