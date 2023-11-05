import LoadingElement from "@src/components/LoadingElement";
import { ApiInvoke } from "@src/services/api/api.invoke";
import { useEffect } from "react";

export default function LoadingPage({ option }: { option: boolean }) {
  async function getCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (option) {
      const resp = await ApiInvoke({
        endpoint: `/auth/signoauth`,
        method: "POST",
        expectedStatus: 200,
        body: JSON.stringify({
          code: code,
          provider: "github",
        }),
      });
    } else {
      // Render specific content or perform actions for option = false (Spotify)
      const resp = await ApiInvoke({
        endpoint: `/auth/signoauth`,
        method: "POST",
        expectedStatus: 200,
        body: JSON.stringify({
          code: code,
          provider: "spotify",
        }),
      });
    }
  }

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <LoadingElement />
    </div>
  );
}
