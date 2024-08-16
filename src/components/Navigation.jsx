import { useRef, useState } from "react";
import "./navigation_style.css";

export default function Navigation() {
  const iframeContainerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      iframeContainerRef.current
        .requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => {
          console.error(`Failed to enter fullscreen mode: ${err.message}`);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch((err) => {
          console.error(`Failed to exit fullscreen mode: ${err.message}`);
        });
    }
  };

  return (
    <div>
      <div
        ref={iframeContainerRef}
        style={{ width: "100%", height: "100vh" }}
        className="map__screen"
      >
        <button
          onClick={toggleFullScreen}
          style={{ margin: "10px" }}
          className="fullscreen__btn"
        >
          {isFullScreen ? (
            <box-icon name="exit-fullscreen"></box-icon>
          ) : (
            <box-icon name="fullscreen"></box-icon>
          )}
        </button>
        <iframe
          src="/index.html"
          title="Embedded HTML Page"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
