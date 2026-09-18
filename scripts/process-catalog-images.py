import os
import sys
from PIL import Image
import numpy as np

# Origen y destino
SOURCE_DIR = r"C:\Users\sergi\Downloads\VAL LIONESS\assets\images\Catalogo"
DEST_DIR = r"c:\Users\sergi\MisArchivosLocales\ARCANO — Sabiduría de los Arcanos\public\images\shop"

os.makedirs(DEST_DIR, exist_ok=True)

# Mapeo de nombres de archivo a slugs limpios
SLUG_MAP = {
    "Piedra Aura Chakra - Corazon MXN $199.png": "piedra-aura-corazon-chakras.png",
    "Piedra Aura Runas - Ovalada Dorada MXN $219.png": "piedra-aura-runas-dorada.png",
    "Piedra Natural Alargada - Numero 11-11 tallado.png": "piedra-natural-11-11.png",
    "Piedra Natural Blanca - Luna y estrellas pintado mano.png": "piedra-blanca-luna-estrellas.png",
    "Piedra Natural Oscura - Numero 777 tallado dorado.png": "piedra-oscura-777-dorado.png",
    "Piedra Natural Ovalada - Mandala Loto 6 petalos simple.png": "piedra-ovalada-mandala-loto.png",
    "Piedra Natural Ovalada Dorada - Runas talladas dremel.png": "piedra-ovalada-runas-dremel.png",
    "Piedra Natural Plana - Flor de la Vida tallada simple.png": "piedra-plana-flor-de-la-vida.png",
    "Piedra Natural Plana - Kit Limpia Runas con Palo Santo y Sage.png": "kit-limpia-runas-salvia-palosanto.png",
    "Piedra Natural Redonda - Mandala Puntos dorados.png": "piedra-redonda-mandala-dorado.png",
    "Piedra Realista - 7 Chakras puntos.png": "piedra-7-chakras-puntos.png",
    "Piedra Realista - Corazon Infinito.png": "piedra-corazon-infinito.png",
    "Piedra Realista - Numero 444.png": "piedra-numero-444.png",
    "Piedra Realista - Ojo Turco minimal.png": "piedra-ojo-turco.png",
    "Piedra Realista - OM tallado.png": "piedra-om-tallado.png",
    "Piedra Realista - Sol con cara dorado.png": "piedra-sol-cara-dorado.png",
    "Piedra Realista - Sol dorado mitad pintada.png": "piedra-sol-dual-dorado.png",
    "Piedra Realista - Triple Luna fases.png": "piedra-triple-luna-fases.png",
}

def crop_letterbox(image_path):
    im = Image.open(image_path).convert("RGBA")
    arr = np.array(im)
    h, w = arr.shape[:2]
    
    # Evaluar varianza horizontal por fila
    row_var = np.var(arr[:, :, :3], axis=1).mean(axis=1)
    
    # Determinar filas superiores uniformes
    top = 0
    while top < h and row_var[top] < 1.0:
        top += 1
        
    # Determinar filas inferiores uniformes
    bot = 0
    while bot < h and row_var[-bot - 1] < 1.0:
        bot += 1
        
    # Recortar filas de franjas
    if top + bot >= h:
        top = 0
        bot = 0
        
    cropped = arr[top : h - bot, :, :]
    return Image.fromarray(cropped), top, bot, (w, h - bot - top)

print("Procesando imágenes del catálogo...")
for filename, new_slug in SLUG_MAP.items():
    src_path = os.path.join(SOURCE_DIR, filename)
    if not os.path.exists(src_path):
        print(f"ADVERTENCIA: No se encontró {src_path}")
        continue
        
    cropped_img, top_cut, bot_cut, (nw, nh) = crop_letterbox(src_path)
    dest_path = os.path.join(DEST_DIR, new_slug)
    
    # Guardar en alta calidad PNG
    cropped_img.save(dest_path, "PNG", optimize=True)
    print(f"OK: {filename} -> {new_slug} ({nw}x{nh}, recortado top={top_cut}px, bot={bot_cut}px)")

print("¡Procesamiento de imágenes completado exitosamente!")
