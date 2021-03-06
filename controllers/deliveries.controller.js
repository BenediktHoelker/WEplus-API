let Delivery = require('../models/delivery.model');

exports.list = function (request, response) {
	Delivery.find(function (err, deliveries) {
		if (err) {
			return console.error(err)
		};
		response.json(deliveries);
	});
}

exports.submit = function (request, response) {
	let submittedDelivery = request.body;
	/**
	* Create a new ObjectID if object does not exist
	* (otherwise mongoose would create _id=null
	*/
	let query = { _id: submittedDelivery._id };
	// if (!query._id) {
	// 	query._id = new mongoose.mongo.ObjectID();
	// }

	if (!submittedDelivery.supplier || !submittedDelivery.carrier) {
		response.sendStatus(400);
		return false;
	}

	Delivery.findOneAndUpdate(query, submittedDelivery, { upsert: true, new: true }, function (err, doc) {
		if (err) return response.send(500, ({ error: err }));
		response.status(201);
		response.json(doc);
	});
}

exports.delete = function (request, response) {
	let delivery = Delivery.findById(request.query._id);
	Delivery.findByIdAndRemove(request.query._id, function (err) {
		if (err) {
			response.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			response.json(request.query._id);
		}
	});
}