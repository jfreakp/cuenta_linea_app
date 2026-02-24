interface HeaderStepProps {
  title1: string;
  title2: string;
  paso_ini: number;
  paso_fin: number;
  progress: number;
}

export const HeaderStep = ({ title1, title2, paso_ini, paso_fin, progress }: HeaderStepProps) => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-light text-slate-700 dark:text-slate-200 mb-6">
        {title1} <span className="text-primary font-bold">{title2}</span>
      </h1>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Paso {paso_ini} de {paso_fin}
          </span>
        </div>
        <div className="progress-bar-container w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
