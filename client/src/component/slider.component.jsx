import { FaLaptopCode, FaBullhorn, FaChartBar } from 'react-icons/fa';

const icons = {
  development: <FaLaptopCode />,
  design: <FaBullhorn />,
  marketing: <FaChartBar />,
};

const Services = () => {
  const cardData = [
    {
      title: 'Development',
      description: 'Custom web development tailored to your specifications, designed to provide a flawless user experience.',
      icon: 'development',
    },
    {
      title: 'Design',
      description: 'Beautiful and elegant designs with interfaces that are intuitive, efficient and pleasant to use for the user.',
      icon: 'design',
    },
    {
      title: 'Marketing',
      description: 'In today digital age, businesses need to embrace a holistic approach to digital marketing services.',
      icon: 'marketing',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-6xl px-4 sm:px-6 lg:px-7 py-9">
      {cardData.map((card, index) => (
        <a key={index} href="" className="group relative block h-64 sm:h-80 lg:h-96">
          <span className="absolute inset-0 border-2 border-solid border-gray-500"></span>

          <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
            {/* <div className="p-6 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8 text-3xl">
              {icons[card.icon]}

              <h2 className="mt-4 text-xl font-medium sm:text-2xl">{card.title}</h2>
            </div> */}

            <div className="absolute p-4 opacity-100 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
              <h2 className="mt-1 text-6xl font-bold sm:text-2xl">{icons[card.icon]}</h2>
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">{card.title}</h3>

              <p className="mt-4 text-sm sm:text-base">{card.description}</p>

              <p className="mt-8 font-bold">Read more</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Services;
