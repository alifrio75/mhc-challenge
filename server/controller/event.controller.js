const mongoose = require("mongoose");

const EventModel = mongoose.model('event');
const UserModel = mongoose.model('user')

const createEvent = async (req, res) => {
    try {
        const createEvent = await EventModel.create(req.body)
        res.status(200).send(createEvent);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getEvent = async (req, res) => {
    const { companyId } = req.params
    let isVendor = false
    try {
        const findCompany = await UserModel.findOne({_id: companyId}, 'role company')
        isVendor = findCompany.role === 'Vendor'
        console.log(findCompany)
    } catch (error) {
        console.log(error)
    }
    const { status, page = 1 } = req.query

    const findQuery = { 
        ...(status && { status }),
        ...(isVendor ? { vendor: companyId } : { company: companyId} )
    }
    console.log(findQuery)
    
    const pageOption = {
        page: parseInt(page),
        limit: 100,
        populate: [{ path: 'company', select: 'company' }, { path: 'vendor', select: 'company' }],
    }
    // TODO: query and sort
    try {
        EventModel.paginate(findQuery, pageOption, (err, result) => {
            if (err) res.status(500)
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const editEvent = async (req, res) => {
    try {
        const findEvent = await EventModel.findById(req.params.eventId).exec();
        findEvent.set(req.body);
        const saveChanges = await findEvent.save();
        res.status(200).send(saveChanges);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createEvent,
    getEvent,
    editEvent
}