import Image from "next/image";
import React, { useEffect, useState } from "react";

const HomeView = () => {
  const [isLampuTamu, setLampuTamu] = useState(false);

  const [isLampuDapur, setLampuDapur] = useState(false);

  const [isLampuTidur, setLampuTidur] = useState(false);

  useEffect(() => {
    const fetchInitialLampuStates = async () => {
      try {
        const dapurResponse = await fetch("http://192.168.223.237/dapur");
        const tamuResponse = await fetch("http://192.168.223.237/tamu");
        const tidurResponse = await fetch("http://192.168.223.237/tidur");

        if (dapurResponse.ok) {
          const dapurState = await dapurResponse.text();
          setLampuDapur(dapurState === "ON");
        }
        if (tamuResponse.ok) {
          const tamuState = await tamuResponse.text();
          setLampuTamu(tamuState === "ON");
        }
        if (tidurResponse.ok) {
          const tidurState = await tidurResponse.text();
          setLampuTidur(tidurState === "ON");
        }
      } catch (error) {
        console.error("Error fetching initial lampu states:", error);
      }
    };

    fetchInitialLampuStates();
  }, []);

  const handleDapurChange = async () => {
    try {
      const response = await fetch("http://192.168.223.237/dapur", {
        method: "POST",
      });
      if (response.ok) {
        setLampuDapur((prev) => !prev);
      } else {
        console.error("Error toggling dapur lamp:", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleDapurChange:", error);
    }
  };

  const handleTidurChange = async () => {
    try {
      const response = await fetch("http://192.168.223.237/tidur", {
        method: "POST",
      });
      if (response.ok) {
        setLampuTidur((prev) => !prev);
      } else {
        console.error("Error toggling tidur lamp:", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleTidurChange:", error);
    }
  };

  const handleTamuChange = async () => {
    try {
      const response = await fetch("http://192.168.223.237/tamu", {
        method: "POST",
      });
      if (response.ok) {
        setLampuTamu((prev) => !prev);
      } else {
        console.error("Error toggling tamu lamp:", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleTamuChange:", error);
    }
  };

  return (
    <main className="h-[1000px] max-w-xl px-3 py-5">
      <div className="flex justify-between items-end">
        <h1 className="text-xl font-semibold">
          Lampu <br /> Pintar
        </h1>
        <Image width={50} height={50} alt="Lamp Icon" src="/assets/lamp.png" />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3">
        <button
          onClick={handleDapurChange}
          className={`text-left pl-3 pr-10 py-5 ${
            isLampuDapur ? "bg-[#484848] text-white" : "bg-white"
          }   border-2 border-black rounded-xl hover:scale-105 transition-all`}
        >
          <Image
            width={55}
            height={55}
            alt="bedroom icon"
            src="/assets/kitchen.png"
          />
          <h1 className="text-base font-semibold">Dapur</h1>
          <p>{isLampuDapur ? "mati" : "nyala"}</p>
        </button>

        <button
          onClick={handleTidurChange}
          className={`text-left pl-3 pr-10 py-5 ${
            isLampuTidur ? "bg-[#07abd4] " : "bg-[#484848]"
          }  text-white border-2 border-black rounded-xl hover:scale-105 transition-all`}
        >
          <Image
            width={55}
            height={55}
            alt="bedroom icon"
            src="/assets/bedroom.png"
          />
          <h1 className="text-base font-semibold">Kamar Tidur</h1>
          <p>{isLampuTidur ? "nyala" : "mati"}</p>
        </button>

        <button
          onClick={handleTamuChange}
          className={`text-left pl-3 pr-10 py-5 ${
            isLampuTamu ? "bg-[#f8e940]" : "bg-[#484848] text-white"
          }  border-2 border-black rounded-xl hover:scale-105 transition-all`}
        >
          <Image
            width={55}
            height={55}
            alt="bedroom icon"
            src="/assets/living-room.png"
          />
          <h1 className="text-base font-semibold">Ruang Tamu</h1>
          <p>{isLampuTamu ? "nyala" : "mati"}</p>
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-[320px] flex justify-around fixed bottom-10 ">
          <div>
            <Image
              width={30}
              height={30}
              alt="Home icon"
              src="/assets/app-bar/home-1.png"
            />
          </div>
          <div>
            <Image
              width={30}
              height={30}
              alt="Home icon"
              src="/assets/app-bar/lighting.png"
            />
          </div>
          <div>
            <Image
              width={30}
              height={30}
              alt="Home icon"
              src="/assets/app-bar/door.png"
            />
          </div>
          <div>
            <Image
              width={30}
              height={30}
              alt="Home icon"
              src="/assets/app-bar/escape.png"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeView;
