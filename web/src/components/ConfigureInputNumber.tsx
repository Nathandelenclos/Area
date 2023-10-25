type ConfigureAppletProps = {
  title: string;
  placeholderText: string;
  minimunNumber: string;
};

export default function ConfigureAppletNumber({
  title,
  placeholderText,
  minimunNumber,
}: ConfigureAppletProps) {
  return (
    <div className="w-full">
      <p className="font-semibold text-[28px] text-center text-black">
        {title}
      </p>
      <input
        className="bg-[#D9D9D9CC] text-black placeholder-[#656565CC] rounded-[20px] border-2 py-4 px-5 placeholder:italic text-[20px] border-[#6F6F6F] my-7"
        type="number"
        min={minimunNumber}
        id="inputField"
        placeholder={placeholderText}
      />
    </div>
  );
}
