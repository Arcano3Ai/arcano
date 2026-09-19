import re

shop_file = r"c:\Users\sergi\MisArchivosLocales\ARCANO — Sabiduría de los Arcanos\src\data\shop.ts"
with open(shop_file, "r", encoding="utf-8") as f:
    content = f.read()

sold_ids = [
    "quemador-rio-doble-basalto",
    "quemador-rio-doble-purpura-tarot",
    "quemador-rio-doble-canto-n14",
    "canto-rio-cho-ku-rei-oro",
    "piedra-meditacion-reiki-dorada",
    "piedra-sol-cara-dorado",
    "piedra-colgante-loto-borgoña",
    "piedra-oscura-777-dorado",
    "piedra-corazon-infinito",
]

for pid in sold_ids:
    pattern = rf'(id:\s*"{pid}"[\s\S]*?inStock:\s*)true'
    content, count = re.subn(pattern, r"\g<1>false", content)
    print(f"{pid}: updated {count} times")

with open(shop_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated shop.ts successfully!")
