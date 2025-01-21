import HeaderCard from './HeaderCard';

const HeaderSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 md:p-10">
      {/* Card 1 */}
      <HeaderCard
        title="The Best Platform for Car Rental"
        description="Ease of doing a car rental safely and reliably. Of course at a low price."
        buttonText="Rental Car"
        imageSrc="/BG.png" // Adjust to match your image path
        bgClass="bg-gradient-to-r from-blue-500 to-blue-400" //#54A6FF
      />

      {/* Card 2 */}
      <HeaderCard
        title="Easy way to rent a car at a low price"
        description="Providing cheap car rental services and safe and comfortable facilities."
        buttonText="Rental Car"
        imageSrc="/image 8.png" // Adjust to match your image path
        bgClass="bg-blue-600" //#3563E9
      />
    </section>
  );
};

export default HeaderSection;
