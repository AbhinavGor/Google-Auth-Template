const router = express.Router();

const User = require('../models/User');

router.get('/allUsers', async (req, res) => {
    const allUsers = await User.find({});
    res.send(allUsers);
})

module.exports = router;