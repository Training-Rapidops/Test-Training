module.exports = function makeFetchLabelsUseCase({ Joi, fetch }) {
  return async function fetchlabels({ userMail, accessToken }) {
    const data = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${userMail}/labels?access_token=${accessToken}`
    );
    const responce = await data.json();
    const labels = responce.labels;
    return labels;
  };
};
