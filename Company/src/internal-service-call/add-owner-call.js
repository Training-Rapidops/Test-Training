module.exports = function makeAddOwnerCall({ fetch, form, config }) {
  return async function addOwnerCall({
    name,
    address,
    email,
    password,
    companyName,
    role,
    profilePhoto,
  }) {
    const baseURL = config.serviceEndpoints.employee;
    const url = "addemployee";
    const headers = { "Content-Type": "application/json" };

    form.append("name", name);
    form.append("address", address);
    form.append("email", email);
    form.append("password", password);
    form.append("companyName", companyName);
    form.append("role", role);
    form.append("profilePhoto", profilePhoto.buffer, {
      filename: profilePhoto.originalname,
    });

    const data = await fetch(baseURL + url, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    const result = await data.json();

    if (result.status === "error") {
      result.httpStatusCode = data.status;
      throw result;
    } else {
      return result.body;
    }
  };
};
