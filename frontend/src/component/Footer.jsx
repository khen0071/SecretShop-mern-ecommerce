const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center items-center py-3 bg-black text-white text-[16px]">
        <div className="md:text-[16px] text-[14px]">
          <strong className="font-bold  ">SecretShop</strong> &copy;{" "}
          {currentYear}. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
