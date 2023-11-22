import { FaPaypal, FaAirbnb } from "react-icons/fa6";
import { BiLogoDribbble, BiLogoMediumOld } from "react-icons/bi";

function ServiceCard({ icon, title, description }) {
  return (
    <div className="py-8 px-12 mb-12 bg-gray-100 border-gray-100">
      <div className="inline-block text-gray-900 mb-4">{icon}</div>
      <h3 className="text-lg leading-normal mb-2 font-semibold text-black">
        {title}
      </h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

function Features() {
  const services = [
    {
      icon: <FaPaypal size={32} />,
      title: "SEO Services",
      description:
        "This is a wider card with supporting text below as a natural content.",
    },
    {
      icon: <FaAirbnb size={32} />,
      title: "Social Content",
      description:
        "This is a wider card with supporting text below as a natural content.",
    },
    {
      icon: <BiLogoDribbble size={32} />,
      title: "Creative ads",
      description:
        "This is a wider card with supporting text below as a natural content.",
    },
    {
      icon: <BiLogoMediumOld size={32} />,
      title: "Brand Identity",
      description:
        "This is a wider card with supporting text below as a natural content.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <header className="text-center mx-auto mb-12 lg:px-20">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
            Our Features Special For You
          </h2>
          <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2 lg:pb-4 lg:leading-normal">
            We provide a variety of special features for all of you to make it
            easier and make you even more happy shopping here.
          </p>
        </header>
        <div className="flex flex-wrap -mx-4 text-center">
          {services.map((service, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-4">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
