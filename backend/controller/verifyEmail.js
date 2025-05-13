

export const verifyEmail = async (req, res, next) => {
  const { token } = req.query;

  if (!token) return next(errorHandler(400, 'Token is required'));

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return next(errorHandler(400, 'Invalid or expired token'));
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    next(error);
  }
};
