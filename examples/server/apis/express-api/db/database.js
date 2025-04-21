
const sqlite3 = require('sqlite3').verbose();

function startDB(){
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
        db.run(`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            titulo TEXT, 
            descripcion TEXT, 
            imagen TEXT,
            fecha TEXT,
            categoria TEXT        
            )`);
    
        db.run('INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)', ['Is Tesla cooked?', 
            'The CEO is absent, the stock is plummeting, and the brand is toxic. Tesla’s future looks grim.', 
            'https://i.ytimg.com/vi/YduNEIuJ36U/hqdefault.jpg', 
            new Date().toISOString(), 
            'Business']);
        db.run('INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)', ['iPhone 17 Pro', 
            'iPhone 17 Pro to Use Advanced Cooling System for Better Performance',
             'https://www.deccanchronicle.com/h-upload/2024/12/16/1872847-untitleddesign1.webp', 
             new Date().toISOString(), 
             'Technology']);
        db.run('INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)', ['Scam emails have gotten so professional', 
            'Received this email today, and immediately by the font it felt shady. Netflix does not use this kind of font. Moreover, just a few days ago my Netflix subscription payment got auto-deducted from my bank. I’m pretty sure this is a scam, also because why would Netflix bcc me? But the email itself looks almost flawless. There are no grammatical or spelling errors. They seem to have copied the same words that Netflix uses. This is very scary!', 
            '', 
            new Date().toISOString(), 
            'Technology']);
        db.run('INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)', ['Australian man survives 100 days with artificial heart in world-first success', 
            'https://i.ytimg.com/vi/3mpXvW2Tj64/maxresdefault.jpg', 
            '', 
            new Date().toISOString(), 
            'BioTech']);
        db.run('INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)', ['Somehow the quality is so good...!!', 
            '', 
            'https://www.enago.com/academy/wp-content/uploads/2019/07/ACADE-779-750x430.jpg', 
            new Date().toISOString(), 
            'Technology']);        

        db.run('INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)', ['Nvidia card', 
            'Nvidia just launched a new incredible graphics card, https://www.nvidia.com/en-us/geforce/news/rtx-50-series-graphics-cards-gpu-laptop-announcements/', 
            'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/5070-family/geforce-rtx-5070-ti-og-image.jpg', 
            new Date().toISOString(), 
            'Technology']);
    
        db.run(`CREATE TABLE comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            post_id INTEGER,
            username TEXT, 
            comentario TEXT,
            fecha TEXT
            )`);
    
        db.run('INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)', [1, 'ludwing', 'Great article!', new Date().toISOString()]);
        db.run('INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)', [2, 'ludwing', 'I want one!', new Date().toISOString()]);
        db.run('INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)', [3, 'ludwing', 'I think the same', new Date().toISOString()]);
        db.run('INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)', [4, 'ludwing', 'Wow thats amazing!', new Date().toISOString()]);
        db.run('INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)', [5, 'ludwing', 'I agree with you!', new Date().toISOString()]);
        db.run('INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)', [6, 'ludwing', 'woooooow!', new Date().toISOString()]);
    });

    return db;
}

module.exports = startDB;