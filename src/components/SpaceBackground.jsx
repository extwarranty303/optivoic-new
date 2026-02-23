import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const SpaceBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0 pointer-events-none"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: { value: "transparent" }, // Transparent so our ambient colors show through
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Subtle connection lines to mouse
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.3,
                color: "#38B6FF" // Cyan tint on hover connections
              }
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 120,
            enable: true,
            opacity: 0.05, // Very subtle permanent connections
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.2, // Very slow, deep space drift speed
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100, // Number of stars. Increase for a denser galaxy.
          },
          opacity: {
            value: { min: 0.1, max: 0.5 }, // Stars twinkle slowly between these opacities
            animation: {
              enable: true,
              speed: 0.5,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 1.5 }, // Varying star sizes
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default SpaceBackground;