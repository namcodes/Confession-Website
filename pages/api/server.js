import mongo_connect from "../../server/server";
import service from "../../server/service"

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function server(req, res) {
  if (req.method === "POST") {
    try {
      const database = await mongo_connect();

      const { gender, age, category, confession } = req.body;

      if (!database) {
       
        const results = await service(gender, age, category, confession);

        if (results) {
          res.status(200).json({ status: "success" });
          console.log("Successfully");
        } else {
          res.status(401).json({ status: "error" });
        }
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else {
    res.json({ status: "Invalid request" });
  }
}
