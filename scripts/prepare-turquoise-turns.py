"""Copy turntable masters and encode web delivery assets without retouching."""
from pathlib import Path
from shutil import copy2
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
sources = json.loads((ROOT / 'design/turquoise-turn-sources.json').read_text())
for name, source in sources.items():
    master = ROOT / f'output/imagegen/turquoise-bloom/{name}.png'
    if not master.exists():
        copy2(source, master)
    with Image.open(master) as original:
        photo = original.convert('RGB')
        photo.thumbnail((1448, 1086), Image.Resampling.LANCZOS)
        photo.save(ROOT / f'public/images/featured/turquoise-bloom/{name}.webp', quality=87, method=6)
        photo.thumbnail((240, 180), Image.Resampling.LANCZOS)
        photo.save(ROOT / f'public/images/featured/turquoise-bloom/{name}-thumb.webp', quality=78, method=6)
    print(name)
