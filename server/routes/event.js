const EventController = require('./../controller/event.controller')

module.exports = (app) => {
    app.post('/api/event/create', EventController.createEvent);
    app.get('/api/event/:companyId', EventController.getEvent);
    app.put('/api/event/:eventId', EventController.editEvent);
};
