"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import {
  isSupportedCountry,
  IPINFO_URL,
  DETECTION_TIMEOUT,
} from "@/lib/country-context";
import { commitCountry } from "@/lib/country-cookie";
import { OverlayCountrySelect } from "@/components/overlay-country-select";

export function CountryDetector() {
  const router = useRouter();
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DETECTION_TIMEOUT);

    fetch(IPINFO_URL, { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { country?: string }) => {
        clearTimeout(timeout);
        const code = data?.country?.toUpperCase() ?? "";
        if (isSupportedCountry(code)) {
          commitCountry(code);
          router.refresh();
        } else {
          setShowPicker(true);
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        setShowPicker(true);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [router]);

  // ── Manual country picker (shown when IP detection fails or returns unsupported country) ──
  if (showPicker) {
    return <OverlayCountrySelect />;
  }

  // ── Loading state (shown while IP detection is in progress) ──
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-3">
      <Globe className="w-10 h-10 text-muted-foreground animate-pulse" />
      <p className="text-sm text-muted-foreground">Detecting your region&hellip;</p>
    </div>
  );
}
