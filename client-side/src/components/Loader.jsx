import { loader } from '../assets';

const Loader = () => (
  <div className="w-full h-full flex items-center justify-center bg-primary">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="text-white text-6xl font-bold">Loading...</h1>
  </div>
);

export default Loader;
