import styles from "./Controls.module.css";

function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div className={styles.controlGroup}>
      <label className={styles.label} htmlFor="sortDirection">
        Sort by:
      </label>
      <select
        id="sortBy"
        className={styles.select}
        value={sortBy}
        onChange={(event) => onSortByChange(event.target.value)}
      >
        <option value="createdAt">Created At</option>
        <option value="title">Title</option>
      </select>

      <label className={styles.label} htmlFor="sortDirection">
        Order:
      </label>
      <select
        id="sortDirection"
        className={styles.select}
        value={sortDirection}
        onChange={(event) => onSortDirectionChange(event.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortBy;
