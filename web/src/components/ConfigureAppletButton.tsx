type ConfigureAppletProps = {
  title: string;
  connected: boolean;
  redirect?: () => void;
};

export default function ConfigureAppletButton({
  title,
  connected,
  redirect,
}: ConfigureAppletProps) {
  return (
    <div className="w-[300px]">
      {!connected ? (
        <div
          className="bg-[#7A73E7] py-5 px-10 rounded-[20px] cursor-pointer hover:bg-[#7A73E7CC] my-10"
          onClick={() => {
            redirect ? redirect() : 0;
          }}
        >
          <p className="text-white font-semibold text-[28px] text-center">
            {title}
          </p>
        </div>
      ) : (
        <div className="bg-white py-5 px-10 rounded-[20px] border-4 border-[#7A73E7] cursor-not-allowed my-10">
          <p className="font-semibold text-[28px] text-center text-[#7A73E7]">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
