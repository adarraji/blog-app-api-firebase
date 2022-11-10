require("dotenv").config();

const getFileName = (req, res) => {
    try {
        const file = req.file;
        return res.status(200).json(`${process.env.SERVER_URL}/uploads/` + file.filename);
    }
    catch (err) {
        return res.status(500).json("Unable to upload file");
    }
};

module.exports = {
    getFileName: getFileName
}