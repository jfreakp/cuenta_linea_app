export const SiguienteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        className="bg-primary hover:bg-[#68a825] text-white font-bold py-4 px-16 rounded-full shadow-lg hover:shadow-primary/30 transform transition-all active:scale-95 text-lg"
      >
        Continuar
      </button>
    </div>
  );
};
