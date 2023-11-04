const Form = ({ heading, paragraph, children }) => {
  return (
    <form className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-center text-primary-black mb-3">
        {heading}
      </h3>

      <p className="text-base font-medium text-center text-primary-black mb-10">
        {paragraph}
      </p>

      {children}
    </form>
  );
};

export default Form;
