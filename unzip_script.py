import zipfile
import os
import glob

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

# Buscar archivos .zip en el directorio actual
zip_files = glob.glob('*.zip')

if zip_files:
    for zip_file in zip_files:
        extract_to_root(zip_file)
        print(f"Archivo {zip_file} descomprimido exitosamente en la raíz del directorio.")
else:
    print("No se encontraron archivos .zip en el directorio actual.")
