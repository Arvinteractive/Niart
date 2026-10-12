"""Copy generated portfolio masters and encode web assets without retouching."""
from pathlib import Path
from shutil import copy2
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path('C:/Users/Aravind/.codex/generated_images/01a125ee-6ac0-73d3-b50b-af5bddb9f3e8')
TEMP = Path('C:/Users/Aravind/AppData/Local/Temp')
DEST = ROOT / 'public/images/featured/turquoise-bloom'
MASTERS = ROOT / 'output/imagegen/turquoise-bloom'

generated = {
    'back': 'exec-c23f3c3a-6250-4d41-9a62-8e39a921483e.png',
    'three-quarter': 'exec-c6de872b-b64a-4d13-b743-6cb08f690f8c.png',
    'left': 'exec-5415cc53-97e8-4c86-9409-f56f08cd52ce.png',
    'front': 'exec-e3c1fdcf-08c1-4db7-aa66-754c6b8ebc81.png',
    'right': 'exec-bfdac366-7e88-4ce1-b93d-9f249e8b9d1b.png',
    'detail': 'exec-0e9623fe-313c-4f48-8024-d39d7cae36a1.png',
}
originals = [
    '6ccb895b-2b9b-49a8-988d-26fcc4ec77a2',
    '9747c06e-5781-41b4-bd1e-cdadfeb71443',
    'b73670a2-a5ef-4b75-8d2b-efad9aa408fa',
    '6169c38a-0ce9-4aad-868f-851dc476dc29',
    'bb395556-e958-4a21-a396-5087ab0ee6c7',
    '147b68e4-23c3-4423-b761-6a6755ce62bb',
    '90d4f140-c1ec-4579-90e0-cbf9e22a919a',
    'bce87b50-7669-493f-b4b3-c72be6f5130c',
    '74a7904d-37be-4988-a39f-af9e0c73b285',
    '54dae518-98d6-485b-849d-6124a9eceb94',
]


def encode(source, name):
    with Image.open(source) as file:
        photo = ImageOps.exif_transpose(file).convert('RGB')
        photo.thumbnail((1600, 1920), Image.Resampling.LANCZOS)
        photo.save(DEST / f'{name}.webp', quality=87, method=6)
        photo.thumbnail((240, 240), Image.Resampling.LANCZOS)
        photo.save(DEST / f'{name}-thumb.webp', quality=78, method=6)


if __name__ == '__main__':
    DEST.mkdir(parents=True, exist_ok=True)
    MASTERS.mkdir(parents=True, exist_ok=True)
    for name, filename in generated.items():
        master = MASTERS / f'{name}.png'
        if not master.exists():
            copy2(GENERATED / filename, master)
        encode(master, name)
    for index, filename in enumerate(originals, 1):
        name = f'original-{index:02}'
        master = MASTERS / f'{name}.png'
        if not master.exists():
            copy2(TEMP / f'codex-clipboard-{filename}.png', master)
        encode(master, name)
    print(f'Prepared 6 generated views and 10 original photographs in {DEST}')
    print(f'Thumbnails: {sum(p.stat().st_size for p in DEST.glob("*-thumb.webp")) / 1024:.0f} KB total')
