const generateData = (length) => {
    let rows = [];
    const date = new Date();
    const status = (index) => index === 1 ? 'Complete' : index === 0 ? 'Pending' : 'Approved'
    for (let index = 0; index < length; index++) {
        rows.push({
            name: `Company Name ${index}`,
            status: status(index),
            date: date.toLocaleDateString('en-US')
        })
    }
    return rows
}
const eventData = []
export default eventData