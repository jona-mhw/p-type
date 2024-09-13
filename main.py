import zipfile
import os

def unzip_file(zip_path, extract_to='.'):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)

# Descomprimir el archivo
unzip_file('rtype_style_game_v3_o1mini.zip')

# Listar el contenido del directorio actual
print("Contenido del directorio después de descomprimir:")
for item in os.listdir('.'):
    print(item)
