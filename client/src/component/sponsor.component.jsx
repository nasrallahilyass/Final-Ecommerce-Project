import { FaPaypal, FaSpotify, FaTrello, FaSlack } from 'react-icons/fa';

const IconCard = () => {
  return (
    <div className="bg-black text-white py-5 flex justify-center my-10">
      <div className="flex items-center gap-20">
        <div className="flex items-center">
          <FaPaypal size={48} />
          <p className="ml-2">PayPal</p>
        </div>
        <div className="flex items-center">
          <FaSpotify size={48} />
          <p className="ml-2">Spotify</p>
        </div>
        <div className="flex items-center">
          <FaTrello size={48} />
          <p className="ml-2">Trello</p>
        </div>
        <div className="flex items-center">
          <FaSlack size={48} />
          <p className="ml-2">Slack</p>
        </div>
      </div>
    </div>
  );
};

export default IconCard;
