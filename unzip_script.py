import zipfile

with zipfile.ZipFile('rtype_style_game_v3_o1mini.zip', 'r') as zip_ref:
    zip_ref.extractall('.')

print("Archivo descomprimido exitosamente.")
