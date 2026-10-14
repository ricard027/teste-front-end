"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHorizontalCarousel<T extends HTMLElement>(refreshKey?: unknown) {
  const carouselRef = useRef<T>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [navigation, setNavigation] = useState({
    canGoBack: false,
    canGoForward: false,
  });

  const updateNavigation = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maximumScroll = Math.max(
      0,
      carousel.scrollWidth - carousel.clientWidth,
    );
    const edgeTolerance = 8;
    const nextNavigation = {
      canGoBack: carousel.scrollLeft > edgeTolerance,
      canGoForward:
        maximumScroll > edgeTolerance &&
        carousel.scrollLeft < maximumScroll - edgeTolerance,
    };

    setNavigation((current) =>
      current.canGoBack === nextNavigation.canGoBack &&
      current.canGoForward === nextNavigation.canGoForward
        ? current
        : nextNavigation,
    );
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scheduleUpdate = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateNavigation);
    };
    const resizeObserver = new ResizeObserver(scheduleUpdate);

    carousel.addEventListener("scroll", scheduleUpdate, { passive: true });
    resizeObserver.observe(carousel);
    scheduleUpdate();

    return () => {
      carousel.removeEventListener("scroll", scheduleUpdate);
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [refreshKey, updateNavigation]);

  const navigate = useCallback((direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<T>) => {
      if (event.key === "ArrowLeft" && navigation.canGoBack) {
        event.preventDefault();
        navigate(-1);
      }
      if (event.key === "ArrowRight" && navigation.canGoForward) {
        event.preventDefault();
        navigate(1);
      }
    },
    [navigate, navigation],
  );

  return { carouselRef, navigation, navigate, handleKeyDown };
}
