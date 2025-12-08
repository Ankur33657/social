const errorHandling = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: 500, message: "Something went wrong", err: err.message });
};

export default errorHandling;
