import "./styles.css";

import { blankCard } from "./images";
import MOCK from "./app.mock";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [state, setState] = useState({});
  const [openedImgaes, setOpenedImages] = useState({});
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    let id;
    let imgaes = Object.values(openedImgaes);
    const len = imgaes.length;
    if (len === 2) {
      const isMatched = imgaes[0].name === imgaes[1].name;

      id = setTimeout(function () {
        setOpenedImages([]);
        if (isMatched) setState((state) => ({ ...state, ...openedImgaes }));
      }, 1000);
    }

    return () => clearTimeout(id);
  }, [openedImgaes]);

  const handleClick = (e, ele) => {
    if (Object.keys(openedImgaes).length > 1) return;
    setOpenedImages((state) => ({ ...state, [e.target.id]: ele }));
  };

  return (
    <>
      <div className="App">
        {MOCK.map((ele) => {
          const { name, pic, id } = ele;
          const isopen = state[id] || openedImgaes[id];
          return (
            <button
              key={id}
              onClick={(e) => handleClick(e, ele)}
              id={id}
              className={`card-outer ${isopen ? "flipped" : ""}`}
            >
              <img
                className={isopen ? "card-front" : "card-back"}
                src={isopen ? pic : blankCard}
                style={{ width: "100px", height: "100px" }}
                alt={name}
                id={id}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
