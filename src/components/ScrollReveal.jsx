import { useInView } from "react-intersection-observer";

const ScrollReveal = ({
  children,
  threshold = 0.2,
  delay = 0,
  duration = 800,
  className = "",
  as: Component = "div",
  once = true,
  animation = "fade-up",
  rootMargin = "0px",
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin,
  });

  const animationClass = `scroll-reveal-${animation}`;

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${animationClass} ${inView ? "visible" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;