module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
//async try catch block 없애기 => async 펑션을 파라메터로 넣기
