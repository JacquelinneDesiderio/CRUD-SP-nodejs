import { getConnection, sql } from "../database/connection";

export const getBooks = async (req, res) => {
    try {
        // call conection 
        const pool = await getConnection();
        // request query db
        const data = await pool.request()
        .query('dbo.SelectAllBooks' );
        // recordset [data]
        // console.log(data)
        res.json(data.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message);

    }
};


export const getBookById = async (id, callback) => {
    const pool = await getConnection();
    const data = await pool.request()
        .input("id", sql.Int, id)
        .execute('dbo.SelectByIdBook');
    // console.log(data)
    callback(data.recordset);
}



export const addNewBook = async ( req, res ) => {
const {nombre, autor, editorial, edicion} = req.body;

    try {
        const pool = await getConnection();

        const data = await pool
            .request()
            // .input("libroID", sql.Int, res.id)
            .input("nombre", sql.VarChar, nombre)
            .input("autor", sql.VarChar, autor)
            .input("editorial", sql.VarChar, editorial)
            .input("edicion", sql.VarChar, edicion)
            .execute(('dbo.AddBook'));

            res.json(data.recordset);

    } catch (error) {
        return console.log(error)

    }
}

export const deleteBook = async (id, callback) => {

    const pool = await getConnection();
    const data = await pool.request()
        .input("id", sql.Int, id)
        .execute('dbo.DeleteBook');
    //console.log(data)
    callback(data.recordset);
}



export const updateBook = async (id, callback) => {
const {nombre, autor, editorial, edicion} = req.body
    try {
        const pool = await getConnection();
        const data = await pool
            .request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, nombre)
            .input("autor", sql.VarChar, autor)
            .input("editorial", sql.VarChar, editorial)
            .input("edicion", sql.VarChar, edicion)
            .execute('dbo.updateBook');
        console.log(data)
        //res.json(data.recordset);
        callback(data.recordset);

    } catch (error) {
        return console.log(error)

    }

}