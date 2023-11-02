type ConfigureAppletProps = {
  title: string;
};

export default function ConfigureAppletDate({ title }: ConfigureAppletProps) {
  return (
    <div className="w-full">
      <p className="font-semibold text-[28px] text-center text-black">
        {title}
      </p>
      <input
        className="bg-[#D9D9D9CC] text-black rounded-[20px] border-2 py-4 px-5 text-[20px] border-[#6F6F6F] my-7"
        type="date"
        id="inputField"
      />
    </div>
  );
}
