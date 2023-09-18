import { useCallback, useRef } from "react";

type Props = {
  loading: boolean;
  addPage: () => void;
};

const useIntersection = ({ loading, addPage }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastReflection = useCallback((node: Element | null) => {
    if (!node) return;
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) addPage();
    });
    observer.current.observe(node);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    lastReflection,
  };
};

export default useIntersection;
