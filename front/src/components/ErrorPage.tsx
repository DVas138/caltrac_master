import { useNavigate, useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    if (error.message === "Redirect") {
      navigate("/main/add");
    }
  }, [error, navigate]);
  //TODO:  ADD ERROR LOGGING FOR ERRORS FROM THE SERVER
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
