import axios from 'axios';

export const userTweets = async (user) => {
    await axios
    .post(
      "http://localhost:5000/user_tweets",
      {
        user: user,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const textTweets = async (text) => {
  await axios
    .post(
      "http://localhost:5000/predict_data",
      {
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
