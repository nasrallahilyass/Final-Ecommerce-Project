function ProductCardLeft() {
    const cardsData = [
      {
        title: " Visit Alex Green's Collection ",
        description:
          " Hi I'm Alex Knitting is not just a craft for me; it's a journey of warmth, creativity, and endless possibilities. Every stitch tells a story, and I'm here to share those stories with you.",
        imageSrc:
          "https://images.pexels.com/photos/6347524/pexels-photo-6347524.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      // Add more card data objects as needed
    ];
  
    return (
      <div className="w-11/12 mx-auto my-10 z-50 sticky rounded-3xl px-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8"
          >
            <div className="flex flex-col items-center justify-between w-full mb lg:flex-row">
              <img className="rounded-lg" alt="logo" width={450} height={450} src={card.imageSrc} />{" "}
              {/* Image is now on the left */}
              <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                <div className="max-w-xl mb-6">
                  <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none max-w-lg mb-6">
                    {card.title}
                  </h2>
                  <p className="text-base md:text-lg">{card.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {/* <a href="/comingsoon" className="flex object-cover sm:mr-64 mr-32 object-top items-center border border-2 justify-center w-full sm:px-10 py-4 leading-6 bg-black rounded-lg font-black">
                      &nbsp;&nbsp;<img width={25} alt="google auth logo" src={card.buttonImageSrc} />&nbsp;&nbsp; Get Started
                    </a> */}
                    <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Alex Crafts</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductCardLeft;
  
