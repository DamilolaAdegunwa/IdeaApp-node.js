const SessionApis = () => {
    // Create API
app.post("/sessions", (req, res) => {
const session = new Session({
name: req.body.name,
description: req.body.description,
participants: req.body.participants,
status: req.body.status,
type: req.body.type,
duration: req.body.duration,
creatorUserId: req.body.creatorUserId
});
session
.save()
.then(data => {
res.json(data);
})
.catch(err => {
res.json({ message: err });
});
});

// Read All API
app.get("/sessions", (req, res) => {
Session.find()
.then(data => {
res.json(data);
})
.catch(err => {
res.json({ message: err });
});
});

// Read API
app.get("/sessions/:sessionId", (req, res) => {
Session.findById(req.params.sessionId)
.then(data => {
res.json(data);
})
.catch(err => {
res.json({ message: err });
});
});

// Update API
app.patch("/sessions/:sessionId", (req, res) => {
Session.updateOne(
{ _id: req.params.sessionId },
{
$set: {
name: req.body.name,
description: req.body.description,
participants: req.body.participants,
status: req.body.status,
type: req.body.type,
duration: req.body.duration,
lastModificationTime: Date.now(),
lastModifierUserId: req.body.lastModifierUserId
}
}
)
.then(data => {
res.json(data);
})
.catch(err => {
res.json({ message: err });
});
});

// Delete API
app.delete("/sessions/:sessionId", (req, res) => {
Session.updateOne(
{ _id: req.params.sessionId },
{
$set: {
isDeleted: true,
deletionTime: Date.now(),
deleterUserId: req.body.deleterUserId
}
}
)
.then(data => {
res.json(data);
})
.catch(err => {
res.json({ message: err });
});
});
};

module.exports = SessionApis;