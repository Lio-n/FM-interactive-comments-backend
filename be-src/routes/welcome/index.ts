// $ Welcome.
const getWelcome = (req, res) => {
  try {
    res.status(200).json("Bienvenido ヾ(●ω●)ノ");
  } catch (err) {
    res.status(400).json(err);
  }
};

export { getWelcome };
