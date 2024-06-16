const Hero = ({
  title = "Denver MHA Energy Tracking",
  subtitle = "Welcome to our online community",
}) => {
  return (
    <section className="py-20 mb-4 bg-emerald-500">
      <div className="flex flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="my-4 text-xl text-white">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
