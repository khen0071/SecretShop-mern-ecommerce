import RevealScale from "./shared/RevealScale";

const Process = () => {
  return (
    <>
      <div className="processContainer">
        <div className="processContent">
          <div className="processItemContainer">
            <div className="processItem">
              <RevealScale>
                <div className="iconContainer">
                  <i className="fa-solid fa-tags processIcon text-emeraldGreen"></i>
                </div>
              </RevealScale>
              <RevealScale>
                <h1 className="itemH1">Extensive Product Range</h1>
              </RevealScale>
              <RevealScale>
                <p className="itemP">
                  Explore our diverse collection of products, carefully curated
                  to cater to every need and preference. From fashion and beauty
                  to electronics, home decor, and beyond, we have something for
                  everyone.
                </p>
              </RevealScale>
            </div>

            <div className="processItem">
              <RevealScale>
                <div className="iconContainer">
                  <i className="fa-solid fa-award processIcon text-orange"></i>
                </div>
              </RevealScale>
              <RevealScale>
                <h1 className="itemH1">Quality and Value</h1>
              </RevealScale>
              <RevealScale>
                <p className="itemP">
                  We take pride in offering only top-quality products from
                  trusted brands and reputable suppliers. Enjoy the assurance of
                  value for money with every purchase you make.
                </p>
              </RevealScale>
            </div>

            <div className="processItem">
              <RevealScale>
                <div className="iconContainer">
                  <i className="fa-solid fa-users-viewfinder processIcon text-blue"></i>
                </div>
              </RevealScale>
              <RevealScale>
                <h1 className="itemH1">User-Friendly Interface</h1>
              </RevealScale>
              <RevealScale>
                <p className="itemP">
                  Our website is designed with your convenience in mind. Enjoy
                  smooth navigation, intuitive search options, and a seamless
                  checkout process, making your shopping journey a breeze.
                </p>
              </RevealScale>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Process;
