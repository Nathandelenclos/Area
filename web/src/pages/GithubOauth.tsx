import { ApiInvoke } from "@services/api/api.invoke";
import LoadingElement from "@src/components/LoadingElement";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Get the authorization code from the URL.
 *
 * @returns {string} Authorization code.
 */
async function getAuthorizationCodeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  console.log(authorizationCode);
  return {
    code: authorizationCode,
  };
}

/**
 * LoginUserGithub page takes care of sending the user on the right page when logging in with github.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <LoginUserGithub />
 *
 * @returns {JSX.Element} Rendered page.
 */
export const LoginUserGithub = () => {
  const { setUser } = GlobalContext();
  const navigate = useNavigate();

  async function tryLogin() {
    const data = await getAuthorizationCodeFromURL();
    if (!data) {
      navigate("/");
      return;
    }
    const resp = await ApiInvoke({
      endpoint: "/auth/signoauth",
      method: "POST",
      expectedStatus: 200,
      body: JSON.stringify({
        ...data,
        provider: "github",
      }),
    });
    if (resp.status === 200) {
      setUser(new UserObject(resp.data));
      localStorage.setItem("accessToken", resp.data.token);
      const token = resp.data.token;
      const data = await AuthServices.me(token);
      console.log(data);
      if (data.status === 200) {
        setUser(
          new UserObject({
            email: data.data.email,
            name: data.data.name,
            token,
            oauth: data.data.oauth,
          }),
        );
      }
      navigate("/home-page");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
};
