const DataFileApis = () => {
//1
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, size, mimeType, path, isReadOnly, extension } = req.body;
    if (!name) {
      return res.status(400).json({ msg: 'Name is required' });
    }

    const newDataFile = new DataFile({
        name,
        size,
        mimeType,
        path,
        isReadOnly,
        extension,
        creatorUserId: req.user.id
    });

    newDataFile.save().then(dataFile => {
        res.json(dataFile);
    });
});
//2
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { page, pageSize } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(pageSize, 10) || 20,
        sort: { createdAt: -1 }
    };
    DataFile.paginate({}, options).then(dataFiles => {
        res.json(dataFiles);
    });
});
//3
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    DataFile.findById(req.params.id)
    .then(dataFile => {
        if (!dataFile) {
            return res.status(404).json({ msg: 'Data file not found' });
        }
        res.json(dataFile);
    });
});

//4
app.put('/api/datafile/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    DataFile.findById(req.params.id)
        .then((datafile) => {
            if (!datafile) {
                return res.status(404).json({ message: 'DataFile not found' });
            }

            datafile.name = req.body.name;
            datafile.size = req.body.size;
            datafile.mimeType = req.body.mimeType;
            datafile.path = req.body.path;
            datafile.isReadOnly = req.body.isReadOnly;
            datafile.extension = req.body.extension;
            datafile.lastModificationTime = Date.now();
            datafile.lastModifierUserId = req.user.id;

            datafile.save()
                .then((updatedDatafile) => {
                    res.status(200).json(updatedDatafile);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Error updating DataFile', error: err });
                });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding DataFile', error: err });
        });
});

//5
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if the user making the request is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid DataFile id' });
    }
    // find and delete the DataFile
    DataFile.findByIdAndDelete(req.params.id)
        .then(dataFile => {
            if (!dataFile) {
                return res.status(404).json({ message: 'DataFile not found' });
            }
            res.json({ message: 'DataFile deleted successfully' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error deleting DataFile' });
        });
});

};

module.exports = DataFileApis;