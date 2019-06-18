export default (service) => {
  function handleStartStreamRequest(req, res) {
    const { name, id } = req.params;
    if (service.startStreaming({ name, id })) {
      res.send({ user: name, stream: id, running: true });
    } else {
      res.status(403).send({ user: name, error: 'The user cannot open another stream' });
    }
  }

  function handleStopStreamRequest(req, res) {
    const { name, id } = req.params;
    service.stopStreaming({ name, id });
    res.status(204).send();
  }

  return {
    route(req, res) {
      if (req.method === 'GET') {
        handleStartStreamRequest(req, res);
      } else {
        handleStopStreamRequest(req, res);
      }
    },
  };
};
