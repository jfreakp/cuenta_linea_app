interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled: boolean;
}

export const Input = ({
  label,
  name,
  placeholder,
  onChange,
  value,
  disabled,
  type,
}: InputProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>
        <input
          className={`w-full bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-600 dark:text-gray-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""} focus:ring-primary focus:border-primary transition-all`}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </>
  );
};
