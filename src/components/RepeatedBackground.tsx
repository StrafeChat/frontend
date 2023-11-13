"use client";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";

export default function RepeatedBackground() {
  const [turtles, setTurtles] = useState<any[]>([]);
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    if (turtles.length < 51 && callCount < 60) {
      (async () => {
        setCallCount(callCount + 1);
        const randomize = (margin = 80, call = 0) => {
          if (call > 10) return { x: 0, y: 0 };
          const x = window.innerWidth * Math.random();
          const y = window.innerHeight * Math.random();
          const distances = turtles
            .map((turtle) =>
              Math.sqrt((turtle.x - x) ^ (2 + (turtle.y - y)) ^ 2)
            )
            .sort((a, b) => a - b)
            .filter((distance) => distance < margin);
          if (distances.length > 0) {
            randomize(margin, call++);
          }
          return { x, y };
        };
        const { x, y } = randomize(200); // pass the desired margin as parameter here
        if (x === 0 && y === 0) return setTurtles([...turtles]);

        await new Promise((resolve) => setTimeout(resolve, 100));

        setTurtles([...turtles, { x, y } ]);
      })();
    }
    setTurtles(turtles);
  }, [turtles]);

  return (
    <div className="absolute -z-10 w-full h-full bg-neutral-900">
      <div className="relative w-full h-full" style={{overflow: "hidden"}}>
        {turtles.map((turtle, index) => (
          <Turtle style={{left: `${turtle.x}px`, right: "10px", top: `${turtle.y}px`, width: "100", height: "100", position: "absolute"}} className="absolute text-green-500 w-[25px] h-[25px]" key={index} />
        ))}
      </div>
    </div>
  );
}

function Turtle({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    /*<svg
      style={style}
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M258.406 25.03c-13.73 0-44.75 28.13-44.75 62.814 0 31.578 6.432 55.835 16.5 70.937-23.144 3.766-44.237 12.52-61.03 27.314-2.99 2.633-5.824 5.462-8.5 8.47-38.335-36.232-115.217 13.032-137 39.28-19.604 23.618 58.395 26.618 110.718 16.75-1.837 9.754-2.813 20.262-2.813 31.53 0 39.603 11.68 76.216 31.157 104.282-42.685 4.89-61.916 64.204-61.093 90.438.912 29.105 77-17.718 105.5-49.375 8.82 4.862 18.197 8.497 28 10.75 4.822 14.255 10.526 28.394 23.312 41.655 13.732-13.89 18.762-27.77 23.28-41.656 9.815-2.253 19.203-5.883 28.033-10.75 28.498 31.656 104.587 78.48 105.5 49.374.822-26.234-18.41-85.55-61.095-90.438 19.477-28.066 31.156-64.68 31.156-104.28 0-11.27-.974-21.778-2.81-31.532 52.322 9.868 130.32 6.868 110.717-16.75-21.784-26.248-98.666-75.512-137-39.28-2.677-3.008-5.51-5.837-8.5-8.47-16.86-14.855-38.058-23.604-61.312-27.344 10.232-15.31 16.78-39.817 16.78-70.906 0-34.683-31.018-62.813-44.75-62.813zm0 150.25c20.22 0 38.787 3.424 54.563 10.532l-26.345 31.97h-56.438l-26.343-31.97c15.775-7.108 34.34-10.53 54.562-10.53zm-70.937 20.032l25.75 31.25-29.97 44.032-4.28 6.28 5.31 5.47 36.532 37.625-23.312 28.436-5.28 6.438 5.78 6 27.125 28 13.438-13-21.344-22.03 21.53-26.22h39.313l21.53 26.22-21.343 22.03 13.438 13 27.125-28 5.78-6-5.28-6.438L296 319.97l36.563-37.626 5.25-5.438-4.22-6.28-29.718-44.376 25.5-30.938c2.06 1.506 4.06 3.1 5.97 4.782 19.106 16.832 31.25 42.762 31.25 82.03 0 78.538-49.7 140.063-108.19 140.063-58.486 0-108.186-61.525-108.186-140.062 0-39.27 12.14-65.2 31.25-82.03 1.913-1.688 3.93-3.273 6-4.782zm41.593 41.157h59.156l25.655 38.25-33.188 34.186h-44.562L203 274.78l26.063-38.31z"></path>
    </svg>*/
    //<img style={style} src="/turtle.png" className={className}></img>
    <Image src={"/turtle.png"} alt="Turtle" style={style} className={className} width={100} height={100}/>
  );
}
