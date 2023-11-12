function Heading() {
  return (
    <div className="relative w-11/12 h-[450px] mx-auto rounded-xl bg-heading-pic bg-cover bg-center">
      <div className="text-white flex-1 p-8 md:p-12 absolute inset-0 w-full h-full z-20 max-w-xl ml-32">
          <h1 className="font-bold text-3xl md:text-6xl leading-tight pb-4 md:pb-10">
            Find the best home furniture for your room
          </h1>
          <p className="font-medium pb-4 md:pb-12 leading-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vero esse labore nam quam! Unde.
          </p>
          <div className="text-white flex space-x-2 md:space-x-28">
            <button className="hover:text-gray-400 bg-gray-800 text-white px-3 py-2 rounded-md">
              Shop Now
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <h3 className="font-bold text-lg">20k+</h3>
                <p>Collection</p>
              </div>
              <p>|</p>
              <div className="text-center">
                <h3 className="font-bold text-lg">20k+</h3>
                <p>Collection</p>
              </div>
            </div>
          </div>
    </div>
    </div>
  );
}

export default Heading;
