const streamRoute = (req, res) => {
  const { name, id } = req.params;
  res.send({ user: name, stream: id, running: true });
};

export default streamRoute;
