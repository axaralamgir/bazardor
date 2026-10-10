export default function Field({ id, label, error, ...inputProps }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`input input-bordered min-h-11 w-full bg-surface ${error ? "input-error" : ""}`}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-down">
          {error}
        </p>
      )}
    </div>
  );
}
