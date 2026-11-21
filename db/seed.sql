-- Sample data for local development and testing.
-- The demo password hash is a placeholder; real hashing comes with issue #7 (authentication).
INSERT INTO users (name, email, password_hash)
VALUES (
        'Demo Owner',
        'demo@datapulse.dev',
        'placeholder-hash-replace-in-issue-7'
    ) ON CONFLICT (email) DO NOTHING;
INSERT INTO businesses (user_id, name, currency)
SELECT id,
    'Demo Coffee Shop',
    'USD'
FROM users
WHERE email = 'demo@datapulse.dev';
INSERT INTO sales (business_id, date, amount, description)
SELECT b.id,
    s.date::date,
    s.amount,
    s.description
FROM businesses b
    CROSS JOIN (
        VALUES ('2026-11-02', 1250.00, 'Weekly coffee sales'),
            ('2026-11-09', 1380.50, 'Weekly coffee sales'),
            ('2026-11-16', 1425.75, 'Weekly coffee sales')
    ) AS s(date, amount, description)
WHERE b.name = 'Demo Coffee Shop';
INSERT INTO expenses (business_id, date, amount, category, description)
SELECT b.id,
    e.date::date,
    e.amount,
    e.category,
    e.description
FROM businesses b
    CROSS JOIN (
        VALUES (
                '2026-11-03',
                420.00,
                'Supplies',
                'Coffee beans and milk'
            ),
            (
                '2026-11-10',
                380.00,
                'Supplies',
                'Coffee beans and cups'
            ),
            ('2026-11-15', 900.00, 'Rent', 'Monthly rent')
    ) AS e(date, amount, category, description)
WHERE b.name = 'Demo Coffee Shop';
INSERT INTO kpis (business_id, name, unit, target_value, period)
SELECT b.id,
    k.name,
    k.unit,
    k.target_value,
    k.period
FROM businesses b
    CROSS JOIN (
        VALUES ('Weekly sales', 'USD', 1500.00, 'weekly'),
            ('Monthly expenses', 'USD', 2000.00, 'monthly')
    ) AS k(name, unit, target_value, period)
WHERE b.name = 'Demo Coffee Shop';