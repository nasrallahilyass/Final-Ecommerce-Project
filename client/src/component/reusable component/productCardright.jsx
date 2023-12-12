function ProductCardRight() {
    const cardsData = [
      {
        title: "Visit Pavel's Arts Creation.",
        description:
          "I'm Pavel, a passionate potter with a love for shaping clay into unique and meaningful pieces. My journey with pottery is a dance between tradition and innovation, and I'm excited to share the magic of this craft with you..",
        imageSrc:
          "https://plus.unsplash.com/premium_photo-1682146955240-a051576d4c89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pl-5"> {/* Updated to lg:pl-5 to switch the position */}
                <div className="max-w-xl mb-6">
                  <h2 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none max-w-lg mb-6">
                    {card.title}
                  </h2>
                  <p className="text-base md:text-lg">{card.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    Pavel's Art
                  </button>
                </div>
              </div>
              <img
                className="rounded-lg"
                alt="logo"
                width={450}
                height={450}
                src={card.imageSrc}
              />{" "}
              {/* Image is now on the right */}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductCardRight;
  

  