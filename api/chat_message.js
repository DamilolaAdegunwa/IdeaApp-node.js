const ChatMessageApis = () => {
//1
router.post('/', (req, res) => {
    const newChatMessage = new ChatMessage({
        message: req.body.message,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId
    });

    newChatMessage.save()
        .then(chatMessage => res.json(chatMessage))
        .catch(err => res.status(400).json({ error: 'Error saving chat message' }));
});

//2
router.get('/', (req, res) => {
    ChatMessage.find()
        .then(chatMessages => res.json(chatMessages))
        .catch(err => res.status(400).json({ error: 'Error fetching chat messages' }));
});

//3
router.get('/:id', (req, res) => {
    ChatMessage.findById(req.params.id)
        .then(chatMessage => {
            if (!chatMessage) {
                return res.status(404).json({ error: 'Chat message not found' });
            }
            res.json(chatMessage);
        })
        .catch(err => res.status(400).json({ error: 'Error fetching chat message' }));
});

//4
router.put('/:id', (req, res) => {
    ChatMessage.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedChatMessage) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating chat message' });
        }
        if (!updatedChatMessage) {
            return res.status(404).json({ error: 'Invalid chat message id' });
        }
        res.status(200).json(updatedChatMessage);
    });
});

//5
router.delete('/:id', (req, res) => {
    ChatMessage.findByIdAndDelete(req.params.id, (err, deletedChatMessage) => {
        if (err) {
        return res.status(500).json({ error: 'Error deleting chat message' });
        }
        if (!deletedChatMessage) {
        return res.status(404).json({ error: 'Invalid chat message id' });
        }
        res.status(200).json(deletedChatMessage);
        });
        });

//--
};

module.exports = ChatMessageApis;