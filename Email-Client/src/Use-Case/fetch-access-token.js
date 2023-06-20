module.exports = function makefetchAccessToken({ Joi, fetch }) {
  return async function fetchAccessToken({ user }) {
    const requestBody = new URLSearchParams({
      client_id:
        "1090469197919-3093ap8g35gpj99bebieh6o14floie31.apps.googleusercontent.com",
      client_secret: "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",
      grant_type: "refresh_token",
      refresh_token: user.refresh_token,
    });
    const data = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: requestBody,
    });

    result = await data.json();

    accessToken = result.access_token;

    return accessToken;
  };
};
