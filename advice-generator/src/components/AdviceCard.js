import React, { useEffect, useState } from "react";
import { ReactComponent as DiceSVG } from "../images/icon-dice.svg";
import { TailSpin } from "react-loader-spinner";
import "./AdviceCard.css";

function AdviceCard() {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
      setIsLoaded(true);
    };

    initializePage();
  }, []);

  async function fetchAdvice() {
    setIsLoaded(false);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setAdviceId(data.slip.id);
    setIsLoaded(true);
  }

  return (
    <>
      {isLoaded ? (
        <>
          <div className="advice-card-container">
            <div className="advice-card-id">
              <span>Advice #{adviceId}</span>
            </div>

            <div className="advice-message">
              <span>{advice}</span>
            </div>

            <div className="quote-divider">
              <i className="fa-solid fa-pause"></i>
            </div>
          </div>

          <div className="dice-container" onClick={fetchAdvice}>
            <DiceSVG className="dice-svg" />
          </div>
        </>
      ) : (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </>
  );
}

export default AdviceCard;
