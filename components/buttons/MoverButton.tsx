interface Props {
  prevOnClick: () => void;
  nextOnClick: () => void;
}

export const MoverButton = ({ prevOnClick, nextOnClick }: Props) => {
  return (
    <div className="flex justify-between">    
      <button
        onClick={prevOnClick}
        className="bg-primary hover:bg-[#68a825] text-white font-bold py-4 px-16 rounded-full shadow-lg hover:shadow-primary/30 transform transition-all active:scale-95 text-lg"
      >
        Atras
      </button>
      <button
        onClick={nextOnClick}
        className="bg-primary hover:bg-[#68a825] text-white font-bold py-4 px-16 rounded-full shadow-lg hover:shadow-primary/30 transform transition-all active:scale-95 text-lg"
      >
        Siguiente
      </button>
    </div>
  );
};
