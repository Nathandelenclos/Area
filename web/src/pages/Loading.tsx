import LoadingElement from "@src/components/LoadingElement";
import { ApiInvoke } from "@src/services/api/api.invoke";
import { useEffect } from "react";

export default function LoadingPage({ option }: { option: boolean }) {
  async function getCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);

    if (option) {
      const resp = await ApiInvoke({
        endpoint: `/api/auth/github/authenticate/${code}`,
        method: "GET",
        expectedStatus: 200,
      });
      console.log(resp);
      console.log("GitHub option");
    } else {
      // Render specific content or perform actions for option = false (Spotify)
      const resp = await ApiInvoke({
        endpoint: `/api/auth/spotify/authenticate/${code}`,
        method: "GET",
        expectedStatus: 200,
      });
      console.log(resp);
      console.log("Spotify option");
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
