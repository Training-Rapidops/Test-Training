module.exports = function makeFetchMails({ fetch, updateLabel }) {
  return async function fetchMails({ userData, labelName }) {
    try {
      // const date = new Date(Date.now() - 864000000);
      // const date30daysago = `${date.getFullYear()}/${
      //   date.getMonth() + 1
      // }/${date.getDate()}`;
      const data = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?access_token=${userData.access_token}&maxResults=30&q= in:${labelName}`
      );
      const mailsObj = await data.json();
      let messagesValue = mailsObj.messages;
      let nextPageTokenValue = mailsObj.nextPageToken;
      console.log(mailsObj, "++++++++++++++++++++++");

      if (!nextPageTokenValue || mailsObj.resultSizeEstimate === 0) {
        console.log("no nextPage Token");
        await allMailsFetchedUpdate({
          id: userData.id,
          label: labelName,
        });
      }
      // else {
      //   do {
      //     console.log("nextPageToken is here", nextPageTokenValue);
      //     const updateDetais = await updateLabel({
      //       id: userData.id,
      //       label: labelName,
      //       nextPageToken: nextPageTokenValue,
      //     });

      //     const data = await fetch(
      //       `https://gmail.googleapis.com/gmail/v1/users/me/messages?access_token=${userData.access_token}&pageToken=${nextPageTokenValue}&q= in:${labelName}`
      //     );
      //     const { messages, nextPageToken, resultSizeEstimate } =
      //       await data.json();
      //     messages.forEach((msg) => {
      //       messagesValue.push(msg);
      //     });
      //     nextPageTokenValue = nextPageToken;
      //   } while (nextPageTokenValue);
      // }
      await allMailsFetchedUpdate({
        id: userData.id,
        label: labelName,
      });

      return { messages: messagesValue };
    } catch (err) {
      console.log(userData.id, err, "8888888888888888888888888888");
    }
  };
  async function allMailsFetchedUpdate({ id, label }) {
    const result = await updateLabel({ id, label, isFetched: "t" });
  }
};
