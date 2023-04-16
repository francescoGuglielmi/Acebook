import Navbar from "./nav/Nav";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="gallery_parent">
      <div className='gallery'>
        {/* INSERT PICTURES HERE */}
      </div>
      </div>
      <h1 Style="text-align:center;">Acebook, where what's on your mind matters!</h1>
    </>
  );
};