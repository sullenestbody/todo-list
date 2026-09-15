import styles from "./FormControls.module.css";

function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  maxLength,
}) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={elementId}>
        {labelText}
      </label>

      <input
        className={styles.input}
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}

export default TextInputWithLabel;
