module.exports = function makeLoginEmployeeAction({
  Joi,
  loginEmployee,
  addToken,
  ValidationError,
}) {
  return async function loginEmployeeAction(req, res) {
    try {
      const { email, password } = req.body;

      const browser = req.headers["sec-ch-ua"] || req.headers["user-agent"];
      const device = req.headers["sec-ch-ua-platform"] || "linux";
      let ipAddress = req.ip;

      const ipArray = [
        "207.97.227.239",
        "3.128.0.0",
        "209.58.139.51",
        "2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b",
        "103.238.107.135",
        "223.196.172.139",
        "106.198.211.97",
        "43.250.158.185",
        "123.201.3.127",
        "219.91.163.223",
        "103.217.84.112",
        "223.196.172.139",
      ];
      let i = Math.floor(Math.random() * ipArray.length);
      ipAddress = ipArray[i];
      const expireTime = Date.now() + 60 * 60 * 1000;

      validateData({
        email,
        password,
        browser,
        device,
        ipAddress,
      });

      const loginEmployeeDetails = await loginEmployee({
        email,
        password,
      });

      const addedTokenDetails = await addToken({
        employeeId: loginEmployeeDetails.employeeId,
        browser,
        device,
        ipAddress,
        expireTime,
      });
      res.status(201).send({ status: "success", body: addedTokenDetails });
    } catch (err) {
      console.log(err);
      res.status(err.httpStatusCode || 500).json({
        status: "error",
        name: err.name,
        message: err.message,
        date: err.date,
      });
    }
  };

  function validateData({ email, password, browser, device, ipAddress }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
        .error((err) => {
          return new ValidationError(
            '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters'
          );
        })
        .required(),
      browser: Joi.string().required(),
      device: Joi.string().required(),
      ipAddress: Joi.string().required(),
    });

    const { value, error } = schema.validate({
      email,
      password,
      browser,
      device,
      ipAddress,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
