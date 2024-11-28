import { ContainerProps } from "./container.types";
import styles from "./container.module.scss";

export function Container({ children, containerType }: ContainerProps) {
  const containerClass = `${styles[`${containerType}`]}`;
  return <div className={containerClass}>{children}</div>;
}
