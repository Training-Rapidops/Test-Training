function signIn() {
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  var form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  var params = {
    client_id:
      "1090469197919-3093ap8g35gpj99bebieh6o14floie31.apps.googleusercontent.com",
    redirect_uri: "http://127.0.0.1:5500/profile.html",
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/gmail.metadata https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  };
  // https://www.googleapis.com/oauth2/v2/userinfo
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    // console.log(p)
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
