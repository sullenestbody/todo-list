import styles from "./ContentPage.module.css";

function AboutPage() {
  return (
    <main className={styles.page}>
      <h2 className={styles.title}>About This Todo App</h2>

      <h3 className={styles.sectionTitle}>Features</h3>
      <ul className={styles.list}>
        <li>Add, edit, and complete todos.</li>
        <li>Search and sort your todo list.</li>
        <li>Filter todos by completion status.</li>
        <li>View your profile and todo statistics.</li>
      </ul>

      <h3 className={styles.sectionTitle}>Technologies</h3>
      <p className={styles.text}>Built with React, React Router, and Vite.</p>
    </main>
  );
}

export default AboutPage;
