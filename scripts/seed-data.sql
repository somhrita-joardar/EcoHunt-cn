-- Insert sample missions
INSERT INTO missions (title, description, points, difficulty, category, target_value) VALUES
('Recycling Hero', 'Recycle 15 items this week', 150, 'Easy', 'Waste Reduction', 15),
('Green Commuter', 'Use public transport or bike for 7 days', 300, 'Medium', 'Transportation', 7),
('Energy Saver', 'Reduce electricity usage by 20% this month', 500, 'Hard', 'Energy', 20),
('Tree Planter', 'Plant 3 trees or support tree planting', 400, 'Medium', 'Nature', 3),
('Water Guardian', 'Save 100 liters of water this week', 250, 'Easy', 'Water Conservation', 100),
('Eco Educator', 'Share 5 eco-tips with friends or family', 200, 'Easy', 'Education', 5);

-- Insert sample achievements
INSERT INTO achievements (name, description, badge_icon, points_required) VALUES
('Recycling Champion', 'Recycled 50 items this month', 'recycle', 500),
('Green Commuter', 'Used eco-friendly transport 20 times', 'car', 300),
('Community Builder', 'Invited 5 friends to join EcoHunt', 'users', 200),
('Energy Master', 'Saved 1000 kWh of electricity', 'lightbulb', 1000),
('Water Saver', 'Conserved 5000 liters of water', 'droplets', 800),
('Eco Influencer', 'Shared 50 eco-tips', 'leaf', 600);

-- Insert sample users (for testing)
INSERT INTO users (name, email, password_hash, points, level) VALUES
('Alice Green', 'alice@example.com', 'hashed_password_1', 1247, 5),
('Bob Earth', 'bob@example.com', 'hashed_password_2', 892, 4),
('Carol Nature', 'carol@example.com', 'hashed_password_3', 1456, 6),
('David Eco', 'david@example.com', 'hashed_password_4', 634, 3);
