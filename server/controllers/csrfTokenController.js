exports.getCsrfToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken });
};
