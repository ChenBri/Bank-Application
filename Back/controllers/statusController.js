
const status = async (req, res) => {
    return res.status(200).json({ 'success': 'Server is running.' });
}

module.exports = {
    status
}