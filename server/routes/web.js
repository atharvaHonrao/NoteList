import express from 'express'
const router = express.Router();
import UserControls from '../controlers/userControlls.js'

// router.get('/scheme', UserControls.Data)
router.post('/register', UserControls.register)
router.post('/delete', UserControls.deleteNote)
// router.get('/login', UserControls.login)
router.get('/fetch', UserControls.fetchNotes)

export default router