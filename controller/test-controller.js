

module.exports = {
  findAll: function(req, res) {
    console.log("RECEIVED CLIENT GET REQUEST");
    res.json({status: 200, message: "GET COOOKIES"})
  },
  create: function(req, res) {
    console.log("RECEIVED CLIENT POST REQ.BODY: ", req.body);
    res.json({status: 200, msg: "POST COOKIES", req: req.body})
  },
  
  update: function(req, res) {
    console.log("RECEIVED CLIENT PUT REQ.PARAMS: ", req.params);
    res.json({status: 200, msg: `Put COOKIES. Id: ${req.params.id}`})
  },
  
  remove: function(req, res) {
    console.log("RECEIVED CLIENT DELETE REQ.PARAMS: ", req.params);
    res.json({status: 200, msg: `Delete PRETZELS. Id: ${req.params.id}`})
  },
}