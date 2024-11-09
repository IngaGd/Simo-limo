import styles from "./wallpaper.module.scss";

export default function WallPaper() {
  return (
    <>
      <div className={styles.wallpaper}>
        <div className={styles.straps}>
          {[...Array(6)].map((_, index) => (
            <div className={styles.strap} key={index}></div>
          ))}
        </div>
      </div>
    </>
  );
}
