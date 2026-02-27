interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  disabled?: boolean;
  outline?: boolean;
  outline_title?: string;
}

export const Input = ({
  label,
  name,
  placeholder,
  onChange,
  value,
  disabled = false,
  type,
  outline,
  outline_title,
}: InputProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
          {label}
          {outline && (
            <span
              className="material-icons-outlined text-primary text-base ml-1 cursor-help"
              title={outline_title}
            >
              help_outline
            </span>
          )}
        </label>
        <input
          className={`w-full ${disabled ? "bg-gray-300 dark:bg-gray-600" : "bg-slate-50 dark:bg-slate-800"} border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg py-3 px-4 text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-gray-900 transition-all ${disabled ? "dark:bg-gray-600 dark:text-gray-400" : ""}`}
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
    </>
  );
};
