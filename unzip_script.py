import zipfile
import os

def extract_to_root(zip_file):
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        for member in zip_ref.namelist():
            filename = os.path.basename(member)
            # skip directories
            if not filename:
                continue
            
            # copy file (taken from zipfile's extract)
            source = zip_ref.open(member)
            target = open(os.path.join('.', filename), "wb")
            with source, target:
                target.write(source.read())

extract_to_root('rtype_style_game_v3_o1mini.zip')
print("Archivo descomprimido exitosamente en la raíz del directorio.")
