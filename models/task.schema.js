const mongoose = require('mongoose');

const taskSchema = {
    task:{type: String},
    _listId: {
        type: mongoose.Types.ObjectId,
        required:true
    },
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;
