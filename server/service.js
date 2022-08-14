import tbl_confessions from "./tbl_confessions";

module.exports = async (gender, age, category, confess) =>{
    try {

        await tbl_confessions.insertMany({
            gender,
            age,
            category,
            confess
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}