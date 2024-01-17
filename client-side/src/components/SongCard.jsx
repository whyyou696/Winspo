import { Link } from "react-router-dom";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";

const SongCard = ({ song, isPlaying, activeSong, i, data  }) => {

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(PlayPause(true))
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-white bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}

            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            />
        </div>
        <img src={song.images?.coverart} alt="song_img" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">Title Song
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-800 mt-1">
          <Link
            to={
              song.artist
                ? `/artists/${song?.artists[0].adamid}`
                : "/top-artists"
            }
          > Artist Song
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;