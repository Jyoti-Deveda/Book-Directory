const Book = require('../Model/book')

exports.getBooks = async (req, res) => {
    try{
        //fetch the books
        const response = await Book.find({});
        // console.log("Response: ", response);

        return res.status(200).json({
            success: true,
            data: response,
            message: "Data fetched successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            error: err.message,
            message: "Could not fetch the book info"
        })
    }
}

exports.addBook = async (req, res) => {
    try{
        const {title, author, publisher, ISBN} = req.body;

        //validation
        const alreadyExists = await Book.findOne({title: title});
        if(alreadyExists){
            return res.json({
                success: false,
                message: "Book already exists in the directory",
            })
        }

        const newBook = await Book.create({
            title,
            author,
            publisher,
            ISBN
        })

        console.log("new book ", newBook);

        return res.status(200).json({
            success: true,
            message: "Created a new book entry"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to create a new book entry",
            error: err.message
        })
    }
}

exports.updateBook = async (req, res) => {
    try{
        //getting the Id of the book entry to be updated
        const {id} = req.params;
        console.log("Fetch id")
        
        //validation- checking if the specified entry exists
        const bookDetails = await Book.findById(id);

        if(!bookDetails){
            return res.status(400).json({
                success: false,
                message: "No book entry with given id exists"
            })
        }

        //fetching the data to be updated
        const {title, author, publisher, ISBN} = req.body;

        bookDetails.title = title ? title : bookDetails.title
        bookDetails.author = author ? author : bookDetails.author
        bookDetails.publisher = publisher ? publisher : bookDetails.publisher
        bookDetails.ISBN = ISBN ? ISBN : bookDetails.ISBN

        const newBookEntry = await bookDetails.save();

        return res.status(200).json({
            success: true,
            message: "Updates the book entry successfully",
            newBookEntry
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Could not update the book directory"
        })
    }
}

exports.deleteBook = async (req, res) => {
    try{
        //fetching id
        const id = req.params.id;

        //validation - cheking if book info entry with given id is given
        const bookDetails = await Book.findByIdAndDelete(id);

        if(!bookDetails){
            return res.status(400).json({
                success: false,
                message: "No entry with given id exists"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Deleted the book entry successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Could not delete the book info"
        })
    }
}