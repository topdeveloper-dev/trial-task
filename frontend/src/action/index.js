import axios from 'axios';

const saveAction = (data) => {
  try {
    axios
      .post('http://localhost:3000/' + 'api/create', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

export default saveAction;
