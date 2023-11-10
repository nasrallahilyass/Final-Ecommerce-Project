
const teamMembers = [
  {
    name: 'Oliver Aguilerra',
    imageUrl: 'https://images.unsplash.com/photo-1609881583302-61548332039c?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Marta Clermont',
    imageUrl: 'https://images.unsplash.com/photo-1632649027900-389e810204e6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Alice Melbourne',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1679868096292-54efdc6c021f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1615243639681-1208d685758a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const ServiceCard = ({ name , imageUrl }) => (
  <div>
    <div className="relative pb-56 mb-4 rounded shadow lg:pb-72">
      <img
        className="absolute object-cover w-full h-full rounded-xl"
        src={imageUrl}
        alt={name}
      />
    </div>
    <div className="flex flex-col sm:text-center">
      <p className="text-lg font-semibold">{name}</p>
      <div className="flex items-center space-x-3 sm:justify-center">
        <a
          href="/"
          className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
            {/* Add your social media icon SVG here */}
          </svg>
        </a>
        <a
          href="/"
          className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
            {/* Add your social media icon SVG here */}
          </svg>
        </a>
      </div>
    </div>
  </div>
);

function OurCategories() {
  return (
    <div className="px-4 py-16  w-11/12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      <div className="mx-auto mb-10 lg:max-w-l sm:text-center">
        <h3 className=" mb-4 text-2xl font-bold ">
          Exclusive Categories
        </h3>
        <p className="text-zinc-400 md:text-lg font-normal">
        check out this week&apos;s selections of popular product that might catch your eye and don&apos;t
        </p>
      </div>
      <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
        {teamMembers.map((member, index) => (
          <ServiceCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default OurCategories;