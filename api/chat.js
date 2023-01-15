//possible redundancy here!!
const ChatApis = () => {
    //1
    router.post('/', (req, res) => {
        const newChat = new Chat({
            message: req.body.message,
            senderId: req.body.senderId,
            receiverId: req.body.receiverId
        });
    
        newChat.save()
            .then(chat => res.json(chat))
            .catch(err => res.status(400).json({ error: 'Error saving chat' }));
    });
    
    //2
    router.get('/', (req, res) => {
        Chat.find()
            .then(chats => res.json(chats))
            .catch(err => res.status(400).json({ error: 'Error fetching chats' }));
    });
    
    //3
    router.get('/:id', (req, res) => {
        Chat.findById(req.params.id)
            .then(chat => {
                if (!chat) {
                    return res.status(404).json({ error: 'Chat not found' });
                }
                res.json(chat);
            })
            .catch(err => res.status(400).json({ error: 'Error fetching chat' }));
    });
    
    //4
    router.put('/:id', (req, res) => {
        Chat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedChat) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating chat' });
            }
            if (!updatedChat) {
                return res.status(404).json({ error: 'Invalid chat id' });
            }
            res.status(200).json(updatedChat);
        });
    });
    
    //5
    router.delete('/:id', (req, res) => {
        Chat.findByIdAndDelete(req.params.id, (err, deletedChat) => {
            if (err) {
            return res.status(500).json({ error: 'Error deleting chat' });
            }
            if (!deletedChat) {
            return res.status(404).json({ error: 'Invalid chat id' });
            }
            res.status(200).json(deletedChat);
            });
            });
    
    //--
    };
    
    module.exports = ChatApis;