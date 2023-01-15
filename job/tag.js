const cron = require('node-cron');

cron.schedule('*/5 * * * *', async () => {
    // Count number of ideas with each tag 
    const countIdeasWithTag = await Idea.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } }
    ]);

    // update the useCount of each tag
    for (let i = 0; i < countIdeasWithTag.length; i++) {
        const tag = await Tag.findOne({ name: countIdeasWithTag[i]._id });
        if (tag) {
            tag.useCount = countIdeasWithTag[i].count;
            await tag.save();
        }
    }
});