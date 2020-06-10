const $ = require("jquery")
const { WebAuthnApp } = require("webauthn-simple-app")

const main = () => {
  // override some of the default configuration options
  // see the docs for a full list of configuration options
  var webAuthnConfig = {
    timeout: 30000
  };

  // when user clicks submit in the register form, start the registration process
  $("#register-form").submit(function (event) {
    event.preventDefault();
    webAuthnConfig.username = $(event.target).children("input[name=username]")[0].value
    new WebAuthnApp(webAuthnConfig).register();
  });

  // when user clicks submit in the login form, start the log in process
  $("#login-form").submit(function (event) {
    event.preventDefault();
    webAuthnConfig.username = $(event.target).children("input[name=username]")[0].value
    new WebAuthnApp(webAuthnConfig).login();
  });

  // do something when registration is successful
  $(document).on("webauthn-register-success", () => {
    alert('register success')
    // window.location = "https://example.com/sign-in-page";
  });

  // do something when registration fails
  $(document).on("webauthn-register-error", (err) => {
    // probably do something nice like a toast or a modal...
    console.error(err)
    alert("Registration error: " + err.message);
  });

  // do something when log in is successful
  $(document).on("webauthn-login-success", () => {
    alert('login success')
    // window.location = "https://example.com/my-profile-page";
  });

  // do something when log in fails
  $(document).on("webauthn-login-error", (err) => {
    // probably do something nice like a toast or a modal...
    alert("Log in error: " + err.message);
  });

  // gently remind the user to authenticate when it's time
  $(document).on("webauthn-user-presence-start", (err) => {
    // probably do something nice like a toast or a modal...
    alert("Please perform user verification on your authenticator now!");
  });
}

document.addEventListener("DOMContentLoaded", main)
