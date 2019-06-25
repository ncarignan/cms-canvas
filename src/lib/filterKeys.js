const filterKeys = (keyArray, cb) => {
  return (event) => {
    if (keyArray.includes(event.key)) {
      cb(event);
    }
  };
};
  

export default filterKeys;
