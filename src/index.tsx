import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { KEY } from "./constants";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleReCaptchaProvider
                reCaptchaKey={KEY}
                language="vi"
                scriptProps={{ async: true, defer: true, appendTo: "body" }}
            >
                <App />
            </GoogleReCaptchaProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
