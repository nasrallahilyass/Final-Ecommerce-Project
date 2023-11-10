import { FaPaypal, FaAirbnb } from "react-icons/fa6";
import { BiLogoDribbble, BiLogoMediumOld } from "react-icons/bi";
// Configure Font Awesome icons

function Sponsors() {
  return (
    <div className=" mt-12 font-semibold	text-neutral-300 text-2xl p-4 w-11/12 mx-auto flex space-x-32 justify-center">
      <div className="flex space-x-2  hover:text-black   ">
        <button className="">
          <FaPaypal />
        </button>
        <p>Paypal</p>
      </div>
      <div className="flex space-x-2 hover:text-black   ">
        <button className=" ">
          <FaAirbnb />
        </button>
        <p>Airbnb</p>
      </div>
      <div className="flex space-x-2 hover:text-black   ">
        <button className=" ">
          <BiLogoDribbble />
        </button>
        <p>Dribbble</p>
      </div>
      <div className="flex space-x-2 hover:text-black   ">
        <button className=" ">
          <BiLogoMediumOld />
        </button>
        <p>MediumOld</p>
      </div>
    </div>
  );
}

export default Sponsors;
