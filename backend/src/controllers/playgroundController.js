export const playground = (req, res) => {
    res.json({ message: 'Playground endpoint reached', data: req.body });
}