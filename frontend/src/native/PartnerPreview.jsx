import React, { useEffect, useRef, useState } from "react";
import { ClientPreviewLayout } from "../parity/client-preview-layout.jsx";
import { previewTheme } from "./PartnerBrand.js";
export function PartnerPreview({ partner, close }) {
  const [dark, setDark] = useState(() =>
      document.documentElement.classList.contains("portal-dark"),
    ),
    [notice, setNotice] = useState("");
  const dialog = useRef(null),
    closeButton = useRef(null);
  useEffect(() => {
    const previous = document.activeElement,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("portal-dark")),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const key = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "Tab") {
        const nodes = [
            ...dialog.current.querySelectorAll(
              'button,a[href],input,select,[tabindex="0"]',
            ),
          ].filter((node) => !node.disabled),
          first = nodes[0],
          last = nodes.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [close]);
  const name = partner.displayName || partner.name || "Partner";
  const logo = partner.logoDataUrl ? (
    <img
      className="snap-partner-logo"
      src={partner.logoDataUrl}
      alt={name + " logo"}
    />
  ) : (
    <span className="snap-partner-fallback">
      {name.slice(0, 3).toUpperCase()}
    </span>
  );
  return (
    <div
      id="client-preview-overlay"
      className="client-preview-overlay is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-preview-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="client-preview-dialog" ref={dialog}>
        <div className="client-preview-toolbar">
          <strong id="client-preview-title">{name} · dashboard preview</strong>
          <span>Preview only</span>
          <button
            className="client-preview-close"
            type="button"
            aria-label="Close preview"
            ref={closeButton}
            onClick={close}
          >
            &times;
          </button>
        </div>
        <div
          id="client-preview-app"
          className="client-preview-app"
          data-partner-id={partner.id}
          style={previewTheme(partner, dark)}
          onClick={(event) => {
            if (event.target.closest(".snap-btn"))
              setNotice(
                "This is a synthetic branding preview. Use the live dashboard for reports, saved views and exports.",
              );
          }}
        >
          {notice && (
            <div className="snap-banner" role="status">
              {notice}
            </div>
          )}
          <ClientPreviewLayout p={partner} logo={logo} />
        </div>
      </div>
    </div>
  );
}
