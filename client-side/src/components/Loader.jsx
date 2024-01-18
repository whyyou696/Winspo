import { loader } from '../assets';

const Loader = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain mt-20" />
    <h1 className="text-white text-7xl font-bold">Loading...</h1>
  </div>
);

export default Loader;
