import Review from "../models/review.model.js";
import successRes from "../lib/success.res.js";
import ErrorResponse from "../lib/error.res.js";
// POST add review
const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: bookId } = req.params;
    console.log(bookId)
    const existing = await Review.findOne({ book: bookId, user: req.userId});
    if (existing) return next(ErrorResponse.badRequest("You already reviewed this book"));

    const review = await Review.create({
      book: bookId,
      user: req.userId,
      rating,
      comment
    });

    successRes.created(res, "Review submitted", review);
  } catch (error) {
    next(ErrorResponse.internalServer(error.message));
  }
};

// PUT  - Update your review
const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(ErrorResponse.notFound("Review not found"));
    if (review.user.toString() !== req.userId)
      return next(ErrorResponse.unauthorized("Unauthorized to update this review"));

    const { rating, comment } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();

    successRes.ok(res, "Review updated", review);
  } catch (error) {
    next(ErrorResponse.internalServer(error.message));
  }
};

// DELETE - Delete your review
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(ErrorResponse.notFound("Review not found"));
    if (review.user.toString() !== req.userId)
      return next(ErrorResponse.unauthorized("Unauthorized to delete this review"));

    await review.remove();
    successRes.ok(res, "Review deleted successfully");
  } catch (error) {
    next(ErrorResponse.internalServer(error.message));
  }
};

export { addReview, updateReview, deleteReview };
