export const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="relative w-40 h-[100px]">
          <span className="absolute top-0 text-xl text-purple-800 animate-[text713_3.5s_ease_infinite] font-bold tracking-wide uppercase">
            Cargando...
          </span>

          <span className="absolute bottom-0 left-0 block h-7 w-7 bg-purple-800 rounded-full animate-[loading713_3.5s_ease_infinite]">
            <span className="absolute inset-0 bg-purple-500 rounded-full animate-[loading2713_3.5s_ease_infinite]"></span>
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes text713 {
            0%   { letter-spacing: 1px; transform: translateX(0px); }
            40%  { letter-spacing: 2px; transform: translateX(26px); }
            80%  { letter-spacing: 1px; transform: translateX(32px); }
            90%  { letter-spacing: 2px; transform: translateX(0px); }
            100% { letter-spacing: 1px; transform: translateX(0px); }
          }

          @keyframes loading713 {
            0%   { width: 28px; transform: translateX(0px); }
            40%  { width: 100%; transform: translateX(0px); }
            80%  { width: 28px; transform: translateX(104px); }
            90%  { width: 100%; transform: translateX(0px); }
            100% { width: 28px; transform: translateX(0px); }
          }

          @keyframes loading2713 {
            0%   { transform: translateX(0px); width: 28px; }
            40%  { transform: translateX(0%); width: 85%; }
            80%  { width: 100%; transform: translateX(0px); }
            90%  { width: 85%; transform: translateX(15px); }
            100% { transform: translateX(0px); width: 28px; }
          }
        `}
      </style>
    </>
  );
};
