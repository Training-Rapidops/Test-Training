module.exports = function makeSendMailToEmployee({
  Joi,
  nodemailer,
  config,
  ValidationError,
}) {
  return async function sendMailToEmployee({ employeeEmail }) {
    const value = validateData({ employeeEmail });
    ({ employeeEmail } = value);

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",

      secure: false,
      auth: {
        user: "safi.shaikh360@gmail.com",
        pass: "yvrtxsweqjbfeqjw",
      },
    });

    const mailDetails = {
      from: "safi.shaikh360@gmail.com",
      to: employeeEmail,
      subject: "Welcome Aboard ",
      text: `Welcome aboard. we welcome you to our family. Thanks and Regards Team HR`,
      html: `<p>Welcome Aboard </p><br><p>We Welcome You to our family</p><br><br><p><strong>Please <a href="http://localhost:5000/employee/varifyemployee/${employeeEmail}" target:"blank">Click Here</a> to varify</strong></p><br><p> Thanks and Regards Team HR</p> `,
    };
    const data = await mailTransporter.sendMail(mailDetails);

    return data;
  };
  function validateData({ employeeEmail }) {
    const schema = Joi.object().keys({
      employeeEmail: Joi.string().email().required(),
    });
    const { value, error } = schema.validate({ employeeEmail });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
