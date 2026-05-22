const Support = () => {
  return (
    <div className="w-full flex justify-center pt-10">
      <div className="relative w-full h-98 flex items-center rounded-tl-[30px] rounded-tr-[30px] justify-center text-center overflow-hidden">
        <div className="absolute left-0 bottom-8 w-1/2 h-full bg-[#1DBF74] skew-y-3 md:skew-y-2 rounded-bl-[30px]"></div>
        <div className="absolute right-0 bottom-8 w-1/2 h-full bg-[#1DBF74] -skew-y-3 md:-skew-y-2 rounded-br-[30px]"></div>

        <div className="relative z-10 bottom-10 text-white px-6">
          <h2 className="text-[40px] font-bold">Get support from ITagama</h2>

          <p className="mt-2 font-semibold text-xl opacity-95">
            ITagama support team 24/7
          </p>

          <button className="mt-8 px-12 py-2 cursor-pointer bg-white text-[#1dbf74] font-bold rounded-sm transition">
            Contact ITagama
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
