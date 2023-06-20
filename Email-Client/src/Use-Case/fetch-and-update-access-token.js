module.exports = function makeFetchAndUpdateAccessToken({
  Joi,
  allUserDetailsUsecase,
  fetchAccessToken,
  updateUser,
}) {
  return async function fetchAndUpdateAccessToken() {
    try {
      const result = await allUserDetailsUsecase();

      result.forEach(async (user) => {
        let dateNow = Date.now();

        if (user.expires_in < dateNow) {
          const expiresIn = String(dateNow + 3300000);

          const accessToken = await fetchAccessToken({ user });

          await updateUser({
            id: user.id,
            email: user.user_email_id,
            expiresIn: expiresIn,
            accessToken: accessToken,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
