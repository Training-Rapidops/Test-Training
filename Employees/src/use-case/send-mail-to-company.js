module.exports = function makeSendMailToCompany({
  Joi,
  nodemailer,
  ValidationError,
}) {
  return async function sendMailToCompany({ companyEmail }) {
    const value = validateData({ companyEmail });
    ({ companyEmail } = value);

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
      to: `${companyEmail}`,
      subject: "Welcome Aboard ",
      text: `Hey Guys,We welcome Mr. Deep patel who has joined us as an Account Manager. Thanks and Regards Team HR`,
      html: `<p>Welcome Aboard </p>`,
    };

    const data = await mailTransporter.sendMail(mailDetails);

    return data;
  };
  function validateData({ companyEmail }) {
    const schema = Joi.object().keys({
      companyEmail: Joi.string().email().required(),
    });
    const { value, error } = schema.validate({ companyEmail });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
