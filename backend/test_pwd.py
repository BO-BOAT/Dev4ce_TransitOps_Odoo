from app.core.security import verify_password, get_password_hash
hash = get_password_hash('demo')
print('Hash generated:', hash)
print('Verified against generated:', verify_password('demo', hash))
print('Verified against DB hash:', verify_password('demo', '$2b$12$U/CVJzeeG0wZoJzu88sL.OiA8gwyx3Ptgv8fYH7iPbxbqrxTH8at.'))
