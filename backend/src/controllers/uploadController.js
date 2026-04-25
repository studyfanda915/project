exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image file is required' });
  res.status(201).json({
    imageUrl: `/uploads/${req.file.filename}`
  });
};
