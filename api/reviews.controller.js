import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()

            const ReviewReponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )

            res.json(ReviewReponse)
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const review = req.body.review
            const date = new Date()
            const ReviewReponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            )

            var { error } = ReviewReponse
            if (error) {
                res.status.json({error})
            }
            if (ReviewReponse.modifiedCount === 0) {
                throw new Error ("unable to update review. User may not be orignial poster")
            }
            res.json(ReviewReponse)
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewReponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )

            res.json(ReviewReponse)
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }
}