import {
  startStreaming,
  stopStreaming,
} from '../lib/user.stream.service';

const handleStartStreamRequest = (req, res) => {
  const { name, id } = req.params;
  if (startStreaming({ name, id })) {
    res.send({ user: name, stream: id, running: true });
  } else {
    res.status(403).send({ user: name, error: 'The user cannot open another stream' });
  }
};

const handleStopStreamRequest = (req, res) => {
  const { name, id } = req.params;
  stopStreaming({ name, id });
  res.status(204).send();
};

const streamRoute = (req, res) => {
  if (req.method === 'GET') {
    handleStartStreamRequest(req, res);
  } else {
    handleStopStreamRequest(req, res);
  }
};

export default streamRoute;
