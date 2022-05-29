import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMovies } from "../store/actions/movieAction";
import { loadCasts } from "../store/actions/castAction";
import MovieRow from "../components/MovieRow";

function Landing() {
  const [status, setStatus] = useState("month");
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const { casts } = useSelector((state) => state.cast);
  const ref = useRef(null);
  const refCast = useRef(null);
  const [isMovieRowLoaded, setIsMovieRowLoaded] = useState(true);

  useEffect(() => {
    dispatch(loadMovies()).then(() => setIsMovieRowLoaded(false));
    dispatch(loadCasts());
  }, []);

  const scrollHorizontally = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const scrollHorizontallyCast = (scrollOffsetCast) => {
    refCast.current.scrollLeft += scrollOffsetCast;
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center text-white">
        <div className="w-[100%] flex flex-wrap justify-center items-center bg-[url('https://cdn.wallpapersafari.com/24/74/zgeTuV.jpg')] h-screen object-fill">
          <div className="w-[60%] h-[80%] bg-red-900 rounded-3xl flex flex-wrap justify-center items-center shadow-black shadow-2xl">
            <div className="text-[20px] w-full flex flex-wrap justify-center items-center gap-10">
              <p className="text-5xl text-center w-[70%]">
                The Biggest Movie Website In The Universe
              </p>
              <p className="text-xl text-center w-[70%]">
                We have more than....
              </p>
              <div className="w-full flex flex-wrap justify-center items-center gap-20">
                <p className="text-3xl">+1000 MOVIES</p>
                <div className="text-8xl">
                  <ion-icon name="pause-outline"></ion-icon>
                </div>
                <p className="text-3xl">+20 GENRES</p>
              </div>
              <a
                href="#subscribe"
                className="p-5 w-[70%] text-center bg-black border-2 rounded-xl border-red-900 italic text-[30px]"
              >
                GET STARTED
              </a>
            </div>
          </div>
        </div>

        <div className="w-[100%] flex flex-wrap items-center mt-[90px] mr-10">
          <div className="w-full flex flex-nowrap justify-between items-center ml-8">
            <div className="text-3xl flex items-center justify-center">
              <button onClick={() => scrollHorizontally(-360)}>
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            </div>

            <div className="row">
              <div className="row__posters" ref={ref}>
                <MovieRow movies={movies} isMovieRowLoaded={isMovieRowLoaded} />
              </div>
            </div>

            <div className="ml-[20px] text-3xl">
              <button onClick={() => scrollHorizontally(360)}>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <div className="w-[100%] flex flex-wrap justify-center items-center bg-red-800 mt-[60px]">
          <div className="w-[30%] flex object-cover">
            <div className="object-cover bg-black">
              <img
                className="object-cover h-[512px]"
                src="https://assets.pikiran-rakyat.com/crop/60x0:749x557/x/photo/2021/02/28/1824586138.jpg"
              />
            </div>
          </div>
          <div className="w-[70%] text-2xl text-justify p-20 flex">
            <p>
              Pevita Pearce is a British-Indonesian movie star. She started her
              career in the early age. She is known through the film Denias,
              Senandung di Atas Awan (Denias, Singing on the Cloud) as Angel in
              2006. The film is the first experience in acting Pevita in his
              first big screen movie without the slightest experience of playing
              a soap opera. At the end of 2007, Pevita play again in the film
              Lost in Love, which playing in May 2008. In this film, Pevita got
              the lead role as Tita. Pevita get Tita's role through a long
              series of selection process starting from about 1,100 applicants
              through pursed eight people and from the movie Lost in Love,
              Pevita was nominated as Main Best Female Player of FFI 2008.
            </p>
          </div>
        </div>

        <div className="w-[100%] flex flex-wrap items-center mt-[90px] mr-10">
          <div className="w-full flex flex-nowrap justify-between items-center ml-8">
            <div className="text-3xl flex items-center justify-center">
              <button onClick={() => scrollHorizontallyCast(-360)}>
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            </div>

            <div className="row">
              <div className="row__posters" ref={refCast}>
                {casts.map((cast) => (
                  <img key={cast.id} className="h-[300px] mx-2" src={cast.profilePict} />
                ))}
              </div>
            </div>

            <div className="ml-[20px] text-3xl">
              <button onClick={() => scrollHorizontallyCast(360)}>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <div
          id="subscribe"
          className="w-[70%] flex flex-wrap items-center mt-[50px]"
        >
          <h1 className="w-full text-2xl p-4 text-center">
            The Home of Global & Indonesian Movies and Series
          </h1>
          <div className="w-full bg-gradient-to-t from-[#111] to-[#630000] rounded-3xl p-10 mb-[50px]">
            <div className="flex justify-center">
              <ul className="list-disc text-lg text-gray-500">
                <li className="p-1">
                  Global blockbusters from Disney, Marvel, Pixar, Star Wars and
                  more
                </li>
                <li className="p-1">Indonesian movies and series</li>
                <li className="p-1">Never-before-seen Maflix+ Originals</li>
                <li className="p-1">
                  Visit FAQ page to find out Maflix+ Hotstar special offers from
                  various partners
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap w-full justify-center items-center mt-[40px] ml-[10px] gap-9 text-lg">
              <div className="w-1/4 flex flex-nowrap justify-center items-center">
                <div className="w-1/5 text-center text-4xl mr-3 flex items-center">
                  <ion-icon name="infinite-outline"></ion-icon>
                </div>
                <div className="w-4/5">
                  <p>Watch on the go</p>
                </div>
              </div>
              <div className="w-1/4 flex flex-nowrap justify-center items-center">
                <div className="w-1/5 text-center text-4xl mr-3 flex items-center">
                  <ion-icon name="play-circle-outline"></ion-icon>
                </div>
                <div className="w-4/5">
                  <p>Across Platforms</p>
                </div>
              </div>
              <div className="w-1/4 flex flex-nowrap justify-center items-center">
                <div className="w-1/5 text-center text-4xl mr-3 flex items-center">
                  <ion-icon name="tv-outline"></ion-icon>
                </div>
                <div className="w-4/5">
                  <p>Multiple Devices</p>
                </div>
              </div>
              <div className="w-1/4 flex flex-nowrap justify-center items-center">
                <div className="w-1/5 text-center text-4xl mr-3 flex items-center">
                  <ion-icon name="language-outline"></ion-icon>
                </div>
                <div className="w-4/5">
                  <p>Subs/Dubs in Bahasa Indonesia</p>
                </div>
              </div>
              <div className="w-1/4 flex flex-nowrap justify-center items-center">
                <div className="w-1/5 text-center text-4xl mr-3 flex items-center">
                  <ion-icon name="pricetags-outline"></ion-icon>
                </div>
                <div className="w-4/5">
                  <p>Commercial Free</p>
                </div>
              </div>
              <div className="w-1/4 flex flex-nowrap justify-center items-center">
                <div className="w-1/5 text-center text-4xl mr-3 flex items-center">
                  <ion-icon name="musical-notes-outline"></ion-icon>
                </div>
                <div className="w-4/5">
                  <p>Dobly Audio</p>
                </div>
              </div>
            </div>

            <div className="flex flex-nowrap justify-center items-center gap-5 mt-[50px] w-full">
              <a
                className={
                  "p-3 border-2 rounded-lg cursor-pointer w-[39%] " +
                  (status == "month" ? "bg-[#6d1010]" : "")
                }
                onClick={() => setStatus("month")}
              >
                <div className="w-full flex flex-wrap justify-center items-center">
                  <div className="w-4/5">
                    <p className="italic text-red-700 font-bold">Maflix+</p>
                    <p>Rp 39.000/Month</p>
                  </div>
                  <div className="w-1/5 text-center text-3xl">
                    {status == "month" && (
                      <ion-icon name="checkmark-done"></ion-icon>
                    )}
                  </div>
                </div>
              </a>
              <a
                className={
                  "p-3 border-2 rounded-lg cursor-pointer w-[39%] " +
                  (status == "year" ? "bg-[#6d1010]" : "")
                }
                onClick={() => setStatus("year")}
              >
                <div className="w-full flex flex-wrap justify-center items-center">
                  <div className="w-4/5">
                    <p className="italic text-red-700 font-bold">Maflix+</p>
                    <p>Rp 199.000/Year</p>
                  </div>
                  <div className="w-1/5 text-center text-3xl">
                    {status == "year" && (
                      <ion-icon name="checkmark-done"></ion-icon>
                    )}
                  </div>
                </div>
              </a>
            </div>

            <div className="flex flex-nowrap justify-center items-center gap-10 mt-[20px]">
              <a className="p-3 border-2 rounded-lg cursor-pointer bg-red-900 w-4/5">
                <div className="flex flex-wrap justify-center items-center">
                  <p>SUBSCRIBE</p>
                </div>
              </a>
            </div>

            <div className="flex flex-nowrap justify-center items-center gap-10 mt-[20px]">
              <p className="text-[12px]">
                By clicking continue, you agree to our{" "}
                <a className="cursor-pointer text-blue-700">Terms of Use</a> and
                acknowledge that you have read our{" "}
                <a className="cursor-pointer text-blue-700">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
