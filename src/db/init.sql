CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    location VARCHAR(120),

    employment_type VARCHAR(50),   
    seniority_level VARCHAR(50),   

    remote BOOLEAN DEFAULT false,

    salary_min INT,
    salary_max INT,
    currency VARCHAR(10) DEFAULT 'EUR',

    experience_min INT, 

    skills TEXT[],      

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
