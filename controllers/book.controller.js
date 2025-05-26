import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import successRes from "../lib/success.res.js";
import ErrorResponse from "../lib/error.res.js";


//POST: -add book (admin only)
const addBook = async (req, res, next) => {
  try {
    const { title, author, genre, description, publishedYear } = req.body;
    if (!title || !author || !genre || !description || !publishedYear) {
    next(ErrorResponse.badRequest("All fields are required: title, author, genre, description, publishedYear"));
    }
    console.log(req.role)
    if(req.role!=='admin'){
       next(ErrorResponse.badRequest("You are not authorized to add books"));   
    }
    const book = await Book.create({
      title,
      author,
      genre,
      description,
      publishedYear
    });

    successRes.created(res, "Book added successfully", book);
    
  } catch (error) {
    next(ErrorResponse.internalServer(error.message));
  }
};

// GET: get List of Books with all table operation (searching, sorting , filtering)

const getBooks = async (req, res, next) => {
  try {
    let { pageIndex, pageSize, search, sort } = req.query;

    pageSize = parseInt(pageSize) || 10;
    pageIndex = parseInt(pageIndex) || 1;

    const skip = (pageIndex - 1) * pageSize;

    // Search query: title, author, genre
    let query = {};
    if (search && search.trim() !== "") {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Sort criteria
    let sortCriteria = { createdAt: -1 }; // default
    if (sort && sort.key && (sort.order === "asc" || sort.order === "desc")) {
      sortCriteria = { [sort.key]: sort.order === "asc" ? 1 : -1 };
    }

    // Total count
    const totalCount = await Book.countDocuments(query);

    // Fetch paginated, sorted, filtered books
    const books = await Book.find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);

    successRes.ok(res, "Books fetched successfully", {
      data: books,
      tableData: {
        search: search || "",
        pageIndex,
        pageSize,
        sort: {
          key: sort?.key || "createdAt",
          order: sort?.order || "desc",
        },
        totalRecords: totalCount,
      },
    });
  } catch (error) {
    next(ErrorResponse.internalServer(error.message));
  }
};

// GET - Get book by ID with avg rating & reviews
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return next(ErrorResponse.notFound("Book not found"));

    const reviews = await Review.find({ book: req.params.id }).populate("user", "email").limit(10);
    const avgRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" } } }
    ]);

    successRes.ok(res, "Book details fetched", {
      book,
      averageRating: avgRating[0]?.avgRating || 0,
      reviews
    });
  } catch (error) {
    next(ErrorResponse.internalServer(error.message));
  }
};

export { addBook, getBooks, getBookById };
