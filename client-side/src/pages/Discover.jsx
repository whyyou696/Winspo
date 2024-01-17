import { useDispatch, useSelector } from "react-redux";


import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

// CAKE = {
    
//     SLICE: MUSIC PLAYER FUNCTIONALITY
//     SLICE: MUSIC PLAYER FUNCTIONALITY
// }
const Discover = () => {
    const dispatch = useDispatch();
    // const {} = useSelector((CAKE) => CAKE.VANILLA )

  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "Pop";

  if (isFetching) return <Loader title="Loading songs..." />;

//   if (error) return <Error />;

  console.log(data)
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-left text-[#ff5151]">Discover <br/>Genre : "{genreTitle}"</h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-[#ff5151] text-white p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((song, i) => (
          <SongCard key={song} song={song} i={i} />
        ))}
      </div>
    </div>
  );
};
export default Discover; 