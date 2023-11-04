import ScrollHorizontal from "@/components/layout/Home/ScrollHorizontal";

const Features = () => {
  return (
    <section className="mt-32">
      <h2 className="relative text-[28px] sm:text-[40px] md:text-[52px] lg:text-[64px]  text-primary-black text-center font-bold max-w-[600px] mx-auto leading-normal">
        Empower<span className="text-primary-white">ed by You, </span>
        Safeguard <span className="text-primary-white">ed by Us</span>
      </h2>

      <ScrollHorizontal />
    </section>
  );
};

export default Features;
