import React, { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import QuizItem from "../../../components/QuizItem";
import { getTrends } from "../../../service/api";

function Index() {
  const sliderRef = useRef(null);
  const dotsRef = useRef(null);
  const [scrollDone, setScrollDone] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [currentScrollPage, setCurrentScrollPage] = useState(0);
  const [dots, setDots] = useState([]);
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollValue] = useState(1248);
  const [scrollTotal, setScrollTotal] = useState(0);
  const [scrollPage, setScrollPage] = useState(0);

  useEffect(() => {
    const fetchTrends = async () => {
      const data = await getTrends();
      setTrends(data);
      setIsLoading(false);
    };
    fetchTrends();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        setCurrentScroll(sliderRef.current.scrollLeft);
      }
    };

    sliderRef.current.addEventListener("scroll", handleScroll);
  }, [sliderRef]);

  useEffect(() => {
    if (trends.length > 0) {
      setScrollTotal(
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
    }
  }, [trends]);

  useEffect(() => {
    if (currentScroll === scrollTotal) {
      setScrollDone(true);
    } else {
      setScrollDone(false);
    }
  }, [currentScroll, scrollTotal]);

  useEffect(() => {
    if (trends.length > 0) {
      setScrollPage(Math.ceil(scrollTotal / scrollValue) + 1);
      const newDots = [];
      for (let i = 0; i < scrollPage; i++) {
        newDots.push(
          <div className={`w-2 h-2 rounded-full border-2 ml-2 mt-5 `} key={i} />
        );
      }
      setDots(newDots);
    }
  }, [scrollPage, trends]);

  useEffect(() => {
    if (dotsRef.current) {
      const divs = dotsRef.current.querySelectorAll("div");
      for (let i = 0; i < divs.length; i++) {
        if (i === currentScrollPage) {
          [...divs][i].className += " bg-gray-400";
        } else {
          [...divs][i].className = "w-2 h-2 rounded-full border-2 ml-2 mt-5 ";
        }
      }
    }
  }, [dots, currentScrollPage]);

  useEffect(() => {
    const otoScroll = setInterval(() => {
      if (currentScroll === scrollTotal) {
        sliderRef.current.scrollLeft = 0;
        setCurrentScrollPage(Number(0));
      } else {
        sliderRef.current.scrollLeft += scrollValue;
        setCurrentScrollPage(Number(currentScrollPage + 1));
      }
    }, 5000);

    return () => {
      clearInterval(otoScroll);
    };
  }, [currentScroll, scrollTotal, currentScrollPage]);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= scrollValue;
    setCurrentScrollPage(Number(currentScrollPage - 1));
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += scrollValue;
    setCurrentScrollPage(Number(currentScrollPage + 1));
  };

  return (
    <div>
      {isLoading && <p>Trendler yükleniyor...</p>}
      <div className='flex gap-5 relative rounded-xl  '>
        {currentScroll !== 0 && (
          <SlArrowLeft
            onClick={scrollLeft}
            className='z-10 absolute cursor-pointer  -left-10 top-1/2 -translate-y-1/2 hover:opacity-70'
            fill='gray'
            size={40}
          />
        )}
        <div
          ref={sliderRef}
          className='flex p-4  mt-2  gap-4 overflow-hidden rounded-xl  scroll-smooth'
        >
          {trends.map((item, index) => (
            <QuizItem quiz={item} key={index} />
          ))}
        </div>
        {!scrollDone && (
          <SlArrowRight
            onClick={scrollRight}
            className='z-10 absolute cursor-pointer -right-10 top-1/2 -translate-y-1/2 hover:opacity-70'
            fill='gray'
            size={40}
          />
        )}
      </div>

      <div ref={dotsRef} className='flex justify-center'>
        {dots.map((i) => i)}
      </div>
    </div>
  );
}

export default Index;
