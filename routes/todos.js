
const express = require('express');
const router = express.Router();
const db = require('../db');
require('dotenv').config();


router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM todos');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Sorry there is no todo list' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(400).json({ error: 'Task is required' });
        }
        const [result] = await db.query('INSERT INTO todos (task) VALUES (?)', [task]);
        res.status(201).json({ id: result.insertId, task });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body; 

        if (!id || !task) {
            return res.status(400).json({ error: 'ID and task are required' });
        }

        const [result] = await db.query('UPDATE todos SET task = ? WHERE id = ?', [task, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ error: 'ID is required to delete a task' });
        }

        const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully!' });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});


module.exports = router;
